/**
 * Printer Information Fetching Service
 * 
 * This service handles fetching printer information from the GraphQL backend,
 * including printer details, status, and configuration data.
 * 
 * @author Printer Management System
 * @version 1.0.0
 */

import { Sdk } from "../__generated/graphql";

/**
 * Fetch printer information from the GraphQL backend
 * 
 * This function retrieves detailed information about a specific printer
 * using the provided GraphQL SDK and printer ID.
 * 
 * @param sdk - The GraphQL SDK instance for making queries
 * @param printerId - The unique identifier for the printer
 * @returns Promise<any> - Printer information object
 * @throws Error if the GraphQL query fails
 */
export async function fetchPrinterInfo(sdk: Sdk, printerId: string): Promise<any> {
  try {
    console.log(`Fetching printer information for printer ID: ${printerId}`);
    
    const { printer_by_pk } = await sdk.getPrinter({
      printerId,
    });
    
    if (!printer_by_pk) {
      throw new Error(`Printer with ID ${printerId} not found`);
    }
    
    console.log('Printer information fetched successfully');
    return printer_by_pk;
  } catch (error) {
    console.error('Failed to fetch printer information:', error);
    throw new Error(`Printer info fetch failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}