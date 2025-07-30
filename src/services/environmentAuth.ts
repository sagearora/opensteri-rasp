/**
 * Environment Authentication Service
 * 
 * This service handles authentication using environment variables
 * that are created on system boot with printer_id and join token.
 * It uses the join token to authenticate and get an access token
 * for all subscriptions and heartbeat operations.
 * 
 * @author Printer Management System
 * @version 1.0.0
 */

import { promises as fs } from 'fs';
import path from 'path';
import { getClient } from './graphqlClient';
import fetch from 'node-fetch';
import { JOIN_URL } from '../constant';
import { PrinterService } from './printerService';

/**
 * Interface for environment authentication data
 */
export interface EnvironmentAuthData {
  printer_id: string;
  join_token: string;
}

/**
 * Interface for authentication result
 */
export interface AuthResult {
  success: boolean;
  access_token?: string;
  printer_id?: string;
  error?: string;
}

/**
 * Load authentication data from environment file
 * 
 * This function reads the environment file created on boot
 * and extracts the printer_id and join_token.
 * 
 * @returns Promise<EnvironmentAuthData | null> - Authentication data or null if not found
 */
export async function loadEnvironmentAuth(): Promise<EnvironmentAuthData | null> {
  try {
    // First try to read from .env file
    const printer_id: string | undefined = process.env.PRINTER_ID;
    const join_token: string | undefined = process.env.PRINTER_JOIN_TOKEN;

    if (printer_id && join_token) {
      console.log('Environment authentication data loaded successfully');
      return { printer_id, join_token };
    }

    console.warn('Incomplete environment authentication data found');
    return null;
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      console.log('No environment file found');
    } else {
      console.error('Error loading environment authentication data:', error);
    }
    return null;
  }
}

/**
 * Clear authentication data from environment file
 * 
 * This function clears the printer_id and printer_token from the .env file
 * by setting them to empty strings. This is used when a printer is archived.
 * 
 * @returns Promise<void>
 */
export async function clearEnvironmentAuth(): Promise<void> {
  try {
    console.log('Clearing environment authentication data...');
    
    const envPath = path.join(process.cwd(), '.env');
    
    // Read current .env file
    let envContent = '';
    try {
      envContent = await fs.readFile(envPath, 'utf8');
    } catch (error) {
      console.log('No .env file found to clear');
      return;
    }
    
    // Split into lines and clear printer authentication variables
    const lines = envContent.split('\n');
    const updatedLines = lines.map(line => {
      if (line.startsWith('PRINTER_ID=')) {
        return 'PRINTER_ID=';
      }
      if (line.startsWith('PRINTER_JOIN_TOKEN=')) {
        return 'PRINTER_JOIN_TOKEN=';
      }
      return line;
    });
    
    // Write back to .env file
    await fs.writeFile(envPath, updatedLines.join('\n'));
    
    // Clear from process.env as well
    delete process.env.PRINTER_ID;
    delete process.env.PRINTER_JOIN_TOKEN;
    
    console.log('Environment authentication data cleared successfully');
  } catch (error) {
    console.error('Failed to clear environment authentication data:', error);
    throw new Error(`Failed to clear environment auth: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Authenticate using join token to get access token
 * 
 * This function uses the join token from the environment file
 * to authenticate with the system and obtain an access token
 * for all subsequent operations.
 * 
 * @param joinToken - The join token from environment
 * @param printerId - The printer ID from environment
 * @returns Promise<AuthResult> - Authentication result with access token
 */
export async function authenticateWithJoinToken(joinToken: string, printerId: string): Promise<AuthResult> {
  try {
    console.log('Authenticating with join token...');
    const joinResult = await PrinterService.joinPrinter(printerId, joinToken);
    if (joinResult.success) {
      return {
        success: true,
        access_token: joinResult.token,
        printer_id: joinResult.printer_id
      };
    } else {
      return {
        success: false,
        error: joinResult.error
      };
    }
  } catch (error) {
    console.error('Authentication failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Authentication failed'
    };
  }
}

/**
 * Initialize authentication from environment
 * 
 * This function loads the environment authentication data,
 * authenticates using the join token, and returns the access token
 * for use in all subscriptions and heartbeat operations.
 * 
 * @returns Promise<AuthResult> - Authentication result
 */
export async function initializeEnvironmentAuth(): Promise<AuthResult> {
  try {
    console.log('Initializing environment authentication...');

    // Load authentication data from environment file
    const authData = await loadEnvironmentAuth();

    if (!authData) {
      console.log('No environment authentication data available');
      return {
        success: false,
        error: 'No environment authentication data found'
      };
    }

    // Authenticate using join token
    const authResult = await authenticateWithJoinToken(authData.join_token, authData.printer_id);

    if (authResult.success) {
      console.log('Environment authentication initialized successfully');
    } else {
      console.error('Environment authentication failed:', authResult.error);
    }

    return authResult;
  } catch (error) {
    console.error('Failed to initialize environment authentication:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Authentication initialization failed'
    };
  }
} 