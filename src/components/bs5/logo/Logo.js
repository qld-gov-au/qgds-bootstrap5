import Component from "../../../js/QGDSComponent.js";
import template from "./logo.hbs?raw";

/**
 * Creates a new instance of the Logo class.
 * @param {{logo: "coa-landscape" | "coa-landscape-2lines"}} data - The data object used to render the template. If no data is provided, the components example data file (component.data.json) will be used as a fallback.
 * @returns {Object} - An object containing the Handlebars template, data, and rendered HTML of the component.
 *
 *
 * See sample data file for more examples.
 */

export class Logo {
  // Use the global Component class to create a new instance of the Logo component.
  // A data object, containing the Handlebars placeholder replacement strings, should be provided as an argument.

  constructor(data = { logo: "coa-landscape" }) {
    return new Component(template, data);
  }
}
