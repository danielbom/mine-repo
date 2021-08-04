#!/usr/bin/env bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

node "$SCRIPT_DIR/queryExtraDataFromProjects.js" > "$SCRIPT_DIR/result.json"
