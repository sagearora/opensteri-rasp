/**
 * Printer Hardware Management Service
 * 
 * This service handles direct USB communication with GoDEX printers,
 * including device detection, connection management, and command transmission.
 * 
 * Supports GoDEX printers with vendor ID 6495 and product ID 1.
 * Optimized for Raspberry Pi OS with proper permission handling.
 * 
 * @author Dr. Saj Arora
 * @version 1.0.0
 */

import { Device, OutEndpoint, findByIds, usb } from 'usb';
import { format } from 'date-fns';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Printer hardware constants
const PRINTER_VENDOR_ID = 6495;
const PRINTER_PRODUCT_ID = 1;

// Global device state
let device: Device | undefined;
let out_endpoint: OutEndpoint | undefined;

/**
 * Interface for printer connection state
 */
export interface PrinterConnectionState {
  connected: boolean;
  lastUpdated: string;
  vendorId: number;
  productId: number;
  error?: string;
}

// Store the last known printer connection state
let printerConnectionState: PrinterConnectionState = {
  connected: false,
  lastUpdated: new Date().toISOString(),
  vendorId: PRINTER_VENDOR_ID,
  productId: PRINTER_PRODUCT_ID
};

/**
 * Update the printer connection state
 * 
 * @param connected - Whether the printer is currently connected
 * @param error - Optional error message
 */
const updatePrinterState = (connected: boolean, error?: string): void => {
  printerConnectionState = {
    ...printerConnectionState,
    connected,
    lastUpdated: new Date().toISOString(),
    error
  };
  console.log(`Printer state updated: ${connected ? 'connected' : 'disconnected'} at ${printerConnectionState.lastUpdated}${error ? ` - Error: ${error}` : ''}`);
};

/**
 * Check USB permissions on Raspberry Pi OS
 * 
 * @returns Promise<boolean> - True if user has proper USB permissions
 */
const checkUSBPermissions = async (): Promise<boolean> => {
  try {
    // Check if user is in plugdev group
    const { stdout } = await execAsync('groups');
    const groups = stdout.trim().split(' ');
    
    if (groups.includes('plugdev')) {
      console.log('User is in plugdev group - USB permissions OK');
      return true;
    }
    
    // Check if running as root
    if (process.getuid && process.getuid() === 0) {
      console.log('Running as root - USB permissions OK');
      return true;
    }
    
    console.warn('User not in plugdev group and not running as root - USB access may fail');
    return false;
  } catch (error) {
    console.error('Error checking USB permissions:', error);
    return false;
  }
};

/**
 * List all USB devices for debugging
 * 
 * @returns Promise<string> - List of USB devices
 */
const listUSBDevices = async (): Promise<string> => {
  try {
    const { stdout } = await execAsync('lsusb');
    return stdout;
  } catch (error) {
    console.error('Error listing USB devices:', error);
    return 'Failed to list USB devices';
  }
};

/**
 * Initialize a USB device for printer communication
 * 
 * This function sets up the USB interface, claims the endpoint,
 * and prepares the device for command transmission.
 * 
 * @param _device - The USB device to initialize
 */
const initDevice = async (_device: Device): Promise<void> => {
  console.log('Initializing GoDEX printer connection...');
  
  try {
    // Check USB permissions first
    const hasPermissions = await checkUSBPermissions();
    if (!hasPermissions) {
      const errorMsg = 'USB permissions issue. Add user to plugdev group or run as root.';
      console.error(errorMsg);
      updatePrinterState(false, errorMsg);
      return;
    }
    
    _device.open();
    const ifc = _device.interface(0);
    
    // Detach kernel driver if active
    if (ifc.isKernelDriverActive()) {
      try {
        ifc.detachKernelDriver();
        console.log('Detached kernel driver for printer interface');
      } catch (e) {
        console.error('Error detaching kernel driver:', e);
        _device.close();
        updatePrinterState(false, `Failed to detach kernel driver: ${e}`);
        return;
      }
    }
    
    // Claim the interface
    ifc.claim();
    console.log('Claimed printer interface');
    
    // Find the output endpoint
    const endpoint = ifc.endpoints.find(e => e.direction === 'out') as OutEndpoint | undefined;
    if (!endpoint) {
      ifc.release();
      _device.close();
      const errorMsg = 'Failed to get out endpoint for GoDEX printer';
      console.error(errorMsg);
      updatePrinterState(false, errorMsg);
      return;
    }
    
    // Store device references
    out_endpoint = endpoint;
    device = _device;
    updatePrinterState(true);
    
    console.log('GoDEX printer initialized successfully');
  } catch (error) {
    const errorMsg = `Error initializing printer device: ${error}`;
    console.error(errorMsg);
    updatePrinterState(false, errorMsg);
  }
};

// USB event handlers
usb.on('attach', async (d: Device) => {
  if (d.deviceDescriptor.idVendor === PRINTER_VENDOR_ID && 
      d.deviceDescriptor.idProduct === PRINTER_PRODUCT_ID) {
    console.log('GoDEX printer detected, initializing...');
    await initDevice(d);
  }
});

usb.on('detach', () => {
  const _device = findByIds(PRINTER_VENDOR_ID, PRINTER_PRODUCT_ID);
  if (!_device) {
    device = undefined;
    out_endpoint = undefined;
    updatePrinterState(false);
    console.log('GoDEX printer disconnected');
  }
});

// Initialize printer on startup if connected
const initializePrinterOnStartup = async (): Promise<void> => {
  try {
    console.log('Checking for GoDEX printer on startup...');
    
    // List USB devices for debugging
    const usbDevices = await listUSBDevices();
    console.log('Available USB devices:', usbDevices);
    
    const connected = findByIds(PRINTER_VENDOR_ID, PRINTER_PRODUCT_ID);
    if (connected) {
      console.log('GoDEX printer found on startup, initializing...');
      await initDevice(connected);
    } else {
      updatePrinterState(false, 'No GoDEX printer found on startup');
      console.log('No GoDEX printer found on startup');
    }
  } catch (error) {
    const errorMsg = `Error during startup printer detection: ${error}`;
    console.error(errorMsg);
    updatePrinterState(false, errorMsg);
  }
};

// Initialize printer on startup
initializePrinterOnStartup();

/**
 * Check if the printer is currently connected
 * 
 * @returns boolean - True if printer is connected and ready
 */
export const isPrinterConnected = (): boolean => {
  return !!(device && out_endpoint);
};

/**
 * Get the current printer connection state
 * 
 * @returns PrinterConnectionState - Current printer status
 */
export const getPrinterState = (): PrinterConnectionState => {
  return printerConnectionState;
};

/**
 * Manually trigger printer detection
 * This can be called to re-check for connected printers
 * 
 * @returns Promise<boolean> - True if printer is found and initialized
 */
export const triggerPrinterDetection = async (): Promise<boolean> => {
  try {
    console.log('Manually triggering printer detection...');
    
    // List USB devices for debugging
    const usbDevices = await listUSBDevices();
    console.log('Available USB devices during manual detection:', usbDevices);
    
    const connected = findByIds(PRINTER_VENDOR_ID, PRINTER_PRODUCT_ID);
    if (connected) {
      console.log('GoDEX printer found during manual detection, initializing...');
      await initDevice(connected);
      return true;
    } else {
      console.log('No GoDEX printer found during manual detection');
      updatePrinterState(false, 'No GoDEX printer found during manual detection');
      return false;
    }
  } catch (error) {
    const errorMsg = `Error during manual printer detection: ${error}`;
    console.error(errorMsg);
    updatePrinterState(false, errorMsg);
    return false;
  }
};

/**
 * Send a command to the connected printer
 * 
 * @param cmd - The command string to send to the printer
 * @returns Promise<number> - Number of bytes sent, or rejects with error
 */
export const sendToPrinter = async (cmd: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    if (!out_endpoint) {
      reject(new Error('Printer not available'));
      return;
    }
    
    out_endpoint.transfer(Buffer.from(cmd, 'utf-8'), (error, size) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(size);
    });
  });
};

/**
 * Printer layout configuration command
 * Sets up the printer for label printing with specific formatting
 */
export const PrinterLayoutCmd = `^Q25,3\n^W50\n^H5\n^P1\n^S2\n^AD\n^C1\n^R0\n~Q+0\n^O0\n^D0\n^E12\n~R255`;

/**
 * Maximum content size for label text
 */
const MaxContentSize = 14;

/**
 * Interface for label data
 */
export interface LabelData {
  id: string;
  name: string;
  category: string;
  user_name: string;
  created_at: string;
  expiry_at: string;
  qr: string;
}

/**
 * Create a printer command for a label
 * 
 * This function generates the specific command string needed to print
 * a label with the provided data, including text formatting and QR code.
 * 
 * @param labelData - The label data to format into a command
 * @returns string - The formatted printer command
 */
export const createLabelCmd = (labelData: LabelData): string => {
  const { id, name, category, user_name, created_at, expiry_at, qr } = labelData;
  
  return `^L\nDy2-me-dd\nTh:m:s\nAA,4,9,1,1,0,0,#${id} - ${category}\nAC,4,29,1,1,0,0,${name
    .slice(0, MaxContentSize)}\nAC,4,59,1,1,0,0,${name
      .slice(MaxContentSize, MaxContentSize * 2)}\nAC,4,100,1,1,0,0,${user_name}\nAA,4,135,1,1,0,0,Date: ${format(created_at, 'yyyy-MM-dd HH:mm')}\nAA,4,162,1,1,0,0,Exp: ${format(expiry_at, 'yyyy-MM-dd HH:mm')}\nW218,9,5,2,M0,8,6,${qr.length},0\n${qr}\nE\n`;
};