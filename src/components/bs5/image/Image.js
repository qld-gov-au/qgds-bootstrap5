import Component from "../../../js/QGDSComponent.js";
import template from "./image.hbs?raw";

/**
 * Creates a new instance of the Image component.
 * @param {Object} data - The data object used to render the template. If no data is provided, the components example data file (component.data.json) will be used as a fallback.
 * @returns {Object} - An object containing the Handlebars template, data, and rendered HTML of the component.
 *
 * const MyImage = new ImageComponent({ src: "image.jpg", alt: "An image" });
 *
 * See sample image.data.json file for full json structure.
 */

export class ImageComponent {
  // Use the global Component class to create a new instance of the Image component.
  // A data object, containing the Handlebars placeholder replacement strings, should be provided as an argument.

  constructor(data = {}) {
    return new Component(template, data);
  }
}
