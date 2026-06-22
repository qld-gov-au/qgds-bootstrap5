import { Button, defaultArgs as buttonArgs } from "../../bs5/button/Button";
import { Card } from "../../bs5/card/Card";
import cardData from "../../bs5/card/card.data.json";
const cardArgs = cardData.singleAction;
/**
 * @import { Meta, StoryObj } from "@storybook/html";
 */

/**
 * @typedef {Object} Args
 * @prop {"focus-light" | "focus-dark" | ""} [utilityClass] - Manually force a light or dark palette context on the focus color. This can be used as escape hatch for when the focus color must be inverted for accessibility reasons.
 * @prop {"default" | "light" | "alt" | "dark" | "dark-alt" | ""} [paletteClass]
 * @prop {"default" | "light" | "alt" | "dark" | "dark-alt" | ""} [cardPaletteClass]
 */

/**
 * @type { Meta<Args> }
 */
export default {
  title: "1. Core Styles/Focus Styles",
  tags: ["autodocs"],

  render: (args) => {
    return `<div class="p-24 ${args.paletteClass || ""}" style="display: flex; gap: 48px; align-items: flex-start">
<a href=javascript:void()" class="${args.utilityClass || ""}">Here is a link</a>
${new Button({ ...buttonArgs, variantClass: `${buttonArgs.variantClass} ${args.utilityClass || ""}` }).html}
${new Card({ ...cardArgs, variantClass: `${args.cardPaletteClass} ${args.utilityClass || ""}` }).html}
</div>
`;
  },

  argTypes: {
    utilityClass: {
      description:
        "Manually force a light or dark palette context on the focus color. This can be used as escape hatch for when the focus color must be inverted for accessibility reasons.",
      control: "radio",
      options: ["qld-focus-light", "qld-focus-dark", null],
    },
    paletteClass: {
      control: "select",
      options: ["default", "light", "alt", "dark", "dark-alt", null],
    },
    cardPaletteClass: {
      control: "select",
      options: ["default", "light", "alt", "dark", "dark-alt"],
    },
  },
  parameters: {
    layout: "fullscreen",
    coderefs: { show: false },
  },
};

/** @type {StoryObj<Args>} */
export const Default = {
  /**@type Args */
  args: {
    utilityClass: "",
    paletteClass: "",
    cardPaletteClass: "default",
  },
};
