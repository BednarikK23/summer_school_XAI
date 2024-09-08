import torchvision
from torch import nn


def resnet18(weights: str | None = None) -> nn.Module:
    resnet = torchvision.models.resnet18(weights=weights)
    return nn.Sequential(*(list(resnet.children())[:-2]))
