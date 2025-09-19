// SearchInput.stories.js
import { SearchInput } from "./SearchInput.js";
import defaultdata from "./searchInput.data.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Search Input",
  render: (args) => {
    return `<form action="https://uat.forgov.qld.gov.au/search" class="site-search p-3">${new SearchInput(args).html}</form>`;
  },

  argTypes: {},
  parameters: {
    docs: {
      controls: {
        exclude: [
          "variantClass",
          "customClass",
          "inputID",
          "inputName",
          "buttonID",
          "buttonType",
          "ariaLabel",
        ],
      },
      story: { height: "400px" },
    },
  },
};

/**
 * Default Search Input
 */
export const Default = {
  args: defaultdata,
  name: "Default - Filled Variant",
};

/**
 * Outline Variant
 */
export const OutlinedVariant = {
  args: { ...defaultdata, customClass: "is-outline" },
};

/**
 * Full width Search Input
 */
export const FullWidth = {
  args: {
    ...defaultdata,
    customClass: "full-width",
  },
};

/**
 * Dark themed Search Input
 *
 * Apply a class <code>.dark</code> to the parent container of the <code>.qld-search-input</code> element.
 */

export const Dark = {
  args: {
    ...defaultdata,
    variantClass: "dark",
  },
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [{ name: "Dark", value: "var(--qld-brand-primary)" }],
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="dark p-5">
          ${Story()}
      </div>
      `;
    },
  ],
};
