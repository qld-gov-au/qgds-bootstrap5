import Component from "../../../js/QGDSComponent.js";
import template from "./textarea.hbs?raw";

export class Textarea {
  // Use the global Component class to create a new instance of the Textarea component.
  // A data object, containing the Handlebars placeholder replacement strings, should be provided as an argument.

  constructor(data = {}) {
    return new Component(template, data);
  }
}

export const argTypes = {
  isValid: {
    description:
      "For server-side validation, set to true or false. Omit or set to null to to indicate the input is yet to be validated.",
    control: "radio",
    options: [true, false, null],
    type: "boolean | null",
  },
};
