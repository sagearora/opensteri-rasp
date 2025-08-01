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
      
      // Use nmcli to connect to the WiFi network
      const command = `nmcli device wifi connect "${network}" password "${password}"`;
      
      try {
        await execAsync(command);
        res.json({ message: 'Successfully connected to WiFi network' });
      } catch (connectError) {
        console.error('Error connecting to WiFi:', connectError);
        res.status(500).json({ 
          error: 'Failed to connect to WiFi network. Please check your credentials and try again.' 
        });
      }
    } catch (error) {
      console.error('Error in connect endpoint:', error);
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