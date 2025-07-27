/**
 * Token Store Service
 * 
 * This service manages persistent storage of printer authentication tokens
 * and printer IDs. Tokens are stored in a JSON file for persistence across
 * application restarts.
 * 
 * @author Printer Management System
 * @version 1.0.0
 */

import { promises as fs } from 'fs';
import path from 'path';

/**
 * Interface for stored token data
 */
export interface StoredToken {
  token: string;
  printer_id: string;
}

// Configuration
const TOKEN_FILE = path.resolve(process.cwd(), '.printer_token.json');

/**
 * Save printer authentication token and printer ID to persistent storage
 * 
 * This function stores the provided token and printer ID in a JSON file
 * for later retrieval. The file is created if it doesn't exist.
 * 
 * @param token - The authentication token for the printer
 * @param printer_id - The unique identifier for the printer
 * @returns Promise<void> - Resolves when token is saved successfully
 * @throws Error if file write operation fails
 */
export async function saveToken(token: string, printer_id: string): Promise<void> {
  try {
    const tokenData: StoredToken = { token, printer_id };
    await fs.writeFile(TOKEN_FILE, JSON.stringify(tokenData, null, 2), 'utf-8');
    console.log('Printer token saved successfully');
  } catch (error) {
    console.error('Failed to save printer token:', error);
    throw new Error(`Token save failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Load stored printer authentication token and printer ID
 * 
 * This function attempts to read the stored token and printer ID from
 * the persistent storage file. Returns null if no valid token is found.
 * 
 * @returns Promise<StoredToken | null> - Stored token data or null if not found
 */
export async function loadToken(): Promise<StoredToken | null> {
  try {
    const data = await fs.readFile(TOKEN_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    
    // Validate the parsed data structure
    if (typeof parsed.token === 'string' && typeof parsed.printer_id === 'string') {
      console.log('Stored printer token loaded successfully');
      return { token: parsed.token, printer_id: parsed.printer_id };
    }
    
    console.warn('Invalid token data structure found in storage file');
    return null;
  } catch (error) {
    // File doesn't exist or is invalid - this is normal for first-time setup
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      console.log('No stored printer token found');
    } else {
      console.error('Error loading stored token:', error);
    }
    return null;
  }
}

/**
 * Clear stored printer authentication token
 * 
 * This function removes the stored token file, effectively logging out
 * the printer from the system.
 * 
 * @returns Promise<void> - Resolves when token is cleared successfully
 * @throws Error if file deletion fails
 */
export async function clearToken(): Promise<void> {
  try {
    await fs.unlink(TOKEN_FILE);
    console.log('Printer token cleared successfully');
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      console.log('No token file to clear');
      return;
    }
    console.error('Failed to clear printer token:', error);
    throw new Error(`Token clear failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
} 