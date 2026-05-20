#!/usr/bin/env bash
# Wrapper p/ scripts/dispatch-inscritos.ts.
# Uso: bash scripts/dispatch-inscritos.sh <arquivo.html> "<assunto>"
# Env opcional: TEST_EMAIL=foo@bar.com (envia somente para esse endereço)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

if [ $# -lt 2 ]; then
  echo 'Uso: bash scripts/dispatch-inscritos.sh <arquivo.html> "<assunto>"'
  exit 1
fi

exec npx tsx scripts/dispatch-inscritos.ts "$1" "$2"
