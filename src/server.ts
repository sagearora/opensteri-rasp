/**
 * OpenSteri Printer Portal Server
 * 
 * This server provides WiFi management capabilities and printer authentication
 * for the OpenSteri printer management system.
 * 
 * Features:
 * - WiFi network scanning and connection management
 * - Join endpoint for printer authentication using join codes
 * - Automatic subscription setup using access tokens
 * - Token management with .env file persistence
 * 
 * Endpoints:
 * - GET / - Static HTML form for WiFi management
 * - GET /scan - Scan for available WiFi networks
 * - POST /connect - Connect to a WiFi network
 * - GET /status - Get current WiFi connection status
 * - POST /disconnect - Disconnect from WiFi network
 * - POST /join - Join with a join code to get access token
 * - GET /token-status - Check access token and printer ID status
 * 
 * @author OpenSteri Printer Management System
 * @version 1.0.0
 */

import express from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { JOIN_URL } from './constant';
import { initializePrinterConnectionWithCredentials } from './services/printerConnectionService';
import { getClient } from './services/graphqlClient';
import { isPrinterConnected, getPrinterState, triggerPrinterDetection } from './services/checkPrinter';

// Import printer constants
const PRINTER_VENDOR_ID = 6495;
const PRINTER_PRODUCT_ID = 1;

const execAsync = promisify(exec);

// Configuration for WiFi operations
const WIFI_CONFIG = {
  useSudo: true, // Set to false if running as root or with proper permissions
  sudoCommand: 'sudo', // Can be changed to 'pkexec' or other privilege escalation methods
  fallbackToNonSudo: true // Try without sudo if sudo fails
};

// Helper functions for token management
function getEnvFilePath(): string {
  return path.join(process.cwd(), '.env');
}

function saveTokenToEnv(token: string, printerId?: string): void {
  const envPath = getEnvFilePath();
  let envContent = '';
  
  // Read existing .env file if it exists
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }
  
  // Check if ACCESS_TOKEN already exists in the file
  if (envContent.includes('ACCESS_TOKEN=')) {
    // Replace existing ACCESS_TOKEN
    envContent = envContent.replace(/ACCESS_TOKEN=.*/g, `ACCESS_TOKEN=${token}`);
  } else {
    // Add ACCESS_TOKEN to the end of the file
    envContent += `\nACCESS_TOKEN=${token}`;
  }
  
  // Save printer_id if provided
  if (printerId) {
    if (envContent.includes('PRINTER_ID=')) {
      // Replace existing PRINTER_ID
      envContent = envContent.replace(/PRINTER_ID=.*/g, `PRINTER_ID=${printerId}`);
    } else {
      // Add PRINTER_ID to the end of the file
      envContent += `\nPRINTER_ID=${printerId}`;
    }
  }
  
  // Write back to .env file
  fs.writeFileSync(envPath, envContent.trim() + '\n');
  console.log('Access token saved to .env file');
}

function loadTokenFromEnv(): { token: string | null; printerId: string | null } {
  const envPath = getEnvFilePath();
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const tokenMatch = envContent.match(/ACCESS_TOKEN=(.+)/);
    const printerIdMatch = envContent.match(/PRINTER_ID=(.+)/);
    
    return {
      token: tokenMatch ? tokenMatch[1].trim() : null,
      printerId: printerIdMatch ? printerIdMatch[1].trim() : null
    };
  }
  return { token: null, printerId: null };
}

function getCurrentAccessToken(): string | null {
  // First try to get from environment variables (in case .env was reloaded)
  const envToken = process.env.ACCESS_TOKEN;
  if (envToken) {
    return envToken;
  }
  
  // Fallback to reading from .env file
  const { token } = loadTokenFromEnv();
  return token;
}

export function createServer(): express.Application {
  const app = express();
  const PORT = 3001;

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve static files from views directory
  const viewsPath = path.join(__dirname, 'views');
  const distViewsPath = path.join(__dirname, '..', 'dist', 'views');
  const srcViewsPath = path.join(process.cwd(), 'src', 'views');
  
  // Try to serve static files from multiple possible locations
  if (fs.existsSync(viewsPath)) {
    app.use('/static', express.static(viewsPath));
    console.log(`Serving static files from: ${viewsPath}`);
  } else if (fs.existsSync(distViewsPath)) {
    app.use('/static', express.static(distViewsPath));
    console.log(`Serving static files from: ${distViewsPath}`);
  } else if (fs.existsSync(srcViewsPath)) {
    app.use('/static', express.static(srcViewsPath));
    console.log(`Serving static files from: ${srcViewsPath}`);
  } else {
    console.warn('Could not find views directory for static file serving');
  }

  // Serve static HTML form
  app.get('/', (req, res) => {
    // Try multiple possible paths for the view file
    const possiblePaths = [
      path.join(__dirname, 'views', 'index.html'),
      path.join(__dirname, '..', 'src', 'views', 'index.html'),
      path.join(process.cwd(), 'src', 'views', 'index.html'),
      path.join(process.cwd(), 'dist', 'views', 'index.html')
    ];
    
    let html = '';
    let found = false;
    
    for (const viewPath of possiblePaths) {
      try {
        if (fs.existsSync(viewPath)) {
          html = fs.readFileSync(viewPath, 'utf8');
          found = true;
          console.log(`Found view file at: ${viewPath}`);
          break;
        }
      } catch (error) {
        console.log(`Tried path: ${viewPath} - not found`);
      }
    }
    
    if (!found) {
      console.error('Could not find index.html in any of the expected locations:', possiblePaths);
      return res.status(500).send('Error: View file not found');
    }
    
    res.send(html);
  });

  // Endpoint to scan for WiFi networks
  app.get('/scan', async (req, res) => {
    try {
      // Force a rescan and get all available WiFi networks
      // Use --rescan yes to force a fresh scan
      const { stdout } = await execAsync('nmcli -t -f SSID,SIGNAL,SECURITY device wifi list --rescan yes');
      
      // Parse the output to extract SSID, signal strength, and security
      const networks = stdout
        .trim()
        .split('\n')
        .filter(line => line && !line.startsWith('*')) // Filter out connected network
        .map(line => {
          const [ssid, signal, security] = line.split(':');
          return {
            ssid: ssid || 'Hidden Network',
            signal: signal ? parseInt(signal) : 0,
            security: security || 'Unknown'
          };
        })
        .filter(network => network.ssid && network.ssid !== '--' && network.ssid !== 'SSID') // Filter out empty, invalid entries, and header
        .sort((a, b) => b.signal - a.signal); // Sort by signal strength
      
      res.json({ networks });
    } catch (error) {
      console.error('Error scanning WiFi networks:', error);
      res.status(500).json({ 
        error: 'Failed to scan WiFi networks. Make sure nmcli is available and you have the necessary permissions.' 
      });
    }
  });

  // Endpoint to connect to a WiFi network
  app.post('/connect', async (req, res) => {
    try {
      const { network, password } = req.body;
      
      if (!network || !password) {
        return res.status(400).json({ error: 'Network name and password are required' });
      }
      
      // Try different approaches for connecting to WiFi
      let connected = false;
      let lastError = null;
      
      // Approach 1: Try with sudo
      if (WIFI_CONFIG.useSudo) {
        try {
          const command = `${WIFI_CONFIG.sudoCommand} nmcli device wifi connect "${network}" password "${password}"`;
          await execAsync(command);
          connected = true;
        } catch (error) {
          lastError = error;
          console.log('Sudo approach failed, trying alternative methods...');
        }
      }
      
      // Approach 2: Try without sudo (if running as root or with proper permissions)
      if (!connected && WIFI_CONFIG.fallbackToNonSudo) {
        try {
          const command = `nmcli device wifi connect "${network}" password "${password}"`;
          await execAsync(command);
          connected = true;
        } catch (error) {
          lastError = error;
          console.log('Non-sudo approach also failed...');
        }
      }
      
      // Approach 3: Try with pkexec (alternative to sudo)
      if (!connected && WIFI_CONFIG.fallbackToNonSudo) {
        try {
          const command = `pkexec nmcli device wifi connect "${network}" password "${password}"`;
          await execAsync(command);
          connected = true;
        } catch (error) {
          lastError = error;
          console.log('pkexec approach also failed...');
        }
      }
      
      if (connected) {
        res.json({ message: 'Successfully connected to WiFi network' });
      } else {
        // Provide helpful error message based on the last error
        const errorMessage = lastError instanceof Error ? lastError.message : String(lastError);
        
        if (errorMessage.includes('sudo') || errorMessage.includes('Insufficient privileges')) {
          res.status(500).json({ 
            error: 'WiFi connection requires elevated privileges. Please run the application with sudo or configure proper permissions.',
            details: 'Try running: sudo npm start or configure sudoers to allow nmcli commands without password.',
            solutions: [
              'Run the application with sudo: sudo npm start',
              'Configure sudoers to allow nmcli commands',
              'Run the application as root user',
              'Use pkexec instead of sudo'
            ]
          });
        } else if (errorMessage.includes('NetworkManager')) {
          res.status(500).json({ 
            error: 'NetworkManager service is not running or not available.',
            details: 'Please ensure NetworkManager is installed and running.',
            solutions: [
              'Install NetworkManager: sudo apt-get install network-manager',
              'Start NetworkManager service: sudo systemctl start NetworkManager',
              'Enable NetworkManager: sudo systemctl enable NetworkManager'
            ]
          });
        } else {
          res.status(500).json({ 
            error: 'Failed to connect to WiFi network. Please check your credentials and try again.',
            details: errorMessage
          });
        }
      }
    } catch (error) {
      console.error('Error in connect endpoint:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Endpoint to get current WiFi connection status
  app.get('/status', async (req, res) => {
    try {
      // Get the active connection details
      const { stdout: connectionInfo } = await execAsync('nmcli -t -f DEVICE,TYPE,STATE,CONNECTION device status');
      
      // Get detailed WiFi connection information
      const { stdout: wifiInfo } = await execAsync('nmcli -t -f SSID,SIGNAL,SECURITY device wifi list --rescan no');
      
      // Parse connection status
      const devices = connectionInfo
        .trim()
        .split('\n')
        .filter(line => line && line.includes('wifi'))
        .map(line => {
          const [device, type, state, connection] = line.split(':');
          return {
            device,
            type,
            state,
            connection: connection || 'Not connected'
          };
        });
      
      // Parse WiFi networks and find the connected one
      const networks = wifiInfo
        .trim()
        .split('\n')
        .filter(line => line && !line.startsWith('*'))
        .map(line => {
          const [ssid, signal, security] = line.split(':');
          return {
            ssid: ssid || 'Hidden Network',
            signal: signal ? parseInt(signal) : 0,
            security: security || 'Unknown'
          };
        });
      
      // Find the currently connected network
      const connectedDevice = devices.find(device => device.state === 'connected');
      const connectedNetwork = connectedDevice ? 
        networks.find(network => network.ssid === connectedDevice.connection) : null;
      
      // Get IP address information
      let ipAddress = 'Unknown';
      try {
        const { stdout: ipInfo } = await execAsync('hostname -I');
        ipAddress = ipInfo.trim().split(' ')[0] || 'Unknown';
      } catch (error) {
        console.log('Could not get IP address');
      }
      
      res.json({
        connected: !!connectedDevice,
        device: connectedDevice,
        network: connectedNetwork,
        ipAddress,
        availableNetworks: networks.slice(0, 10) // Show top 10 networks
      });
      
    } catch (error) {
      console.error('Error getting WiFi status:', error);
      res.status(500).json({ 
        error: 'Failed to get WiFi status. Make sure nmcli is available.' 
      });
    }
  });

  // Endpoint to disconnect from WiFi
  app.post('/disconnect', async (req, res) => {
    try {
      // Try different approaches for disconnecting from WiFi
      let disconnected = false;
      let lastError = null;
      
      // Approach 1: Try with sudo
      if (WIFI_CONFIG.useSudo) {
        try {
          const command = `${WIFI_CONFIG.sudoCommand} nmcli device disconnect $(nmcli -t -f DEVICE,TYPE device | grep wifi | cut -d: -f1)`;
          await execAsync(command);
          disconnected = true;
        } catch (error) {
          lastError = error;
          console.log('Sudo disconnect approach failed, trying alternative methods...');
        }
      }
      
      // Approach 2: Try without sudo
      if (!disconnected && WIFI_CONFIG.fallbackToNonSudo) {
        try {
          const command = `nmcli device disconnect $(nmcli -t -f DEVICE,TYPE device | grep wifi | cut -d: -f1)`;
          await execAsync(command);
          disconnected = true;
        } catch (error) {
          lastError = error;
          console.log('Non-sudo disconnect approach also failed...');
        }
      }
      
      // Approach 3: Try with pkexec
      if (!disconnected && WIFI_CONFIG.fallbackToNonSudo) {
        try {
          const command = `pkexec nmcli device disconnect $(nmcli -t -f DEVICE,TYPE device | grep wifi | cut -d: -f1)`;
          await execAsync(command);
          disconnected = true;
        } catch (error) {
          lastError = error;
          console.log('pkexec disconnect approach also failed...');
        }
      }
      
      if (disconnected) {
        res.json({ message: 'Successfully disconnected from WiFi network' });
      } else {
        // Provide helpful error message
        const errorMessage = lastError instanceof Error ? lastError.message : String(lastError);
        
        if (errorMessage.includes('sudo') || errorMessage.includes('Insufficient privileges')) {
          res.status(500).json({ 
            error: 'WiFi disconnection requires elevated privileges. Please run the application with sudo or configure proper permissions.',
            details: 'Try running: sudo npm start or configure sudoers to allow nmcli commands without password.',
            solutions: [
              'Run the application with sudo: sudo npm start',
              'Configure sudoers to allow nmcli commands',
              'Run the application as root user',
              'Use pkexec instead of sudo'
            ]
          });
        } else {
          res.status(500).json({ 
            error: 'Failed to disconnect from WiFi network. Please try again.',
            details: errorMessage
          });
        }
      }
    } catch (error) {
      console.error('Error in disconnect endpoint:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Endpoint to join with a join code and get access token
  app.post('/join', async (req, res) => {
    try {
      const { join_code } = req.body;
      
      if (!join_code) {
        return res.status(400).json({ error: 'Join code is required' });
      }
      
      // Send join code to JOIN_URL
      const response = await fetch(JOIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ join_code })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Join request failed:', response.status, errorText);
        return res.status(response.status).json({ 
          error: 'Failed to join with the provided code',
          details: errorText
        });
      }
      
      const responseData = await response.json();
      
      // Check if response contains access token
      if (!responseData.token) {
        return res.status(400).json({ 
          error: 'Invalid response from join server - no access token received' 
        });
      }
      
      // Save the access token and printer_id to .env file
      saveTokenToEnv(responseData.token, responseData.printer_id);
      
      // Reload environment variables to make the token available
      dotenv.config();
      
      // Immediately start heartbeat and subscription
      try {
        console.log('Starting immediate heartbeat and subscription after successful join...');
        await initializePrinterConnectionWithCredentials(responseData.token, responseData.printer_id);
        console.log('Heartbeat and subscription started successfully');
      } catch (error) {
        console.error('Failed to start heartbeat after join:', error);
        // Don't fail the join request if heartbeat fails, just log the error
      }
      
      res.json({ 
        message: 'Successfully joined and access token saved',
        token: responseData.token, // Return token in response for immediate use
        printer_id: responseData.printer_id
      });
      
    } catch (error) {
      console.error('Error in join endpoint:', error);
      res.status(500).json({ 
        error: 'Internal server error during join process',
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Endpoint to check token status
  app.get('/token-status', (req, res) => {
    const { token, printerId } = loadTokenFromEnv();
    
    if (token && printerId) {
      res.json({ 
        hasToken: true,
        hasPrinterId: true,
        token: token.substring(0, 10) + '...', // Only show first 10 characters for security
        printerId: printerId.substring(0, 10) + '...' // Only show first 10 characters for security
      });
    } else if (token) {
      res.json({ 
        hasToken: true,
        hasPrinterId: false,
        token: token.substring(0, 10) + '...',
        message: 'Access token found but no printer ID. Re-join to get printer ID.'
      });
    } else {
      res.json({ 
        hasToken: false,
        hasPrinterId: false,
        message: 'No access token found. Use /join endpoint to authenticate.'
      });
    }
  });

  // Endpoint to disconnect printer (clear printer configuration)
  app.post('/disconnect-printer', async (req, res) => {
    try {
      const envPath = getEnvFilePath();
      
      if (fs.existsSync(envPath)) {
        let envContent = fs.readFileSync(envPath, 'utf8');
        
        // Remove PRINTER_ID from .env file
        envContent = envContent.replace(/PRINTER_ID=.*\n?/g, '');
        envContent = envContent.replace(/PRINTER_ID=.*$/g, '');
        
        // Write back to .env file
        fs.writeFileSync(envPath, envContent.trim() + '\n');
        console.log('Printer configuration cleared from .env file');
      }
      
      res.json({ message: 'Successfully disconnected printer' });
    } catch (error) {
      console.error('Error in disconnect printer endpoint:', error);
      res.status(500).json({ 
        error: 'Internal server error during printer disconnection',
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Endpoint to disconnect printer by updating paired_at to null
  app.post('/disconnect-printer-paired', async (req, res) => {
    try {
      // Get current token and printer ID
      const { token, printerId } = loadTokenFromEnv();
      
      if (!token || !printerId) {
        return res.status(400).json({ 
          error: 'No active printer connection found' 
        });
      }
      
      // Establish GraphQL connection to update the printer
      const { httpClient } = await getClient(token);
      
      // Update printer's paired_at field to null
      const result = await httpClient.updatePrinter({
        printerId,
        set: { paired_at: null }
      });
      
      if (result.update_printer_by_pk) {
        console.log('Successfully updated printer paired_at to null');
        
        // Also clear the local .env file
        const envPath = getEnvFilePath();
        if (fs.existsSync(envPath)) {
          let envContent = fs.readFileSync(envPath, 'utf8');
          
          // Remove PRINTER_ID from .env file
          envContent = envContent.replace(/PRINTER_ID=.*\n?/g, '');
          envContent = envContent.replace(/PRINTER_ID=.*$/g, '');
          
          // Write back to .env file
          fs.writeFileSync(envPath, envContent.trim() + '\n');
          console.log('Printer configuration cleared from .env file');
        }
        
        res.json({ message: 'Successfully disconnected printer and updated paired_at' });
      } else {
        throw new Error('Failed to update printer paired_at field');
      }
    } catch (error) {
      console.error('Error in disconnect printer paired endpoint:', error);
      res.status(500).json({ 
        error: 'Internal server error during printer disconnection',
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Endpoint to check printer hardware detection status
  app.get('/printer-status', async (req, res) => {
    try {
      const isConnected = isPrinterConnected();
      const printerState = getPrinterState();

      res.json({
        connected: isConnected,
        printer: {
          name: 'GoDEX Printer',
          status: isConnected ? 'Ready' : 'Not Connected',
          port: isConnected ? 'USB' : null
        },
        printerState: printerState,
        message: isConnected ? 'GoDEX printer is connected and ready.' : 'GoDEX printer is not connected or not detected.',
        debug: {
          vendorId: PRINTER_VENDOR_ID,
          productId: PRINTER_PRODUCT_ID,
          hasError: !!printerState.error,
          error: printerState.error
        }
      });
    } catch (error) {
      console.error('Error checking printer status:', error);
      res.status(500).json({ 
        error: 'Failed to check printer hardware status',
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Endpoint to manually trigger printer detection
  app.post('/trigger-printer-detection', async (req, res) => {
    try {
      const detectionResult = await triggerPrinterDetection();
      
      if (detectionResult) {
        console.log('Successfully triggered printer detection - printer found and initialized.');
        res.json({ 
          message: 'Printer detection triggered successfully - GoDEX printer found and initialized.',
          detected: true
        });
      } else {
        console.log('Printer detection triggered - no GoDEX printer found.');
        res.json({ 
          message: 'Printer detection triggered - no GoDEX printer found.',
          detected: false
        });
      }
    } catch (error) {
      console.error('Error in trigger printer detection endpoint:', error);
      res.status(500).json({ 
        error: 'Internal server error during printer detection trigger',
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Endpoint to get detailed USB device information for debugging
  app.get('/usb-debug', async (req, res) => {
    try {
      const { exec } = require('child_process');
      const { promisify } = require('util');
      const execAsync = promisify(exec);
      
      // Get USB device list
      const { stdout: lsusbOutput } = await execAsync('lsusb');
      
      // Get user groups
      const { stdout: groupsOutput } = await execAsync('groups');
      
      // Get current user
      const { stdout: whoamiOutput } = await execAsync('whoami');
      
      // Get USB device details
      const { stdout: usbDetails } = await execAsync('lsusb -v 2>/dev/null | head -50');
      
      res.json({
        lsusb: lsusbOutput,
        groups: groupsOutput.trim(),
        user: whoamiOutput.trim(),
        usbDetails: usbDetails,
        printerState: getPrinterState(),
        isConnected: isPrinterConnected()
      });
    } catch (error) {
      console.error('Error getting USB debug info:', error);
      res.status(500).json({ 
        error: 'Failed to get USB debug information',
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  return app;
}

export function startServer(app: express.Application, port: number = 3001): void {
  // Load environment variables
  dotenv.config();
  
  // Load access token and printer_id on startup
  const { token: accessToken, printerId } = loadTokenFromEnv();
  
  app.listen(port, () => {
    console.log(`🚀 OpenSteri Printer Portal server running on http://localhost:${port}`);
    console.log(`📡 WiFi scanning and connection management available`);
    console.log(`📁 Static files served from /static/`);
    
    if (accessToken && printerId) {
      console.log(`🔑 Access token and printer ID loaded from .env file`);
      console.log(`🖨️  Initializing automatic subscription for printer: ${printerId}`);
      
      // Initialize automatic subscription using the access token and printer ID
      initializePrinterConnectionWithCredentials(accessToken, printerId)
        .then(() => {
          console.log(`✅ Automatic subscription established for printer: ${printerId}`);
        })
        .catch((error) => {
          console.error(`❌ Failed to establish automatic subscription for printer: ${printerId}`, error);
        });
    } else {
      console.log(`⚠️  No access token or printer ID found. Use /join endpoint to authenticate.`);
    }
  });
} 