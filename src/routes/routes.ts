import { Router, Request, Response, response } from 'express';
import { WiFiService } from '../services/wifi.service';
import { WiFiConnection } from '../types';
import fetch from 'node-fetch';
import { saveToken } from '../services/graphqlTokenStore';
import { startPrinterSubscription } from '../services/subscribePrintLabels';
import { createLabelCmd, getPrinterState, PrinterLayoutCmd, sendToPrinter } from '../services/checkPrinter';

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
      return res.status(400).json({ error: 'SSID and password are required' });
    }

    // Respond immediately to acknowledge the request
    res.status(200).json({ success: true, message: 'WiFi connection request received, attempting to connect...' });

    // Run the connection logic asynchronously
    (async () => {
      try {
        // 1. Try to connect to WiFi
        console.log(`Attempting to connect to WiFi: ${connection.ssid}`);
        const wifiResult = await WiFiService.connect(connection);
        if (!wifiResult.success) {
          // If WiFi connection fails, restore AP
          console.error('WiFi connection failed:', wifiResult.message);
          await WiFiService.startAccessPoint();
          return;
        }

        console.log('WiFi connected successfully, waiting for network setup...');

        // 2. Wait a bit for network to stabilize, then check connectivity
        await new Promise(resolve => setTimeout(resolve, 5000));

        const status = await WiFiService.getStatus();
        if (!status.connected || !status.ip) {
          console.error('Connected to WiFi but no internet access');
          await WiFiService.startAccessPoint();
          return;
        }

        console.log('Internet connectivity confirmed, WiFi setup complete!');
      } catch (error) {
        console.error('Error in WiFi connection process:', error);
        try {
          await WiFiService.startAccessPoint();
        } catch (apError) {
          console.error('Failed to restore access point:', apError);
        }
      }
    })();
  } catch (error) {
    console.error('WiFi connect error:', error);
    res.status(500).json({ error: 'Connection failed' });
  }
});

router.post('/join', async (req, res) => {
  const { printer_id, join_code } = req.body;
  if (!printer_id || !join_code) {
    return res.status(400).json({ error: 'printer_id and join_code are required' });
  }

  // Respond immediately to acknowledge the request
  res.status(200).json({ success: true, message: 'Join request received, attempting to authenticate printer...' });

  // Run the join logic asynchronously
  (async () => {
    try {
      // Check if we have internet connectivity first
      const status = await WiFiService.getStatus();
      if (!status.connected || !status.ip) {
        console.error('No internet connectivity available for printer join');
        return;
      }

      console.log('Proceeding to printer join...');

      // Proceed to printer join
      const joinUrl = process.env.JOIN_URL;
      if (!joinUrl) {
        console.error('JOIN_URL must be set in environment');
        return;
      }

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
        setLatestPrinterInfo(
          await startPrinterSubscription(data.printer_id, (labels) => {
            console.log('New labels after join:', labels);
          })
        );
        console.log('Printer join successful!');
      } else {
        console.error('Printer join failed:', data);
      }
    } catch (error) {
      console.error('Error in join process:', error);
    }
  })();
});

// Get printer connection status
router.get('/printer-status', async (req: Request, res: Response) => {
  try {
    const printerState = getPrinterState();
    res.json(printerState);
  } catch (error) {
    console.error('Error getting printer status:', error);
    res.status(500).json({ error: 'Failed to get printer status' });
  }
});

router.post('/print-labels', async (req: Request, res: Response) => {
  const { labels } = req.body;
  if (!labels || !Array.isArray(labels)) {
    return res.status(400).json({ error: 'labels are required' });
  }
  const printerState = getPrinterState();
  if (!printerState.connected) {
    return res.status(400).json({ error: 'Printer is not connected' });
  }
  const labelCmd = labels.map(label => createLabelCmd(label));
  const response = await sendToPrinter([PrinterLayoutCmd, ...labelCmd].join('\n'));
  res.json(response);
});

router.post('/test-print', async (req: Request, res: Response) => {
  const printerState = getPrinterState();
  if (!printerState.connected) {
    return res.status(400).json({ error: 'Printer is not connected' });
  }
  const labelCmd = createLabelCmd({
    id: '1',
    name: 'WELCOME',
    category: 'Test Category',
    user_name: 'Test User',
    created_at: new Date().toISOString(),
    expiry_at: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    qr: 'https://www.google.com',
  });
  const response = await sendToPrinter([PrinterLayoutCmd, labelCmd].join('\n'));
  res.json(response);
});


export default router; 