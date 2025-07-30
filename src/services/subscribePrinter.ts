/**
 * Printer Subscription Service
 * 
 * This service manages WebSocket subscriptions to printer data from the GraphQL backend,
 * providing real-time monitoring of printer status including archived_at field.
 * 
 * When archived_at is set to non-null, it triggers cleanup operations.
 * 
 * @author Printer Management System
 * @version 1.0.0
 */

import { Client } from 'graphql-ws';
import { PrinterFragment, WatchPrinterDocument } from '../__generated/graphql';
import { clearEnvironmentAuth } from './environmentAuth';
import { stopPrinterHeartbeat } from './startHeartbeat';

/**
 * Interface for subscription options
 */
export interface PrinterSubscriptionOptions {
  onError?: (error: unknown) => void;
  onComplete?: () => void;
  onArchived?: () => void;
}

/**
 * Subscribe to printer data via WebSocket
 * 
 * This function establishes a GraphQL subscription to receive real-time
 * printer data from the backend. When the printer is archived (archived_at is set),
 * it triggers cleanup operations including clearing environment variables
 * and disconnecting subscriptions.
 * 
 * The subscription automatically handles reconnection and error recovery
 * through the GraphQL WebSocket client configuration.
 * 
 * @param wsClient - The GraphQL WebSocket client instance
 * @param printerId - The unique identifier for the printer to subscribe to
 * @param onCommand - Callback function to handle received commands
 * @param options - Optional subscription configuration
 * @returns Subscription - The GraphQL subscription object
 */
export function subscribeToPrinter(
  wsClient: Client, 
  printerId: string, 
  onCommand: (command: any) => void,
  options: PrinterSubscriptionOptions = {}
): ReturnType<Client['subscribe']> {
  try {
    console.log(`Subscribing to printer data for printer: ${printerId}`);
    
    const subscription = wsClient.subscribe(
      { 
        query: WatchPrinterDocument.loc?.source.body!, 
        variables: { printerId } 
      },
      {
        next: ({ data }: { data?: { printer_by_pk?: PrinterFragment } }) => {
          if (data?.printer_by_pk) {
            const printer = data.printer_by_pk;
            console.log(`Received printer data for printer: ${printerId}`);
            
            // Check if printer is archived
            if (printer.archived_at) {
              console.log(`Printer ${printerId} has been archived at ${printer.archived_at}. Starting cleanup...`);
              
              // Trigger cleanup operations
              handlePrinterArchived(printerId, options);
            }
            
            // Handle commands if they exist
            if (printer.commands && printer.commands.length > 0) {
              console.log(`Received ${printer.commands.length} command(s) for printer ${printerId}`);
              printer.commands.forEach((command, index) => {
                console.log(`Processing command ${index + 1}/${printer.commands!.length}: ${command.command}`);
                onCommand(command);
              });
            }
          }
        },
        error: (err: unknown) => {
          console.error('Printer subscription error:', err);
          if (options.onError) {
            options.onError(err);
          }
        },
        complete: () => {
          console.log('Printer subscription completed');
          if (options.onComplete) {
            options.onComplete();
          }
        },
      }
    );
    
    console.log('Printer subscription established successfully');
    return subscription;
  } catch (error) {
    console.error('Failed to subscribe to printer:', error);
    throw new Error(`Printer subscription failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Handle printer archived cleanup
 * 
 * This function performs cleanup operations when a printer is archived:
 * - Clears printer_id and printer_token from .env file
 * - Stops heartbeat monitoring
 * - Disconnects any active subscriptions
 * 
 * @param printerId - The unique identifier for the archived printer
 * @param options - Optional callback for when archived
 */
async function handlePrinterArchived(printerId: string, options: PrinterSubscriptionOptions): Promise<void> {
  try {
    console.log(`Starting cleanup for archived printer: ${printerId}`);
    
    // Stop heartbeat monitoring
    stopPrinterHeartbeat();
    console.log('Heartbeat monitoring stopped');
    
    // Clear environment authentication data
    await clearEnvironmentAuth();
    console.log('Environment authentication data cleared');
    
    // Call archived callback if provided
    if (options.onArchived) {
      options.onArchived();
    }
    
    console.log(`Cleanup completed for archived printer: ${printerId}`);
  } catch (error) {
    console.error('Failed to handle printer archived cleanup:', error);
  }
} 