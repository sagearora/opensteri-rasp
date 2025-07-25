#!/bin/bash

cd /home/pi/opensteri-rasp || exit 1

# Pull latest changes
git pull

npm install
npm run build
pm2 restart opensteri-rasp
