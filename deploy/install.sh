#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# P2P Broadband — Ubuntu installer
#
# Installs the website from the current repository (or from a prebuilt .deb),
# creates an auto-started systemd service, and opens the firewall.
#
# Usage:
#   sudo ./install.sh                 install from this repo (port 3000)
#   sudo ./install.sh --port 8080     install on a custom port
#   sudo ./install.sh --deb ./dist/p2p-broadband_*.deb
#   sudo ./install.sh --make-deb      build the .deb, then install it
#   sudo ./install.sh --uninstall     remove the site + service
#
# On the target machine that only has this script, first grab the repo:
#   git clone https://github.com/indianprogrammer/p2p-broadband.git && cd p2p-broadband
# =============================================================================

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="/opt/p2p-broadband"
ETC_DIR="/etc/p2p-broadband"
SERVICE_NAME="p2p-broadband"
SERVICE_UNIT="/etc/systemd/system/${SERVICE_NAME}.service"
SERVICE_FILE="${SCRIPT_DIR}/${SERVICE_NAME}.service"
APP_USER="p2p"
NODE_MAJOR="${NODE_MAJOR:-22}"

P2P_PORT="${P2P_PORT:-3000}"
P2P_HOST="${P2P_HOST:-0.0.0.0}"

MODE="source"
DEB_FILE=""

usage() {
  sed -n '5,18p' "$0" | sed 's/^# //'
}

die() {
  echo "  ERROR: $*" >&2
  exit 1
}

require_root() {
  if [[ "$(id -u)" -ne 0 ]]; then
    if command -v sudo >/dev/null 2>&1; then
      echo "Re-running with sudo..."
      exec sudo bash "$0" "$@"
    fi
    die "Please run as root (sudo ./install.sh)"
  fi
}

ensure_base_packages() {
  echo "  [1/6] Ensuring system packages..."
  export DEBIAN_FRONTEND=noninteractive
  apt-get update -qq
  apt-get install -y -qq \
    systemd curl ca-certificates apt-transport-https \
    build-essential rsync >/dev/null
}

ensure_node() {
  echo "  [2/6] Checking Node.js..."
  if command -v node >/dev/null 2>&1 && \
     node -e 'process.exit(process.versions.node.split(".").map(p=>+p).reduce((a,b,i)=>a*100+b)>=2009?0:1)' 2>/dev/null; then
    echo "       Node $(node -v) already installed."
    return 0
  fi
  echo "       Node.js >= 20.9 required — installing Node ${NODE_MAJOR}.x..."
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  apt-get install -y -qq nodejs npm >/dev/null
  command -v node >/dev/null 2>&1 || die "Node.js install failed"
  echo "       Node $(node -v) installed."
}

create_service_user() {
  echo "  [3/6] Creating system user '${APP_USER}'..."
  if ! getent group "${APP_USER}" >/dev/null; then
    groupadd --system "${APP_USER}"
  fi
  if ! id "${APP_USER}" >/dev/null 2>&1; then
    useradd --system --gid "${APP_USER}" --home-dir "${APP_DIR}" \
      --shell /usr/sbin/nologin "${APP_USER}"
  fi
  mkdir -p "${APP_DIR}"
  chown -R "${APP_USER}:${APP_USER}" "${APP_DIR}"
}

install_systemd_service() {
  echo "  [5/6] Installing auto-start systemd service..."
  mkdir -p "${ETC_DIR}"
  if [[ -f "${ETC_DIR}/env" ]]; then
    echo "       Keeping existing ${ETC_DIR}/env"
  else
    printf 'P2P_HOST=%s\nP2P_PORT=%s\n' "${P2P_HOST}" "${P2P_PORT}" > "${ETC_DIR}/env"
  fi
  install -m 0644 "${SERVICE_FILE}" "${SERVICE_UNIT}"
  systemctl daemon-reload
  systemctl enable "${SERVICE_NAME}" >/dev/null 2>&1 || true
  systemctl restart "${SERVICE_NAME}"
}

open_firewall() {
  local port
  port="$(sed -n 's/^P2P_PORT=//p' "${ETC_DIR}/env")"
  port="${port:-3000}"
  if command -v ufw >/dev/null 2>&1 && ufw status 2>/dev/null | grep -q "Status: active"; then
    echo "  [6/6] Opening firewall port ${port}/tcp..."
    ufw allow "${port}/tcp" >/dev/null
  fi
}

build_from_source() {
  echo "  [4/6] Building website from source in  ${APP_DIR}"
  # Ship the repo (current state) into the app dir.
  rsync -a --delete \
    --exclude ".git" \
    --exclude "node_modules" \
    --exclude ".next" \
    --exclude ".eslintcache" \
    --exclude "dist" \
    --exclude "*.log" \
    "${SCRIPT_DIR}/../" "${APP_DIR}/"

  runuser -u "${APP_USER}" -- bash -lc "cd '${APP_DIR}' && npm ci && npm run build"
  chown -R "${APP_USER}:${APP_USER}" "${APP_DIR}"
}

install_deb() {
  [[ -f "${DEB_FILE}" ]] || die "Deb package not found: ${DEB_FILE}"
  echo "  [3/6] Installing package  ${DEB_FILE}"
  dpkg -i "${DEB_FILE}" || {
    export DEBIAN_FRONTEND=noninteractive
    apt-get -y -f install
  }
  systemctl restart "${SERVICE_NAME}" || true
}

uninstall() {
  echo "Removing service, files and user..."
  systemctl --quiet stop "${SERVICE_NAME}" || true
  systemctl --quiet disable "${SERVICE_NAME}" || true
  rm -f "${SERVICE_UNIT}"
  systemctl daemon-reload || true
  rm -rf "${APP_DIR}" "${ETC_DIR}"
  userdel -r "${APP_USER}" >/dev/null 2>&1 || true
  groupdel "${APP_USER}" >/dev/null 2>&1 || true
  echo "Done. (If installed from a .deb, also run: apt purge p2p-broadband)"
  exit 0
}

finish() {
  local port
  port="$(sed -n 's/^P2P_PORT=//p' "${ETC_DIR}/env")"
  port="${port:-3000}"
  echo
  echo "  All done!"
  echo "  Site:        http://$(hostname -I 2>/dev/null | awk '{print $1}')${port:+:${port}}"
  echo "  Service:     systemctl status ${SERVICE_NAME}"
  echo "  Logs:        journalctl -u ${SERVICE_NAME} -f"
  echo "  Change port: edit ${ETC_DIR}/env then systemctl restart ${SERVICE_NAME}"
  echo "  Uninstall:   sudo ${BASH_SOURCE[0]} --uninstall"
}

main() {
  for arg in "$@"; do
    if [[ "$arg" == "--help" || "$arg" == "-h" ]]; then
      usage
      exit 0
    fi
  done

  require_root "$@"

  while [[ $# -gt 0 ]]; do
    case "$1" in
      --port) P2P_PORT="${2:?--port needs a value}"; shift 2 ;;
      --deb) MODE="deb"; DEB_FILE="${2:?--deb needs a path}"; shift 2 ;;
      --make-deb) MODE="deb"; DEB_FILE="$(bash "${SCRIPT_DIR}/build-deb.sh")"; shift ;;
      --uninstall) uninstall ;;
      --help|-h) usage; exit 0 ;;
      *) die "Unknown argument: $1";;
    esac
  done

  echo
  echo "  Installing P2P Broadband (${MODE})"
  echo

  if [[ "${MODE}" == "deb" ]]; then
    ensure_base_packages
    ensure_node
    install_deb
    open_firewall
    finish
    return
  fi

  ensure_base_packages
  ensure_node
  create_service_user
  build_from_source
  install_systemd_service
  open_firewall
  finish
}

main "$@"