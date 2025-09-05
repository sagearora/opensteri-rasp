/**
 * WiFi Connectivity Service
 * 
 * This service provides utilities to check WiFi connectivity status
 * and determine if the device is connected to the internet.
 * 
 * @author Printer Management System
 * @version 1.0.0
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Check if WiFi is connected by examining NetworkManager status
 * 
 * @returns Promise<boolean> - True if WiFi is connected, false otherwise
 */
export async function isWifiConnected(): Promise<boolean> {
  try {
    // Check NetworkManager connection status
    const { stdout } = await execAsync('nmcli -t -f DEVICE,TYPE,STATE device status');
    
    // Parse the output to find WiFi devices
    const devices = stdout
      .trim()
      .split('\n')
      .filter(line => line && line.includes('wifi'))
      .map(line => {
        const [device, type, state] = line.split(':');
        return { device, type, state };
      });
    
    // Check if any WiFi device is connected
    const connectedWifiDevice = devices.find(device => device.state === 'connected');
    
    return !!connectedWifiDevice;
  } catch (error) {
    console.error('Error checking WiFi connectivity:', error);
    return false;
  }
}

/**
 * Check if the device has internet connectivity
 * 
 * @param timeout - Timeout in milliseconds (default: 5000)
 * @returns Promise<boolean> - True if internet is accessible, false otherwise
 */
export async function hasInternetConnectivity(timeout: number = 5000): Promise<boolean> {
  try {
    // Use ping to check internet connectivity with timeout
    const { stdout } = await execAsync(`ping -c 1 -W ${Math.ceil(timeout / 1000)} 8.8.8.8`);
    
    // Check if ping was successful
    return stdout.includes('1 received') || stdout.includes('1 packets transmitted, 1 received');
  } catch (error) {
    console.log('Internet connectivity check failed:', error instanceof Error ? error.message : String(error));
    return false;
  }
}

/**
 * Check if WiFi is connected and has internet access
 * 
 * @param timeout - Timeout for internet check in milliseconds (default: 5000)
 * @returns Promise<boolean> - True if WiFi is connected and has internet, false otherwise
 */
export async function isWifiConnectedWithInternet(timeout: number = 5000): Promise<boolean> {
  try {
    // First check if WiFi is connected
    const wifiConnected = await isWifiConnected();
    if (!wifiConnected) {
      console.log('WiFi is not connected');
      return false;
    }
    
    // Then check if internet is accessible
    const hasInternet = await hasInternetConnectivity(timeout);
    if (!hasInternet) {
      console.log('WiFi is connected but no internet access');
      return false;
    }
    
    console.log('WiFi is connected and has internet access');
    return true;
  } catch (error) {
    console.error('Error checking WiFi connectivity with internet:', error);
    return false;
  }
}

/**
 * Get detailed WiFi connection information
 * 
 * @returns Promise<object> - Detailed WiFi connection information
 */
export async function getWifiConnectionInfo(): Promise<{
  connected: boolean;
  hasInternet: boolean;
  ssid?: string;
  signal?: number;
  ipAddress?: string;
}> {
  try {
    const connected = await isWifiConnected();
    const hasInternet = connected ? await hasInternetConnectivity() : false;
    
    let ssid: string | undefined;
    let signal: number | undefined;
    let ipAddress: string | undefined;
    
    if (connected) {
      try {
        // Get WiFi connection details
        const { stdout: wifiInfo } = await execAsync('nmcli -t -f SSID,SIGNAL device wifi list --rescan no');
        const { stdout: connectionInfo } = await execAsync('nmcli -t -f DEVICE,TYPE,STATE,CONNECTION device status');
        
        // Find connected WiFi device
        const devices = connectionInfo
          .trim()
          .split('\n')
          .filter(line => line && line.includes('wifi'))
          .map(line => {
            const [device, type, state, connection] = line.split(':');
            return { device, type, state, connection };
          });
        
        const connectedDevice = devices.find(device => device.state === 'connected');
        
        if (connectedDevice) {
          // Find network details
          const networks = wifiInfo
            .trim()
            .split('\n')
            .filter(line => line && !line.startsWith('*'))
            .map(line => {
              const [networkSsid, networkSignal] = line.split(':');
              return { ssid: networkSsid, signal: networkSignal ? parseInt(networkSignal) : 0 };
            });
          
          const connectedNetwork = networks.find(network => network.ssid === connectedDevice.connection);
          if (connectedNetwork) {
            ssid = connectedNetwork.ssid;
            signal = connectedNetwork.signal;
          }
        }
        
        // Get IP address
        const { stdout: ipInfo } = await execAsync('hostname -I');
        ipAddress = ipInfo.trim().split(' ')[0] || undefined;
      } catch (error) {
        console.log('Could not get detailed WiFi information:', error);
      }
    }
    
    return {
      connected,
      hasInternet,
      ssid,
      signal,
      ipAddress
    };
  } catch (error) {
    console.error('Error getting WiFi connection info:', error);
    return {
      connected: false,
      hasInternet: false
    };
  }
}
