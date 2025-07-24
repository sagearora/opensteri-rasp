#!/bin/bash

cd /home/pi/opensteri-rasp || exit 1

# Read current version before pull
if [ -f .app-version ]; then
  OLD_VERSION=$(cat .app-version)
else
  OLD_VERSION="0.0.0"
fi

# Pull latest changes
git pull

# Read new version after pull
if [ -f .app-version ]; then
  NEW_VERSION=$(cat .app-version)
else
  echo "No .app-version file found after pull. Exiting."
  exit 1
fi

# Compare versions
if [ "$NEW_VERSION" \> "$OLD_VERSION" ]; then
  echo "Updating from $OLD_VERSION to $NEW_VERSION..."
  npm install
  npm run build
  pm2 restart opensteri-rasp
else
  echo "No version change. Skipping update."
fi