import Component from "../../../js/QGDSComponent.js";
import template from "./button.hbs?raw";
import data from "./button.data.json";

/**
 * @typedef {Object} ButtonArgs
 * @prop {"btn-primary" | "btn-secondary" | "btn-tertiary" } variantClass
 * @prop {string} label The label description
 * @prop {string} [onclick]
 * @prop {boolean} [islink]
 * @prop {boolean} [isdisabled]
 * @prop {boolean} [isProgress]
 * @prop {string} [progressLabel]
 * @prop {string} [iconClass]
 * @prop {"leading" | "trailing"} [iconPosition]
 * @prop {string} [href]
 * @prop {"_blank" | "_self" | "_parent" | "_top" | "_unfencedTop" } [target]
 */

/**  @type {ButtonArgs}*/
export const defaultArgs = {
  ...data,
  onclick: "() => false",
  islink: false,
  href: "#",
  target: null,
};

export class Button {
  // Use the global Component class to create a new instance of the Button component.
  // A data object, containing the Handlebars placeholder replacement strings, should be provided as an argument.
  /**
   *
   * @param {ButtonArgs} data
   */
  constructor(data = defaultArgs) {
    return new Component(template, data);
  }
}
