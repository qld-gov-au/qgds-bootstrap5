import Component from "../../../js/QGDSComponent.js";
import template from "./header.hbs?raw";

export class Header {
  // Use the global Component class to create a new instance of the Header component.
  // A data object, containing the Handlebars placeholder replacement strings, should be provided as an argument.

  constructor(data = {}) {
    return new Component(template, data);
  }
}

export const argTypes = {
  ["preHeader.palette"]: {
    options: ["dark", "default"],
    control: "radio",
    table: { category: "Pre header" },
  },
  ["preHeader.globalLink.text"]: {
    table: { category: "Pre header" },
  },
  ["preHeader.actions"]: {
    table: { category: "Pre header" },
  },
  ["mainContent.palette"]: {
    options: ["dark", "default", "dark-alt"],
    control: "radio",
    table: { category: "Main content" },
  },
  ["mainContent.siteTitle"]: {
    table: { category: "Main content" },
  },
  ["mainContent.subline"]: {
    table: { category: "Main content" },
  },
};
