import Component from '../../../js/QGDSComponent.js'
import template from "./table.mustache?raw";

export class Table {

  // Use the global Component class to create a new instance of the Table component.
  // A data object, containing the mustache placeholder replacement strings, should be provided as an argument. 

  constructor( data = {} ) {
    return new Component(template, data);
  }

}
