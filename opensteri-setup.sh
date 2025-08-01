#!/bin/bash

set -e

FIRMWARE_DIR="/boot/firmware"
SYSTEMD_SERVICE="/etc/systemd/system/usb-mode-switch.service"

echo "🔧 Setting up USB auto-switch (default: HOST → fallback: GADGET if PC detected)"

# 1. Create gadget config
echo "Creating $FIRMWARE_DIR/config-gadget.txt"
cat <<EOF > $FIRMWARE_DIR/config-gadget.txt
dtoverlay=dwc2
EOF

echo "Creating $FIRMWARE_DIR/cmdline-gadget.txt"
CMDLINE=$(cat $FIRMWARE_DIR/cmdline.txt | sed 's/ modules-load=dwc2,g_ether//g')
echo "$CMDLINE modules-load=dwc2,g_ether" > $FIRMWARE_DIR/cmdline-gadget.txt

# 2. Backup current host configs
echo "Creating $FIRMWARE_DIR/config-host.txt"
cp $FIRMWARE_DIR/config.txt $FIRMWARE_DIR/config-host.txt

echo "Creating $FIRMWARE_DIR/cmdline-host.txt"
cp $FIRMWARE_DIR/cmdline.txt $FIRMWARE_DIR/cmdline-host.txt

# 3. Clean current config to enforce HOST mode by default
echo "Stripping gadget settings to boot into HOST mode"
sed -i '/dtoverlay=dwc2/d' $FIRMWARE_DIR/config.txt
sed -i 's/ modules-load=dwc2,g_ether//g' $FIRMWARE_DIR/cmdline.txt

# 4. Create detection script
echo "Creating /boot/usb_mode_switch.sh"
cat <<'EOF' > /boot/usb_mode_switch.sh
#!/bin/bash
VBUS="/sys/class/power_supply/usb/online"
FIRMWARE_DIR="/boot/firmware"

if [ -f "$VBUS" ]; then
    STATE=$(cat $VBUS)
    if [ "$STATE" -eq 1 ]; then
        echo "PC detected on USB. Switching to GADGET mode..."
        cp $FIRMWARE_DIR/config-gadget.txt $FIRMWARE_DIR/config.txt
        cp $FIRMWARE_DIR/cmdline-gadget.txt $FIRMWARE_DIR/cmdline.txt
        sync
        reboot
    else
        echo "No PC detected. Staying in HOST mode."
    fi
else
    echo "VBUS not found. Staying in HOST mode."
fi
EOF

chmod +x /boot/usb_mode_switch.sh

# 5. Create systemd service
echo "Creating systemd service: $SYSTEMD_SERVICE"
cat <<EOF > $SYSTEMD_SERVICE
[Unit]
Description=USB Mode Auto-Switch on Boot
After=multi-user.target

[Service]
Type=oneshot
ExecStart=/boot/usb_mode_switch.sh
RemainAfterExit=true

[Install]
WantedBy=multi-user.target
EOF

# 6. Enable the service
echo "Enabling systemd service..."
systemctl daemon-reexec
systemctl enable usb-mode-switch.service

echo "✅ Setup complete. Rebooting into HOST mode..."
sleep 2
reboot
