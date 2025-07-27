# Version Management System

This document describes the version management system for the Printer Management System, which automatically tracks and updates version numbers for the software running on each printer device.

## Overview

The version management system provides:

- **Automatic version tracking**: Version numbers are automatically updated when code is pushed to the main branch
- **Database storage**: Version numbers are stored in the database and updated during heartbeats
- **Manual version control**: Tools for manually updating versions when needed
- **Version information API**: REST endpoint to check current version information

## How It Works

### 1. Version Number Format

The system uses semantic versioning (e.g., `1.2.3`) and converts it to a simple number for database storage:

- `1.2.3` → `10203` (major * 10000 + minor * 100 + patch)
- `2.0.1` → `20001`
- `1.10.5` → `11005`

### 2. Automatic Version Updates

When code is pushed to the main branch, the GitHub Actions workflow automatically:

1. Increments the patch version in `package.json`
2. Commits the change with a `[version-bump]` prefix
3. Prevents infinite loops by checking commit messages

### 3. Heartbeat Updates

During each heartbeat (every 60-120 seconds), the system:

1. Reads the current version from `package.json`
2. Converts it to a version number
3. Updates the printer's `version_number` field in the database

### 4. Initialization Updates

When a printer connects or joins the system:

1. Version information is logged to console
2. Current version is sent to the backend
3. Version is updated in the database

## API Endpoints

### GET /version

Returns current version information:

```json
{
  "version": "1.0.0",
  "versionNumber": 10000,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Manual Version Management

### NPM Scripts

```bash
# Increment patch version (1.0.0 → 1.0.1)
npm run version:patch

# Increment minor version (1.0.0 → 1.1.0)
npm run version:minor

# Increment major version (1.0.0 → 2.0.0)
npm run version:major

# Increment and commit automatically
npm run version:patch:commit
npm run version:minor:commit
npm run version:major:commit
```

### Direct Script Usage

```bash
# Manual version updates
node scripts/update-version.js patch
node scripts/update-version.js minor --commit
node scripts/update-version.js major
```

## Database Schema

The `printer` table includes a `version_number` field:

```sql
CREATE TABLE printer (
  id UUID PRIMARY KEY,
  clinic_id UUID,
  paired_at TIMESTAMP,
  last_seen_at TIMESTAMP,
  version_number INTEGER DEFAULT 0
);
```

## GraphQL Mutations

### UpdatePrinterVersion

Updates a printer's version number:

```graphql
mutation UpdatePrinterVersion($printerId: uuid!, $versionNumber: Int!) {
  update_printer_by_pk(pk_columns: {id: $printerId}, _set: {version_number: $versionNumber}) {
    id
    version_number
  }
}
```

## GitHub Actions Workflow

The `.github/workflows/version-bump.yml` workflow:

1. Triggers on pushes to main branch
2. Ignores documentation changes
3. Checks if the commit is already a version bump
4. Increments patch version automatically
5. Commits and pushes the change

## Version Conversion Functions

### TypeScript/JavaScript

```typescript
import { getCurrentVersionNumber, getVersionFromNumber } from './versionManager';

// Convert semantic version to number
const versionNumber = getCurrentVersionNumber(); // 10000 for "1.0.0"

// Convert number back to semantic version
const version = getVersionFromNumber(10000); // "1.0.0"
```

## Monitoring and Debugging

### Console Logs

Version information is logged during:

- Application startup
- Printer initialization
- Heartbeat updates
- Version API calls

### Error Handling

The system gracefully handles:

- Missing `package.json`
- Invalid version formats
- Network errors during updates
- Database connection issues

## Best Practices

1. **Always use semantic versioning**: Follow `major.minor.patch` format
2. **Test version updates**: Verify version numbers are correctly converted
3. **Monitor heartbeats**: Ensure version updates are happening regularly
4. **Backup before major updates**: Create backups before major version changes
5. **Document breaking changes**: Update documentation for major version changes

## Troubleshooting

### Version Not Updating

1. Check if `package.json` exists and is readable
2. Verify version format is correct (e.g., "1.0.0")
3. Check network connectivity to GraphQL backend
4. Review console logs for error messages

### GitHub Actions Not Triggering

1. Ensure workflow file is in `.github/workflows/`
2. Check branch name is `main`
3. Verify file paths in `paths-ignore` are correct
4. Check GitHub Actions permissions

### Database Version Mismatch

1. Verify version number conversion logic
2. Check GraphQL mutation syntax
3. Ensure database schema includes `version_number` field
4. Review heartbeat update frequency

## Future Enhancements

- **Version comparison**: Compare local vs remote versions
- **Auto-update notifications**: Alert when versions are out of sync
- **Rollback functionality**: Revert to previous versions
- **Version history**: Track version changes over time
- **Deployment tracking**: Link versions to deployment events 