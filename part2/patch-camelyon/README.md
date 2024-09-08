# Patch Camelyon

Matěj Pekár, Adam Kukučka

[![PyTorch Lightning](https://img.shields.io/badge/pytorch-lightning-blue.svg?logo=PyTorch%20Lightning)](https://github.com/Lightning-AI/lightning)
[![License](https://img.shields.io/badge/License-MIT-red.svg)](https://gitlab.ics.muni.cz/rationai/digital-pathology/pathology/patch-camelyon/-/blob/master/LICENSE)



This is a PyTorch implementation of the Patch Camelyon challenge. The goal is to classify image patches as either benign or malignant. The model is trained on the PCam dataset, which consists of 327,680 image patches, each 96x96 pixels, extracted from histopathologic scans of lymph node sections. Each patch is labeled as either **benign** (no tumor) or **malignant** (contains tumor). The goal is to accurately classify these patches.

PCam is derived from the larger Camelyon16 Challenge, which features whole-slide images (WSIs) of lymph node sections stained with H&E. For PCam, these slides were digitized, and the images were undersampled to provide a larger field of view at a lower resolution. A positive label in PCam means that the central 32x32 pixel region of a patch contains tumor tissue, ensuring consistent behavior of the model when applied to a whole-slide image.

![PCam example images. Green boxes indicate positive labels.](https://github.com/basveeling/pcam/blob/master/pcam.jpg?raw=true)

*Example images from PCam. Green boxes indicate tumor tissue in center region, which dictates a positive label.*


## Getting Started

First download the dataset from the [official website](https://patchcamelyon.grand-challenge.org/Data/) and extract it to the `data/raw` directory.

### Installation

Install [PDM](https://pdm.fming.dev/) package manager and install all the dependencies using the following command:
```bash
pdm install
```

### Preprocessing

```bash
pdm run preprocessing/hdf5_to_npy.py
```

### Training

```bash
export MLFLOW_TRACKING_USERNAME=<YOUR_USERNAME>
pdm train model/backbone=(vgg16|resnet18)
```

### Testing

```bash
export MLFLOW_TRACKING_USERNAME=<YOUR_USERNAME>
pdm train model/backbone=(vgg16|resnet18) 'checkpoint="<CHECKPOINT_PATH>"'
```
