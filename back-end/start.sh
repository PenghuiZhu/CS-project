#!/bin/sh
BACKEND_DIR="$(dirname "$0")"
node "${BACKEND_DIR}/db.js"
