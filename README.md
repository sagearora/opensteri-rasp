# Printer Management System

A comprehensive Node.js application for managing GoDEX printers, WiFi connections, and label printing functionality. This system provides a REST API for printer authentication, real-time command processing, and automated label printing.

## 🚀 Features

- **WiFi Management**: Scan networks, connect to WiFi, and manage access point mode
- **Printer Authentication**: Secure printer joining with token-based authentication
- **Real-time Commands**: WebSocket-based command processing from GraphQL backend
- **Label Printing**: Automated label generation and printing with QR codes
- **Hardware Integration**: Direct USB communication with GoDEX printers
- **Heartbeat Monitoring**: Periodic status updates to maintain printer online status
- **Persistent Storage**: Token and printer ID storage for session persistence

## 📋 Prerequisites

- Node.js 18+ 
- GoDEX printer (vendor ID: 6495, product ID: 1)
- Raspberry Pi (recommended) or Linux system with USB support
- NetworkManager for WiFi management
- sudo privileges for USB and network operations

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pi-opensteri
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.config` file in the project root:
   ```env
   # GraphQL Configuration
   HASURA_GRAPHQL_WS=wss://your-hasura-instance.hasura.app/v1/graphql
   HASURA_GRAPHQL_URL=https://your-hasura-instance.hasura.app/v1/graphql
   
   # Printer Join Configuration
   JOIN_URL=https://your-join-endpoint.com/join
   
   # Server Configuration
   PORT=3001
   HOST=0.0.0.0
   NODE_ENV=development
   
   # Heartbeat Configuration
   HEARTBEAT_INTERVAL_SECONDS=60
   ```

4. **Install system dependencies**
   ```bash
   # Install USB development libraries
   sudo apt-get install libusb-1.0-0-dev
   
   # Install NetworkManager for WiFi management
   sudo apt-get install network-manager
   ```

## 🏗️ Architecture

### Core Services

- **`src/index.ts`**: Main application entry point
- **`src/routes/routes.ts`**: REST API endpoints for WiFi and printer management
- **`src/services/`**: Business logic services

### Service Layer

| Service | Purpose |
|---------|---------|
| `printerConnectionService.ts` | Printer connection initialization and management |
| `printerService.ts` | High-level printer operations (join, print, status) |
| `checkPrinter.ts` | Low-level USB communication with GoDEX printers |
| `wifi.service.ts` | WiFi network scanning and connection management |
| `graphqlClient.ts` | GraphQL WebSocket and HTTP client management |
| `tokenStore.ts` | Persistent token and printer ID storage |
| `fetchPrinterInfo.ts` | Printer information retrieval from backend |
| `handleCommand.ts` | Incoming command processing and execution |
| `startHeartbeat.ts` | Periodic status updates to backend |
| `subscribePrinterCommands.ts` | Real-time command subscription management |

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/scan` | Scan for available WiFi networks |
| `GET` | `/` | Get current WiFi and printer status |
| `POST` | `/connect` | Connect to a WiFi network |
| `POST` | `/join` | Authenticate and join a printer |
| `GET` | `/printer-status` | Get printer connection status |
| `POST` | `/print-labels` | Print multiple labels |
| `POST` | `/test-print` | Print a test label |

## 🚀 Usage

### Starting the Application

```bash
npm start
```

The application will:
1. Load environment configuration
2. Initialize printer connection (if credentials exist)
3. Start the HTTP server on the configured port
4. Set up GraphQL subscriptions and heartbeat monitoring

### WiFi Connection

1. **Scan for networks**
   ```bash
   curl http://localhost:3001/scan
   ```

2. **Connect to a network**
   ```bash
   curl -X POST http://localhost:3001/connect \
     -H "Content-Type: application/json" \
     -d '{"ssid": "YourNetwork", "password": "YourPassword"}'
   ```

### Printer Authentication

1. **Join a printer**
   ```bash
   curl -X POST http://localhost:3001/join \
     -H "Content-Type: application/json" \
     -d '{"printer_id": "your-printer-id", "join_code": "your-join-code"}'
   ```

2. **Check printer status**
   ```bash
   curl http://localhost:3001/printer-status
   ```

### Label Printing

1. **Print test label**
   ```bash
   curl -X POST http://localhost:3001/test-print
   ```

2. **Print custom labels**
   ```bash
   curl -X POST http://localhost:3001/print-labels \
     -H "Content-Type: application/json" \
     -d '{
       "labels": [
         {
           "id": "1",
           "name": "Product Name",
           "category": "Category",
           "user_name": "User Name",
           "created_at": "2024-01-01T00:00:00Z",
           "expiry_at": "2024-12-31T23:59:59Z",
           "qr": "https://example.com/qr"
         }
       ]
     }'
   ```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `HASURA_GRAPHQL_WS` | WebSocket URL for GraphQL subscriptions | Required |
| `HASURA_GRAPHQL_URL` | HTTP URL for GraphQL queries | Required |
| `JOIN_URL` | Printer join endpoint URL | Required |
| `PORT` | HTTP server port | `3001` |
| `HOST` | HTTP server host | `0.0.0.0` |
| `NODE_ENV` | Application environment | `development` |
| `HEARTBEAT_INTERVAL_SECONDS` | Heartbeat interval in seconds | `60` |

### Printer Configuration

The system is configured for GoDEX printers with:
- **Vendor ID**: 6495
- **Product ID**: 1
- **USB Interface**: 0
- **Endpoint**: Output endpoint for command transmission

## 🐛 Troubleshooting

### Common Issues

1. **Printer not detected**
   - Ensure GoDEX printer is connected via USB
   - Check USB permissions: `sudo usermod -a -G dialout $USER`
   - Verify printer vendor/product IDs match configuration

2. **WiFi connection fails**
   - Ensure NetworkManager is installed and running
   - Check sudo privileges for network operations
   - Verify network credentials are correct

3. **GraphQL connection errors**
   - Verify environment variables are set correctly
   - Check network connectivity to Hasura instance
   - Ensure authentication tokens are valid

4. **Permission denied errors**
   - Run with sudo for USB and network operations
   - Add user to appropriate groups: `sudo usermod -a -G dialout,netdev $USER`

### Logs

The application provides detailed logging for debugging:
- Connection status updates
- Command processing logs
- Error details with stack traces
- Heartbeat and subscription status

## 🔒 Security

- **Token Storage**: Tokens are stored locally in JSON format
- **Network Security**: WiFi connections use WPA2 encryption
- **USB Security**: Direct USB communication with hardware validation
- **API Security**: Bearer token authentication for GraphQL operations

## 📝 Development

### Project Structure

```
src/
├── index.ts                 # Application entry point
├── routes/
│   └── routes.ts           # REST API endpoints
├── services/
│   ├── printerConnectionService.ts
│   ├── printerService.ts
│   ├── checkPrinter.ts
│   ├── wifi.service.ts
│   ├── graphqlClient.ts
│   ├── tokenStore.ts
│   ├── fetchPrinterInfo.ts
│   ├── handleCommand.ts
│   ├── startHeartbeat.ts
│   └── subscribePrinterCommands.ts
├── types/
│   └── index.ts            # TypeScript type definitions
└── __generated/
    └── graphql.ts          # Generated GraphQL types
```

### Adding New Features

1. **New API Endpoints**: Add to `src/routes/routes.ts`
2. **New Services**: Create in `src/services/` with proper documentation
3. **New Types**: Add to `src/types/index.ts`
4. **New Commands**: Extend `src/services/handleCommand.ts`

### Code Style

- Use TypeScript for all new code
- Add comprehensive JSDoc documentation
- Follow error handling patterns established in existing code
- Use async/await for all asynchronous operations
- Implement proper logging for debugging

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper documentation
4. Add tests for new functionality
5. Submit a pull request

## 📞 Support

For support and questions:
- Check the troubleshooting section
- Review the logs for error details
- Open an issue with detailed error information 