import Component from '../../../js/QGDSComponent.js'
import template from "./blockquote.mustache?raw";

export class Blockquote {

  // Use the global Component class to create a new instance of the Blockquote component.
  // A data object, containing the mustache placeholder replacement strings, should be provided as an argument. 
  
  constructor( data = {} ) {
    return new Component(template, data);
  }

}
