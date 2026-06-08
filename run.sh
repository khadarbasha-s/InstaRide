#!/usr/bin/env bash
# FastRental dev server launcher.
# Usage:  bash run.sh         (Linux/macOS)
#         ./run.sh            (after chmod +x run.sh)

set -e
cd "$(dirname "$0")"

# Load nvm
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  . "$HOME/.nvm/nvm.sh"
fi

# Make sure deps are installed
if [ ! -d node_modules ]; then
  echo "Installing dependencies (first run)…"
  pnpm install
fi

# Make sure DB is seeded
if [ ! -f prisma/dev.db ]; then
  echo "Initializing database…"
  pnpm prisma db push --skip-generate
  pnpm db:seed
fi

echo ""
echo "🚗 Starting FastRental dev server…"
echo "   → http://localhost:3000"
echo "   → Admin: http://localhost:3000/admin/login"
echo "     email: admin@fastrental.local"
echo "     password: ChangeMeInProd!2026"
echo ""
echo "Press Ctrl+C to stop."
echo ""

exec pnpm dev
