import Component from '../../../js/QGDSComponent.js'
import template from "./head.hbs?raw";

export class Head {

  // A data object, containing the Handlebars placeholder replacement strings, should be provided as an argument.
  constructor(data = {}) {
    return new Component(template, data);
  }
}
