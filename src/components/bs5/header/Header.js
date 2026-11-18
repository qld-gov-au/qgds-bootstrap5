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
  preHeader: {
    table: {
      disable: true,
    },
  },
  ["preHeader.palette"]: {
    options: ["dark", "default"],
    control: "radio",
    table: { category: "Pre header" },
  },
  ["preHeader.globalLink.text"]: {
    table: { category: "Pre header" },
  },
  ["preHeader.globalLink.url"]: {
    table: { category: "Pre header" },
  },
  ["preHeader.actions"]: {
    control: "object",
    table: { category: "Pre header", readonly: true },
  },
  mainContent: {
    table: {
      disable: true,
    },
  },
  ["mainContent.palette"]: {
    options: ["dark", "default", "dark-alt"],
    control: "radio",
    table: { category: "Main content" },
  },
  ["mainContent.siteTitle"]: {
    control: "text",
    table: { category: "Main content" },
  },
  ["mainContent.subline"]: {
    control: "text",
    table: { category: "Main content" },
  },
};
