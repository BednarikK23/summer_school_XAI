import numpy as np
import torch
from albumentations import TransformType
from albumentations.pytorch import ToTensorV2
from numpy.typing import NDArray
from torch.utils.data import Dataset

from patch_camelyon.typing import Sample


class PatchCamelyon(Dataset[Sample]):
    def __init__(
        self, path_x: str, path_y: str, transforms: TransformType | None = None
    ) -> None:
        super().__init__()
        self.x = np.load(path_x, mmap_mode="r")
        self.y = np.load(path_y, mmap_mode="r")
        self.transforms = transforms
        self.to_tensor = ToTensorV2()

        assert len(self.x) == len(
            self.y
        ), "The number of images and labels must be the same."

    def __len__(self) -> int:
        return len(self.x)

    def __getitem__(self, index: int) -> Sample:
        image: NDArray[np.uint8] = self.x[index]  # (96, 96, 3)
        label: NDArray[np.uint8] = self.y[index]  # (1,)

        if self.transforms is not None:
            image = self.transforms(image=image)["image"]

        return self.to_tensor(image=image)["image"], torch.tensor(label).float()
