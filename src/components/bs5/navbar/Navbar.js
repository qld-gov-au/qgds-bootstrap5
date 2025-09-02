import Component from '../../../js/QGDSComponent.js';
import template from "./navbar.hbs?raw";

export class Navbar {
  constructor(data = {}) {
    return new Component(template, data);
  }
}
