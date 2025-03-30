import Component from "../../../js/QGDSComponent.js";
import template from "./backToTop.hbs?raw";

export class BackToTop {
  // Use the global Component class to create a new instance of the Back to Top component.
  // A data object, containing the Handlebars placeholder replacement strings, should be provided as an argument.

  constructor(data = {}) {
    return new Component(template, data);
  }
}
