import Component from '../../../js/QGDSComponent.js'
import template from "./radio.hbs?raw";

export class Radio {

  // Use the global Component class to create a new instance of the Breadcrumbs component.
  // A data object, containing the Handlebars placeholder replacement strings, should be provided as an argument. 
  
  constructor( data = {} ) {
    return new Component(template, data);
  }

}
