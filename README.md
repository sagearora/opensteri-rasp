# OpenSteri Printer Management System

A comprehensive Node.js application for managing GoDEX printers and label printing functionality using environment-based authentication.

## Features

- **WiFi Management**: Scan, connect, and manage WiFi networks
- **Printer Authentication**: Join system with access token management
- **Real-time Monitoring**: GraphQL subscriptions for printer status
- **Label Printing**: USB printer integration with GoDEX printers
- **Environment-based Auth**: Secure token management with .env files

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Application
```bash
npm run build
```

### 3. Start the Server
```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### WiFi Management

- `GET /` - Static HTML form for WiFi management
- `GET /scan` - Scan for available WiFi networks
- `POST /connect` - Connect to a WiFi network
- `GET /status` - Get current WiFi connection status  
- `POST /disconnect` - Disconnect from WiFi network

### Printer Authentication

- `POST /join` - Join with a join code to get access token
- `GET /token-status` - Check access token and printer ID status

## Join Endpoint Usage

The `/join` endpoint allows you to authenticate a printer using a join code:

```bash
curl -X POST http://localhost:3001/join \
  -H "Content-Type: application/json" \
  -d '{"join_code": "your-join-code-here"}'
```

**Response:**
```json
{
  "message": "Successfully joined and access token saved",
  "token": "access-token-here",
  "printer_id": "printer-id-here"
}
```

The access token and printer ID are automatically saved to the `.env` file and used for automatic subscription when the server starts.

## Token Management

The system automatically manages access tokens:

1. **Token Storage**: Tokens are saved to `.env` file for persistence
2. **Automatic Loading**: Tokens are loaded on server startup
3. **Subscription Setup**: Automatic GraphQL subscription is established using the token
4. **Status Checking**: Use `/token-status` to check token and printer ID availability

## Environment Variables

The following variables are managed automatically:

- `ACCESS_TOKEN` - Authentication token for API access
- `PRINTER_ID` - Unique identifier for the printer

## Development

### Run in Development Mode
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

## License

MIT License - see LICENSE file for details. 