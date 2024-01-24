#!/bin/bash

is_valid_tag() {
  [[ "$1" =~ ^[Vv][0-9]+(\.[0-9]+)+$ ]]
}

# Run the function if script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  is_valid_tag "$1"
fi

```
Then, in your workflow, you can use it like this:
```
- name: Check if tag is valid
  run: |
    if ! .github/scripts/is-valid-tag.sh "${GITHUB_REF}"; then
      echo "Invalid tag: ${GITHUB_REF}"
      exit 1
    else
      echo "Valid tag: ${GITHUB_REF}"
    fi
```
