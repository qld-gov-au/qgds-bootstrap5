import Component from "../../../js/QGDSComponent.js";
import template from "./button.hbs?raw";
import {
  validateAndLogErrors,
  validateDataStrict,
} from "../../../js/validation.js";
import buttonSchema from "../../../schemas/button.schema.json";

// Export validation functions for external use
export const validateButtonData = (data) =>
  validateAndLogErrors(data, buttonSchema, "Button");
export const validateButtonDataStrict = (data) =>
  validateDataStrict(data, buttonSchema, "Button");

export class Button {
  // Use the global Component class to create a new instance of the Button component.
  // A data object, containing the Handlebars placeholder replacement strings, should be provided as an argument.

  /**
   * Creates a new Button component instance
   * @param {ButtonData} data - Button configuration data
   * @returns {Component} Rendered button component
   */
  constructor(data = {}) {
    // Validate data using common validation utility
    validateAndLogErrors(data, buttonSchema, "Button");

    // Create component with data
    return new Component(template, data);
  }
}
