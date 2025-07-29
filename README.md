# Printer Management System

A comprehensive Node.js application for managing GoDEX printers and label printing functionality using environment-based authentication. This system provides printer authentication, real-time command processing, and automated label printing without requiring a REST API.

## 🚀 Features

- **Environment Authentication**: Uses environment file with printer_id and join token for authentication
- **Printer Authentication**: Secure printer joining with token-based authentication
- **Real-time Commands**: WebSocket-based command processing from GraphQL backend
- **Label Printing**: Automated label generation and printing with QR codes
- **Hardware Integration**: Direct USB communication with GoDEX printers
- **Heartbeat Monitoring**: Periodic status updates to maintain printer online status
- **Environment Configuration**: Boot-time environment file creation with authentication data

## 📋 Prerequisites

- Node.js 18+ 
- GoDEX printer (vendor ID: 6495, product ID: 1)
- Raspberry Pi (recommended) or Linux system with USB support
- sudo privileges for USB operations

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
   
   # Heartbeat Configuration
   HEARTBEAT_INTERVAL_SECONDS=60
   ```

4. **Install system dependencies**
   ```bash
   # Install USB development libraries
   sudo apt-get install libusb-1.0-0-dev
   ```

5. **Setup environment authentication**
   The system expects a `.env` file to be created on boot with:
   ```env
   PRINTER_ID=your-printer-id
   PRINTER_JOIN_TOKEN=your-join-token
   ```

## 🏗️ Architecture

### Core Services

- **`src/index.ts`**: Main application entry point
- **`src/services/`**: Business logic services

### Service Layer

| Service | Purpose |
|---------|---------|
| `printerConnectionService.ts` | Printer connection initialization and management |
| `printerService.ts` | High-level printer operations (join, print, status) |
| `checkPrinter.ts` | Low-level USB communication with GoDEX printers |
| `environmentAuth.ts` | Environment-based authentication management |
| `graphqlClient.ts` | GraphQL WebSocket and HTTP client management |
| `fetchPrinterInfo.ts` | Printer information retrieval from backend |
| `handleCommand.ts` | Incoming command processing and execution |
| `startHeartbeat.ts` | Periodic status updates to backend |
| `subscribePrinterCommands.ts` | Real-time command subscription management |

## 🚀 Usage

### Environment Authentication

The system uses environment-based authentication. On boot, a `.env` file should be created with:

```env
PRINTER_ID=your-printer-id
PRINTER_JOIN_TOKEN=your-join-token
```

The system will automatically:
1. Load the authentication data from the environment file
2. Authenticate using the join token to get an access token
3. Establish GraphQL connections for real-time communication
4. Set up command subscriptions and heartbeat monitoring

### Label Printing

The system automatically processes print commands received through the GraphQL subscription system. No manual API calls are needed.

### Printer Status

The system automatically monitors printer status and maintains heartbeat connections to keep the printer online.

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `HASURA_GRAPHQL_WS` | WebSocket URL for GraphQL subscriptions | Required |
| `HASURA_GRAPHQL_URL` | HTTP URL for GraphQL queries | Required |
| `HEARTBEAT_INTERVAL_SECONDS` | Heartbeat interval in seconds | `60` |

### Authentication Environment Variables

| Variable | Description | Source |
|----------|-------------|---------|
| `PRINTER_ID` | Unique printer identifier | Created on boot |
| `PRINTER_JOIN_TOKEN` | Authentication token for printer joining | Created on boot |

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

2. **Authentication fails**
   - Ensure `.env` file exists with `PRINTER_ID` and `PRINTER_JOIN_TOKEN`
   - Verify the join token is valid and not expired
   - Check that the printer ID matches the expected format

3. **GraphQL connection errors**
   - Verify environment variables are set correctly
   - Check network connectivity to Hasura instance
   - Ensure authentication tokens are valid

4. **Permission denied errors**
   - Run with sudo for USB operations
   - Add user to appropriate groups: `sudo usermod -a -G dialout $USER`

### Logs

The application provides detailed logging for debugging:
- Authentication status updates
- Connection status updates
- Command processing logs
- Error details with stack traces
- Heartbeat and subscription status

## 🔒 Security

- **Environment Authentication**: Authentication data is loaded from environment file
- **USB Security**: Direct USB communication with hardware validation
- **API Security**: Bearer token authentication for GraphQL operations

## 📝 Development

### Project Structure

```
src/
├── index.ts                 # Application entry point
├── services/
│   ├── printerConnectionService.ts
│   ├── printerService.ts
│   ├── checkPrinter.ts
│   ├── environmentAuth.ts
│   ├── graphqlClient.ts
│   ├── fetchPrinterInfo.ts
│   ├── handleCommand.ts
│   ├── startHeartbeat.ts
│   └── subscribePrinterCommands.ts
└── __generated/
    └── graphql.ts          # Generated GraphQL types
```

### Adding New Features

1. **New Services**: Create in `src/services/` with proper documentation
2. **New Commands**: Extend `src/services/handleCommand.ts`
3. **Authentication**: Extend `src/services/environmentAuth.ts`

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