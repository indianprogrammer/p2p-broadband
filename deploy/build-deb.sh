#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# P2P Broadband — build an installable Ubuntu .deb package
#
# Produces: dist/p2p-broadband_<version>_all.deb
# On target:  sudo dpkg -i dist/p2p-broadband_*.deb   (or use install.sh --deb)
# The package ships the source; postinst runs npm ci + next build and enables
# the auto-start systemd service, so the target needs network + root.
# =============================================================================

DEBIAN_SCRIPTS="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/debian" && pwd)"
DEPLOY_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd -- "${DEPLOY_DIR}/.." && pwd)"
OUT_DIR="${OUT_DIR:-${REPO_ROOT}/dist}"

command -v dpkg-deb >/dev/null 2>&1 || { echo "ERROR: dpkg-deb not found" >&2; exit 1; }

VER="$(node -p 'require(process.argv[1]).version' "${REPO_ROOT}/package.json" 2>/dev/null || echo "0.1.0")"
PKG_NAME="p2p-broadband"
DEB_VERSION="${VER}-1"
DEB="${OUT_DIR}/${PKG_NAME}_${DEB_VERSION}_all.deb"

STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

# --- app files (source, enough to build) -----------------------------------
mkdir -p "${STAGE}/opt/${PKG_NAME}"
tar -C "${REPO_ROOT}" --exclude="./.git" --exclude="./node_modules" \
  --exclude="./.next" --exclude="./.eslintcache" --exclude="./dist" \
  --exclude="./deploy" --exclude="*.log" -cf - . | \
  tar -C "${STAGE}/opt/${PKG_NAME}" -xf -

# --- systemd unit -----------------------------------------------------------
mkdir -p "${STAGE}/etc/systemd/system"
install -m 0644 "${DEPLOY_DIR}/${PKG_NAME}.service" \
  "${STAGE}/etc/systemd/system/${PKG_NAME}.service"

# --- package metadata + maintainer scripts ----------------------------------
mkdir -p "${STAGE}/DEBIAN"
cat > "${STAGE}/DEBIAN/control" <<EOF
Package: ${PKG_NAME}
Version: ${DEB_VERSION}
Section: web
Priority: optional
Architecture: all
Depends: systemd, curl, ca-certificates, apt-transport-https, build-essential
Maintainer: P2P Broadband <p2infra@gmail.com>
Description: P2P Broadband website
 Static Next.js website for P2P Broadband, installed as an
 auto-starting systemd service (default port 3000).
EOF

cat > "${STAGE}/DEBIAN/conffiles" <<EOF
/etc/systemd/system/${PKG_NAME}.service
EOF

for script in postinst prerm postrm; do
  install -m 0755 "${DEBIAN_SCRIPTS}/${script}" "${STAGE}/DEBIAN/${script}"
done

# --- build ------------------------------------------------------------------
mkdir -p "${OUT_DIR}"
if dpkg-deb --root-owner-group --build "${STAGE}" "${DEB}" >/dev/null 2>&1; then
  :
else
  dpkg-deb --build "${STAGE}" "${DEB}" >/dev/null
fi

echo "Built: ${DEB}"
echo "Install: sudo dpkg -i ${DEB}  (fix deps: sudo apt-get -y -f install)"
echo "Or:      sudo ${DEPLOY_DIR}/install.sh --deb ${DEB}"
echo "${DEB}"