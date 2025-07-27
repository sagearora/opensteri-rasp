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
        result = await PrinterService.printTestLabel();;
        break;
      case Printer_Command_Type_Enum.PrintLabels:
        result = await PrinterService.printLabels(command.data as LabelData[]);
        break;
      case Printer_Command_Type_Enum.RunUpdate:
        result = await runUpdate();
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

async function runUpdate() {
  return new Promise<CommandResult>((resolve, reject) => {
    // first make the self-update.sh executable
    exec('chmod +x /home/pi/opensteri-rasp/self-update.sh', (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      console.log('self-update.sh is now executable');
      exec('bash /home/pi/opensteri-rasp/self-update.sh', (error, stdout, stderr) => {
        if (error) {
          return reject(error);
        }
        console.log('Update script executed successfully');
        resolve({
          success: true,
          message: 'Update run successfully'
        });
      });
    });
    // then run the update script
  });
}