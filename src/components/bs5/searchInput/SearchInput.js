/** @import {ArgTypes} from "@storybook/html-vite"  */
import Component from "../../../js/QGDSComponent.js";
import template from "./searchInput.hbs?raw";

export class SearchInput {
  // Use the global Component class to create a new instance of the Textbox component.
  // A data object, containing the Handlebars placeholder replacement strings, should be provided as an argument.

  constructor(data = {}) {
    return new Component(template, data);
  }
}

/** @type ArgTypes */
export const argTypes = {
  initialSuggestions: {
    type: "Object",
    description:
      "A Suggestions object, which populates the the suggestions dropdown on inital focus and when the value is cleared.",
  },
  searchParams: {
    type: "Object",
    description:
      "An arbitrary object of key/values pairs which represent additional search params to be submitted as part of the search.",
  },
  ["form.action"]: {
    type: "string",
    description: "The URL responsible for search submission.",
  },
  ["form.method"]: {
    type: "string",
    description:
      "The request method of the form. Either `GET` (default) or `POST`",
  },
  useDefaultSearchHandler: {
    type: "boolean",
    description:
      "Use the built-in search event handler to retrieve and display autocomplete and search results suggestions. ",
  },
  autocompleteEndpoint: {
    type: "string",
    description:
      "If useDefaultSearchHandler is true, this endpoint will be used to fetch and display autocomplete suggestions.",
  },
  searchResultsEndpoint: {
    type: "string",
    description:
      "If useDefaultSearchHandler is true, this endpoint will be used to fetch and display search result suggestions.",
  },
  inputID: {
    type: "string",
    description: "The unique id attribute for the input element itself.",
  },
  inputName: {
    type: "string",
    description:
      "The name attribute of the input. This should be the key name of the search query for form submission. Eg `q` or `query`.",
  },
  containerID: {
    type: "string",
    description: "A unique id for the main component's container.",
  },
  buttonID: {
    type: "string",
    description: "A unique id for the search button element.",
  },
  buttonType: {
    type: "string",
    description:
      "The type of button. Should be `submit` if using a form element, else `button`.",
  },
  buttonLabel: { type: "string" },
  searchDelay: {
    type: "number",
    description:
      "The delay in milliseconds for `qld-search` event to fire after user types in search. This limits the rate at which search handlers request updates for dynamic suggestions.",
  },
  ariaLabel: {
    type: "string",
    description: "The aria label of the input element.",
  },
  ariaLabelContainer: {
    type: "string",
    description: "The aria label of the main component.",
  },
  placeholder: {
    type: "string",
    description:
      "The placeholder of the input, displays when no value is entered.",
  },
  customClass: {
    type: "string",
    description: "CSS class(es) to place on the component.",
  },
};
