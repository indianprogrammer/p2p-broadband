#!/usr/bin/env bash
set -Eeuo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")"

: "${PORT:=3000}"

npm ci --include=dev
npm run build
export NODE_ENV=production
exec npm run start -- --port "$PORT"
