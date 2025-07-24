import bodyParser from 'body-parser';
import { exec } from 'child_process';
import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../frontend/dist')));

function scanWifi(callback: (ssids: string[]) => void): void {
  console.log('Starting WiFi scan...');
  
  // First check WiFi interface status
  exec('nmcli device status | grep wifi', (statusErr, statusStdout) => {
    console.log('WiFi device status:', statusStdout);
    
    // Get the WiFi device name
    exec('nmcli device | grep wifi | awk \'{print $1}\'', (deviceErr, deviceStdout) => {
      const wifiDevice = deviceStdout.trim() || 'wlan0';
      console.log('WiFi device:', wifiDevice);
      
      // Force a rescan using the specific device
      const rescanCmd = `nmcli device wifi rescan ifname ${wifiDevice}`;
      console.log('Running rescan command:', rescanCmd);
      
      exec(rescanCmd, (rescanErr, rescanStdout, rescanStderr) => {
        if (rescanErr) {
          console.error('Rescan error:', rescanErr);
          console.error('Rescan stderr:', rescanStderr);
        }
        console.log('Rescan output:', rescanStdout);
        
        // Wait longer for the rescan to complete, then try multiple approaches
        setTimeout(() => {
          console.log('Fetching WiFi networks...');
          
          // Try approach 1: Force rescan and list all
          const scanCmd1 = `nmcli -t -f SSID,SIGNAL,SECURITY device wifi list ifname ${wifiDevice} --rescan yes`;
          console.log('Trying command 1:', scanCmd1);
          
          exec(scanCmd1, (err1, stdout1) => {
            if (!err1 && stdout1) {
              const ssids1 = parseScanOutput(stdout1);
              if (ssids1.length > 1) {
                console.log(`Success with command 1: Found ${ssids1.length} networks`);
                return callback(ssids1);
              }
            }
            
            console.log('Command 1 failed or insufficient results, trying command 2...');
            
            // Try approach 2: List without forcing rescan
            const scanCmd2 = `nmcli -t -f SSID,SIGNAL device wifi list ifname ${wifiDevice}`;
            console.log('Trying command 2:', scanCmd2);
            
            exec(scanCmd2, (err2, stdout2) => {
              if (!err2 && stdout2) {
                const ssids2 = parseScanOutput(stdout2);
                if (ssids2.length > 1) {
                  console.log(`Success with command 2: Found ${ssids2.length} networks`);
                  return callback(ssids2);
                }
              }
              
              console.log('Command 2 failed or insufficient results, trying command 3...');
              
              // Try approach 3: Use iwlist scan as fallback
              const scanCmd3 = `sudo iwlist ${wifiDevice} scan | grep -E "ESSID|Signal level" | grep -B1 "ESSID" | grep "Signal level" -A1`;
              console.log('Trying command 3 (iwlist):', scanCmd3);
              
              exec(scanCmd3, (err3, stdout3) => {
                if (!err3 && stdout3) {
                  const ssids3 = parseIwlistOutput(stdout3);
                  if (ssids3.length > 0) {
                    console.log(`Success with iwlist: Found ${ssids3.length} networks`);
                    return callback(ssids3);
                  }
                }
                
                console.log('All scan methods failed, trying basic nmcli...');
                
                // Final fallback: Basic nmcli without device specification
                exec('nmcli -t -f SSID device wifi list', (err4, stdout4) => {
                  if (err4) {
                    console.error('Final fallback failed:', err4);
                    return callback([]);
                  }
                  
                  const ssids4 = parseScanOutput(stdout4);
                  console.log(`Final fallback found ${ssids4.length} networks`);
                  callback(ssids4);
                });
              });
            });
          });
        }, 5000); // Increased timeout to 5 seconds
      });
    });
  });
}

function parseIwlistOutput(stdout: string): string[] {
  console.log('Parsing iwlist output...');
  const lines = stdout.split('\n').map(l => l.trim()).filter(l => l);
  const ssids: string[] = [];
  
  for (const line of lines) {
    if (line.includes('ESSID:')) {
      const match = line.match(/ESSID:"([^"]+)"/);
      if (match && match[1] && match[1] !== '') {
        ssids.push(match[1]);
      }
    }
  }
  
  // Remove duplicates and return
  const uniqueSsids = [...new Set(ssids)];
  console.log('iwlist found SSIDs:', uniqueSsids);
  return uniqueSsids;
}

function parseScanOutput(stdout: string): string[] {
  console.log('Raw nmcli output length:', stdout.length);
  console.log('Raw nmcli output preview:', stdout.substring(0, 300) + '...');
  
  if (!stdout || stdout.trim().length === 0) {
    console.log('Empty stdout received');
    return [];
  }
  
  const lines = stdout
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && line !== '*' && line !== '' && line !== '--');

  console.log(`Processing ${lines.length} lines from nmcli output`);
  
  const seen = new Map<string, number>();
  
  lines.forEach((line, index) => {
    console.log(`Processing line ${index}: "${line}"`);
    
    // Split on colon, but handle SSIDs that might contain colons
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) {
      // If no colon, might be just an SSID without signal info
      const ssid = line.trim();
      if (ssid && ssid !== '--' && ssid !== '') {
        console.log(`Found SSID without signal: "${ssid}"`);
        seen.set(ssid, 50); // Default signal strength
      }
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
    
    // Be more lenient with SSID filtering
    if (ssid && ssid !== '--' && ssid !== '' && ssid !== '\\x00') {
      console.log(`Found network: "${ssid}" with signal ${signal}`);
      // Keep the strongest signal for each SSID
      if (!seen.has(ssid) || seen.get(ssid)! < signal) {
        seen.set(ssid, Math.max(signal, 1)); // Ensure at least signal 1
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