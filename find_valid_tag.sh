#!/bin/bash

# Function to check if a tag is valid
function is_valid_tag() {
    if [[ "$1" =~ ^(?i)v[0-9]+(\.[0-9]+)+$ ]]; then
        return 0 # It is a valid tag
    else
        return 1 # It is not a valid tag
    fi
}

# Get the last tag without abbreviating
last_tag=$(git describe --tags --abbrev=0)

# Get the next valid tag
current_tag=$(git describe --tags --abbrev=0 $last_tag^)
echo "Current tag: $current_tag"
while ! is_valid_tag "$current_tag"; do
    current_tag=$(git describe --tags --abbrev=0 $current_tag^) # Move to the previous tag
done

# Print the valid tag found
echo "$current_tag"