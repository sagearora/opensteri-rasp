/**
 * Startup Update Service
 * 
 * This service handles checking for and applying updates at application startup.
 * It checks the current version against the latest GitHub release before running updates.
 * 
 * @author Printer Management System
 * @version 1.0.0
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { getLatestVersionInfo } from './githubVersionService';

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
 * This function checks the current version against the latest GitHub release
 * and only runs the update script if an update is actually available.
 * 
 * @returns Promise<{ success: boolean; message: string; output?: string; updateApplied?: boolean }>
 */
export async function checkForUpdatesAtStartup(): Promise<{ success: boolean; message: string; output?: string; updateApplied?: boolean }> {
  try {
    console.log('🚀 Checking for updates at startup...');
    
    // Get current version from package.json
    // Find package.json relative to the project root (not dist folder)
    const projectRoot = join(__dirname, '..', '..');
    const packageJsonPath = join(projectRoot, 'package.json');
    const packageJsonContent = readFileSync(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);
    const currentVersion = packageJson.version;
    console.log(`📦 Current version: ${currentVersion}`);
    
    // Check if update is available
    const versionInfo = await getLatestVersionInfo(currentVersion);
    
    if (!versionInfo) {
      console.log('⚠️ Could not check for updates, skipping update process');
      return {
        success: true,
        message: 'Could not check for updates, continuing with startup',
        updateApplied: false
      };
    }
    
    if (!versionInfo.isUpdateAvailable) {
      console.log('✅ Application is up to date, no update needed');
      return {
        success: true,
        message: `Application is up to date (${currentVersion})`,
        updateApplied: false
      };
    }
    
    console.log(`🔄 Update available: ${currentVersion} → ${versionInfo.latestVersion}`);
    console.log('🚀 Starting update process...');
    
    // Run the update script
    const result = await executeUpdate();
    
    if (result.success) {
      console.log('✅ Startup update completed successfully');
      return {
        ...result,
        updateApplied: true
      };
    } else {
      console.error('❌ Startup update failed, but continuing with application startup');
      return {
        ...result,
        updateApplied: false
      };
    }
  } catch (error) {
    console.error('❌ Error during startup update check:', error);
    return {
      success: false,
      message: `Startup update error: ${error instanceof Error ? error.message : String(error)}`,
      updateApplied: false
    };
  }
}
