import Component from '../../../js/QGDSComponent.js'
import template from "./promotionalPanel.hbs?raw";

export class PromotionalPanel {

  // Use the global Component class to create a new instance of the PromotionalPanel component.
  // A data object, containing the Handlebars placeholder replacement strings, should be provided as an argument. 
  
  constructor( data = {} ) {
    return new Component(template, data);
  }

}