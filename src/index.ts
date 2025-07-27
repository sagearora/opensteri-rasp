/**
 * Main entry point for the Printer Management System
 * 
 * This application provides a REST API for managing WiFi connections,
 * printer authentication, and label printing functionality.
 * 
 * @author Printer Management System
 * @version 1.0.0
 */

import { config } from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

// Load environment variables
config({ path: '.config' });

// Import routes and services
import wifiRoutes, { setLatestPrinterInfo } from './routes/routes';
import { initializePrinterConnection } from './services/printerConnectionService';

// Configuration
const PORT = parseInt(process.env.PORT || '3001', 10);
const HOST = process.env.HOST || '0.0.0.0';

// Create Express application
const app = express();

// Middleware configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routes
app.use('/', wifiRoutes);

/**
 * Initialize the application
 * - Loads stored printer credentials
 * - Establishes GraphQL connections
 * - Sets up printer monitoring
 */
async function initializeApplication(): Promise<void> {
  try {
    console.log('Initializing Printer Management System...');
    
    // Initialize printer connection if credentials are available
    await initializePrinterConnection();
    
    console.log('Application initialization completed successfully');
  } catch (error) {
    console.error('Failed to initialize application:', error);
    process.exit(1);
  }
}

/**
 * Start the HTTP server
 */
function startServer(): void {
  app.listen(PORT, HOST, () => {
    console.log(`🚀 Printer Management System running on http://${HOST}:${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

// Application startup
(async () => {
  await initializeApplication();
  startServer();
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
