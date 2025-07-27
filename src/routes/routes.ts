/**
 * WiFi and Printer Management Routes
 * 
 * This module provides REST API endpoints for:
 * - WiFi network scanning and connection
 * - Printer authentication and joining
 * - Printer status monitoring
 * - Label printing functionality
 * 
 * @author Printer Management System
 * @version 1.0.0
 */

import { Request, Response, Router } from 'express';
import { WiFiService } from '../services/wifi.service';
import { PrinterService } from '../services/printerService';
import { WiFiConnection } from '../types';
import { getCurrentVersion, getCurrentVersionNumber } from '../services/versionManager';
import { saveCredentialsAndInitializeConnection } from '../services/printerConnectionService';

const router = Router();

// Global state for latest printer information
let latestPrinterInfo: any = null;

/**
 * Set the latest printer information for status endpoints
 * 
 * @param info - The latest printer information object
 */
export function setLatestPrinterInfo(info: any): void {
  latestPrinterInfo = info;
}

/**
 * Get version information for the current system
 * 
 * @returns object with version information
 */
function getVersionInfo() {
  try {
    const version = getCurrentVersion();
    const versionNumber = getCurrentVersionNumber();
    
    return {
      version,
      versionNumber,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Failed to get version info:', error);
    return {
      version: 'unknown',
      versionNumber: 0,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * GET /scan
 * 
 * Scans for available WiFi networks in the vicinity
 * 
 * @param req - Express request object
 * @param res - Express response object
 * @returns JSON array of available network SSIDs
 */
router.get('/scan', async (req: Request, res: Response) => {
  try {
    const networks = await WiFiService.scanNetworks();
    res.json(networks);
  } catch (error) {
    console.error('WiFi scan error:', error);
    res.status(500).json({ 
      error: 'Failed to scan WiFi networks',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /
 * 
 * Returns the current status of WiFi connection and printer information
 * 
 * @param req - Express request object
 * @param res - Express response object
 * @returns JSON object with WiFi status and printer info
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const status = await WiFiService.getStatus();
    res.json({
      wifi: status,
      printer_info: latestPrinterInfo,
    });
  } catch (error) {
    console.error('Error getting status:', error);
    res.status(500).json({ 
      error: 'Failed to get status',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * POST /connect
 * 
 * Attempts to connect to a WiFi network
 * 
 * This endpoint responds immediately with a success acknowledgment,
 * then attempts the connection asynchronously. If the connection fails,
 * the system will automatically restore the access point mode.
 * 
 * @param req.body.ssid - The SSID of the network to connect to
 * @param req.body.password - The password for the network
 * @param res - Express response object
 * @returns JSON acknowledgment of the connection attempt
 */
router.post('/connect', async (req: Request, res: Response) => {
  try {
    const connection: WiFiConnection = req.body;

    // Validate required fields
    if (!connection.ssid || !connection.password) {
      return res.status(400).json({ 
        error: 'SSID and password are required',
        received: { ssid: !!connection.ssid, password: !!connection.password }
      });
    }

    // Respond immediately to acknowledge the request
    res.status(200).json({ 
      success: true, 
      message: 'WiFi connection request received, attempting to connect...' 
    });

    // Run the connection logic asynchronously
    (async () => {
      try {
        console.log(`Attempting to connect to WiFi: ${connection.ssid}`);
        
        // Attempt WiFi connection
        const wifiResult = await WiFiService.connect(connection);
        
        if (!wifiResult.success) {
          console.error('WiFi connection failed:', wifiResult.message);
          await WiFiService.startAccessPoint();
          return;
        }

        console.log('WiFi connected successfully, waiting for network setup...');

        // Wait for network to stabilize, then check connectivity
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
    res.status(500).json({ 
      error: 'Connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * POST /join
 * 
 * Authenticates and joins a printer to the system
 * 
 * This endpoint responds immediately with a success acknowledgment,
 * then attempts the printer authentication asynchronously.
 * 
 * @param req.body.printer_id - The unique identifier for the printer
 * @param req.body.join_code - The authentication code for joining
 * @param res - Express response object
 * @returns JSON acknowledgment of the join attempt
 */
router.post('/join', async (req: Request, res: Response) => {
  const { printer_id, join_code } = req.body;
  
  // Validate required fields
  if (!printer_id || !join_code) {
    return res.status(400).json({ 
      error: 'printer_id and join_code are required',
      received: { printer_id: !!printer_id, join_code: !!join_code }
    });
  }

  // Respond immediately to acknowledge the request
  res.status(200).json({ 
    success: true, 
    message: 'Join request received, attempting to authenticate printer...' 
  });

  // Run the join logic asynchronously
  (async () => {
    try {
      // Check internet connectivity first
      const status = await WiFiService.getStatus();
      if (!status.connected || !status.ip) {
        console.error('No internet connectivity available for printer join');
        return;
      }

      console.log('Proceeding to printer join...');

      // Attempt printer authentication
      const joinResult = await PrinterService.joinPrinter(printer_id, join_code);
      
      if (joinResult.success) {
        // Use printerConnectionService to initialize the printer connection
        try {
          const printerInfo = await saveCredentialsAndInitializeConnection(joinResult.token!, joinResult.printer_id!);
          setLatestPrinterInfo(printerInfo);
          console.log('Printer join successful and connection initialized!');
        } catch (connectionError) {
          console.error('Failed to initialize printer connection:', connectionError);
          // Even if connection initialization fails, the join was successful
          // so we still set the printer info if available
          if (joinResult.printerInfo) {
            setLatestPrinterInfo(joinResult.printerInfo);
          }
        }
      } else {
        console.error('Printer join failed:', joinResult.error);
      }
    } catch (error) {
      console.error('Error in join process:', error);
    }
  })();
});

/**
 * GET /printer-status
 * 
 * Returns the current status of the connected printer
 * 
 * @param req - Express request object
 * @param res - Express response object
 * @returns JSON object with printer connection status
 */
router.get('/printer-status', async (req: Request, res: Response) => {
  try {
    const printerState = PrinterService.getPrinterState();
    res.json(printerState);
  } catch (error) {
    console.error('Error getting printer status:', error);
    res.status(500).json({ 
      error: 'Failed to get printer status',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * POST /print-labels
 * 
 * Sends label data to the connected printer for printing
 * 
 * @param req.body.labels - Array of label objects to print
 * @param res - Express response object
 * @returns JSON response with print operation result
 */
router.post('/print-labels', async (req: Request, res: Response) => {
  try {
    const { labels } = req.body;
    
    // Validate input
    if (!labels || !Array.isArray(labels)) {
      return res.status(400).json({ 
        error: 'labels array is required',
        received: typeof labels
      });
    }

    const printerState = PrinterService.getPrinterState();
    if (!printerState.connected) {
      return res.status(400).json({ 
        error: 'Printer is not connected',
        printerState 
      });
    }

    const response = await PrinterService.printLabels(labels);
    res.json(response);
  } catch (error) {
    console.error('Error printing labels:', error);
    res.status(500).json({ 
      error: 'Failed to print labels',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * POST /test-print
 * 
 * Sends a test label to the connected printer
 * 
 * @param req - Express request object
 * @param res - Express response object
 * @returns JSON response with test print operation result
 */
router.post('/test-print', async (req: Request, res: Response) => {
  try {
    const printerState = PrinterService.getPrinterState();
    if (!printerState.connected) {
      return res.status(400).json({ 
        error: 'Printer is not connected',
        printerState 
      });
    }

    const response = await PrinterService.printTestLabel();
    res.json(response);
  } catch (error) {
    console.error('Error printing test label:', error);
    res.status(500).json({ 
      error: 'Failed to print test label',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /version
 * 
 * Returns the current version information of the printer management system
 * 
 * @param req - Express request object
 * @param res - Express response object
 * @returns JSON object with version information
 */
router.get('/version', async (req: Request, res: Response) => {
  try {
    const versionInfo = getVersionInfo();
    res.json(versionInfo);
  } catch (error) {
    console.error('Error getting version info:', error);
    res.status(500).json({ 
      error: 'Failed to get version info',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 