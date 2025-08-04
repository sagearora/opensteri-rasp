/**
 * Version Management Service
 * 
 * This service handles version management for the printer management system,
 * including reading the current version from package.json and providing
 * utilities for version tracking and updates.
 * 
 * @author Printer Management System
 * @version 1.0.0
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Interface for package.json structure
 */
interface PackageJson {
  name: string;
  version: string;
  description?: string;
  [key: string]: any;
}

/**
 * Get the current version from package.json
 * 
 * @returns string - The current version number (e.g., "1.0.0")
 * @throws Error if package.json cannot be read or parsed
 */
export function getCurrentVersion(): string {
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    const packageJson: PackageJson = JSON.parse(packageJsonContent);
    
    return packageJson.version;
  } catch (error) {
    console.error('Failed to read version from package.json:', error);
    throw new Error(`Version read failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get version as a simple number for database storage
 * 
 * This converts a semantic version like "1.2.3" to a simple number like 123
 * for easier database storage and comparison.
 * 
 * @param version - Version string (e.g., "1.2.3")
 * @returns number - Version as a simple number
 */
function getVersionNumber(version: string): number {
  const versionRegex = /^(\d+)\.(\d+)\.(\d+)$/;
  const match = version.match(versionRegex);
  
  if (!match) {
    throw new Error(`Invalid version format: ${version}. Expected format: x.y.z`);
  }
  
  const major = parseInt(match[1], 10);
  const minor = parseInt(match[2], 10);
  const patch = parseInt(match[3], 10);
  
  return major * 10000 + minor * 100 + patch;
}

/**
 * Get the current version number for database storage
 * 
 * @returns number - Current version as a simple number
 */
export function getCurrentVersionNumber(): number {
  const version = getCurrentVersion();
  return getVersionNumber(version);
} 