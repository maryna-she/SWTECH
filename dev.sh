#!/usr/bin/env bash
# dev.sh – Startet Backend (Spring Boot) und Frontend (Vite) gleichzeitig.
# Verwendung: ./dev.sh
# Beenden:    Ctrl+C  (stoppt beide Prozesse)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$SCRIPT_DIR/frontend/my-react-app"

# ── Farben ─────────────────────────────────────────────────────────────────────
RED='\033[0;31m'
CYAN='\033[0;36m'
BOLD='\033[1m'
RESET='\033[0m'

prefix_backend="${CYAN}[backend]${RESET}"
prefix_frontend="${RED}[frontend]${RESET}"

# ── Aufräumen beim Beenden ─────────────────────────────────────────────────────
cleanup() {
  echo ""
  echo -e "${BOLD}Beende Backend und Frontend...${RESET}"
  # Alle Kind-Prozesse der aktuellen Prozessgruppe beenden
  kill 0
}
trap cleanup EXIT INT TERM

# ── Voraussetzungen prüfen ─────────────────────────────────────────────────────
if [ ! -f "$SCRIPT_DIR/mvnw" ]; then
  echo "Fehler: mvnw nicht gefunden. Bitte das Script aus dem Projektstamm ausführen." >&2
  exit 1
fi

if [ ! -d "$FRONTEND_DIR" ]; then
  echo "Fehler: Frontend-Verzeichnis nicht gefunden: $FRONTEND_DIR" >&2
  exit 1
fi

if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
  echo -e "${BOLD}node_modules fehlen – installiere Abhängigkeiten...${RESET}"
  npm install --prefix "$FRONTEND_DIR"
fi

# ── Backend starten ────────────────────────────────────────────────────────────
echo -e "${BOLD}Starte Backend...${RESET}"
(
  cd "$SCRIPT_DIR"
  ./mvnw clean spring-boot:run 2>&1 | while IFS= read -r line; do
    echo -e "$prefix_backend $line"
  done
) &

# ── Frontend starten ───────────────────────────────────────────────────────────
echo -e "${BOLD}Starte Frontend...${RESET}"
(
  cd "$FRONTEND_DIR"
  npm run dev 2>&1 | while IFS= read -r line; do
    echo -e "$prefix_frontend $line"
  done
) &

# ── Warten bis Ctrl+C ─────────────────────────────────────────────────────────
wait