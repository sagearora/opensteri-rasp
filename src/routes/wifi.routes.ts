import { Router, Request, Response } from 'express';
import { WiFiService } from '../services/wifi.service';
import { WiFiConnection } from '../types';

const router = Router();

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
router.get('/wifi', async (req: Request, res: Response) => {
  try {
    const status = await WiFiService.getStatus();
    res.json(status);
  } catch (error) {
    console.error('WiFi status error:', error);
    res.status(500).json({ error: 'Failed to get WiFi status' });
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

// Setup endpoint: list available WiFi networks with details
router.get('/setup', async (req: Request, res: Response) => {
  try {
    const networks = await WiFiService.scanNetworksDetailed();
    res.json(networks);
  } catch (error) {
    console.error('WiFi setup scan error:', error);
    res.status(500).json({ error: 'Failed to scan WiFi networks' });
  }
});

export default router; 