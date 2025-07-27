/**
 * Printer Hardware Management Service
 * 
 * This service handles direct USB communication with GoDEX printers,
 * including device detection, connection management, and command transmission.
 * 
 * Supports GoDEX printers with vendor ID 6495 and product ID 1.
 * 
 * @author Printer Management System
 * @version 1.0.0
 */

import { Device, OutEndpoint, findByIds, usb } from 'usb';
import { format } from 'date-fns';

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
 */
const updatePrinterState = (connected: boolean): void => {
  printerConnectionState = {
    ...printerConnectionState,
    connected,
    lastUpdated: new Date().toISOString()
  };
  console.log(`Printer state updated: ${connected ? 'connected' : 'disconnected'} at ${printerConnectionState.lastUpdated}`);
};

/**
 * Initialize a USB device for printer communication
 * 
 * This function sets up the USB interface, claims the endpoint,
 * and prepares the device for command transmission.
 * 
 * @param _device - The USB device to initialize
 */
const initDevice = (_device: Device): void => {
  console.log('Initializing GoDEX printer connection...');
  
  try {
    _device.open();
    const ifc = _device.interface(0);
    
    // Detach kernel driver if active
    if (ifc.isKernelDriverActive()) {
      try {
        ifc.detachKernelDriver();
      } catch (e) {
        console.error('Error detaching kernel driver:', e);
        _device.close();
        updatePrinterState(false);
        return;
      }
    }
    
    // Claim the interface
    ifc.claim();
    
    // Find the output endpoint
    const endpoint = ifc.endpoints.find(e => e.direction === 'out') as OutEndpoint | undefined;
    if (!endpoint) {
      ifc.release();
      _device.close();
      console.error('Failed to get out endpoint for GoDEX printer');
      updatePrinterState(false);
      return;
    }
    
    // Store device references
    out_endpoint = endpoint;
    device = _device;
    updatePrinterState(true);
    
    console.log('GoDEX printer initialized successfully');
  } catch (error) {
    console.error('Error initializing printer device:', error);
    updatePrinterState(false);
  }
};

// USB event handlers
usb.on('attach', (d: Device) => {
  if (d.deviceDescriptor.idVendor === PRINTER_VENDOR_ID && 
      d.deviceDescriptor.idProduct === PRINTER_PRODUCT_ID) {
    console.log('GoDEX printer detected, initializing...');
    initDevice(d);
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
const connected = findByIds(PRINTER_VENDOR_ID, PRINTER_PRODUCT_ID);
if (connected) {
  console.log('GoDEX printer found on startup, initializing...');
  initDevice(connected);
} else {
  updatePrinterState(false);
  console.log('No GoDEX printer found on startup');
}

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