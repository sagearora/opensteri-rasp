# Printer Management System

A comprehensive Node.js application for managing GoDEX printers and label printing functionality using environment-based authentication.

## Features

- **Printer Authentication**: Join printers using join codes
- **Label Printing**: Print labels with QR codes and formatted text
- **WiFi Management**: Scan and connect to WiFi networks
- **Real-time Monitoring**: GraphQL subscriptions for printer status
- **USB Hardware Detection**: Automatic GoDEX printer detection via USB
- **Raspberry Pi OS Optimized**: Special handling for Raspberry Pi USB permissions

## Installation

```bash
npm install
npm run build
npm start
```

## Raspberry Pi OS Setup

This application is optimized for Raspberry Pi OS. To ensure proper USB printer detection:

### 1. Run the USB Permissions Setup Script

```bash
./setup-usb-permissions.sh
```

This script will:
- Add your user to the `plugdev` group
- Create udev rules for USB device permissions
- Reload udev rules

### 2. Log Out and Log Back In

After running the setup script, log out and log back in (or reboot) for the group changes to take effect.

### 3. Connect Your GoDEX Printer

Connect your GoDEX printer via USB to the Raspberry Pi.

### 4. Start the Application

```bash
npm start
```

### 5. Check Printer Status

Visit `http://localhost:3001/printer-status` to check if your printer is detected.

## Troubleshooting

### USB Detection Issues

If the printer is not being detected:

1. **Check USB Debug Info**: Visit `http://localhost:3001/usb-debug` for detailed USB device information
2. **Verify Permissions**: Ensure your user is in the `plugdev` group: `groups $(whoami)`
3. **Check Device List**: Run `lsusb` to see if the GoDEX printer appears
4. **Manual Detection**: Use the `/trigger-printer-detection` endpoint to manually trigger detection

### Common Issues

- **Permission Denied**: Run `sudo usermod -a -G plugdev $(whoami)` and reboot
- **Device Not Found**: Check USB connection and try reconnecting the printer
- **Kernel Driver Issues**: The application will automatically detach kernel drivers when needed

## API Endpoints

- `GET /printer-status` - Check printer hardware detection status
- `POST /trigger-printer-detection` - Manually trigger printer detection
- `GET /usb-debug` - Get detailed USB device information for debugging
- `GET /token-status` - Check authentication status
- `POST /join` - Join with a join code
- `GET /scan` - Scan for WiFi networks
- `POST /connect` - Connect to WiFi network
- `GET /status` - Get WiFi connection status

## Development

```bash
npm run dev
```

## Building

```bash
npm run build
```

## License

MIT 