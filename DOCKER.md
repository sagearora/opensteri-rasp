# Docker Deployment Guide

This guide covers deploying the OpenSteri Printer Management System using Docker containers with automatic updates via Watchtower.

## 🐳 Quick Start

### 1. Prerequisites

- Raspberry Pi with Docker installed
- USB printer connected
- Network access for updates

### 2. One-time Setup on Pi

```bash
# Install Docker (if not already installed)
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# Log out and back in

# Create app directory
mkdir -p ~/opensteri && cd ~/opensteri

# Download deployment files
curl -L https://raw.githubusercontent.com/sagearora/opensteri-rasp/main/docker-compose.yml -o docker-compose.yml
curl -L https://raw.githubusercontent.com/sagearora/opensteri-rasp/main/env.example -o env.example

# Create your environment file
cp env.example .env
nano .env  # Edit with your actual values
```

### 3. Configure Environment

Edit `.env` with your actual values:

```bash
# Required: Get these from your OpenSteri dashboard
PRINTER_ID=your_actual_printer_id
ACCESS_TOKEN=your_actual_access_token

# Optional: Customize as needed
STARTUP_UPDATE_ENABLED=true
NODE_ENV=production
```

### 4. Deploy

```bash
# Start the services
docker compose up -d

# Check logs
docker compose logs -f opensteri

# Check status
docker compose ps
```

## 🔄 Automatic Updates

The setup includes **Watchtower** which automatically:
- Checks for new images every 30 minutes
- Pulls and deploys updates
- Cleans up old images
- Restarts services gracefully

### Manual Update

```bash
# Force update check
docker compose pull
docker compose up -d
```

## 🛠️ Troubleshooting

### USB Device Issues

```bash
# Check if USB devices are visible in container
docker exec -it opensteri lsusb

# If empty, check host USB devices
lsusb

# Check device permissions
ls -la /dev/bus/usb/
```

### Permission Issues

If you encounter USB permission issues:

```bash
# Run the USB permissions script (one-time)
curl -L https://raw.githubusercontent.com/sagearora/opensteri-rasp/main/setup-usb-permissions.sh -o setup-usb-permissions.sh
chmod +x setup-usb-permissions.sh
sudo ./setup-usb-permissions.sh
sudo reboot
```

### Container Logs

```bash
# View all logs
docker compose logs

# Follow logs in real-time
docker compose logs -f

# View specific service logs
docker compose logs -f opensteri
docker compose logs -f watchtower
```

### Health Check

The container includes a health check that monitors the `/status` endpoint:

```bash
# Check container health
docker compose ps

# Manual health check
curl http://localhost:3001/status
```

## 📊 Monitoring

### Service Status

```bash
# Check running containers
docker compose ps

# Check resource usage
docker stats

# Check disk usage
docker system df
```

### Application Endpoints

- **Status**: `http://localhost:3001/status`
- **WiFi Management**: `http://localhost:3001/`
- **Printer Status**: `http://localhost:3001/printer-status`
- **USB Debug**: `http://localhost:3001/usb-debug`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PRINTER_ID` | Your printer ID from OpenSteri | Required |
| `ACCESS_TOKEN` | Authentication token | Required |
| `STARTUP_UPDATE_ENABLED` | Enable startup updates | `true` |
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Application port | `3001` |

### Docker Compose Customization

You can modify `docker-compose.yml` to:
- Change port mappings
- Add volume mounts
- Modify restart policies
- Add additional services

## 🚀 Production Deployment

### Security Considerations

1. **Network Security**: Consider using a reverse proxy (nginx/traefik)
2. **Firewall**: Restrict access to port 3001 if needed
3. **Updates**: Monitor Watchtower logs for update issues
4. **Backups**: Backup your `.env` file and any custom configurations

### Scaling

For multiple printers, you can:
1. Run multiple instances with different ports
2. Use Docker Swarm for orchestration
3. Deploy on multiple Pis with load balancing

## 📝 Maintenance

### Regular Tasks

```bash
# Clean up unused images
docker system prune -a

# Update Watchtower itself
docker pull containrrr/watchtower:latest

# Check for security updates
docker scout cves ghcr.io/sagearora/opensteri-rasp:latest
```

### Backup

```bash
# Backup configuration
tar -czf opensteri-backup-$(date +%Y%m%d).tar.gz docker-compose.yml .env

# Restore from backup
tar -xzf opensteri-backup-YYYYMMDD.tar.gz
```

## 🆘 Support

If you encounter issues:

1. Check the logs: `docker compose logs -f opensteri`
2. Verify USB connectivity: `docker exec -it opensteri lsusb`
3. Test network connectivity: `docker exec -it opensteri ping 8.8.8.8`
4. Check GitHub issues: [OpenSteri Issues](https://github.com/sagearora/opensteri-rasp/issues)

## 🔗 Links

- **GitHub Repository**: https://github.com/sagearora/opensteri-rasp
- **Docker Images**: https://github.com/sagearora/opensteri-rasp/pkgs/container/opensteri-rasp
- **Watchtower Documentation**: https://containrrr.dev/watchtower/
