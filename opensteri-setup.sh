#!/bin/bash

set -e

FIRMWARE_DIR="/boot/firmware"

echo "🔧 Setting up USB auto-switch: default HOST mode → fallback GADGET mode if PC is detected"

# 1. Create gadget mode config
echo "Creating $FIRMWARE_DIR/config-gadget.txt"
cat <<EOF > $FIRMWARE_DIR/config-gadget.txt
dtoverlay=dwc2
EOF

echo "Creating $FIRMWARE_DIR/cmdline-gadget.txt"
CMDLINE=$(cat $FIRMWARE_DIR/cmdline.txt | sed 's/ modules-load=dwc2,g_ether//g')
echo "$CMDLINE modules-load=dwc2,g_ether" > $FIRMWARE_DIR/cmdline-gadget.txt

# 2. Backup current host mode configs
echo "Creating $FIRMWARE_DIR/config-host.txt"
cp $FIRMWARE_DIR/config.txt $FIRMWARE_DIR/config-host.txt

echo "Creating $FIRMWARE_DIR/cmdline-host.txt"
cp $FIRMWARE_DIR/cmdline.txt $FIRMWARE_DIR/cmdline-host.txt

# 3. Clean current config.txt and cmdline.txt
echo "Setting default boot to HOST mode"
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

# 5. Enable script in rc.local
echo "Patching /etc/rc.local to run switch script"
RC_LOCAL=/etc/rc.local
if ! grep -q "/boot/usb_mode_switch.sh" $RC_LOCAL; then
    sed -i '/^exit 0/i /boot/usb_mode_switch.sh &' $RC_LOCAL
fi

echo "✅ Setup complete. Rebooting into HOST mode..."
sleep 2
reboot