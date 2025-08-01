import express from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execAsync = promisify(exec);

// Configuration for WiFi operations
const WIFI_CONFIG = {
  useSudo: true, // Set to false if running as root or with proper permissions
  sudoCommand: 'sudo', // Can be changed to 'pkexec' or other privilege escalation methods
  fallbackToNonSudo: true // Try without sudo if sudo fails
};

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

  return app;
}

export function startServer(app: express.Application, port: number = 3001): void {
  app.listen(port, () => {
    console.log(`🚀 OpenSteri Printer Portal server running on http://localhost:${port}`);
    console.log(`📡 WiFi scanning and connection management available`);
    console.log(`📁 Static files served from /static/`);
  });
} 