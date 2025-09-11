import Component from "../../../js/QGDSComponent.js";
import template from "./button.hbs?raw";
import Ajv from "ajv";
import buttonSchema from "../../../schemas/button.schema.json";

/**
 * @typedef {import('../../../types/button.types.js').ButtonData} ButtonData
 */

// Initialize AJV validator
const ajv = new Ajv({ allErrors: true });
const validateButtonData = ajv.compile(buttonSchema);

export class Button {
  // Use the global Component class to create a new instance of the Button component.
  // A data object, containing the Handlebars placeholder replacement strings, should be provided as an argument.

  /**
   * Creates a new Button component instance
   * @param {ButtonData} data - Button configuration data
   * @returns {Component} Rendered button component
   */
  constructor(data = {}) {
    // Validate data against JSON schema
    const isValid = validateButtonData(data);

    if (!isValid) {
      const errors =
        validateButtonData.errors
          ?.map((error) => `${error.instancePath || "root"}: ${error.message}`)
          .join(", ") || "Unknown validation error";

      throw new Error(`Button data validation failed: ${errors}`);
    }

    // Create component with validated data
    return new Component(template, data);
  }
}
