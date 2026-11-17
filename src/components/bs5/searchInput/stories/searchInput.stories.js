/** @import {Meta, StoryObj} from "@storybook/html-vite" */
/** @import {QLDSearchEvent} from "../search.functions.js" */

import { SearchInput, argTypes } from "../SearchInput.js";
import defaultData from "../searchInput.data.json";
import metadata from "../metadata.json";
import { action } from "storybook/actions";

/** @param {QLDSearchEvent} e */
const customSearchHandler = (e) => {
  // The `qld-search-input` event is still fired even when the value is cleared.
  // The component will automatically fall back to initialSuggestions state and clear the autocomplete list.
  // In this case there is nothing to do.
  if (e.detail.query === "") return;
  const searchComponent = e.target;
  const autocompleteEndpoint = "https://swapi.dev/api/people/?search=";
  const searchResultsEndpoint = "https://swapi.dev/api/starships/?search=";

  fetch(autocompleteEndpoint + encodeURIComponent(e.detail.query))
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((json) => {
      const autocomplete = json.results.map((item) => item.name);
      searchComponent.dataset.autocomplete = autocomplete;
    })
    .catch((e) => {
      console.error(e);
    });

  fetch(searchResultsEndpoint + encodeURIComponent(e.detail.query))
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((json) => {
      const items = json.results;

      if (items && items.length > 0) {
        // Build your suggestions group object
        const suggestions = {
          groupLabel: "Starships",
          viewMoreLabel: "View more starships",
          viewMoreHref: "https://swapi.dev/api/starships",
          items: items.slice(0, 4).map((item) => ({
            label: item.model,
            href: item.url,
          })),
        };

        searchComponent.dataset.suggestions = JSON.stringify(suggestions);
      } else {
        searchComponent.dataset.suggestions = "";
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

/** @type Meta */
export default {
  tags: ["!autodocs", "extended"],
  title: "3. Components/Search Input",
  args: {
    ...defaultData,
  },
  argTypes,
  parameters: {
    backgrounds: { disable: false },
    layout: "fullscreen",
    pageLayout: "with-wrapper",
    wrapperClasses: "p-4",
    coderefs: {
      metadata,
      partialname: "searchInput", //{{> searchInput }}
    },
    controls: {
      expanded: true,
    },
  },
  beforeEach: ({ canvasElement }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("submit event: ", e);
      action(e.type, { depth: 2 })({ target: e.target });
    };

    const handleSearch = (e) => {
      console.log("qgds-search event: ", e);
      action(e.type, { depth: 2 })({ detail: e.detail });
    };

    canvasElement.addEventListener("qld-search-input", handleSearch);
    canvasElement.addEventListener("submit", handleSubmit);

    // Clean up function runs when switching between stories.
    return () => {
      canvasElement.removeEventListener("qld-search-input", handleSearch);
      canvasElement.removeEventListener("submit", handleSubmit);
    };
  },
  render: (args, context) => {
    return new SearchInput({
      ...args,
      inputID: `${context.name.replace(/\s+/g, "")}_input`,
    }).html;
  },
};

/**
 * By default a Search input renders as a outline variant text input with an attached Search button.
 */
export const Default = {
  name: "Default - Outline Variant",
  args: {
    initialSuggestions: undefined,
    form: undefined,
    searchParams: undefined,
    dynamicSuggestions: undefined,
  },
  argTypes: {
    initialSuggestions: {
      control: false,
    },
  },
};

/**
 * Add parameter `customClass: is-filled` for a filled variant
 */
export const FilledVariant = {
  args: { ...Default.args, customClass: "is-filled" },
};

/**
 * Apply a class `.dark` to an ancestor container of the <code>.qld-search-input</code> element.
 */
export const Dark = {
  args: Default.args,
  parameters: {
    wrapperClasses: "p-4 dark",
  },
};

/**
 * Add parameter `customClass: is-filled` and apply class `.dark` to an ancestor container of the `.qld-search-input` element.
 */
export const DarkFilled = {
  args: {
    ...FilledVariant.args,
  },
  parameters: {
    wrapperClasses: "p-4 dark",
  },
};

/** @type StoryObj */
export const WithForm = {
  args: {
    initialSuggestions: undefined,
    searchParams: undefined,
    dynamicSuggestions: undefined,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  render: (args, { name }) =>
    new SearchInput({ ...args, inputID: name.replace(/\s+/g, "") }).html,
};

/** @type StoryObj */
export const DefaultSearchHandler = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    useDefaultSearchHandler: true,
  },
  render: (args, { name }) =>
    new SearchInput({ ...args, inputID: name.replace(/\s+/g, "") }).html,
};

/** @type StoryObj */
export const CustomSearchHandler = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    initialSuggestions: undefined,
    dynamicSuggestions: undefined,
    inputName: "search",
    placeholder: "Search a galaxy far, far away",
    buttonLabel: "Use the force",
    buttonType: "submit",
    form: {
      action: "https://swapi.dev/api/starships/",
      method: "GET",
    },
    searchParams: {
      format: "json",
    },
  },
  beforeEach: ({ canvasElement }) => {
    canvasElement.addEventListener("qld-search-input", customSearchHandler);

    // Clean up function runs when switching between stories.
    return () => {
      canvasElement.removeEventListener(
        "qld-search-input",
        customSearchHandler,
      );
    };
  },
};
