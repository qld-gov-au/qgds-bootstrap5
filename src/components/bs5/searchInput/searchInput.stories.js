// SearchInput.stories.js
import { SearchInput } from "./SearchInput.js";
import defaultdata from "./searchInput.data.json";

// Save the initial defaultSuggestions data with fallback
const initData = defaultdata.defaultSuggestions || null;

export default {
  tags: ["autodocs"],
  title: "3. Components/Search Input",
  render: (args) => {
    // Create a copy of args and handle the defaultSuggestions logic
    const componentArgs = { ...args };

    // Toggle defaultSuggestions based on showDefaultSuggestions
    if (args.showDefaultSuggestions === false) {
      componentArgs.defaultSuggestions = false;
    } else if (
      args.showDefaultSuggestions === true ||
      args.showDefaultSuggestions === undefined
    ) {
      // Restore from initData when toggling back to true or when undefined (default state)
      componentArgs.defaultSuggestions =
        initData || defaultdata.defaultSuggestions || null;
    }

    // Remove the control property as it's not needed in the component
    delete componentArgs.showDefaultSuggestions;

    try {
      return `<form action="https://uat.forgov.qld.gov.au/search" class="site-search p-3">${new SearchInput(componentArgs).html}</form>`;
    } catch (error) {
      console.error("Error rendering SearchInput:", error);
      return `<div>Error rendering SearchInput: ${error.message}</div>`;
    }
  },

  argTypes: {
    buttonLabel: {
      description: "The label for the search button",
      control: { type: "text" },
    },
    altDropdownColor: {
      description:
        "If true, applies an alternative color scheme to the suggestions dropdown",
      control: { type: "boolean" },
    },
    dynamicSuggestions: {
      description: "This produces dynamic suggestions as the user types",
      control: { type: "boolean" },
    },
    showDefaultSuggestions: {
      description:
        "This manipulates defaultSuggestions to on focus, shows default suggestions below the search input",
      control: { type: "boolean" },
    },
  },
  parameters: {
    docs: {
      controls: {
        include: [
          "buttonLabel",
          "altDropdownColor",
          "dynamicSuggestions",
          "showDefaultSuggestions",
        ],
      },
      story: { height: "400px" },
    },
  },
  globals: {
    backgrounds: {
      value: "default",
    },
  },
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
