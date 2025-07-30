/**
 * Printer Heartbeat Service
 * 
 * This service manages periodic heartbeat updates to the GraphQL backend,
 * ensuring the printer's online status is maintained and monitored.
 * 
 * The heartbeat interval is configurable via environment variables.
 * 
 * @author Printer Management System
 * @version 1.0.0
 */

import { Sdk } from "../__generated/graphql";
import { HEARTBEAT_INTERVAL_SECONDS } from "../constant";
import { getCurrentVersionNumber } from "./versionManager";

// Global state
let heartbeatInterval: NodeJS.Timeout | null = null;

/**
 * Update the printer's last seen timestamp and version number in the backend
 * 
 * This function sends a heartbeat update to the GraphQL backend,
 * updating the printer's last_seen_at field and version_number to indicate
 * the printer is still online and responsive with current version.
 * 
 * @param sdk - The GraphQL SDK instance for making mutations
 * @param printerId - The unique identifier for the printer
 * @returns Promise<any> - Result of the heartbeat update
 * @throws Error if the heartbeat update fails
 */
async function updatePrinterHeartbeat(sdk: Sdk, printerId: string): Promise<any> {
  try {
    console.log(`Sending heartbeat for printer: ${printerId}`);

    // Get current version number
    const version_number = getCurrentVersionNumber();
    console.log(`Current version number: ${version_number}`);

    const { update_printer_by_pk } = await sdk.updatePrinter({
      printerId,
      set: { version_number, last_seen_at: "now()" }
    });

    console.log('Heartbeat sent successfully');
    return update_printer_by_pk;
  } catch (error) {
    console.error('Failed to send heartbeat:', error);
    throw new Error(`Heartbeat failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Start the printer heartbeat monitoring
 * 
 * This function initiates periodic heartbeat updates to the GraphQL backend.
 * If a heartbeat interval is already running, it will be cleared before
 * starting a new one. The first heartbeat is sent immediately.
 * 
 * @param sdk - The GraphQL SDK instance for making mutations
 * @param printerId - The unique identifier for the printer
 * @returns Promise<void> - Resolves when heartbeat is started successfully
 */
export async function startPrinterHeartbeat(sdk: Sdk, printerId: string): Promise<void> {
  try {
    // Clear any existing heartbeat interval
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
      console.log('Cleared existing heartbeat interval');
    }

    console.log(`Starting printer heartbeat with ${HEARTBEAT_INTERVAL_SECONDS}s interval`);

    // Set up periodic heartbeat
    heartbeatInterval = setInterval(async () => {
      try {
        await updatePrinterHeartbeat(sdk, printerId);
      } catch (error) {
        console.error('Heartbeat interval error:', error);
        // Don't throw here to prevent interval from stopping
      }
    }, HEARTBEAT_INTERVAL_SECONDS * 1000);

    // Send initial heartbeat immediately
    await updatePrinterHeartbeat(sdk, printerId);

    console.log('Printer heartbeat started successfully');
  } catch (error) {
    console.error('Failed to start printer heartbeat:', error);
    throw error;
  }
}

/**
 * Stop the printer heartbeat monitoring
 * 
 * This function stops the periodic heartbeat updates by clearing
 * the heartbeat interval.
 * 
 * @returns void
 */
export function stopPrinterHeartbeat(): void {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
    heartbeatInterval = null;
    console.log('Printer heartbeat stopped');
  }
}
