# syntax=docker/dockerfile:1.7

# -------- Builder --------
FROM --platform=$BUILDPLATFORM node:20-bullseye AS builder

# Enable faster installs and reproducible builds
ENV NODE_ENV=development
WORKDIR /app

# Install build tooling for any native deps (e.g., usb)
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ pkg-config libusb-1.0-0-dev \
 && rm -rf /var/lib/apt/lists/*

# Copy manifests first for better caching
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# -------- Runtime --------
FROM node:20-bullseye AS runtime

# Runtime deps for your app endpoints
# - libusb-1.0-0 : required by node-usb (if used)
# - usbutils     : provides `lsusb` for /usb-debug endpoint
# - libudev-dev  : required for USB native bindings compilation
# - build-essential : required for native module compilation
# - network-manager : provides nmcli for WiFi scanning and management
RUN apt-get update && apt-get install -y --no-install-recommends \
    libusb-1.0-0 usbutils ca-certificates \
    libudev-dev build-essential python3 make g++ pkg-config \
    network-manager \
 && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
WORKDIR /opt/app

# Copy only what we need
COPY --from=builder /app/package.json /opt/app/
COPY --from=builder /app/package-lock.json /opt/app/
RUN npm ci --omit=dev

COPY --from=builder /app/dist /opt/app/dist

# App listens on 3001 per README
EXPOSE 3001

# Helpful default: healthcheck against your status endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:3001/status').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# Watchtower best-practice: label to opt-in
LABEL com.centurylinklabs.watchtower.enable="true"

CMD ["node", "dist/index.js"]
