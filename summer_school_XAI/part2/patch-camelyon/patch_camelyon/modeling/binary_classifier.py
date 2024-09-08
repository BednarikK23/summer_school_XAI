from torch import Tensor, nn


class BinaryClassifier(nn.Module):
    def __init__(self) -> None:
        super().__init__()
        self.global_pool = nn.AdaptiveAvgPool2d(1)
        self.dropout = nn.Dropout(p=0.5)
        self.proj = nn.Linear(512, 1)

    def forward(self, x: Tensor) -> Tensor:
        x = self.global_pool(x)  # (B, C, 1, 1)
        x = x.flatten(start_dim=-3, end_dim=-1)  # (B, C)
        x = self.dropout(x)
        x = self.proj(x)
        return x.sigmoid()
