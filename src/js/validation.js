import Ajv from "ajv";

/**
 * Common validation utilities for all components
 */

// Initialize AJV validator once
const ajv = new Ajv({ allErrors: true });

/**
 * Validates component data against a JSON schema
 * @param {Object} data - The component data to validate
 * @param {Object} schema - The JSON schema to validate against
 * @param {string} componentName - Name of the component for error messages
 * @returns {Object} - Validation result with isValid boolean and errors array
 */
export function validateData(data, schema, componentName = "Component") {
  const validate = ajv.compile(schema);
  const isValid = validate(data);

  return {
    isValid,
    errors: validate.errors || [],
    data: isValid ? data : null,
    componentName,
  };
}

/**
 * Validates and throws error if data is invalid
 * @param {Object} data - The component data to validate
 * @param {Object} schema - The JSON schema to validate against
 * @param {string} componentName - Name of the component for error messages
 * @returns {Object} - The validated data
 * @throws {Error} - If validation fails
 */
export function validateDataStrict(data, schema, componentName = "Component") {
  const result = validateData(data, schema, componentName);

  if (!result.isValid) {
    const errorMessages = result.errors
      .map((err) => `${err.instancePath || "root"}: ${err.message}`)
      .join(", ");

    throw new Error(
      `${componentName} data validation failed: ${errorMessages}`,
    );
  }

  return result.data;
}

/**
 * Validates data and logs errors to console (non-blocking)
 * @param {Object} data - The component data to validate
 * @param {Object} schema - The JSON schema to validate against
 * @param {string} componentName - Name of the component for error messages
 * @param {boolean} showSuccessLog - Whether to log successful validation
 * @returns {boolean} - Whether the data is valid
 */
export function validateAndLog(
  data,
  schema,
  componentName = "Component",
  showSuccessLog = false,
) {
  console.log(`🔧 About to validate ${componentName} data...`);

  const result = validateData(data, schema, componentName);

  if (!result.isValid) {
    console.error(`❌ ${componentName} data validation failed:`);
    result.errors.forEach((err) => {
      console.error(`   - ${err.instancePath || "root"}: ${err.message}`);
    });
    console.warn(
      `⚠️ Creating ${componentName} with invalid data - this may cause issues`,
    );
    return false;
  } else {
    if (showSuccessLog) {
      console.log(`✅ ${componentName} validation passed.`);
    }
    return true;
  }
}

/**
 * Validates data and only logs errors (silent success)
 * @param {Object} data - The component data to validate
 * @param {Object} schema - The JSON schema to validate against
 * @param {string} componentName - Name of the component for error messages
 * @returns {boolean} - Whether the data is valid
 */
export function validateAndLogErrors(
  data,
  schema,
  componentName = "Component",
) {
  const result = validateData(data, schema, componentName);

  if (!result.isValid) {
    console.error(`❌ ${componentName} data validation failed:`);
    result.errors.forEach((err) => {
      console.error(`   - ${err.instancePath || "root"}: ${err.message}`);
    });
    console.warn(
      `⚠️ Creating ${componentName} with invalid data - this may cause issues`,
    );
  }

  return result.isValid;
}
