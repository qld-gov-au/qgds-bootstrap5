import Component from '../../../js/QGDSComponent.js'
import template from "./searchInput.hbs?raw";

export class SearchInput {

  // Use the global Component class to create a new instance of the Textbox component.
  // A data object, containing the Handlebars placeholder replacement strings, should be provided as an argument. 

  constructor( data = {} ) {
    return new Component(template, data);
  }

}
