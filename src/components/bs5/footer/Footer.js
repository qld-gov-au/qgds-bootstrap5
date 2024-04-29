import Component from '../../../js/QGDSComponent.js'

import template from "./footer.hbs?raw";
import templateForgov from "./footerForgov.hbs?raw";

export class Footer {
  
  constructor( data = {} ) {
    return new Component(template, data);
  }

}

export class FooterForgov {

  constructor( data = {} ) {
    return new Component(templateForgov, data);
  }

}
