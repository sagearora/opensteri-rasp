#!/bin/bash

MOUNTPOINT=/mnt
CONFIG_FILE="$MOUNTPOINT/OPENSTERI.CFG"
ENV_FILE="/home/pi/opensteri/.env"

echo "[OpenSteri] Mounting pi-share.img..."
mount -o loop /boot/pi-share.img "$MOUNTPOINT"

if [ -f "$CONFIG_FILE" ]; then
  echo "[OpenSteri] Found OPENSTERI.CFG file."

  SSID=$(grep '^WIFI_SSID=' "$CONFIG_FILE" | cut -d= -f2-)
  PASSWORD=$(grep '^WIFI_PSWD=' "$CONFIG_FILE" | cut -d= -f2-)
  PRINTER_ID=$(grep '^PRINTER_ID=' "$CONFIG_FILE" | cut -d= -f2-)
  JOIN_TOKEN=$(grep '^PRINTER_JOIN_TOKEN=' "$CONFIG_FILE" | cut -d= -f2-)

  echo "[OpenSteri] Extracted values:"
  echo "  - SSID: $SSID"
  echo "  - PASSWORD: (hidden)"
  echo "  - PRINTER_ID: $PRINTER_ID"
  echo "  - PRINTER_JOIN_TOKEN: $JOIN_TOKEN"

  if [[ -n "$SSID" && -n "$PASSWORD" ]]; then
    echo "[OpenSteri] Connecting to Wi-Fi..."
    nmcli device wifi connect "$SSID" password "$PASSWORD"
  else
    echo "[OpenSteri] Missing Wi-Fi credentials. Skipping Wi-Fi setup."
  fi

  echo "[OpenSteri] Ensuring .env file exists at: $ENV_FILE"
  mkdir -p "$(dirname "$ENV_FILE")"
  touch "$ENV_FILE"

  echo "[OpenSteri] Updating PRINTER_ID and PRINTER_JOIN_TOKEN in .env..."

  if grep -q '^PRINTER_ID=' "$ENV_FILE"; then
    echo "[OpenSteri] Replacing existing PRINTER_ID"
    sed -i "s/^PRINTER_ID=.*/PRINTER_ID=$PRINTER_ID/" "$ENV_FILE"
  else
    echo "[OpenSteri] Appending PRINTER_ID"
    echo "PRINTER_ID=$PRINTER_ID" >> "$ENV_FILE"
  fi

  if grep -q '^PRINTER_JOIN_TOKEN=' "$ENV_FILE"; then
    echo "[OpenSteri] Replacing existing PRINTER_JOIN_TOKEN"
    sed -i "s/^PRINTER_JOIN_TOKEN=.*/PRINTER_JOIN_TOKEN=$JOIN_TOKEN/" "$ENV_FILE"
  else
    echo "[OpenSteri] Appending PRINTER_JOIN_TOKEN"
    echo "PRINTER_JOIN_TOKEN=$JOIN_TOKEN" >> "$ENV_FILE"
  fi

  echo "[OpenSteri] Final .env contents:"
  cat "$ENV_FILE"
else
  echo "[OpenSteri] ERROR: Config file not found at $CONFIG_FILE"
fi

echo "[OpenSteri] Unmounting pi-share.img"
umount "$MOUNTPOINT"
