class Backbone:
    def __init__(self, num_classes: int):
        self.num_classes = num_classes


class Model:
    def __init__(self, name: str, backbone: Backbone):
        self.name = name
        self.backbone = backbone


def create_model(name: str, num_classes: int):
    backbone = Backbone(num_classes)
    return Model(name, backbone)
