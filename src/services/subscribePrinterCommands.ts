/**
 * Printer Command Subscription Service
 * 
 * This service manages WebSocket subscriptions to printer commands from the GraphQL backend,
 * providing real-time command processing capabilities.
 * 
 * Commands are received via GraphQL subscriptions and forwarded to the command handler.
 * 
 * @author Printer Management System
 * @version 1.0.0
 */

import { Client } from 'graphql-ws';
import { PrinterCommandFragment, WatchPrinterCommandsDocument } from '../__generated/graphql';

/**
 * Interface for subscription options
 */
export interface SubscriptionOptions {
  onError?: (error: unknown) => void;
  onComplete?: () => void;
}

/**
 * Subscribe to printer commands via WebSocket
 * 
 * This function establishes a GraphQL subscription to receive real-time
 * printer commands from the backend. When commands are received, they
 * are forwarded to the provided callback function for processing.
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
export function subscribeToCommands(
  wsClient: Client, 
  printerId: string, 
  onCommand: (command: PrinterCommandFragment) => void,
  options: SubscriptionOptions = {}
): ReturnType<Client['subscribe']> {
  try {
    console.log(`Subscribing to commands for printer: ${printerId}`);
    
    const subscription = wsClient.subscribe(
      { 
        query: WatchPrinterCommandsDocument.loc?.source.body!, 
        variables: { printerId } 
      },
      {
        next: ({ data }: { data?: { printer_command?: PrinterCommandFragment[] } }) => {
          if (data?.printer_command && data.printer_command.length > 0) {
            console.log(`Received ${data.printer_command.length} command(s) for printer ${printerId}`);
            data.printer_command.forEach((command, index) => {
              console.log(`Processing command ${index + 1}/${data.printer_command!.length}: ${command.command}`);
              onCommand(command);
            });
          }
        },
        error: (err: unknown) => {
          console.error('Printer command subscription error:', err);
          if (options.onError) {
            options.onError(err);
          }
        },
        complete: () => {
          console.log('Printer command subscription completed');
          if (options.onComplete) {
            options.onComplete();
          }
        },
      }
    );
    
    console.log('Printer command subscription established successfully');
    return subscription;
  } catch (error) {
    console.error('Failed to subscribe to printer commands:', error);
    throw new Error(`Command subscription failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
