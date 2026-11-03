#!/bin/bash
# Preview the site locally, exactly as GitHub Pages serves it. Pass a port to override 8080.
set -e
cd "$(dirname "$0")"
PORT="${1:-8080}"
echo "Devadmin → http://localhost:$PORT/  (ctrl-c to stop)"
python3 -m http.server "$PORT"
