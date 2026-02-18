import Component from "../../../js/QGDSComponent.js";
import template from "./details.hbs?raw";

export class Details {
  constructor(data = {}) {
    return new Component(template, data);
  }
}
