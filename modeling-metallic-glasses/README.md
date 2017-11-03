## Predicting Glass-Forming Ability with Machine Learning

Metallic glasses are a unique class of material with a variety of fantastic properties, such as exceptional wear-resistance.
However, it is difficult to determine which metal alloys are possible to cast into a glassy state. 
In these notebooks, we create a machine learning model that can predict glass-forming ability given an alloy's composition, test it, and then use it to search for new alloys in a search space of over 2 million candidates.

The notebooks are:

    `build-and-test-gfa-model.ipynb`: Trains and tests a machine learning model that predicts glass-forming ability
    `plot-alnizr-ternary.ipynb`: Plots the results from a hold-out test ([Figure 2](https://www.nature.com/articles/npjcompumats201628/figures/2) of the original paper)
    `predict-new-glasses.ipynb`: Uses the model to find new glasses in a large search space
    `analyze-predictions.ipynb`: Analyzes the predicted alloys from `predict-new-glasses`
    