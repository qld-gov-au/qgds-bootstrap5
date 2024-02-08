import Component from '../../../js/QGDSComponent.js'
import template from "./pagination.mustache?raw";

export class Pagination {

  // Use the global Component class to create a new instance of the Pagination component.
  // A data object, containing the mustache placeholder replacement strings, should be provided as an argument. 
  
  constructor( data = {} ) {
    return new Component(template, data);
  }

}
