#!/bin/bash

# Get the current directory
current_dir=$(pwd)

# Iterate through all folders
for folder in $(find $current_dir -type d); do
    # Create the manifest.json file in each folder
    touch "$folder/manifest.json"
done
