/**
 * Update Checker Service
 * 
 * This service handles scheduled checking for updates when WiFi is connected.
 * It runs updates at a specific time each day (default: 1:00 AM).
 * 
 * @author Printer Management System
 * @version 1.0.0
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { isWifiConnectedWithInternet } from './wifiConnectivityService';

const execAsync = promisify(exec);

// Global state
let updateCheckTimeout: NodeJS.Timeout | null = null;
let isUpdateInProgress = false;
let lastUpdateDate: string | null = null;

/**
 * Execute the self-update script
 * 
 * @returns Promise<{ success: boolean; message: string; output?: string }>
 */
async function executeUpdate(): Promise<{ success: boolean; message: string; output?: string }> {
  try {
    console.log('Starting update process...');
    
    // Make the self-update.sh script executable
    await execAsync('chmod +x /home/pi/opensteri/self-update.sh');
    console.log('Made self-update.sh executable');
    
    // Execute the update script
    const { stdout, stderr } = await execAsync('bash /home/pi/opensteri/self-update.sh');
    
    console.log('Update script completed successfully');
    if (stdout) {
      console.log('Update script output:', stdout);
    }
    if (stderr) {
      console.warn('Update script warnings:', stderr);
    }
    
    return {
      success: true,
      message: 'Update completed successfully',
      output: stdout
    };
  } catch (error) {
    console.error('Update script execution failed:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return {
      success: false,
      message: `Update failed: ${errorMessage}`,
      output: errorMessage
    };
  }
}

/**
 * Check for updates when WiFi is connected
 * 
 * This function checks if WiFi is connected with internet access,
 * and if so, executes the update script.
 * 
 * @returns Promise<void>
 */
async function checkForUpdates(): Promise<void> {
  try {
    // Skip if update is already in progress
    if (isUpdateInProgress) {
      console.log('Update already in progress, skipping check');
      return;
    }
    
    // Check if we already ran an update today
    const today = new Date().toDateString();
    if (lastUpdateDate === today) {
      console.log('Update already ran today, skipping check');
      return;
    }
    
    console.log('Checking for updates...');
    
    // Check if WiFi is connected with internet access
    const hasConnectivity = await isWifiConnectedWithInternet();
    
    if (!hasConnectivity) {
      console.log('No WiFi connectivity with internet, skipping update check');
      return;
    }
    
    console.log('WiFi connected with internet access, proceeding with update check');
    
    // Mark update as in progress
    isUpdateInProgress = true;
    
    try {
      // Execute the update
      const result = await executeUpdate();
      
      if (result.success) {
        console.log('✅ Update completed successfully:', result.message);
        lastUpdateDate = today; // Mark that we ran an update today
      } else {
        console.error('❌ Update failed:', result.message);
      }
    } finally {
      // Always reset the update in progress flag
      isUpdateInProgress = false;
    }
  } catch (error) {
    console.error('Error during update check:', error);
    isUpdateInProgress = false;
  }
}

/**
 * Calculate milliseconds until the next scheduled time
 * 
 * @param scheduledTime - Time in HH:MM format (24-hour)
 * @returns number - Milliseconds until next scheduled time
 */
function getMillisecondsUntilScheduledTime(scheduledTime: string): number {
  const [hours, minutes] = scheduledTime.split(':').map(Number);
  const now = new Date();
  const scheduled = new Date();
  
  scheduled.setHours(hours, minutes, 0, 0);
  
  // If the scheduled time has already passed today, schedule for tomorrow
  if (scheduled <= now) {
    scheduled.setDate(scheduled.getDate() + 1);
  }
  
  return scheduled.getTime() - now.getTime();
}

/**
 * Start scheduled update checking
 * 
 * This function starts a timer that checks for updates at the specified time each day.
 * 
 * @param scheduledTime - Time in HH:MM format (24-hour, default: "01:00")
 * @returns void
 */
export function startUpdateChecker(scheduledTime: string = "01:00"): void {
  // Clear any existing timeout
  stopUpdateChecker();
  
  console.log(`Starting scheduled update checker for daily updates at ${scheduledTime}`);
  
  // Calculate time until next scheduled update
  const msUntilNext = getMillisecondsUntilScheduledTime(scheduledTime);
  const nextUpdate = new Date(Date.now() + msUntilNext);
  
  console.log(`Next update scheduled for: ${nextUpdate.toLocaleString()}`);
  
  // Set up the timeout for the next scheduled update
  updateCheckTimeout = setTimeout(() => {
    checkForUpdates();
    
    // After the first update, schedule the next one for tomorrow at the same time
    scheduleNextUpdate(scheduledTime);
  }, msUntilNext);
  
  console.log(`Update checker started successfully`);
}

/**
 * Schedule the next update for tomorrow at the same time
 * 
 * @param scheduledTime - Time in HH:MM format (24-hour)
 */
function scheduleNextUpdate(scheduledTime: string): void {
  const msUntilTomorrow = getMillisecondsUntilScheduledTime(scheduledTime);
  const nextUpdate = new Date(Date.now() + msUntilTomorrow);
  
  console.log(`Scheduling next update for: ${nextUpdate.toLocaleString()}`);
  
  updateCheckTimeout = setTimeout(() => {
    checkForUpdates();
    scheduleNextUpdate(scheduledTime); // Recursively schedule the next one
  }, msUntilTomorrow);
}

/**
 * Stop scheduled update checking
 * 
 * This function stops the scheduled update checking timer.
 * 
 * @returns void
 */
export function stopUpdateChecker(): void {
  if (updateCheckTimeout) {
    clearTimeout(updateCheckTimeout);
    updateCheckTimeout = null;
    console.log('Update checker stopped');
  }
}

/**
 * Manually trigger an update check
 * 
 * This function can be called to manually trigger an update check
 * regardless of the periodic timer.
 * 
 * @returns Promise<{ success: boolean; message: string; output?: string }>
 */
export async function triggerManualUpdateCheck(): Promise<{ success: boolean; message: string; output?: string }> {
  console.log('Manual update check triggered');
  
  // Check if WiFi is connected with internet access
  const hasConnectivity = await isWifiConnectedWithInternet();
  
  if (!hasConnectivity) {
    return {
      success: false,
      message: 'No WiFi connectivity with internet access'
    };
  }
  
  // Skip if update is already in progress
  if (isUpdateInProgress) {
    return {
      success: false,
      message: 'Update already in progress'
    };
  }
  
  // Mark update as in progress
  isUpdateInProgress = true;
  
  try {
    const result = await executeUpdate();
    return result;
  } finally {
    isUpdateInProgress = false;
  }
}

/**
 * Get the current status of the update checker
 * 
 * @returns object - Current status information
 */
export function getUpdateCheckerStatus(): {
  isRunning: boolean;
  isUpdateInProgress: boolean;
  lastUpdateDate: string | null;
  nextScheduledTime?: string;
} {
  let nextScheduledTime: string | undefined;
  
  if (updateCheckTimeout) {
    // Calculate when the next update is scheduled
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(1, 0, 0, 0); // Default to 1:00 AM
    
    nextScheduledTime = tomorrow.toLocaleString();
  }
  
  return {
    isRunning: updateCheckTimeout !== null,
    isUpdateInProgress,
    lastUpdateDate,
    nextScheduledTime
  };
}
