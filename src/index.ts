/**
 * Main entry point for the Printer Management System
 * 
 * This application provides printer authentication and label printing functionality
 * using environment-based authentication instead of a REST API.
 * 
 * @author Printer Management System
 * @version 1.0.0
 */

import 'dotenv/config';

// Import services
import { initializePrinterConnection } from './services/printerConnectionService';
import { stopPrinterHeartbeat } from './services/startHeartbeat';

// Import Express server
import { createServer, startServer } from './server';

/**
 * Initialize the application
 * - Loads environment authentication data
 * - Establishes GraphQL connections
 * - Sets up printer monitoring with archived_at watching
 * - Starts Express server for WiFi management
 */
async function initializeApplication(): Promise<void> {
  try {
    console.log('Initializing Printer Management System...');
    
    // Initialize printer connection using environment authentication
    await initializePrinterConnection();
    
    // Start Express server for WiFi management
    const app = createServer();
    startServer(app, 3001);
    
    console.log('Application initialization completed successfully');
  } catch (error) {
    console.error('Failed to initialize application:', error);
    process.exit(1);
  }
}

/**
 * Cleanup function for graceful shutdown
 */
function cleanup(): void {
  console.log('Performing cleanup...');
  
  // Stop heartbeat monitoring
  stopPrinterHeartbeat();
  
  console.log('Cleanup completed');
}

// Application startup
(async () => {
  await initializeApplication();
})();

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  cleanup();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  cleanup();
  process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  cleanup();
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  cleanup();
  process.exit(1);
});
