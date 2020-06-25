#!/usr/bin/env bash

set -euo pipefail
readonly IFS=$'\n\t'

ROOT_WD="$PWD"

# Load colours and common functions
chmod +x "./functions.sh"
# shellcheck source=/dev/null
source "./functions.sh"

print_info "Deploying docker compose..."
sudo docker-compose -f "docker-compose.yml" up -d --build
