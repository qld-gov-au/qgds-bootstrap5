import Component from '../../../js/QGDSComponent.js'
import template from "./callout.hbs?raw";

export class Callout {

  // Use the global Component class to create a new instance of the Callout component.
  // A data object, containing the Handlebars placeholder replacement strings, should be provided as an argument. 
  
  constructor( data = {} ) {
    return new Component(template, data);
  }

}
