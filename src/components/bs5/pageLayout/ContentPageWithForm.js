import Component from "../../../js/QGDSComponent.js";
import template from "./templates/contentPageWithForm.hbs?raw";

export class ContentPageWithForm {
  constructor(data = {}) {
    return new Component(template, data);
  }
}
