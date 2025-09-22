#!/usr/bin/env node

import Ajv from "ajv";
import fs from "fs";
import path from "path";

// AJV configuration
const ajv = new Ajv({
  allErrors: true,
  verbose: true,
  strict: false,
});

/**
 * Load a JSON schema from file
 * @param {string} schemaPath - Path to the schema file
 * @returns {object} Parsed schema object
 */
function loadSchema(schemaPath) {
  try {
    const schemaContent = fs.readFileSync(schemaPath, "utf8");
    return JSON.parse(schemaContent);
  } catch (error) {
    throw new Error(
      `Failed to load schema from ${schemaPath}: ${error.message}`,
    );
  }
}

/**
 * Load JSON data from file
 * @param {string} dataPath - Path to the data file
 * @returns {object} Parsed data object
 */
function loadData(dataPath) {
  try {
    const dataContent = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(dataContent);
  } catch (error) {
    throw new Error(`Failed to load data from ${dataPath}: ${error.message}`);
  }
}

/**
 * Validate data against schema
 * @param {object} schema - JSON schema object
 * @param {object} data - Data to validate
 * @returns {object} Validation result with isValid and errors
 */
function validateData(schema, data) {
  const validate = ajv.compile(schema);
  const isValid = validate(data);

  return {
    isValid,
    errors: validate.errors || [],
    data,
  };
}

/**
 * Format validation errors for display
 * @param {array} errors - AJV validation errors
 * @returns {string} Formatted error message
 */
function formatErrors(errors) {
  if (!errors || errors.length === 0) {
    return "No errors";
  }

  return errors
    .map((error) => {
      const path = error.instancePath || "root";
      const message = error.message;
      const allowedValues = error.params?.allowedValues
        ? ` (allowed: ${error.params.allowedValues.join(", ")})`
        : "";
      return `  - ${path}: ${message}${allowedValues}`;
    })
    .join("\n");
}

/**
 * Validate specific data file against a component schema
 * @param {string} componentName - Name of the component schema to use
 * @param {string} dataFilePath - Path to the data file to validate
 * @param {string} projectRoot - Root directory of the project
 * @returns {object} Validation result
 */
export function validateDataFile(
  componentName,
  dataFilePath,
  projectRoot = process.cwd(),
) {
  const schemaPath = path.join(
    projectRoot,
    "src",
    "schemas",
    `${componentName}.schema.json`,
  );

  console.log(`Validating data file against ${componentName} schema...`);
  console.log(`Schema: ${schemaPath}`);
  console.log(`Data: ${dataFilePath}`);
  console.log("");

  try {
    // Check if files exist
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`Schema file not found: ${schemaPath}`);
    }

    if (!fs.existsSync(dataFilePath)) {
      throw new Error(`Data file not found: ${dataFilePath}`);
    }

    // Load schema and data
    const schema = loadSchema(schemaPath);
    const data = loadData(dataFilePath);

    // Validate
    const result = validateData(schema, data);

    // Display results
    if (result.isValid) {
      console.log(`✅ Data file is valid against ${componentName} schema!`);
    } else {
      console.log(`❌ Data file is invalid against ${componentName} schema:`);
      console.log(formatErrors(result.errors));
    }

    return result;
  } catch (error) {
    console.error(`🚨 Error validating data file: ${error.message}`);
    return {
      isValid: false,
      errors: [{ message: error.message }],
      data: null,
    };
  }
}

/**
 * Validate a component's data file against its schema
 * @param {string} componentName - Name of the component (e.g., 'button')
 * @param {string} projectRoot - Root directory of the project
 * @returns {object} Validation result
 */
export function validateComponent(componentName, projectRoot = process.cwd()) {
  const schemaPath = path.join(
    projectRoot,
    "src",
    "schemas",
    `${componentName}.schema.json`,
  );
  const dataPath = path.join(
    projectRoot,
    "src",
    "components",
    "bs5",
    componentName,
    `${componentName}.data.json`,
  );

  console.log(`Validating ${componentName} component...`);
  console.log(`Schema: ${schemaPath}`);
  console.log(`Data: ${dataPath}`);
  console.log("");

  try {
    // Check if files exist
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`Schema file not found: ${schemaPath}`);
    }

    if (!fs.existsSync(dataPath)) {
      throw new Error(`Data file not found: ${dataPath}`);
    }

    // Load schema and data
    const schema = loadSchema(schemaPath);
    const data = loadData(dataPath);

    // Validate
    const result = validateData(schema, data);

    // Display results
    if (result.isValid) {
      console.log(`✅ ${componentName} component data is valid!`);
    } else {
      console.log(`❌ ${componentName} component data is invalid:`);
      console.log(formatErrors(result.errors));
    }

    return result;
  } catch (error) {
    console.error(`🚨 Error validating ${componentName}: ${error.message}`);
    return {
      isValid: false,
      errors: [{ message: error.message }],
      data: null,
    };
  }
}

/**
 * Main function for CLI usage
 * @returns {void}
 */
function main() {
  const args = process.argv.slice(2);
  const componentName = args[0] || "button";
  const dataFilePath = args[1];
  const projectRoot = args[2] || process.cwd();

  console.log("🔍 Component Data Validator");
  console.log("==========================\n");

  let result;

  if (dataFilePath) {
    // Validate specific data file
    result = validateDataFile(componentName, dataFilePath, projectRoot);
  } else {
    // Validate component's default data file
    result = validateComponent(componentName, projectRoot);
  }

  console.log("\n");
  process.exit(result.isValid ? 0 : 1);
}

// Run if this file is executed directly
if (process.argv[1] && process.argv[1].includes("validate-component.js")) {
  main();
}
