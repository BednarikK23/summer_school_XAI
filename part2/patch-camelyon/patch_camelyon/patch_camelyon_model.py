from collections import defaultdict

import torch
from lightning import LightningModule
from torch import Tensor, nn
from torch.optim.adamw import AdamW
from torch.optim.optimizer import Optimizer
from torcheval.metrics.functional import mean
from torchmetrics import AUROC, Accuracy, Precision, Recall

from patch_camelyon.modeling import BinaryClassifier
from patch_camelyon.typing import Input, Outputs


class PatchCamelyonModel(LightningModule):
    def __init__(self, backbone: nn.Module) -> None:
        super().__init__()
        self.backbone = backbone
        self.decode_head = BinaryClassifier()
        self.criterion = nn.BCELoss()

        self.metrics = nn.ModuleDict(
            {
                "AUC": AUROC("binary"),
                "accuracy": Accuracy("binary"),
                "precision": Precision("binary"),
                "recall": Recall("binary"),
            }
        )

        self._validation_bach_sizes: list[int] = []
        self._validation_step_outputs: dict[str, list[Tensor]] = defaultdict(list)

    def forward(self, x: Input) -> Outputs:
        features = self.backbone(x)
        return self.decode_head(features)

    def training_step(self, batch: Input) -> Tensor:
        inputs, targets = batch
        outputs = self(inputs)

        loss = self.criterion(outputs, targets)
        self.log("train/loss", loss, on_step=True, prog_bar=True)

        return loss

    def validation_step(self, batch: Input) -> None:
        inputs, targets = batch
        outputs = self(inputs)

        loss = self.criterion(outputs, targets)
        self._validation_step_outputs["loss"].append(loss)
        self._validation_bach_sizes.append(len(inputs))

        for metric in self.metrics.values():
            metric(outputs, targets)

    def on_validation_epoch_end(self) -> None:
        weight = torch.tensor(self._validation_bach_sizes, device=self.device)
        avg_outputs = {
            k: mean(torch.stack(v), weight)
            for k, v in self._validation_step_outputs.items()
        }

        log_data = {
            f"validation/{name}": metric.compute()
            for name, metric in self.metrics.items()
        }
        log_data.update({f"validation/{k}": v for k, v in avg_outputs.items()})

        self.log_dict(log_data, sync_dist=True)

        self._validation_step_outputs.clear()
        self._validation_bach_sizes.clear()
        for metric in self.metrics.values():
            metric.reset()

    def test_step(self, batch: Input) -> None:
        inputs, targets = batch
        outputs = self(inputs)

        for metric in self.metrics.values():
            metric(outputs, targets)

    def on_test_epoch_end(self) -> None:
        self.log_dict(
            {f"test/{name}": metric.compute() for name, metric in self.metrics.items()},
            sync_dist=True,
        )

        for metric in self.metrics.values():
            metric.reset()

    def configure_optimizers(self) -> Optimizer:
        return AdamW(
            self.parameters(),
            lr=0.0001,
            betas=(0.9, 0.999),
            weight_decay=0.05,
        )
