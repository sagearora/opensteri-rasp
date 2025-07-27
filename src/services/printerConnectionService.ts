/**
 * Printer Connection Service
 * 
 * Handles the initialization and management of printer connections,
 * including GraphQL client setup, command subscriptions, and heartbeat monitoring.
 */

import { setLatestPrinterInfo } from '../routes/routes';
import { fetchPrinterInfo } from './fetchPrinterInfo';
import { getClient } from './graphqlClient';
import { handleCommand } from './handleCommand';
import { startPrinterHeartbeat } from './startHeartbeat';
import { subscribeToCommands } from './subscribePrinterCommands';
import { loadToken, saveToken } from './tokenStore';
import { getCurrentVersion, getCurrentVersionNumber } from './versionManager';

/**
 * Log version information to console
 * 
 * This function logs the current version information to the console
 * for debugging and monitoring purposes.
 */
function logVersionInfo(): void {
  try {
    const version = getCurrentVersion();
    const versionNumber = getCurrentVersionNumber();
    
    console.log('=== Version Information ===');
    console.log(`Version: ${version}`);
    console.log(`Version Number: ${versionNumber}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log('==========================');
  } catch (error) {
    console.error('Failed to log version info:', error);
    console.log('=== Version Information ===');
    console.log('Version: unknown');
    console.log('Version Number: 0');
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log('==========================');
  }
}

/**
 * Initialize printer connection using stored credentials
 * 
 * This function attempts to restore a previous printer connection
 * by loading stored token and printer_id, then establishing
 * GraphQL connections and setting up monitoring.
 * 
 * @returns Promise<void>
 */
export async function initializePrinterConnection(): Promise<void> {
  try {
    // Log version information on startup
    logVersionInfo();
    
    const stored = await loadToken();
    
    if (!stored || !stored.token || !stored.printer_id) {
      console.log('No stored printer credentials found. Printer will remain disconnected until manual connection.');
      return;
    }

    console.log('Found stored printer credentials, attempting to restore connection...');
    
    // Establish GraphQL connections
    const { wsClient, httpClient } = await getClient(stored.token);
    
    // Set up command subscription
    subscribeToCommands(wsClient, stored.printer_id, (command) => 
      handleCommand(httpClient, command)
    );
    
    // Fetch and store latest printer information
    const printerInfo = await fetchPrinterInfo(httpClient, stored.printer_id);
    setLatestPrinterInfo(printerInfo);
    
    // Start heartbeat monitoring
    startPrinterHeartbeat(httpClient, stored.printer_id);
    
    console.log('Printer connection restored successfully');
  } catch (error) {
    console.error('Failed to initialize printer connection:', error);
    throw error;
  }
} 

/**
 * Initialize printer connection with fresh credentials
 * 
 * This function establishes a new printer connection using provided
 * token and printer_id, then sets up GraphQL connections and monitoring.
 * 
 * @param token - The authentication token for the printer
 * @param printerId - The unique identifier for the printer
 * @returns Promise<any> - The printer information
 */
export async function initializePrinterConnectionWithCredentials(token: string, printerId: string): Promise<any> {
  try {
    // Log version information
    logVersionInfo();
    
    console.log('Initializing printer connection with fresh credentials...');
    
    // Establish GraphQL connections
    const { wsClient, httpClient } = await getClient(token);
    
    // Set up command subscription
    subscribeToCommands(wsClient, printerId, (command) => 
      handleCommand(httpClient, command)
    );
    
    // Fetch and store latest printer information
    const printerInfo = await fetchPrinterInfo(httpClient, printerId);
    setLatestPrinterInfo(printerInfo);
    
    // Start heartbeat monitoring
    startPrinterHeartbeat(httpClient, printerId);
    
    console.log('Printer connection initialized successfully');
    
    return printerInfo;
  } catch (error) {
    console.error('Failed to initialize printer connection with credentials:', error);
    throw error;
  }
}

/**
 * Save credentials and initialize printer connection
 * 
 * This function saves the provided credentials and then initializes
 * the printer connection using the printerConnectionService.
 * 
 * @param token - The authentication token for the printer
 * @param printerId - The unique identifier for the printer
 * @returns Promise<any> - The printer information
 */
export async function saveCredentialsAndInitializeConnection(token: string, printerId: string): Promise<any> {
  try {
    // Save the credentials first
    await saveToken(token, printerId);
    
    // Initialize the connection using the service
    const printerInfo = await initializePrinterConnectionWithCredentials(token, printerId);
    
    return printerInfo;
  } catch (error) {
    console.error('Failed to save credentials and initialize connection:', error);
    throw error;
  }
} 