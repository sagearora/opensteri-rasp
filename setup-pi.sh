#!/usr/bin/env bash
# setup-osteri.sh
#
# Minimal OSTERI setup for Raspberry Pi OS Bookworm:
#   - USB gadget: ECM (Linux/macOS) + RNDIS (Windows)  ✅ networking only (no mass storage)
#   - Static IP on usb0 via systemd-networkd (+ optional tiny DHCP server so host autoconfigures)
#   - Clones and runs your app under pm2:
#       https://github.com/sagearora/opensteri-rasp
#
# Usage:
#   sudo bash setup-osteri.sh
#
# After running:
#   1) Reboot the Pi.
#   2) Connect the Pi’s USB data port to the host computer.
#   3) Host should get an IP via DHCP on the USB link.
#   4) Your app will be managed by pm2 as "osteri-portal".
#      Check with:  sudo -u pi -H pm2 status

set -euo pipefail

# ---------- Constants / Hardcoded repo ----------
PI_USER="${SUDO_USER:-pi}"
PI_HOME="$(getent passwd "${PI_USER}" | cut -d: -f6)"
REPO_URL="https://github.com/sagearora/opensteri-rasp"
APP_DIR="/opt/opensteri-app"
PM2_NAME="osteri-portal"

# USB gadget networking
USB_IFACE="usb0"
USB_IP_CIDR="192.168.7.2/24"

# Enable a tiny DHCP server on usb0 so the host auto-configures its IP
ENABLE_DHCP="yes"            # yes|no
DHCP_POOL_OFFSET="10"        # first lease at .10
DHCP_POOL_SIZE="50"          # 50 leases
DNS_IP="192.168.7.2"         # advertise Pi as DNS (harmless; ignored if none)

# USB gadget identity (safe defaults)
VENDOR_ID="0x1d6b"           # Linux Foundation (dev/test ok)
PRODUCT_ID="0x0104"          # Multifunction Composite Gadget
SERIAL="OSTERI001"
MANUFACTURER="OSTERI"
PRODUCT_STR="OSTERI USB Networking"
GADGET_NAME="osteri"

BOOT_FW_DIR="/boot/firmware"
NETWORKD_DIR="/etc/systemd/network"

# ---------- Helpers ----------
need_root() {
  if [[ $EUID -ne 0 ]]; then
    echo "[ERROR] Run as root: sudo $0" >&2
    exit 1
  fi
}

append_once() {
  local line="$1" file="$2"
  grep -qsF "$line" "$file" || echo "$line" >> "$file"
}

jq_has() {
  # jq_has <.path> ; returns 0 if exists and non-empty
  sudo -u "${PI_USER}" -H bash -lc "cd '${APP_DIR}' && jq -e '$1 // empty' package.json >/dev/null 2>&1"
}

# ---------- Begin ----------
need_root
echo "==> Minimal OSTERI USB networking setup (Bookworm) for user ${PI_USER}"

echo "==> Installing base packages (no Debian npm to avoid conflicts)..."
# Clean conflicting Debian npm if present (NodeSource nodejs already bundles npm)
if dpkg -s npm >/dev/null 2>&1; then
  echo "   -> Purging Debian 'npm'..."
  apt-get purge -y npm || true
fi
dpkg -s nodejs-legacy >/dev/null 2>&1 && apt-get purge -y nodejs-legacy || true
apt-get -y -f install || true

apt-get update -y
apt-get install -y --no-install-recommends \
  nodejs git jq ca-certificates curl \
  network-manager \
  build-essential

# Ensure npm exists (NodeSource Node.js bundles npm)
if ! command -v npm >/dev/null 2>&1; then
  echo "[ERROR] npm not found; ensure Node.js (NodeSource) is installed."
  exit 1
fi

echo "==> Installing pm2 globally and enabling at boot for ${PI_USER}..."
npm install -g pm2
export HOME="${PI_HOME}"
export PM2_HOME="${PI_HOME}/.pm2"
sudo -u "${PI_USER}" -H pm2 startup systemd -u "${PI_USER}" --hp "${PI_HOME}" >/tmp/pm2_startup.txt || true
cat /tmp/pm2_startup.txt || true

echo "==> Enabling USB gadget prerequisites (dwc2, libcomposite)..."
append_once "dwc2" /etc/modules
append_once "libcomposite" /etc/modules
if [[ -f "${BOOT_FW_DIR}/config.txt" ]]; then
  grep -q "dtoverlay=dwc2" "${BOOT_FW_DIR}/config.txt" || echo "dtoverlay=dwc2,dr_mode=peripheral" >> "${BOOT_FW_DIR}/config.txt"
fi
if [[ -f "${BOOT_FW_DIR}/cmdline.txt" ]]; then
  grep -q "modules-load=dwc2" "${BOOT_FW_DIR}/cmdline.txt" || sed -i '1 s|$| modules-load=dwc2|' "${BOOT_FW_DIR}/cmdline.txt"
fi

echo "==> Installing USB gadget scripts (ECM + RNDIS only)..."
cat >/usr/local/sbin/usb-gadget-up.sh <<'EOS'
#!/usr/bin/env bash
set -euo pipefail
[[ -f /etc/default/osteri ]] && . /etc/default/osteri

GADGET_NAME="${GADGET_NAME:-osteri}"
VENDOR_ID="${VENDOR_ID:-0x1d6b}"
PRODUCT_ID="${PRODUCT_ID:-0x0104}"
SERIAL="${SERIAL:-OSTERI001}"
MANUFACTURER="${MANUFACTURER:-OSTERI}"
PRODUCT_STR="${PRODUCT_STR:-OSTERI USB Networking}"

modprobe libcomposite

cd /sys/kernel/config/usb_gadget
[[ -d "${GADGET_NAME}" ]] || mkdir "${GADGET_NAME}"
cd "${GADGET_NAME}"

echo "${VENDOR_ID}"  > idVendor
echo "${PRODUCT_ID}" > idProduct
echo 0x0200         > bcdUSB

mkdir -p strings/0x409
echo "${SERIAL}"       > strings/0x409/serialnumber
echo "${MANUFACTURER}" > strings/0x409/manufacturer
echo "${PRODUCT_STR}"  > strings/0x409/product

mkdir -p configs/c.1
echo 120 > configs/c.1/MaxPower

# Functions: ECM (Linux/macOS) and RNDIS (Windows)
mkdir -p functions/ecm.usb0
mkdir -p functions/rndis.usb0

# Link functions into config
ln -sf functions/ecm.usb0   configs/c.1/
ln -sf functions/rndis.usb0 configs/c.1/

# Bind to first available UDC
UDC=$(ls /sys/class/udc | head -n1)
echo "${UDC}" > UDC
EOS
chmod +x /usr/local/sbin/usb-gadget-up.sh

cat >/usr/local/sbin/usb-gadget-down.sh <<'EOS'
#!/usr/bin/env bash
set -euo pipefail
[[ -f /etc/default/osteri ]] && . /etc/default/osteri

GADGET_NAME="${GADGET_NAME:-osteri}"
GDIR="/sys/kernel/config/usb_gadget/${GADGET_NAME}"

if [[ -d "${GDIR}" ]]; then
  cd "${GDIR}"
  [[ -f UDC ]] && echo "" > UDC || true
  for l in configs/c.1/*.*; do [[ -L "$l" ]] && rm -f "$l" || true; done
  for f in functions/*; do [[ -d "$f" ]] && rmdir "$f" || true; done
  [[ -d strings/0x409 ]] && rmdir strings/0x409 || true
  [[ -d configs/c.1   ]] && rmdir configs/c.1   || true
  cd /sys/kernel/config/usb_gadget
  rmdir "${GADGET_NAME}" || true
fi
EOS
chmod +x /usr/local/sbin/usb-gadget-down.sh

echo "==> Creating usb-gadget.service..."
cat >/etc/systemd/system/usb-gadget.service <<EOF
[Unit]
Description=OSTERI USB Gadget (ECM+RNDIS)
After=network-pre.target sys-kernel-config.mount
Wants=sys-kernel-config.mount
DefaultDependencies=no
Before=multi-user.target

[Service]
Type=oneshot
RemainAfterExit=yes
Environment=GADGET_NAME=${GADGET_NAME}
Environment=VENDOR_ID=${VENDOR_ID}
Environment=PRODUCT_ID=${PRODUCT_ID}
Environment=SERIAL=${SERIAL}
Environment=MANUFACTURER=${MANUFACTURER}
Environment=PRODUCT_STR=${PRODUCT_STR}
ExecStart=/usr/local/sbin/usb-gadget-up.sh
ExecStop=/usr/local/sbin/usb-gadget-down.sh

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable usb-gadget.service

echo "==> Configuring systemd-networkd for ${USB_IFACE} (${USB_IP_CIDR}) ..."
systemctl enable systemd-networkd --now
# systemd-resolved is NOT required for this static IP/DHCP-on-usb0 flow.

mkdir -p "${NETWORKD_DIR}"

DHCP_BLOCK=""
if [[ "${ENABLE_DHCP}" == "yes" ]]; then
  DHCP_BLOCK=$'\nDHCPServer=yes\n\n[DHCPServer]\nPoolOffset='"${DHCP_POOL_OFFSET}"$'\nPoolSize='"${DHCP_POOL_SIZE}"$'\nDNS='"${DNS_IP}"$'\n'
fi

cat >"${NETWORKD_DIR}/10-${USB_IFACE}.network" <<EOF
[Match]
Name=${USB_IFACE}

[Network]
Address=${USB_IP_CIDR}${DHCP_BLOCK}
EOF

systemctl restart systemd-networkd

echo "==> Writing /etc/default/osteri..."
cat >/etc/default/osteri <<EOF
GADGET_NAME=${GADGET_NAME}
VENDOR_ID=${VENDOR_ID}
PRODUCT_ID=${PRODUCT_ID}
SERIAL=${SERIAL}
MANUFACTURER=${MANUFACTURER}
PRODUCT_STR=${PRODUCT_STR}
EOF

# ---------- Clone and run your app under pm2 (with correct ownership) ----------
echo "==> Preparing application directory and permissions..."
# Ensure parent exists and is accessible
install -d -o "${PI_USER}" -g "${PI_USER}" -m 0755 "$(dirname "${APP_DIR}")"

# If APP_DIR exists but is NOT a git repo, back it up (avoid clone-into-existing + perms issues)
if [[ -d "${APP_DIR}" && ! -d "${APP_DIR}/.git" ]]; then
  echo "   -> ${APP_DIR} exists and is not a git repo; backing up..."
  ts="$(date +%s)"
  mv "${APP_DIR}" "${APP_DIR}.${ts}.bak"
fi

# Clone fresh if repo not present
if [[ ! -d "${APP_DIR}/.git" ]]; then
  echo "==> Cloning app repo..."
  sudo -u "${PI_USER}" -H git clone "${REPO_URL}" "${APP_DIR}"
fi

# Ensure ownership for subsequent operations
chown -R "${PI_USER}:${PI_USER}" "${APP_DIR}"

echo "==> Installing dependencies..."
if [[ -f "${APP_DIR}/package-lock.json" ]]; then
  sudo -u "${PI_USER}" -H bash -lc "cd '${APP_DIR}' && npm ci"
else
  sudo -u "${PI_USER}" -H bash -lc "cd '${APP_DIR}' && npm install"
fi

# Optional build if script exists
if jq_has '.scripts.build?'; then
  echo "==> Running build script..."
  sudo -u "${PI_USER}" -H bash -lc "cd '${APP_DIR}' && npm run build"
fi

echo "==> Starting app with pm2 (${PM2_NAME})..."
# Stop existing instance if present
sudo -u "${PI_USER}" -H pm2 delete "${PM2_NAME}" >/dev/null 2>&1 || true

if jq_has '.scripts.start?'; then
  sudo -u "${PI_USER}" -H pm2 start npm --name "${PM2_NAME}" --cwd "${APP_DIR}" -- start
elif sudo -u "${PI_USER}" -H test -f "${APP_DIR}/server.js"; then
  sudo -u "${PI_USER}" -H pm2 start "server.js" --name "${PM2_NAME}" --cwd "${APP_DIR}"
elif sudo -u "${PI_USER}" -H test -f "${APP_DIR}/index.js"; then
  sudo -u "${PI_USER}" -H pm2 start "index.js" --name "${PM2_NAME}" --cwd "${APP_DIR}"
else
  echo "[ERROR] Could not determine how to start the app."
  echo "        Please add a \"start\" script or a \"main\" entry to package.json."
  exit 1
fi

sudo -u "${PI_USER}" -H pm2 save

# ---------- Wrap up ----------
echo
echo "==> DONE."
echo "NEXT STEPS:"
echo "  1) Reboot the Pi: sudo reboot"
echo "  2) Connect the USB data port to the host."
echo "  3) Host should receive an IP via DHCP on the USB link."
echo "  4) App status: sudo -u ${PI_USER} -H pm2 status"
echo "     Logs:       sudo -u ${PI_USER} -H pm2 logs ${PM2_NAME} --lines 200"
echo
echo "If DHCP was disabled, set the host USB interface manually to 192.168.7.10/24."
