import Component from "../../../js/QGDSComponent.js";
import template from "./templates/fullWidthLandingPage.hbs?raw";

export class FullWidthLandingPage {
  constructor(data = {}) {
    return new Component(template, data);
  }
}
