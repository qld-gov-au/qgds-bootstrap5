import Component from '../../../js/QGDSComponent.js'
import template from "./correctincorrect.hbs?raw";

export class CorrectIncorrect {

  // Use the global Component class to create a new instance of the Date input component.
  // A data object, containing the Handlebars placeholder replacement strings, should be provided as an argument. 

  constructor(data = {}) {

    var component = new Component(template, data);
    return component;
  }
}
