/**
 * GitHub Version Service
 * 
 * This service handles fetching the latest release version from GitHub
 * and comparing it with the current application version.
 * 
 * @author Printer Management System
 * @version 1.0.0
 */

import fetch from 'node-fetch';

interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  assets: Array<{
    name: string;
    download_url: string;
  }>;
}

interface VersionInfo {
  version: string;
  isUpdateAvailable: boolean;
  currentVersion: string;
  latestVersion: string;
}

/**
 * Parse version string to comparable format
 * Converts "1.0.41" to [1, 0, 41]
 */
function parseVersion(version: string): number[] {
  return version
    .replace(/^v/, '') // Remove 'v' prefix if present
    .split('.')
    .map(num => parseInt(num, 10) || 0);
}

/**
 * Compare two version arrays
 * Returns: 1 if version1 > version2, -1 if version1 < version2, 0 if equal
 */
function compareVersions(version1: number[], version2: number[]): number {
  const maxLength = Math.max(version1.length, version2.length);
  
  for (let i = 0; i < maxLength; i++) {
    const v1 = version1[i] || 0;
    const v2 = version2[i] || 0;
    
    if (v1 > v2) return 1;
    if (v1 < v2) return -1;
  }
  
  return 0;
}

/**
 * Fetch the latest release from GitHub
 */
async function fetchLatestRelease(): Promise<GitHubRelease | null> {
  try {
    // GitHub repository for the printer management system
    const repoUrl = 'https://api.github.com/repos/sagearora/opensteri-rasp/releases/latest';
    
    const response = await fetch(repoUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Printer-Management-System'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const release: GitHubRelease = await response.json() as GitHubRelease;
    return release;
  } catch (error) {
    console.error('❌ Failed to fetch latest release from GitHub:', error);
    return null;
  }
}

/**
 * Get latest version information and compare with current version
 */
export async function getLatestVersionInfo(currentVersion: string): Promise<VersionInfo | null> {
  try {
    console.log(`🔍 Checking for updates. Current version: ${currentVersion}`);
    
    const latestRelease = await fetchLatestRelease();
    
    if (!latestRelease) {
      console.error('❌ Could not fetch latest release information');
      return null;
    }

    const latestVersion = latestRelease.tag_name;
    console.log(`📦 Latest release version: ${latestVersion}`);

    // Parse versions for comparison
    const currentVersionArray = parseVersion(currentVersion);
    const latestVersionArray = parseVersion(latestVersion);

    // Compare versions
    const comparison = compareVersions(latestVersionArray, currentVersionArray);
    const isUpdateAvailable = comparison > 0;

    console.log(`📊 Version comparison: ${isUpdateAvailable ? 'Update available' : 'Up to date'}`);

    return {
      version: latestVersion,
      isUpdateAvailable,
      currentVersion,
      latestVersion
    };
  } catch (error) {
    console.error('❌ Error checking for updates:', error);
    return null;
  }
}

/**
 * Format version number for display
 */
export function formatVersionNumber(version: string): string {
  return version.replace(/^v/, '');
}
