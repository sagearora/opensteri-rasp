/**
 * Printer Connection Service
 * 
 * Handles the initialization and management of printer connections,
 * including GraphQL client setup, command subscriptions, and heartbeat monitoring.
 * Now uses environment-based authentication instead of stored tokens.
 */

import { fetchPrinterInfo } from './fetchPrinterInfo';
import { getClient } from './graphqlClient';
import { handleCommand } from './handleCommand';
import { startPrinterHeartbeat } from './startHeartbeat';
import { subscribeToPrinter } from './subscribePrinter';
import { getCurrentVersion, getCurrentVersionNumber } from './versionManager';
import { initializeEnvironmentAuth } from './environmentAuth';

// Global state for latest printer information
let latestPrinterInfo: any = null;
let currentSubscription: ReturnType<typeof subscribeToPrinter> | null = null;

/**
 * Set the latest printer information for status monitoring
 * 
 * @param info - The latest printer information object
 */
export function setLatestPrinterInfo(info: any): void {
  latestPrinterInfo = info;
}

/**
 * Get the latest printer information
 * 
 * @returns The latest printer information or null if not available
 */
export function getLatestPrinterInfo(): any {
  return latestPrinterInfo;
}

/**
 * Log version information on startup
 */
function logVersionInfo(): void {
  const version = getCurrentVersion();
  const versionNumber = getCurrentVersionNumber();
  
  console.log('==========================');
  console.log('Printer Management System');
  console.log(`Version: ${version}`);
  console.log(`Version Number: ${versionNumber}`);
  console.log('==========================');
}

/**
 * Initialize printer connection using environment authentication
 * 
 * This function attempts to establish a printer connection
 * using the environment file created on boot with printer_id and join token.
 * It authenticates using the join token to get an access token,
 * then establishes GraphQL connections and sets up monitoring.
 * 
 * @returns Promise<void>
 */
export async function initializePrinterConnection(): Promise<void> {
  try {
    // Log version information on startup
    logVersionInfo();
    
    console.log('Initializing printer connection using environment authentication...');
    
    // Initialize environment authentication
    const authResult = await initializeEnvironmentAuth();
    
    if (!authResult.success || !authResult.access_token || !authResult.printer_id) {
      console.log('No valid authentication data found. Printer will remain disconnected until environment is configured.');
      return;
    }

    console.log('Authentication successful, establishing GraphQL connections...');
    
    // Establish GraphQL connections using access token
    const { wsClient, httpClient } = await getClient(authResult.access_token);
    
    // Set up printer subscription (includes command handling and archived monitoring)
    currentSubscription = subscribeToPrinter(
      wsClient, 
      authResult.printer_id, 
      (command) => handleCommand(httpClient, command),
      {
        onArchived: () => {
          console.log('Printer archived callback triggered');
          // The subscription will be automatically cleaned up when archived
        }
      }
    );
    
    // Fetch and store latest printer information
    const printerInfo = await fetchPrinterInfo(httpClient, authResult.printer_id);
    setLatestPrinterInfo(printerInfo);
    
    // Start heartbeat monitoring
    startPrinterHeartbeat(httpClient, authResult.printer_id);

    await httpClient.updatePrinter({
      printerId: authResult.printer_id,
      set: {
        update_started_at: null
      }
    });
    
    console.log('Printer connection established successfully using environment authentication');
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
    
    // Set up printer subscription (includes command handling and archived monitoring)
    currentSubscription = subscribeToPrinter(
      wsClient, 
      printerId, 
      (command) => handleCommand(httpClient, command),
      {
        onArchived: () => {
          console.log('Printer archived callback triggered');
          // The subscription will be automatically cleaned up when archived
        }
      }
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
    // Initialize the connection using the service
    const printerInfo = await initializePrinterConnectionWithCredentials(token, printerId);
    
    return printerInfo;
  } catch (error) {
    console.error('Failed to save credentials and initialize connection:', error);
    throw error;
  }
} 