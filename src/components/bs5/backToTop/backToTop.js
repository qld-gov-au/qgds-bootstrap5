import Component from "../../../js/QGDSComponent.js";
import template from "./backToTop.hbs?raw";

export class BackToTop {
  // Instantiate Back to Top component, passing data for template rendering.

  constructor(data = {}) {
    return new Component(template, data);
  }
}
