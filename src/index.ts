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
import { stopPrinterHeartbeat } from './services/startHeartbeat';
import { startUpdateChecker, stopUpdateChecker } from './services/updateCheckerService';

// Import Express server
import { createServer, startServer } from './server';

// Import constants
import { UPDATE_CHECK_ENABLED, UPDATE_CHECK_SCHEDULED_TIME } from './constant';

/**
 * Initialize the application
 * - Loads environment authentication data
 * - Establishes GraphQL connections
 * - Sets up printer monitoring with archived_at watching
 * - Starts Express server for WiFi management
 * - Starts periodic update checking if enabled
 */
async function initializeApplication(): Promise<void> {
  try {
    console.log('Initializing Printer Management System...');
    
    // Start Express server for WiFi management
    const app = createServer();
    startServer(app, 3001);
    
    // Start scheduled update checking if enabled
    if (UPDATE_CHECK_ENABLED) {
      console.log(`Starting scheduled update checker for daily updates at ${UPDATE_CHECK_SCHEDULED_TIME}...`);
      startUpdateChecker(UPDATE_CHECK_SCHEDULED_TIME);
    } else {
      console.log('Scheduled update checking is disabled');
    }
    
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
  
  // Stop update checker
  stopUpdateChecker();
  
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
