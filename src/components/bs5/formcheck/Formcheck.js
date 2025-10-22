import Component from "../../../js/QGDSComponent.js";
import template from "./formcheck.hbs?raw";

export class Formcheck {
  // Use the global Component class to create a new instance of the Breadcrumbs component.
  // A data object, containing the Handlebars placeholder replacement strings, should be provided as an argument.

  constructor(data = {}) {
    return new Component(template, data);
  }
}

/**
 * argTypes is used to render component parameters in storybook.
 */
export const argTypes = {
  questionLabel: {
    type: "string | undefined",
    description: `The heading label for the for the set of checks/radios.`,
  },
  optionalLabel: {
    type: "string | undefined",
    description: "Additional text used to denote an optional field.",
  },
  hintLabel: {
    type: "string | undefined",
    description:
      "Extra informational text which can be used to give the input more context.",
  },
  listClasses: {
    type: "string | undefined",
    description: "CSS class names to be added to the topmost element.",
  },
  successMessageText: {
    type: "string | undefined",
    description:
      "Informational text which appears when the input passes validation, or if `isValid` is true.",
  },
  errorMessageText: {
    type: "string | undefined",
    description:
      "Informational text which appears when the input fails validation, or if `isValid` is false.",
  },
  type: {
    type: "string",
    options: ["checkbox", "radio"],
    control: "radio",
    description:
      "The type of input. This will override any value of `type` set on the listItems themselves.",
    table: {
      defaultValue: { summary: "checkbox" },
    },
  },
  isValid: {
    options: [undefined, true, false],
    type: "boolean | undefined",
    control: "radio",
    description:
      "Should be set only when the input is to be validated server-side. Adds class `is-valid` or `is-invalid` to the form control. For client-side validation.",
  },
  listitems: {
    description: "An array which represents the input set.",
  },
};
