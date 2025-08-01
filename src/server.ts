import express from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execAsync = promisify(exec);

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
      // Use nmcli to scan for WiFi networks
      const { stdout } = await execAsync('nmcli -t -f SSID,SIGNAL device wifi list');
      
      // Parse the output to extract SSID and signal strength
      const networks = stdout
        .trim()
        .split('\n')
        .filter(line => line && !line.startsWith('*')) // Filter out connected network
        .map(line => {
          const [ssid, signal] = line.split(':');
          return {
            ssid: ssid || 'Hidden Network',
            signal: signal ? parseInt(signal) : 0
          };
        })
        .filter(network => network.ssid && network.ssid !== '--') // Filter out empty or invalid entries
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
      
      // Use nmcli with sudo to connect to the WiFi network
      const command = `sudo nmcli device wifi connect "${network}" password "${password}"`;
      
      try {
        await execAsync(command);
        res.json({ message: 'Successfully connected to WiFi network' });
      } catch (connectError) {
        console.error('Error connecting to WiFi:', connectError);
        
        // Check if it's a sudo permission error
        const errorMessage = connectError instanceof Error ? connectError.message : String(connectError);
        if (errorMessage.includes('sudo') || errorMessage.includes('Insufficient privileges')) {
          res.status(500).json({ 
            error: 'Sudo privileges required. Please ensure the application has sudo access or run with appropriate permissions.' 
          });
        } else {
          res.status(500).json({ 
            error: 'Failed to connect to WiFi network. Please check your credentials and try again.' 
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
      // Use nmcli to disconnect from the current WiFi network
      const command = 'sudo nmcli device disconnect $(nmcli -t -f DEVICE,TYPE device | grep wifi | cut -d: -f1)';
      
      try {
        await execAsync(command);
        res.json({ message: 'Successfully disconnected from WiFi network' });
      } catch (disconnectError) {
        console.error('Error disconnecting from WiFi:', disconnectError);
        
        // Check if it's a sudo permission error
        const errorMessage = disconnectError instanceof Error ? disconnectError.message : String(disconnectError);
        if (errorMessage.includes('sudo') || errorMessage.includes('Insufficient privileges')) {
          res.status(500).json({ 
            error: 'Sudo privileges required. Please ensure the application has sudo access or run with appropriate permissions.' 
          });
        } else {
          res.status(500).json({ 
            error: 'Failed to disconnect from WiFi network. Please try again.' 
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