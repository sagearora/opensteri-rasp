#!/bin/bash

APP_DIR="/home/pi/opensteri-portal"
VERSION_FILE="$APP_DIR/.app-version"
TMP_DIR="/tmp/opensteri-update"
GITHUB_REPO="sagearora/opensteri-rasp"
SERVICE_NAME="opensteri-portal"

# Read current version
if [ -f "$VERSION_FILE" ]; then
  CURRENT_VERSION=$(cat "$VERSION_FILE")
else
  CURRENT_VERSION="v0.0.0"
fi

echo "Current version: $CURRENT_VERSION"

# Fetch latest release info
LATEST_JSON=$(curl -s https://api.github.com/repos/$GITHUB_REPO/releases/latest)
LATEST_TAG=$(echo "$LATEST_JSON" | grep -oP '"tag_name": "\K(.*)(?=")')
ZIP_URL=$(echo "$LATEST_JSON" | grep -oP '"zipball_url": "\K(.*)(?=")')

echo "Latest version: $LATEST_TAG"

if [[ "$CURRENT_VERSION" == "$LATEST_TAG" ]]; then
  echo "Already up to date."
  exit 0
fi

echo "Updating to $LATEST_TAG..."

# Clean up and prepare
rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"

# Download and extract
curl -L "$ZIP_URL" -o "$TMP_DIR/app.zip"
unzip -q "$TMP_DIR/app.zip" -d "$TMP_DIR"
EXTRACTED_DIR=$(find "$TMP_DIR" -mindepth 1 -maxdepth 1 -type d)

# Backup current app (optional but good practice)
cp -r "$APP_DIR" "${APP_DIR}_backup_$(date +%s)"

# Sync new files in
rsync -a --delete "$EXTRACTED_DIR/" "$APP_DIR/"

# Install and rebuild
cd "$APP_DIR"
npm ci
if grep -q '"build"' package.json; then
  npm run build
fi

# Save new version
echo "$LATEST_TAG" > "$VERSION_FILE"

# Restart the systemd service
sudo systemctl restart "$SERVICE_NAME"
echo "Update complete and service restarted."