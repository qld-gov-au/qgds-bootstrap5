import Component from '../../../js/QGDSComponent.js'
import template from "./navbar.hbs?raw";

export class Navbar {
  constructor(data = {}) {
    // Create a new instance of the Component class
    const component = new Component(template, data);
    // Return the component properties
    return {
      template: component.template,
      data: component.data,
      html: component.html,
    };
  }
}
