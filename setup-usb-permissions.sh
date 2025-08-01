#!/bin/bash

# USB Permissions Setup Script for Raspberry Pi OS
# This script helps configure proper USB permissions for GoDEX printer detection

echo "🔧 Setting up USB permissions for GoDEX printer on Raspberry Pi OS..."
echo ""

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo "⚠️  Running as root. This script should be run as a regular user."
    echo "   The script will use sudo when needed."
    exit 1
fi

# Get current user
CURRENT_USER=$(whoami)
echo "👤 Current user: $CURRENT_USER"

# Check if user is already in plugdev group
if groups $CURRENT_USER | grep -q plugdev; then
    echo "✅ User is already in plugdev group"
else
    echo "📝 Adding user to plugdev group..."
    sudo usermod -a -G plugdev $CURRENT_USER
    echo "✅ User added to plugdev group"
    echo "⚠️  You may need to log out and log back in for changes to take effect"
fi

# Check if udev rules exist for USB devices
UDEV_RULES_FILE="/etc/udev/rules.d/99-usb-permissions.rules"
if [ -f "$UDEV_RULES_FILE" ]; then
    echo "✅ USB udev rules already exist"
else
    echo "📝 Creating USB udev rules..."
    sudo tee "$UDEV_RULES_FILE" > /dev/null <<EOF
# USB device permissions for GoDEX printer
SUBSYSTEM=="usb", ATTRS{idVendor}=="195f", ATTRS{idProduct}=="0001", MODE="0666", GROUP="plugdev"
SUBSYSTEM=="usb", ATTRS{idVendor}=="195f", MODE="0666", GROUP="plugdev"
EOF
    echo "✅ USB udev rules created"
fi

# Reload udev rules
echo "🔄 Reloading udev rules..."
sudo udevadm control --reload-rules
sudo udevadm trigger

# Check USB devices
echo ""
echo "🔍 Checking USB devices..."
lsusb | grep -i godex || echo "No GoDEX devices found in lsusb output"

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Log out and log back in (or reboot) for group changes to take effect"
echo "2. Connect your GoDEX printer via USB"
echo "3. Run the printer management system"
echo "4. Check printer status at http://localhost:3001/printer-status"
echo ""
echo "🔧 If you still have issues:"
echo "- Run: sudo usermod -a -G plugdev $CURRENT_USER"
echo "- Reboot the system"
echo "- Check USB debug info at http://localhost:3001/usb-debug" 