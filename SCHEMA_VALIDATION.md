# TypeScript JSON Schema Validation System

This project includes a comprehensive TypeScript-based JSON schema validation system for component data files with runtime validation support.

## Overview

The system provides:

- **TypeScript Interfaces**: Strongly typed definitions for component data structures
- **JSON Schema Generation**: Automatic generation of JSON schemas from TypeScript types
- **Runtime Validation**: AJV-powered validation integrated into component constructors
- **Common Validation Utilities**: Reusable validation functions for all components
- **CLI Tools**: Command-line scripts for validation and testing

## File Structure

```
src/
├── types/
│   ├── common.types.ts      # Common types used across components
│   ├── button.types.ts      # Button component type definitions
│   ├── footer.types.ts      # Footer component type definitions
│   └── index.ts            # Type exports
├── schemas/                # Generated JSON schemas
│   ├── button.schema.json
│   ├── footer.schema.json
│   └── modal.schema.json
├── utils/
│   ├── validation.js       # Common validation utilities
│   └── schemas.js          # Schema loader and registry
└── components/
    └── bs5/
        ├── button/
        │   ├── Button.js           # Component with integrated validation
        │   └── button.data.json    # Component data file
        └── footer/
            ├── Footer.js           # Component with validation
            └── footer.data.json    # Component data file

scripts/
├── generate-schemas.js     # Generate JSON schemas from TypeScript
├── validate-component.js   # Validate component data against schemas
└── test-validation.js     # Comprehensive validation tests
```

## Generate Schemas

Generate JSON schemas from TypeScript types:

```bash
# Generate schemas for all components
npm run schemas:generate

# Generate schema for a specific component
npm run schemas:generate [component-filter]

# Example - Generate schema for a specific component
npm run schemas:generate button
```

## Component Integration

### Runtime Validation in Components

Components now include built-in validation using the common utilities:

```javascript
// src/components/bs5/button/Button.js
import { validateAndLog } from "../../../utils/validation.js";
import { buttonSchema } from "../../../utils/schemas.js";

export class Button {
  constructor(data = {}) {
    // Validate data and log errors (non-blocking)
    validateAndLog(data, buttonSchema, "Button", true);

    // Create component with data (even if invalid)
    return new Component(template, data);
  }
}
```

### Validation Modes

The system supports three validation approaches:

1. **Log Only (Current)**: Logs validation errors but continues component creation
2. **Strict Mode**: Throws errors and prevents component creation
3. **Silent Mode**: Only logs errors without success messages

```javascript
// Available validation functions
import {
  validateAndLog, // Logs errors, continues execution
  validateDataStrict, // Throws error if invalid
  validateAndLogErrors, // Silent success, logs only errors
} from "../../../utils/validation.js";
```

## Usage

### Validate Components

Validate a component's data file:

```bash
# Test with valid data
node scripts/validate-component.js button src/components/bs5/button/button.data.json
# Output: ✅ Data file is valid against button schema!

# Test with invalid data (e.g., progressLabel: boolean instead of string)
# Output: ❌ Data file is invalid against button schema:
#         - /progressLabel: must be string
```

## Common Validation Utilities

### Available Functions

The `src/utils/validation.js` provides reusable validation functions:

#### `validateData(data, schema, componentName)`

Returns validation result object with errors array.

#### `validateDataStrict(data, schema, componentName)`

Throws error if validation fails (blocking).

#### `validateAndLog(data, schema, componentName, showSuccessLog)`

Logs validation results to console (non-blocking).

#### `validateAndLogErrors(data, schema, componentName)`

Only logs errors, silent on success.

## Runtime Validation Examples

### Console Output for Invalid Data

When a component receives invalid data, you'll see:

```
❌ Button data validation failed:
   - /progressLabel: must be string
   - /iconPosition: must be equal to one of the allowed values
⚠️ Creating Button with invalid data - this may cause issues
```

## Benefits

1. **Type Safety**: Catch data structure errors at development time
2. **Runtime Validation**: Prevent invalid data from breaking components
3. **Developer Experience**: Clear console feedback for validation issues
4. **Non-blocking**: Components still render with invalid data (with warnings)
5. **Centralised**: Common validation utilities reduce code duplication
6. **Maintainable**: Single source of truth for schemas

## Adding New Components

1. **Define TypeScript Interface**: Create interface in `src/types/`
2. **Update Schema Generation**: Add component to `scripts/generate-schemas.js`
3. **Generate Schema**: Run `npm run schemas:generate [component-name]`
4. **Add to Schema Loader**: Import schema in `src/utils/schemas.js`
5. **Integrate Validation**: Use validation utilities in component constructor

## Dependencies

- **ts-json-schema-generator**: Schema generation from TypeScript
- **ajv**: JSON schema validation library
  AJV is configured with:
  - `allErrors: true` - Report all validation errors
  - Detailed error messages with property paths
  - Support for custom error formatting
- **typescript**: Type checking and compilation
