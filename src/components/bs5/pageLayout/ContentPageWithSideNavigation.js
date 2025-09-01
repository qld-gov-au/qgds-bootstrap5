import Component from "../../../js/QGDSComponent.js";
import template from "./templates/contentPageWithSideNavigation.hbs?raw";

export class ContentPageWithSideNavigation {
  constructor(data = {}) {
    return new Component(template, data);
  }
}
