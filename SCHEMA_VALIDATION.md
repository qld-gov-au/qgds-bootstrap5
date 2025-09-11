# TypeScript JSON Schema Validation System

This project includes a comprehensive TypeScript-based JSON schema validation system for component data files.

## Overview

The system provides:

- **TypeScript Interfaces**: Strongly typed definitions for component data structures
- **JSON Schema Generation**: Automatic generation of JSON schemas from TypeScript types
- **Runtime Validation**: AJV-powered validation of JSON data against schemas
- **CLI Tools**: Command-line scripts for validation and testing

## File Structure

```
src/
├── types/
│   ├── common.types.ts      # Common types used across components
│   ├── button.types.ts      # Button component type definitions
│   └── index.ts            # Type exports
├── schemas/                # Generated JSON schemas
│   ├── button.schema.json
│   ├── modal.schema.json
│   └── textbox.schema.json
└── components/
    └── bs5/
        └── button/
            └── button.data.json  # Component data file

scripts/
├── generate-schemas.js     # Generate JSON schemas from TypeScript
├── validate-component.js   # Validate component data against schemas
└── test-validation.js     # Comprehensive validation tests

test/
└── button.invalid.data.json  # Test data with validation errors
```

## Usage

### Generate Schemas

Generate JSON schemas from TypeScript types:

```bash
# Generate schemas for all components
npm run schemas:generate

# Generate schema for a specific component
npm run schemas:generate button
npm run schemas:generate footer
npm run schemas:generate modal
```

This will create schema files in `src/schemas/` based on the TypeScript interfaces.

### Validate Components

Validate a component's default data file:

```bash
# Validate button component
npm run schemas:validate-button

# Validate any component
npm run schemas:validate <component-name>
```

Validate a specific data file:

```bash
node scripts/validate-component.js button path/to/data.json
```

### Run Tests

Run comprehensive validation tests:

```bash
npm run schemas:test
```

Run TypeScript integration tests:

```bash
npm run typescript:test
```

## How Schema Generation Works

The schema generation process uses an enhanced script that supports filtering:

### Command Structure

```bash
npm run schemas:generate [component-filter]
```

- **No filter**: Generates schemas for all configured components
- **With filter**: Generates only schemas matching the component name

### Examples

```bash
# Generate all schemas
npm run schemas:generate

# Generate only button schema
npm run schemas:generate button

# Generate only footer schema
npm run schemas:generate footer

# Case-insensitive matching
npm run schemas:generate BUTTON  # Works for button
```

### How Filtering Works

The script matches the filter against:

1. **Type name** (e.g., "ButtonData", "FooterData")
2. **Output filename** (e.g., "button.schema.json", "footer.schema.json")

Both matches are case-insensitive, so `button`, `Button`, or `BUTTON` all work.

## Generated JSON Schema

The TypeScript interfaces are automatically converted to JSON Schema format:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "ButtonData": {
      "additionalProperties": false,
      "properties": {
        "variantClass": {
          "type": "string",
          "description": "CSS class for button variant"
        },
        "iconPosition": {
          "enum": ["leading", "trailing"],
          "type": "string"
        }
        // ... other properties
      },
      "required": ["variantClass", "islink", "isdisabled", ...]
    }
  }
}
```

## Benefits

1. **Type Safety**: Catch data structure errors at development time
2. **Documentation**: Self-documenting component interfaces
3. **Validation**: Runtime validation ensures data integrity
4. **Maintainability**: Changes to types automatically update schemas
5. **Developer Experience**: Clear error messages for invalid data

## Adding New Components

1. **Define TypeScript Interface**: Create interface in `src/types/`
2. **Update Schema Generation**: Add component to `scripts/generate-schemas.js`
3. **Generate Schema**: Run `npm run schemas:generate [component-filter]`
4. **Validate**: Use `npm run schemas:validate <component-name>`

## Dependencies

- **ts-json-schema-generator**: Schema generation
- **ajv**: JSON schema validation
- **typescript**: Type checking and compilation

## Configuration

### TypeScript Config for Schemas

A dedicated `tsconfig.schemas.json` is used for schema generation to avoid conflicts with the main project configuration.

### AJV Configuration

The validator uses AJV with the following settings:

- `allErrors: true` - Report all validation errors
- `verbose: true` - Include detailed error information
- `strict: false` - Allow flexible schema validation
