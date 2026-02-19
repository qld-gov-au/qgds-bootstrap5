import Component from "../../../js/QGDSComponent.js";
import template from "./inpageAlert.hbs?raw";

/**
 * Creates a new instance of the Inpage Alert class.
 * @param {Object} data - The data object used to render the template. If no data is provided, the components example data file (component.data.json) will be used as a fallback.
 * @returns {Object} - An object containing the Handlebars template, data, and rendered HTML of the component.
 *
 * const MySuccessAlert = new InpageAlert({ heading: "Success!", content: "This is a success alert." });
 *
 * See sample data file for more examples.
 */

export class InpageAlert {
  // Use the global Component class to create a new instance of the Alert component.
  // A data object, containing the Handlebars placeholder replacement strings, should be provided as an argument.

  constructor(data = {}) {
    return new Component(template, data);
  }

}
