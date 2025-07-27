# Printer Services Architecture

This directory contains the refactored printer services with a clean separation of concerns and minimal code duplication.

## Architecture Overview

The printer services are organized into three main modules:

### 1. `checkPrinter.ts` - Hardware Layer
- **Responsibility**: Direct USB communication with GoDEX printers
- **Features**:
  - USB device detection and connection management
  - Raw command transmission to printer hardware
  - Printer state monitoring
  - Label command generation
- **Dependencies**: `usb` library for hardware communication

### 2. `printerService.ts` - Business Logic Layer
- **Responsibility**: High-level printer operations and business logic
- **Features**:
  - Printer authentication and joining
  - Label printing operations
  - Test label printing
  - Centralized printer state management
- **Dependencies**: `checkPrinter.ts` for hardware operations, `node-fetch` for API calls

### 3. `handleCommand.ts` - Command Processing Layer
- **Responsibility**: GraphQL command processing and status management
- **Features**:
  - Process incoming printer commands from GraphQL backend
  - Execute appropriate actions based on command type
  - Update command status in backend after execution
- **Dependencies**: `printerService.ts` for business logic, GraphQL SDK

## Key Improvements

### 1. Eliminated Code Duplication
- **Before**: Test label printing logic was duplicated in both `printerService.ts` and `handleCommand.ts`
- **After**: Centralized in `PrinterService.printTestLabel()` and used by `handleCommand.ts`

### 2. Clear Separation of Concerns
- **Hardware Layer** (`checkPrinter.ts`): Raw USB communication
- **Business Layer** (`printerService.ts`): High-level operations
- **Command Layer** (`handleCommand.ts`): GraphQL command processing

### 3. Consistent Interface Design
- **LabelData Interface**: Now extends from `checkPrinter.ts` to avoid duplication
- **PrinterService Class**: Centralized static methods for all printer operations
- **Backward Compatibility**: Individual function exports maintained for existing code

### 4. Improved Maintainability
- **Single Source of Truth**: Each operation has one implementation
- **Clear Dependencies**: Each layer only depends on the layer below it
- **Consistent Error Handling**: Standardized error responses across all layers

## Usage Examples

### Basic Printer Operations
```typescript
import { PrinterService } from './printerService';

// Get printer state
const state = PrinterService.getPrinterState();

// Print test label
const result = await PrinterService.printTestLabel();

// Print multiple labels
const labels = [/* label data */];
const result = await PrinterService.printLabels(labels);
```

### Command Processing
```typescript
import { handleCommand } from './handleCommand';

// Process GraphQL command
await handleCommand(sdk, command);
```

### Hardware Operations (Advanced)
```typescript
import { sendToPrinter, createLabelCmd } from './checkPrinter';

// Send raw command to printer
const bytesSent = await sendToPrinter('^L\n...');

// Create label command
const labelCmd = createLabelCmd(labelData);
```

## File Structure

```
src/services/
├── checkPrinter.ts      # Hardware communication layer
├── printerService.ts    # Business logic layer
├── handleCommand.ts     # Command processing layer
└── README.md           # This documentation
```

## Author

**Dr. Saj Arora**

## Version

1.0.0 - Refactored architecture with improved maintainability and reduced duplication 