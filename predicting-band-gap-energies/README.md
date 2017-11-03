# Predicting New Solar Cell Materials

Density Functional Theory (DFT) computes the electronic structures of materials with no input from experiment, which makes it a great tool for identifying which materials are suitable for important technologies.
The problem is that it is very computationally expensive.
These notebooks create a machine model that predicts the one of the properties predicted using DFT, the band gap energy, which will be much faster than DFT.
The band gap energy, in particular, is an important property when designing solar cell materials and we show how this machine learning model can be used to identify likely  candidates for solar cell materials, which can be used to guide which materials should be studied further with DFT.

This directory contains several noteboks:

    `build-and-test-hierarchical-model.ipynb`: Trains and tests the machine learning model
    `plot-cv-results.ipynb`: Plot the results from the cross-validation test
    `evaluate-meredig-predictions.ipynb`: Use the ML model to predict the band gap energies of yet-undiscovered materials
    `identify-solar-cell-materials.ipynb`: Determine which ones of those predictions are the best candidate solar cell materials

