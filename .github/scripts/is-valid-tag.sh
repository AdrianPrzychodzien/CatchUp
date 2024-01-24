function is_valid_tag() {
  [[ "$1" =~ ^[Vv][0-9]+(\.[0-9]+)+$ ]]
}
