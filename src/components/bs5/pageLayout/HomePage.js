import Component from "../../../js/QGDSComponent.js";
import template from "./templates/homePage.hbs?raw";

export class HomePage {
  constructor(data = {}) {
    return new Component(template, data);
  }
}
