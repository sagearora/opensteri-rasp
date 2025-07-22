import bodyParser from 'body-parser';
import { exec } from 'child_process';
import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../frontend/dist')));

function scanWifi(callback: (ssids: string[]) => void): void {
  exec('nmcli device wifi rescan', () => {
    exec('nmcli -f SSID,SIGNAL device wifi list', (err, stdout) => {
      if (err) return callback([]);

      const lines = stdout
        .split('\n')
        .slice(1)
        .map(line => line.trim())
        .filter(line => line);

      const seen = new Map<string, number>();
      lines.forEach(line => {
        const match = line.match(/^(.+?)\s+(\d+)$/);
        if (!match) return;
        const [, ssid, signal] = match;
        if (!seen.has(ssid) || seen.get(ssid)! < Number(signal)) {
          seen.set(ssid, Number(signal));
        }
      });

      const sorted = [...seen.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([ssid]) => ssid);

      callback(sorted);
    });
  });
}


// Serve React app for all unmatched routes except API
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

app.get('/connect', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../views', 'connect.html'));
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

app.listen(8080, () => console.log('Portal running on port 8080')); 