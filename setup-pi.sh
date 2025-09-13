#!/usr/bin/env bash
# setup_osteri_otg.sh
# Raspberry Pi Zero 2 W setup for USB OTG networking + Dockerized OpenSteri app
# - Hostname fixed: "osteri"
# - USB Ethernet gadget (ECM + RNDIS) when plugged into a computer
# - DHCP + mDNS (http://osteri.local)
# - Installs Docker; prefers Docker's official repo. If compose plugin missing, installs standalone docker-compose.
# - Clones & runs https://github.com/sagearora/opensteri-rasp with host:80 -> container:3001

set -euo pipefail

### ----------- Fixed Config -----------
HOSTNAME="osteri"

# usb0 network
GADGET_IP_CIDR="10.55.0.1/24"
DHCP_RANGE_START="10.55.0.10"
DHCP_RANGE_END="10.55.0.50"
DHCP_LEASE="12h"

# app
REPO_URL="https://github.com/sagearora/opensteri-rasp.git"
APP_DIR="/opt/opensteri-rasp"
CONTAINER_NAME="opensteri"
CONTAINER_PORT="3001"  # app listens on 3001 in the repo
HOST_PORT="80"         # exposed as http://osteri.local

# USB gadget identity
USB_VENDOR_ID="0x1d6b"
USB_PRODUCT_ID="0x0104"
USB_SERIAL="0001"
USB_MANUF="OpenSteri"
USB_PRODUCT="OpenSteri USB-Ether"

# Standalone docker-compose fallback version
DC_VERSION="v2.29.2"

log() { echo -e "\n[OSTERI-SETUP] $*"; }

require_root() {
  if [[ $EUID -ne 0 ]]; then
    echo "Please run as root: sudo bash $0"
    exit 1
  fi
}

apt_install_base() {
  log "1) APT base packages"
  export DEBIAN_FRONTEND=noninteractive
  apt-get update -y
  apt-get install -y \
    git dnsmasq avahi-daemon avahi-utils libnss-mdns usbutils jq \
    ca-certificates curl gnupg lsb-release
}

set_hostname_mdns() {
  log "2) Set hostname -> ${HOSTNAME} + enable mDNS"
  echo "$HOSTNAME" > /etc/hostname
  if grep -q "^127\.0\.1\.1" /etc/hosts; then
    sed -i "s/^\(127\.0\.1\.1\).*/\1\t$HOSTNAME/" /etc/hosts || true
  else
    echo -e "127.0.1.1\t$HOSTNAME" >> /etc/hosts
  fi
  systemctl enable --now avahi-daemon
}

enable_dwc2_otg() {
  log "3) Enable dwc2 OTG overlay (role switching)"
  local BOOT_CFG="/boot/firmware/config.txt"
  [[ -f "$BOOT_CFG" ]] || BOOT_CFG="/boot/config.txt"
  if ! grep -q "^dtoverlay=dwc2" "$BOOT_CFG"; then
    echo "dtoverlay=dwc2,dr_mode=otg" >> "$BOOT_CFG"
  else
    sed -i 's/^dtoverlay=dwc2.*/dtoverlay=dwc2,dr_mode=otg/' "$BOOT_CFG"
  fi
}

config_usb0_network() {
  log "4) Configure usb0 static IP via dhcpcd"
  local DHCPCD="/etc/dhcpcd.conf"
  if ! grep -q "^interface usb0" "$DHCPCD"; then
    cat >> "$DHCPCD" <<EOF

# USB Gadget
interface usb0
static ip_address=${GADGET_IP_CIDR}
nolink
noipv6
nohook wpa_supplicant
EOF
  fi
  systemctl enable --now dhcpcd || true

  log "5) dnsmasq DHCP on usb0"
  local DNSMASQ_CFG="/etc/dnsmasq.d/usb0.conf"
  cat > "$DNSMASQ_CFG" <<EOF
interface=usb0
bind-interfaces
dhcp-range=${DHCP_RANGE_START},${DHCP_RANGE_END},${DHCP_LEASE}
domain-needed
bogus-priv
log-dhcp
EOF
  systemctl enable --now dnsmasq
}

create_usb_gadget_service() {
  log "6) Create USB gadget (ECM+RNDIS) script + service"
  local GADGET_SCRIPT="/usr/local/sbin/setup_usb_gadget.sh"
  cat > "$GADGET_SCRIPT" <<'EOS'
#!/usr/bin/env bash
set -euo pipefail
GADGET_DIR="/sys/kernel/config/usb_gadget/osteri"
USB_VENDOR_ID="${USB_VENDOR_ID:-0x1d6b}"
USB_PRODUCT_ID="${USB_PRODUCT_ID:-0x0104}"
USB_SERIAL="${USB_SERIAL:-0001}"
USB_MANUF="${USB_MANUF:-OpenSteri}"
USB_PRODUCT="${USB_PRODUCT:-OpenSteri USB-Ether}"

modprobe libcomposite
modprobe usb_f_ecm
modprobe usb_f_rndis

# Clean any prior gadget
if [[ -d "$GADGET_DIR" ]]; then
  echo "" > "$GADGET_DIR/UDC" 2>/dev/null || true
  find "$GADGET_DIR/configs" -type l -exec rm -f {} + 2>/dev/null || true
  rm -rf "$GADGET_DIR/functions"/* 2>/dev/null || true
  rm -rf "$GADGET_DIR" 2>/dev/null || true
fi

mkdir -p "$GADGET_DIR"
echo "$USB_VENDOR_ID" > "$GADGET_DIR/idVendor"
echo "$USB_PRODUCT_ID" > "$GADGET_DIR/idProduct"

mkdir -p "$GADGET_DIR/strings/0x409"
echo "$USB_SERIAL"  > "$GADGET_DIR/strings/0x409/serialnumber"
echo "$USB_MANUF"   > "$GADGET_DIR/strings/0x409/manufacturer"
echo "$USB_PRODUCT" > "$GADGET_DIR/strings/0x409/product"

mkdir -p "$GADGET_DIR/configs/c.1/strings/0x409"
echo "ECM+RNDIS" > "$GADGET_DIR/configs/c.1/strings/0x409/configuration"
echo 120 > "$GADGET_DIR/configs/c.1/MaxPower"

mkdir -p "$GADGET_DIR/functions/ecm.usb0"
echo "02:22:33:44:55:66" > "$GADGET_DIR/functions/ecm.usb0/dev_addr"
echo "02:11:22:33:44:55" > "$GADGET_DIR/functions/ecm.usb0/host_addr"

mkdir -p "$GADGET_DIR/functions/rndis.usb0"
echo "02:22:33:44:55:77" > "$GADGET_DIR/functions/rndis.usb0/dev_addr"
echo "02:11:22:33:44:66" > "$GADGET_DIR/functions/rndis.usb0/host_addr"
echo 1 > "$GADGET_DIR/os_desc/use"
echo 0xcd > "$GADGET_DIR/os_desc/b_vendor_code"
echo "MSFT100" > "$GADGET_DIR/os_desc/qw_sign"

ln -s "$GADGET_DIR/functions/ecm.usb0"   "$GADGET_DIR/configs/c.1/"
ln -s "$GADGET_DIR/functions/rndis.usb0" "$GADGET_DIR/configs/c.1/"

UDC=$(ls /sys/class/udc 2>/dev/null | head -n1 || true)
[[ -n "$UDC" ]] && echo "$UDC" > "$GADGET_DIR/UDC"
EOS
  chmod +x "$GADGET_SCRIPT"

  cat > /etc/systemd/system/usb-gadget.service <<EOF
[Unit]
Description=USB ECM/RNDIS Gadget
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
}

ensure_docker_and_compose() {
  log "7) Install Docker (prefer Docker's official repo) & ensure Compose"

  # Remove legacy docker if present to avoid conflicts
  apt-get remove -y docker docker-engine docker.io containerd runc || true

  # Add Docker's official repo
  mkdir -p /etc/apt/keyrings
  if [[ ! -f /etc/apt/keyrings/docker.gpg ]]; then
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  fi
  echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
https://download.docker.com/linux/debian $(lsb_release -cs) stable" \
    > /etc/apt/sources.list.d/docker.list

  apt-get update -y
  # Try modern packages including compose plugin
  apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin || true
  systemctl enable --now docker

  # Compose v2 plugin attempt
  if apt-cache policy docker-compose-plugin | grep -q Candidate; then
    apt-get install -y docker-compose-plugin || true
  fi

  # Check availability of 'docker compose'
  if docker compose version >/dev/null 2>&1; then
    echo "v2" > /usr/local/share/compose_mode
  else
    # Fallback: install standalone docker-compose
    if [[ ! -x /usr/local/bin/docker-compose ]]; then
      curl -L "https://github.com/docker/compose/releases/download/${DC_VERSION}/docker-compose-$(uname -s)-$(uname -m)" \
        -o /usr/local/bin/docker-compose
      chmod +x /usr/local/bin/docker-compose
    fi
    if /usr/local/bin/docker-compose version >/dev/null 2>&1; then
      echo "v1" > /usr/local/share/compose_mode
    else
      echo "ERROR: Could not install docker compose (plugin or standalone)!" >&2
      exit 1
    fi
  fi

  # Add 'pi' user to docker group if it exists
  id -u pi &>/dev/null && usermod -aG docker pi || true

  # Create a wrapper so systemd can call the right compose command consistently
  cat > /usr/local/sbin/compose.sh <<'EOS'
#!/usr/bin/env bash
set -euo pipefail
MODE_FILE="/usr/local/share/compose_mode"
MODE="v2"
[[ -f "$MODE_FILE" ]] && MODE="$(cat "$MODE_FILE" 2>/dev/null || echo v2)"
if [[ "$MODE" == "v2" ]]; then
  exec docker compose "$@"
else
  exec docker-compose "$@"
fi
EOS
  chmod +x /usr/local/sbin/compose.sh
}

clone_repo_and_permissions() {
  log "8) Clone/pull repo & run host USB permission helper if present"
  mkdir -p "$APP_DIR"
  if [[ ! -d "$APP_DIR/.git" ]]; then
    git clone "$REPO_URL" "$APP_DIR"
  else
    git -C "$APP_DIR" fetch --all --prune
    git -C "$APP_DIR" pull --rebase
  fi
  if [[ -x "$APP_DIR/setup-usb-permissions.sh" ]]; then
    bash "$APP_DIR/setup-usb-permissions.sh" || true
  fi
}

compose_overrides_and_service() {
  log "9) Compose override (host:${HOST_PORT} -> container:${CONTAINER_PORT}) + systemd unit"

  # Create a portable override (service named 'opensteri')
  cat > "$APP_DIR/compose.override.yml" <<EOF
services:
  ${CONTAINER_NAME}:
    ports:
      - "${HOST_PORT}:${CONTAINER_PORT}"
    restart: unless-stopped
EOF

  # And a generic one (service named 'app'), in case upstream changes naming
  cat > "$APP_DIR/docker-compose.override.yml" <<EOF
services:
  app:
    ports:
      - "${HOST_PORT}:${CONTAINER_PORT}"
    restart: unless-stopped
EOF

  # Systemd unit using the compose wrapper
  cat > /etc/systemd/system/osteri.service <<EOF
[Unit]
Description=Osteri (docker compose)
Requires=docker.service usb-gadget.service
After=docker.service network-online.target usb-gadget.service

[Service]
Type=oneshot
WorkingDirectory=${APP_DIR}
ExecStart=/usr/local/sbin/compose.sh up -d --pull always --build
ExecStop=/usr/local/sbin/compose.sh down
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF

  systemctl daemon-reload
  systemctl enable osteri.service
}

avahi_http_ad() {
  log "10) Avahi HTTP service hint"
  cat > /etc/avahi/services/osteri-http.service <<EOF
<?xml version="1.0" standalone='no'?>
<!DOCTYPE service-group SYSTEM "avahi-service.dtd">
<service-group>
  <name replace-wildcards="yes">osteri Web</name>
  <service>
    <type>_http._tcp</type>
    <port>${HOST_PORT}</port>
  </service>
</service-group>
EOF
  systemctl restart avahi-daemon
}

### ----------------- Main -----------------
require_root
apt_install_base
set_hostname_mdns
enable_dwc2_otg
config_usb0_network
create_usb_gadget_service
ensure_docker_and_compose
clone_repo_and_permissions
compose_overrides_and_service
avahi_http_ad

log "All set. Reboot to finalize OTG role switching."
read -rp "Reboot now? [y/N] " yn
if [[ "${yn,,}" == "y" ]]; then
  reboot
else
  log "Please reboot manually later."
fi
