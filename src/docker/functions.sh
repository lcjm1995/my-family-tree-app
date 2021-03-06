#!/usr/bin/env bash
# Reasoning behind strict bashing http://redsymbol.net/articles/unofficial-bash-strict-mode/

set -euo pipefail

# MYCONST="Blah"

# Colours
readonly RED='\033[0;31m'
readonly ORANGE='\033[0;33m'
readonly GREEN='\033[0;32m'
readonly CYAN='\033[0;36m'
readonly NC='\033[0m' # No-colour

function print_error(){
    echo -e "[ ${RED}FAIL${NC} ] $1" && exit 1
}

function print_warning(){
    echo -e "[ ${ORANGE}WARN${NC} ] $1"
}

function print_pass(){
    echo -e "[ ${GREEN}PASS${NC} ] $1"
}

function print_info(){
    echo -e "[ ${CYAN}INFO${NC} ] $1"
}

# TODO: Revisit implentation
function getList(){
	if [ "$1" == "sh" ]
	then
		find "$PWD" -type f \( -name "*.$1" -or ! -name "*.*" \) -type f ! -name "*Dockerfile*" ! -name "*hosts*"
	else
		find "$PWD" -type f \( -name "*.$1" \) -type f ! -name "*Dockerfile*" ! -name "*hosts*"
	fi
}

function filterList(){
	exc_dir_len="${#EXC_DIR[@]}"
	for file in $1
	do
		value=$exc_dir_len
		for dir in "${EXC_DIR[@]}"
		do
			if [[ "$file" == *"$dir"* ]]
			then
				break
			fi
			value=$(("$value"-1))
		done
		if [ "$value" == 0 ]
		then
			"$2" "$file"
		fi
	done
}
