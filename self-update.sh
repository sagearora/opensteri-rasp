#!/bin/bash

cd /home/pi/opensteri || exit 1

# Pull latest changes
git reset --hard
git pull

npm install
npm run build
pm2 restart opensteri
