#!/usr/bin/env bash

set -euo pipefail
readonly IFS=$'\n\t'

ROOT_WD="$PWD"

# Load colours and common functions
chmod +x "$ROOT_WD/functions.sh"
# shellcheck source=/dev/null
source "$ROOT_WD/functions.sh"

docker-compose -f "docker-compose.yml" down -v
print_pass "Teardown complete!"
