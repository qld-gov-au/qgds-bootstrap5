import Component from "../../../js/QGDSComponent.js";
import template from "./footer.hbs?raw";
import {
  validateAndLogErrors,
  validateDataStrict,
} from "../../../js/validation.js";
import footerSchema from "../../../schemas/footer.schema.json";

// Export validation functions for external use
export const validateFooterData = (data) =>
  validateAndLogErrors(data, footerSchema, "Footer");
export const validateFooterDataStrict = (data) =>
  validateDataStrict(data, footerSchema, "Footer");

/* import templateForgov from "./footerForgov.hbs?raw"; */

export class Footer {
  // Use the global Component class to create a new instance of the Footer component.
  // A data object, containing the Handlebars placeholder replacement strings, should be provided as an argument.

  /**
   * Creates a new Footer component instance
   * @param {FooterData} data - Footer configuration data
   * @returns {Component} Rendered footer component
   */
  constructor(data = {}) {
    // Validate data using common validation utility
    validateAndLogErrors(data, footerSchema, "Footer");

    // Create component with data
    return new Component(template, data);
  }
}

/* export class FooterForgov {
  constructor(data = {}) {
    return new Component(templateForgov, data);
  }
} */
