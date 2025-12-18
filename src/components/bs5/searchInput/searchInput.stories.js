// SearchInput.stories.js
import { SearchInput } from "./SearchInput.js";
import defaultdata from "./searchInput.data.json";
import metadata from "./metadata.json";

// Save the initial defaultSuggestions data with fallback
const initData = defaultdata.defaultSuggestions || null;

export default {
  tags: ["autodocs"],
  title: "3. Components/Search Input",
  render: (args) => {
    return `<form action="https://uat.forgov.qld.gov.au/search" class="site-search p-3">${new SearchInput(args).html}</form>`;
  },
  argTypes: {
    buttonLabel: {
      description: "The label for the search button",
      control: { type: "text" },
    },
    hasDefaultSuggestions: {
      description:
        "This manipulates defaultSuggestions to on focus, shows default suggestions below the search input",
      control: { type: "boolean" },
    },
    hasDynamicSuggestions: {
      description: "This produces dynamic suggestions as the user types",
      control: { type: "boolean" },
    },
    "dynamicSuggestionsServiceLink.href": {
      description: "URL for the dynamic suggestions Related Services link",
      control: { type: "text" },
    },
  },
  parameters: {
    coderefs: {
      metadata,
      partialname: "searchInput", //{{> searchInput }}
    },
    docs: {
      controls: {
        include: [
          "buttonLabel",
          "hasDynamicSuggestions",
          "hasDefaultSuggestions",
          "dynamicSuggestionsServiceLink.href",
        ],
      },
      story: { height: "800px" },
    },
  },
  // globals: {
  //   backgrounds: {
  //     value: "default",
  //   },
  // },
};

export const Default = {
  args: { ...defaultdata, showDefaultSuggestions: true },
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
  globals: { backgrounds: { value: "dark" } },
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
  globals: { backgrounds: { value: "dark" } },
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
