/**
 * Startup Update Service
 * 
 * This service handles checking for and applying updates at application startup.
 * It runs the self-update script once before the application starts.
 * 
 * @author Printer Management System
 * @version 1.0.0
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Execute the self-update script
 * 
 * @returns Promise<{ success: boolean; message: string; output?: string }>
 */
async function executeUpdate(): Promise<{ success: boolean; message: string; output?: string }> {
  try {
    console.log('🔄 Starting update process...');
    
    // Make the self-update.sh script executable
    await execAsync('chmod +x /home/pi/opensteri/self-update.sh');
    console.log('✅ Made self-update.sh executable');
    
    // Execute the update script
    const { stdout, stderr } = await execAsync('bash /home/pi/opensteri/self-update.sh');
    
    console.log('✅ Update script completed successfully');
    if (stdout) {
      console.log('📝 Update script output:', stdout);
    }
    if (stderr) {
      console.warn('⚠️ Update script warnings:', stderr);
    }
    
    return {
      success: true,
      message: 'Update completed successfully',
      output: stdout
    };
  } catch (error) {
    console.error('❌ Update script execution failed:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return {
      success: false,
      message: `Update failed: ${errorMessage}`,
      output: errorMessage
    };
  }
}

/**
 * Check for and apply updates at startup
 * 
 * This function runs the update script once at application startup.
 * It will attempt to update the application before starting normal operations.
 * 
 * @returns Promise<{ success: boolean; message: string; output?: string }>
 */
export async function checkForUpdatesAtStartup(): Promise<{ success: boolean; message: string; output?: string }> {
  try {
    console.log('🚀 Checking for updates at startup...');
    
    const result = await executeUpdate();
    
    if (result.success) {
      console.log('✅ Startup update completed successfully');
    } else {
      console.error('❌ Startup update failed, but continuing with application startup');
    }
    
    return result;
  } catch (error) {
    console.error('❌ Error during startup update check:', error);
    return {
      success: false,
      message: `Startup update error: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}
