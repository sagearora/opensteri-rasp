/**
 * Main entry point for the Printer Management System
 * 
 * This application provides printer authentication and label printing functionality
 * using environment-based authentication instead of a REST API.
 * 
 * @author Printer Management System
 * @version 1.0.0
 */

import { config } from 'dotenv';

// Load environment variables
config({ path: '.config' });

// Import services
import { initializePrinterConnection } from './services/printerConnectionService';

/**
 * Initialize the application
 * - Loads environment authentication data
 * - Establishes GraphQL connections
 * - Sets up printer monitoring
 */
async function initializeApplication(): Promise<void> {
  try {
    console.log('Initializing Printer Management System...');
    
    // Initialize printer connection using environment authentication
    await initializePrinterConnection();
    
    console.log('Application initialization completed successfully');
  } catch (error) {
    console.error('Failed to initialize application:', error);
    process.exit(1);
  }
}

// Application startup
(async () => {
  await initializeApplication();
})();

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  process.exit(0);
});
