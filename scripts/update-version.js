#!/usr/bin/env node

/**
 * Version Update Script
 * 
 * This script allows manual version updates for the printer management system.
 * It can increment major, minor, or patch versions and optionally commit changes.
 * 
 * Usage:
 *   node scripts/update-version.js [major|minor|patch] [--commit]
 * 
 * Examples:
 *   node scripts/update-version.js patch
 *   node scripts/update-version.js minor --commit
 *   node scripts/update-version.js major
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Read package.json and return its contents
 */
function readPackageJson() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const content = fs.readFileSync(packageJsonPath, 'utf8');
  return JSON.parse(content);
}

/**
 * Write package.json with updated version
 */
function writePackageJson(packageJson) {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
}

/**
 * Parse version string to get major, minor, and patch numbers
 */
function parseVersion(version) {
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
 */
function incrementVersion(version, type) {
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
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('Usage: node scripts/update-version.js [major|minor|patch] [--commit]');
    console.error('');
    console.error('Examples:');
    console.error('  node scripts/update-version.js patch');
    console.error('  node scripts/update-version.js minor --commit');
    console.error('  node scripts/update-version.js major');
    process.exit(1);
  }
  
  const incrementType = args[0];
  const shouldCommit = args.includes('--commit');
  
  if (!['major', 'minor', 'patch'].includes(incrementType)) {
    console.error('Invalid increment type. Must be one of: major, minor, patch');
    process.exit(1);
  }
  
  try {
    // Read current package.json
    const packageJson = readPackageJson();
    const currentVersion = packageJson.version;
    
    console.log(`Current version: ${currentVersion}`);
    
    // Calculate new version
    const newVersion = incrementVersion(currentVersion, incrementType);
    console.log(`New version: ${newVersion}`);
    
    // Update package.json
    packageJson.version = newVersion;
    writePackageJson(packageJson);
    
    console.log(`Updated package.json to version ${newVersion}`);
    
    // Commit changes if requested
    if (shouldCommit) {
      try {
        execSync('git add package.json', { stdio: 'inherit' });
        execSync(`git commit -m "chore: bump version to ${newVersion}"`, { stdio: 'inherit' });
        console.log('Changes committed successfully');
      } catch (error) {
        console.error('Failed to commit changes:', error.message);
        process.exit(1);
      }
    } else {
      console.log('Changes not committed. Use --commit flag to commit automatically.');
    }
    
  } catch (error) {
    console.error('Error updating version:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
} 