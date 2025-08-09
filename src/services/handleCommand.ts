/**
 * Printer Command Handler Service
 * 
 * This service handles incoming printer commands from the GraphQL backend,
 * executing the appropriate actions based on command type and updating
 * command status after execution.
 * 
 * @author Dr. Saj Arora
 * @version 1.0.0
 */

import { exec } from "child_process";
import { Printer_Command_Type_Enum, PrinterCommandFragment, Sdk } from "../__generated/graphql";
import { LabelData, PrinterService, PrintResult } from "./printerService";

/**
 * Interface for command execution result
 */
export interface CommandResult {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Handle incoming printer commands
 * 
 * This function processes printer commands by determining the command type
 * and executing the appropriate action. After execution, it updates the
 * command status in the backend to reflect completion.
 * 
 * @param sdk - The GraphQL SDK instance for making mutations
 * @param command - The printer command to execute
 * @returns Promise<void> - Resolves when command is handled successfully
 * @throws Error if command execution fails
 */
export const handleCommand = async (sdk: Sdk, command: PrinterCommandFragment): Promise<void> => {
  try {
    console.log(`Processing printer command: ${command.command} (ID: ${command.id})`);

    let result: CommandResult | null = null;

    // Execute command based on type
    switch (command.command) {
      case Printer_Command_Type_Enum.PrintTest:
        result = await PrinterService.printTestLabel();
        break;
      case Printer_Command_Type_Enum.PrintLabels:
        result = await PrinterService.printLabels(command.data as LabelData[]);
        break;
      case Printer_Command_Type_Enum.RunUpdate:
        result = await runUpdate(sdk, command.printer_id);
        break;
      default:
        console.warn(`Unknown command type: ${command.command}`);
        result = {
          success: false,
          message: `Unknown command type: ${command.command}`
        };
    }

    // Update command status in backend
    await sdk.updatePrinterCommand({
      id: command.id,
      set: {
        executed_at: new Date().toISOString(),
        result: result ? JSON.stringify(result) : null,
      }
    });

    console.log(`Command ${command.id} processed successfully`);
  } catch (error) {
    console.error(`Failed to handle command ${command.id}:`, error);

    // Update command status with error
    try {
      await sdk.updatePrinterCommand({
        id: command.id,
        set: {
          executed_at: new Date().toISOString(),
          result: JSON.stringify({
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error'
          }),
        }
      });
    } catch (updateError) {
      console.error('Failed to update command status:', updateError);
    }

    throw error;
  }
};

async function runUpdate(sdk: Sdk, printer_id: string) {
  console.log(`Starting update process for printer: ${printer_id}`);
  
  const { printer_by_pk: printer } = await sdk.getPrinter({ printerId: printer_id });
  if (!printer) {
    console.error(`Printer not found with ID: ${printer_id}`);
    return {
      success: false,
      message: 'Printer not found or update already started'
    };
  }
  
  console.log(`Found printer with ID: ${printer_id}`);
  
  if (printer.update_started_at) {
    console.warn(`Update already started for printer ${printer_id} at ${printer.update_started_at}`);
    return {
      success: false,
      message: 'Update already started'
    };
  }
  
  console.log(`Marking update as started for printer: ${printer_id}`);
  await sdk.updatePrinter({
    printerId: printer_id,
    set: {
      update_started_at: 'now()'
    }
  });
  console.log(`Successfully marked update as started for printer: ${printer_id}`);
  
  return new Promise<CommandResult>((resolve, reject) => {
    console.log('Making self-update.sh executable...');
    // first make the self-update.sh executable
    exec('chmod +x /home/pi/opensteri/self-update.sh', (error, stdout, stderr) => {
      if (error) {
        console.error('Failed to make self-update.sh executable:', error);
        console.error('Error output:', stderr);
        return reject(error);
      }
      
      if (stdout) {
        console.log('chmod stdout:', stdout);
      }
      if (stderr) {
        console.warn('chmod stderr:', stderr);
      }
      
      console.log('self-update.sh is now executable');
      console.log('Executing update script...');
      
      exec('bash /home/pi/opensteri/self-update.sh', async (error, stdout, stderr) => {
        if (error) {
          console.error('Update script execution failed:', error);
          console.error('Script error output:', stderr);
          console.log('Script standard output:', stdout);
          return reject(error);
        }
        
        console.log('Update script completed successfully');
        if (stdout) {
          console.log('Update script output:', stdout);
        }
        if (stderr) {
          console.warn('Update script warnings:', stderr);
        }
        
        console.log(`Update process completed successfully for printer: ${printer_id}`);
        resolve({
          success: true,
          message: 'Update run successfully'
        });
      });
    });
    // then run the update script
  });
}