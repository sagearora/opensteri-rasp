#!/usr/bin/env bash
# setup_opensteri_otg.sh
# One-time setup for Raspberry Pi Zero 2 W:
# - True OTG role switching (device or host)
# - USB Ethernet gadget when connected to a computer
# - DHCP + mDNS on usb0
# - Dockerized Node server published on http://hostname.local (port 80)
# Tested on Raspberry Pi OS (Bookworm). Should also work on Bullseye with dhcpcd.

set -euo pipefail

### ----------- Configurable Variables -----------
HOSTNAME="pi"
GADGET_IP="10.55.0.1"
GADGET_CIDR="10.55.0.1/24"
DHCP_RANGE_START="10.55.0.10"
DHCP_RANGE_END="10.55.0.50"
DHCP_LEASE="12h"

REPO_URL="https://github.com/sagearora/opensteri-rasp.git"
APP_DIR="/opt/opensteri-rasp"
CONTAINER_NAME="opensteri"
CONTAINER_PORT="3000"          # app’s internal port (change if your app uses something else)
HOST_PORT="80"                 # publish as http://hostname.local
DOCKER_IMAGE_NAME="opensteri-rasp:latest"

USB_VENDOR_ID="0x1d6b"         # Linux Foundation (safe default for testing)
USB_PRODUCT_ID="0x0104"        # Multifunction Composite Gadget
USB_SERIAL="0001"
USB_MANUF="OpenSteri"
USB_PRODUCT="OpenSteri USB-Ether"

### ----------- Root check -----------
if [[ $EUID -ne 0 ]]; then
  echo "Please run as root (sudo)."
  exit 1
fi

echo "[1/10] Updating APT and installing packages..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y \
  git dnsmasq avahi-daemon avahi-utils \
  libnss-mdns \
  usbutils \
  jq

# Docker (prefer distro docker.io for simplicity)
if ! command -v docker >/dev/null 2>&1; then
  apt-get install -y docker.io
  systemctl enable --now docker
fi
usermod -aG docker pi || true

echo "[2/10] Set hostname and enable mDNS..."
CURRENT_HOSTNAME="$(cat /etc/hostname | tr -d '[:space:]')"
if [[ "$CURRENT_HOSTNAME" != "$HOSTNAME" ]]; then
  echo "$HOSTNAME" > /etc/hostname
  sed -i "s/127.0.1.1.*/127.0.1.1\t$HOSTNAME/g" /etc/hosts || true
  echo "Hostname updated to $HOSTNAME (will fully apply after reboot)."
fi
systemctl enable --now avahi-daemon

BOOT_CFG="/boot/firmware/config.txt"
if [[ ! -f "$BOOT_CFG" ]]; then
  # Older releases used /boot/config.txt
  BOOT_CFG="/boot/config.txt"
fi

echo "[3/10] Enable dwc2 OTG overlay (role switching)..."
if ! grep -q "^dtoverlay=dwc2" "$BOOT_CFG"; then
  echo "dtoverlay=dwc2,dr_mode=otg" >> "$BOOT_CFG"
else
  # ensure dr_mode=otg present
  sed -i 's/^dtoverlay=dwc2.*/dtoverlay=dwc2,dr_mode=otg/' "$BOOT_CFG"
fi

echo "[4/10] Configure usb0 static IP via dhcpcd..."
DHCPCD="/etc/dhcpcd.conf"
if ! grep -q "interface usb0" "$DHCPCD"; then
  cat >> "$DHCPCD" <<EOF

# --- USB Gadget interface ---
interface usb0
static ip_address=${GADGET_CIDR}
nolink
noipv6
nohook wpa_supplicant
EOF
fi
systemctl enable --now dhcpcd

echo "[5/10] Configure dnsmasq to serve DHCP on usb0..."
DNSMASQ_CFG="/etc/dnsmasq.d/usb0.conf"
cat > "$DNSMASQ_CFG" <<EOF
interface=usb0
bind-interfaces
dhcp-range=${DHCP_RANGE_START},${DHCP_RANGE_END},${DHCP_LEASE}
domain-needed
bogus-priv
log-queries
log-dhcp
EOF
systemctl enable --now dnsmasq

echo "[6/10] Enable IPv4 forwarding..."
SYSCTL_CFG="/etc/sysctl.d/99-opensteri-usb.conf"
cat > "$SYSCTL_CFG" <<EOF
net.ipv4.ip_forward=1
EOF
sysctl -p "$SYSCTL_CFG" >/dev/null || true

echo "[7/10] Create USB gadget configfs script + service..."
GADGET_SCRIPT="/usr/local/sbin/setup_usb_gadget.sh"
cat > "$GADGET_SCRIPT" <<'EOS'
#!/usr/bin/env bash
set -euo pipefail

# This script creates a composite USB Ethernet gadget supporting ECM (macOS/Linux) and RNDIS (Windows).

GADGET_DIR="/sys/kernel/config/usb_gadget/opensteri"
USB_VENDOR_ID="${USB_VENDOR_ID:-0x1d6b}"
USB_PRODUCT_ID="${USB_PRODUCT_ID:-0x0104}"
USB_SERIAL="${USB_SERIAL:-0001}"
USB_MANUF="${USB_MANUF:-OpenSteri}"
USB_PRODUCT="${USB_PRODUCT:-OpenSteri USB-Ether}"

# Best-effort cleanup if previously created
cleanup_gadget() {
  if [[ -d "$GADGET_DIR" ]]; then
    # Unbind
    if [[ -L "$GADGET_DIR/UDC" ]]; then
      echo "" > "$GADGET_DIR/UDC" || true
    fi
    # Remove functions and configs
    find "$GADGET_DIR/configs" -maxdepth 1 -mindepth 1 -type d -exec bash -c 'conf="{}"; for f in "$conf"/functions/*; do [[ -e "$f" ]] && rm -f "$f"; done' \;
    find "$GADGET_DIR/functions" -maxdepth 1 -mindepth 1 -type d -exec bash -c 'func="{}"; [[ -d "$func" ]] && rmdir "$func" || true' \;
    # Remove configs, strings, etc.
    rm -rf "$GADGET_DIR/configs"/* || true
    rm -rf "$GADGET_DIR/strings"/* || true
    rmdir "$GADGET_DIR" || true
  fi
}
trap cleanup_gadget EXIT

modprobe libcomposite
modprobe usb_f_ecm
modprobe usb_f_rndis

mkdir -p "$GADGET_DIR"
echo "$USB_VENDOR_ID" > "$GADGET_DIR/idVendor"
echo "$USB_PRODUCT_ID" > "$GADGET_DIR/idProduct"

mkdir -p "$GADGET_DIR/strings/0x409"
echo "$USB_SERIAL"    > "$GADGET_DIR/strings/0x409/serialnumber"
echo "$USB_MANUF"     > "$GADGET_DIR/strings/0x409/manufacturer"
echo "$USB_PRODUCT"   > "$GADGET_DIR/strings/0x409/product"

mkdir -p "$GADGET_DIR/configs/c.1/strings/0x409"
echo "ECM+RNDIS" > "$GADGET_DIR/configs/c.1/strings/0x409/configuration"
echo 120 > "$GADGET_DIR/configs/c.1/MaxPower"

# ECM (usb0 appears)
mkdir -p "$GADGET_DIR/functions/ecm.usb0"
echo "02:22:33:44:55:66" > "$GADGET_DIR/functions/ecm.usb0/dev_addr"
echo "02:11:22:33:44:55" > "$GADGET_DIR/functions/ecm.usb0/host_addr"

# RNDIS (for Windows)
mkdir -p "$GADGET_DIR/functions/rndis.usb0"
echo "02:22:33:44:55:77" > "$GADGET_DIR/functions/rndis.usb0/dev_addr"
echo "02:11:22:33:44:66" > "$GADGET_DIR/functions/rndis.usb0/host_addr"
# Windows compatibility flags
echo 1 > "$GADGET_DIR/os_desc/use"
echo 0xcd > "$GADGET_DIR/os_desc/b_vendor_code"
echo "MSFT100" > "$GADGET_DIR/os_desc/qw_sign"

ln -s "$GADGET_DIR/functions/ecm.usb0"   "$GADGET_DIR/configs/c.1/"
ln -s "$GADGET_DIR/functions/rndis.usb0" "$GADGET_DIR/configs/c.1/"

# Bind to UDC (choose first available)
UDC=$(ls /sys/class/udc | head -n1 || true)
if [[ -z "$UDC" ]]; then
  echo "No UDC found; is dwc2 enabled and cable connected?" >&2
  exit 0
fi
echo "$UDC" > "$GADGET_DIR/UDC"

# Keep gadget in place after script exits (remove EXIT cleanup once bound)
trap - EXIT
exit 0
EOS
chmod +x "$GADGET_SCRIPT"

GADGET_SERVICE="/etc/systemd/system/usb-gadget.service"
cat > "$GADGET_SERVICE" <<EOF
[Unit]
Description=USB ECM/RNDIS Gadget (OTG)
After=local-fs.target sys-kernel-config.mount
Wants=sys-kernel-config.mount

[Service]
Type=oneshot
Environment=USB_VENDOR_ID=${USB_VENDOR_ID}
Environment=USB_PRODUCT_ID=${USB_PRODUCT_ID}
Environment=USB_SERIAL=${USB_SERIAL}
Environment=USB_MANUF=${USB_MANUF}
Environment=USB_PRODUCT=${USB_PRODUCT}
ExecStart=${GADGET_SCRIPT}
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable usb-gadget.service

echo "[8/10] Clone/build app and create compose + service..."
mkdir -p "$APP_DIR"
if [[ ! -d "$APP_DIR/.git" ]]; then
  git clone "$REPO_URL" "$APP_DIR"
else
  git -C "$APP_DIR" fetch --all --prune
  git -C "$APP_DIR" checkout -q .
  git -C "$APP_DIR" pull --rebase
fi

# Create a minimal docker-compose that builds and maps host:80 -> container:3000
cat > "$APP_DIR/docker-compose.yml" <<EOF
services:
  app:
    container_name: ${CONTAINER_NAME}
    build:
      context: .
    ports:
      - "${HOST_PORT}:${CONTAINER_PORT}"
    restart: unless-stopped
EOF

# Build image once
docker compose -f "$APP_DIR/docker-compose.yml" build

# Systemd unit to keep it running
APP_SERVICE="/etc/systemd/system/opensteri.service"
cat > "$APP_SERVICE" <<EOF
[Unit]
Description=OpenSteri Node app via Docker
Requires=docker.service
After=docker.service network-online.target usb-gadget.service

[Service]
Type=oneshot
WorkingDirectory=${APP_DIR}
ExecStart=/usr/bin/docker compose up -d
ExecStop=/usr/bin/docker compose down
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable opensteri.service

echo "[9/10] Pre-create mDNS service hint (optional)..."
# Avahi will already advertise the host. This .service file is optional sugar.
AVAHI_SVC="/etc/avahi/services/opensteri-http.service"
cat > "$AVAHI_SVC" <<EOF
<?xml version="1.0" standalone='no'?><!--*-nxml-*-->
<!DOCTYPE service-group SYSTEM "avahi-service.dtd">
<service-group>
  <name replace-wildcards="yes">${HOSTNAME} Web</name>
  <service>
    <type>_http._tcp</type>
    <port>${HOST_PORT}</port>
  </service>
</service-group>
EOF
systemctl restart avahi-daemon

echo "[10/10] Done. A reboot is recommended to activate OTG kernel overlay."
echo "Reboot now? [y/N]"
read -r yn
if [[ "\${yn,,}" == "y" ]]; then
  reboot
else
  echo "Please reboot later to finalize OTG role-switching."
fi
