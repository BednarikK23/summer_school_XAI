from typing import TypeAlias

from torch import Tensor


Sample: TypeAlias = tuple[Tensor, Tensor]

Input: TypeAlias = tuple[Tensor, Tensor]

Outputs: TypeAlias = Tensor
