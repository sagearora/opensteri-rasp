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
 * Parse version string to get major, minor, and patch numbers
 * 
 * @param version - Version string (e.g., "1.2.3")
 * @returns object with major, minor, patch numbers
 * @throws Error if version string is invalid
 */
export function parseVersion(version: string): { major: number; minor: number; patch: number } {
  const versionRegex = /^(\d+)\.(\d+)\.(\d+)$/;
  const match = version.match(versionRegex);
  
  if (!match) {
    throw new Error(`Invalid version format: ${version}. Expected format: x.y.z`);
  }
  
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10)
  };
}

/**
 * Increment version number
 * 
 * @param version - Current version string
 * @param type - Type of increment ('major', 'minor', 'patch')
 * @returns string - New version string
 */
export function incrementVersion(version: string, type: 'major' | 'minor' | 'patch'): string {
  const parsed = parseVersion(version);
  
  switch (type) {
    case 'major':
      return `${parsed.major + 1}.0.0`;
    case 'minor':
      return `${parsed.major}.${parsed.minor + 1}.0`;
    case 'patch':
      return `${parsed.major}.${parsed.minor}.${parsed.patch + 1}`;
    default:
      throw new Error(`Invalid increment type: ${type}`);
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
export function getVersionNumber(version: string): number {
  const parsed = parseVersion(version);
  return parsed.major * 10000 + parsed.minor * 100 + parsed.patch;
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

/**
 * Convert version number back to semantic version string
 * 
 * @param versionNumber - Version number (e.g., 123 for "1.2.3")
 * @returns string - Semantic version string
 */
export function getVersionFromNumber(versionNumber: number): string {
  const major = Math.floor(versionNumber / 10000);
  const minor = Math.floor((versionNumber % 10000) / 100);
  const patch = versionNumber % 100;
  
  return `${major}.${minor}.${patch}`;
} 