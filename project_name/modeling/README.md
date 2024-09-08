# Modeling

In this folder you should put all your model and loss components. Common structure is as follows:

```
modeling
├── backbone
│   ├── vgg16.py
│   ├── resnet.py
│   └── __init__.py
├── criterion.py
├── decode_head.py
├── metrics
│   ├── vgg16.py
│   ├── resnet.py
│   └── __init__.py
└── __init__.py
```


### Structure Explanation

- **backbone**: Contains the backbone network architectures like VGG16, ResNet, etc.
- **criterion.py**: Contains the loss functions.
- **decode_head.py**: Contains the decoding heads for the models.
- **metrics**: Contains the metric components for model evaluation, such as accuracy, precision, etc.

### Note

You can add a `metrics` folder to store all your metric components. However, if your evaluation logic becomes too complex, it is recommended to move it to an `evaluation` folder at the project level.
