import Component from '../../../js/QGDSComponent.js'
import template from "./metaDcTerms.hbs?raw";

export class MetaDcTerms {

  // A data object, containing the Handlebars placeholder replacement strings, should be provided as an argument.
  constructor(data = {}) {
    return new Component(template, data);
  }
}
