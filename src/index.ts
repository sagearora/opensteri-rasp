import bodyParser from 'body-parser';
import { exec } from 'child_process';
import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../frontend/dist')));

function scanWifi(callback: (ssids: string[]) => void): void {
  console.log('Starting WiFi scan...');
  
  // First, force a rescan of all WiFi devices
  exec('nmcli device wifi rescan', (rescanErr) => {
    if (rescanErr) {
      console.error('Rescan error:', rescanErr);
    }
    
    // Wait longer for the rescan to complete, then list all networks
    setTimeout(() => {
      console.log('Fetching WiFi networks...');
      
      // Use a more comprehensive command to get all WiFi networks
      // Added --rescan to force another scan and get fresh results
      exec('nmcli --terse --fields SSID,SIGNAL,SECURITY device wifi list --rescan yes', (err, stdout) => {
        if (err) {
          console.error('WiFi list error:', err);
          console.error('Trying fallback command...');
          
          // Fallback to simpler command without --rescan
          exec('nmcli -t -f SSID,SIGNAL device wifi list', (fallbackErr, fallbackStdout) => {
            if (fallbackErr) {
              console.error('Fallback WiFi list error:', fallbackErr);
              return callback([]);
            }
            
            const fallbackSsids = parseScanOutput(fallbackStdout);
            console.log(`Found ${fallbackSsids.length} networks (fallback)`);
            callback(fallbackSsids);
          });
          return;
        }

        const ssids = parseScanOutput(stdout);
        console.log(`Found ${ssids.length} networks`);
        callback(ssids);
      });
    }, 4000); // Increased timeout to 4 seconds
  });
}

function parseScanOutput(stdout: string): string[] {
  console.log('Raw nmcli output:', stdout.substring(0, 200) + '...');
  
  const lines = stdout
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && line !== '*');

  const seen = new Map<string, number>();
  
  lines.forEach((line, index) => {
    console.log(`Processing line ${index}: "${line}"`);
    
    // Split on colon, but handle SSIDs that might contain colons
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) {
      console.log(`Skipping line ${index}: no colon found`);
      return;
    }
    
    const ssid = line.substring(0, colonIndex).trim();
    const remainder = line.substring(colonIndex + 1);
    
    // Find the signal strength (should be the first numeric value after SSID)
    const parts = remainder.split(':');
    let signal = 0;
    
    for (const part of parts) {
      const trimmedPart = part.trim();
      if (trimmedPart && !isNaN(Number(trimmedPart))) {
        signal = Number(trimmedPart);
        break;
      }
    }
    
    // Skip empty SSIDs but allow hidden networks (they might show as empty or special chars)
    if (ssid && ssid !== '--' && signal > 0) {
      console.log(`Found network: "${ssid}" with signal ${signal}`);
      // Keep the strongest signal for each SSID
      if (!seen.has(ssid) || seen.get(ssid)! < signal) {
        seen.set(ssid, signal);
      }
    } else {
      console.log(`Skipped network: SSID="${ssid}", signal=${signal}`);
    }
  });

  // Sort by signal strength (strongest first) and return SSIDs
  const sorted = [...seen.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([ssid]) => ssid);

  console.log('Final sorted networks:', sorted);
  return sorted;
}


// Serve React app for all unmatched routes except API
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

app.get('/connect', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../views', 'connect.html'));
});

// Serve shared CSS file
app.get('/shared.css', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../views', 'shared.css'));
});

// Serve scanned SSIDs
app.get('/api/scan', (req: Request, res: Response) => {
  scanWifi((ssids) => {
    res.json(ssids);
  });
});

// Serve current Wi-Fi status
app.get('/api/wifi', (req: Request, res: Response) => {
  // Get active Wi-Fi connection SSID
  exec('nmcli -t -f active,ssid dev wifi | grep "^yes" | cut -d\':\' -f2', (err, ssidStdout) => {
    const ssid = ssidStdout.trim() || null;
    if (!ssid) {
      return res.json({ connected: false, ssid: null, ip: null });
    }
    // Get IP address for wlan0
    exec('nmcli -t -f IP4.ADDRESS dev show wlan0 | grep -oP "(?<=:)[^/]+"', (ipErr, ipStdout) => {
      const ip = ipStdout.trim() || null;
      res.json({ connected: true, ssid, ip });
    });
  });
});

// Handle connection
app.post('/api/connect', (req: Request, res: Response) => {
  const { ssid, password } = req.body as { ssid: string; password: string };
  const cmd = `sudo /usr/bin/nmcli dev wifi connect "${ssid}" password "${password}"`;

  exec('sudo systemctl stop raspapd.service', () => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        return res.send(`<h1>Failed to connect</h1><pre>${stderr}</pre>`);
      }

      res.send(`<h1>Connected to ${ssid}</h1><p>Rebooting...</p>`);
      exec('sudo reboot');
    });
  });
});

app.listen(3001, '0.0.0.0', () => console.log('Portal running on port 3001')); 