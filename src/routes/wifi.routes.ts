import { Router, Request, Response } from 'express';
import { WiFiService } from '../services/wifi.service';
import { WiFiConnection } from '../types';
import fetch from 'node-fetch';
import { saveToken } from '../services/graphqlTokenStore';
import { startPrinterSubscription } from '../services/subscribePrintLabels';

const router = Router();

let latestPrinterInfo: any = null;

export function setLatestPrinterInfo(info: any) {
  latestPrinterInfo = info;
}

// Scan for available WiFi networks
router.get('/scan', async (req: Request, res: Response) => {
  try {
    const networks = await WiFiService.scanNetworks();
    res.json(networks);
  } catch (error) {
    console.error('WiFi scan error:', error);
    res.status(500).json({ error: 'Failed to scan WiFi networks' });
  }
});

// Get current WiFi status
router.get('/', async (req, res) => {
  try {
    const status = await WiFiService.getStatus();
    res.json({
      wifi: status,
      printer_info: latestPrinterInfo,
    });
  } catch (error) {
    console.error('Error getting status:', error);
    res.status(500).json({ error: 'Failed to get status' });
  }
});

// Connect to WiFi network
router.post('/connect', async (req: Request, res: Response) => {
  try {
    const connection: WiFiConnection = req.body;
    
    if (!connection.ssid || !connection.password) {
      return res.status(400).send('<h1>Error</h1><p>SSID and password are required</p>');
    }

    const result = await WiFiService.connect(connection);
    
    if (result.success) {
      res.send(`<h1>Connected to ${connection.ssid}</h1><p>Rebooting...</p>`);
    } else {
      res.send(`<h1>Failed to connect</h1><pre>${result.message}</pre>`);
    }
  } catch (error) {
    console.error('WiFi connect error:', error);
    res.status(500).send('<h1>Error</h1><p>Connection failed</p>');
  }
});

router.post('/join', async (req, res) => {
  const { printer_id, join_code, ssid, password } = req.body;
  if (!printer_id || !join_code || !ssid) {
    return res.status(400).json({ error: 'printer_id, join_code and ssid are required' });
  }

  // 1. Try to connect to WiFi first
  try {
    const wifiResult = await WiFiService.connect({ ssid, password });
    if (!wifiResult.success) {
      // If WiFi connection fails, restore AP and return error
      await WiFiService.startAccessPoint();
      return res.status(500).json({ error: 'Failed to connect to WiFi: ' + wifiResult.message });
    }
  } catch (err) {
    await WiFiService.startAccessPoint();
    return res.status(500).json({ error: 'WiFi connection error' });
  }

  // 2. Check for internet connectivity before proceeding
  try {
    const status = await WiFiService.getStatus();
    if (!status.connected || !status.ip) {
      await WiFiService.startAccessPoint();
      return res.status(500).json({ error: 'Connected to WiFi but no internet access' });
    }
  } catch (err) {
    await WiFiService.startAccessPoint();
    return res.status(500).json({ error: 'Failed to verify internet connection' });
  }

  // 3. Proceed to printer join
  const joinUrl = process.env.JOIN_URL;
  if (!joinUrl) {
    return res.status(500).json({ error: 'JOIN_URL must be set in environment' });
  }

  try {
    const response = await fetch(joinUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ printer_id, join_code }),
    });
    const data = await response.json();
    // Save token and printer_id if join was successful
    if (data.ok && typeof data.token === 'string' && typeof data.printer_id === 'string') {
      await saveToken(data.token, data.printer_id);
      // Start subscription after join
      startPrinterSubscription(data.printer_id, (labels) => {
        console.log('New labels after join:', labels);
      });
    }
    console.log('Join URL response:', data);
    return res.status(200).json({ success: true, join_response: data });
  } catch (error) {
    console.error('Error calling join URL:', error);
    return res.status(500).json({ error: 'Failed to call join URL' });
  }
});


export default router; 