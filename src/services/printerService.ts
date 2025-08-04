/**
 * Printer Service
 * 
 * Handles all printer-related operations including:
 * - Printer connection management
 * - Label printing functionality
 * - Printer authentication and joining
 * - Status monitoring
 * 
 * @author Dr. Saj Arora
 * @version 1.0.0
 */

import fetch from 'node-fetch';
import { 
  createLabelCmd, 
  getPrinterState as getPrinterStateFromCheck, 
  PrinterLayoutCmd, 
  sendToPrinter,
  LabelData as CheckPrinterLabelData
} from './checkPrinter';
import { JOIN_URL } from '../constant';

/**
 * Interface for label data structure
 */
export interface LabelData extends CheckPrinterLabelData {}

/**
 * Interface for printer join result
 */
export interface PrinterJoinResult {
  success: boolean;
  error?: string;
  printerInfo?: any;
  token?: string;
  printer_id?: string;
}

/**
 * Interface for print operation result
 */
export interface PrintResult {
  success: boolean;
  message: string;
  bytesSent?: number;
}

/**
 * Printer Service class for centralized printer operations
 */
export class PrinterService {
  /**
   * Get the current printer connection state
   */
  static getPrinterState() {
    return getPrinterStateFromCheck();
  }

  /**
   * Join a printer to the system using provided credentials
   * 
   * @param printerId - The unique identifier for the printer
   * @param joinCode - The authentication code for joining
   * @returns Promise<PrinterJoinResult> - Result of the join operation
   */
  static async joinPrinter(printerId: string, joinCode: string): Promise<PrinterJoinResult> {
    try {
      const joinUrl = JOIN_URL;
      
      const response = await fetch(joinUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ printer_id: printerId, join_code: joinCode }),
      });

      const data = await response.json();

      // Validate response and return credentials if successful
      if (data.ok && typeof data.token === 'string' && typeof data.printer_id === 'string') {
        return {
          success: true,
          token: data.token,
          printer_id: data.printer_id
        };
      } else {
        return {
          success: false,
          error: 'Invalid response from join server'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error during printer join'
      };
    }
  }

  /**
   * Print multiple labels
   * 
   * @param labels - Array of label data objects to print
   * @returns Promise<PrintResult> - Result of the print operation
   */
  static async printLabels(labels: LabelData[]): Promise<PrintResult> {
    try {
      const labelCommands = labels.map(label => createLabelCmd(label));
      const commandString = [PrinterLayoutCmd, ...labelCommands].join('\n');
      
      const bytesSent = await sendToPrinter(commandString);
      
      return {
        success: true,
        message: `Successfully printed ${labels.length} labels`,
        bytesSent: typeof bytesSent === 'number' ? bytesSent : undefined
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error during printing'
      };
    }
  }

  /**
   * Print a test label
   * 
   * @returns Promise<PrintResult> - Result of the test print operation
   */
  static async printTestLabel(): Promise<PrintResult> {
    try {
      const testLabel: LabelData = {
        id: '1',
        name: 'WELCOME',
        category: 'Test Category',
        user_name: 'Test User',
        created_at: new Date().toISOString(),
        expiry_at: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        qr: 'https://www.google.com',
      };

      const labelCommand = createLabelCmd(testLabel);
      const commandString = [PrinterLayoutCmd, labelCommand].join('\n');
      
      const bytesSent = await sendToPrinter(commandString);
      
      return {
        success: true,
        message: 'Test label printed successfully',
        bytesSent: typeof bytesSent === 'number' ? bytesSent : undefined
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error during test printing'
      };
    }
  }
} 