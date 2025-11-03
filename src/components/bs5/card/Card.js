import Component from "../../../js/QGDSComponent.js";
import template from "./card.hbs?raw";

export class Card {
  constructor(data = {}) {
    return new Component(template, data);
  }
}

export const argTypes = {
  headingTag: {
    description: "Heading tag. Can be h2, h3, h4, h5 or h6.",
    control: "select",
    options: ["h2", "h3", "h4", "h5", "h6"],
  },
  date: {
    control: "text",
  },
  variantClass: {
    control: "select",
    options: {
      Default: "default",
      Light: "light",
      Alternative: "alt",
      Dark: "dark",
      "Dark alternative": "dark-alt",
    },
  },
  action: {
    control: "select",
    options: {
      None: "no",
      Single: "single",
      Multi: "multi",
    },
  },
};
