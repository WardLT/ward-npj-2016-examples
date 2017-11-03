# Predicting Properties of Inorganic Materials with Machine Learning

This repository contains software and scripts necessary to replicate most calculations from a 2016 paper by [Ward *et al*](https://www.nature.com/articles/npjcompumats201628): "A General-Purpose Machine Learning Framework for Predicting Properties of Inorganic Materials." 
The scripts are all contained within Jupyter notebooks alongside explainations for the calculations. 

## Contents

There are several important directories in this repository:

    `datasets`: Datasets for the band gap energy predictions and glass forming ability models
    `magpie`: The Materials-Agnostic Platform for Informatics and Exploration (Magpie), its required libraries, and documentation. See [bitbucket.org](https://bitbucket.org/wolverton/magpie)
    `predicting-band-gap-energies`: Scripts for creating models for band gap energies of crystalline compounds
    `modeling-metallic-glasses`: Scripts for predicting the glass-forming ability of metallic alloys
    
The latter two directories contain Jupyter notebooks that replicate the key tables and figures from this paper.

## Running

These notebooks are designed to be run via Docker. 
Docker is a tool for creating very lightweight virtual machines, which - in our case - makes it possible to run these notebooks in the same software environment.

To launch the notebooks, first install docker on your computer and then call either `./docker.bs` if you are running Mac or Linux, or double-click `docker.bat` if you are running Windows. 
This will create a Docker container with the correct environment, assign it in an appropriate amount of RAM (though you might want to adjust it, if your computer has <6GB of RAM), and allow it to access the appropriate files.

Once the docker container is launched, you can connect to the Jupyter environment via a web browser (see the URL listed by the Docker container). 
Then, you can either run each notebook on its own, or run `./run-all.bs inplace` in the `/home/joyvan/data` directory via the command line to execute all notebooks in the proper order.
