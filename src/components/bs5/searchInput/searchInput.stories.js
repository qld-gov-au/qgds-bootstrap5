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
        include: ["buttonLabel", "suggestions"],
      },
      story: { height: "400px" },
    },
  },
};

export const Default = {
  args: defaultdata,
  name: "Default - Outline Variant",
};

/**
 * With `customClass: is-filled`
 */
export const FilledVariant = {
  args: { ...defaultdata, customClass: "is-filled" },
};

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
  },
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [{ name: "Dark", value: "var(--qld-dark-background)" }],
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="dark">
          ${Story()}
      </div>
      `;
    },
  ],
};

/**
 * Dark themed Search Input
 *
 * Apply a class <code>.dark</code> to the parent container of the <code>.qld-search-input</code> element.
 */
export const DarkFilled = {
  args: { ...defaultdata, customClass: "is-filled" },
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [{ name: "Dark", value: "var(--qld-dark-background)" }],
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="dark">
          ${Story()}
      </div>
      `;
    },
  ],
};
