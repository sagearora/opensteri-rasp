import { exec } from 'child_process';
import { WiFiStatus, WiFiConnection } from '../types';

export class WiFiService {
  
  static async scanNetworks(): Promise<string[]> {
    return new Promise((resolve) => {
      this.getWiFiDevice((device) => {
        this.performScan(device, resolve);
      });
    });
  }

  static async getStatus(): Promise<WiFiStatus> {
    return new Promise((resolve) => {
      // Get active Wi-Fi connection SSID
      exec('nmcli -t -f active,ssid dev wifi | grep "^yes" | cut -d\':\' -f2', (err, ssidStdout) => {
        const ssid = ssidStdout.trim() || null;
        if (!ssid) {
          return resolve({ connected: false, ssid: null, ip: null });
        }
        
        // Get IP address for wlan0
        exec('nmcli -t -f IP4.ADDRESS dev show wlan0 | grep -oP "(?<=:)[^/]+"', (ipErr, ipStdout) => {
          const ip = ipStdout.trim() || null;
          resolve({ connected: true, ssid, ip });
        });
      });
    });
  }

  static async connect(connection: WiFiConnection): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      const cmd = `sudo /usr/bin/nmcli dev wifi connect "${connection.ssid}" password "${connection.password}"`;

      exec('sudo systemctl stop raspapd.service', () => {
        exec(cmd, (err, stdout, stderr) => {
          if (err) {
            resolve({ success: false, message: stderr });
          } else {
            // Reboot after successful connection
            setTimeout(() => exec('sudo reboot'), 1000);
            resolve({ success: true, message: `Connected to ${connection.ssid}` });
          }
        });
      });
    });
  }

  private static getWiFiDevice(callback: (device: string) => void): void {
    exec('nmcli device | grep wifi | grep -v "p2p" | head -1 | awk \'{print $1}\'', (err, stdout) => {
      const device = stdout.trim() || 'wlan0';
      callback(device);
    });
  }

  private static performScan(device: string, callback: (ssids: string[]) => void): void {
    // Force rescan
    exec(`sudo nmcli device wifi rescan ifname ${device}`, (rescanErr) => {
      if (rescanErr) {
        console.error('WiFi rescan failed:', rescanErr.message);
      }

      setTimeout(() => {
        this.tryScanMethodsSequentially(device, callback);
      }, 3000);
    });
  }

  private static tryScanMethodsSequentially(device: string, callback: (ssids: string[]) => void): void {
    // Method 1: nmcli with rescan
    const cmd1 = `nmcli -t -f SSID,SIGNAL device wifi list ifname ${device} --rescan yes`;
    exec(cmd1, (err1, stdout1) => {
      if (!err1 && stdout1) {
        const ssids1 = this.parseNmcliOutput(stdout1);
        if (ssids1.length > 1) {
          return callback(ssids1);
        }
      }

      // Method 2: nmcli without rescan
      const cmd2 = `nmcli -t -f SSID,SIGNAL device wifi list ifname ${device}`;
      exec(cmd2, (err2, stdout2) => {
        if (!err2 && stdout2) {
          const ssids2 = this.parseNmcliOutput(stdout2);
          if (ssids2.length > 1) {
            return callback(ssids2);
          }
        }

        // Method 3: iwlist fallback
        const cmd3 = `sudo iwlist ${device} scan | grep "ESSID:" | grep -v '""'`;
        exec(cmd3, (err3, stdout3) => {
          if (!err3 && stdout3) {
            const ssids3 = this.parseIwlistOutput(stdout3);
            if (ssids3.length > 0) {
              return callback(ssids3);
            }
          }

          // Final fallback
          exec('nmcli -t -f SSID device wifi list', (err4, stdout4) => {
            const ssids4 = err4 ? [] : this.parseNmcliOutput(stdout4);
            callback(ssids4);
          });
        });
      });
    });
  }

  private static parseNmcliOutput(stdout: string): string[] {
    if (!stdout?.trim()) return [];

    const lines = stdout
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && line !== '*' && line !== '--');

    const networkMap = new Map<string, number>();

    lines.forEach(line => {
      const colonIndex = line.indexOf(':');
      
      if (colonIndex === -1) {
        const ssid = line.trim();
        if (ssid && ssid !== '--') {
          networkMap.set(ssid, 50);
        }
        return;
      }

      const ssid = line.substring(0, colonIndex).trim();
      const remainder = line.substring(colonIndex + 1);
      
      let signal = 0;
      const parts = remainder.split(':');
      
      for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart && !isNaN(Number(trimmedPart))) {
          signal = Number(trimmedPart);
          break;
        }
      }

      if (ssid && ssid !== '--' && ssid !== '\\x00') {
        const currentSignal = networkMap.get(ssid) || 0;
        networkMap.set(ssid, Math.max(signal, currentSignal, 1));
      }
    });

    return [...networkMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([ssid]) => ssid);
  }

  private static parseIwlistOutput(stdout: string): string[] {
    const lines = stdout.split('\n').map(l => l.trim()).filter(l => l);
    const ssids: string[] = [];

    for (const line of lines) {
      const match = line.match(/ESSID:"([^"]+)"/);
      if (match && match[1] && match[1] !== '<hidden>') {
        ssids.push(match[1]);
      }
    }

    return [...new Set(ssids)];
  }
} 