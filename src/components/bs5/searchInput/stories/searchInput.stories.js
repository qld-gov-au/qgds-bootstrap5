/** @import {Meta, StoryObj} from "@storybook/html-vite" */

import { SearchInput } from "../SearchInput.js";
import defaultData from "../searchInput.data.json";
import metadata from "../metadata.json";
import { action } from "storybook/actions";

/** @type Meta */
export default {
  tags: ["autodocs", "extended"],
  title: "3. Components/Search Input",
  args: {
    ...defaultData,
  },
  argTypes: {
    buttonLabel: {
      description: "The label for the search button",
    },
    searchParams: {
      description:
        "Arbitrary search parameters to be submitted along with the search query. Eg `collection` and `profile` ",
      control: "object",
    },
  },
  parameters: {
    coderefs: {
      metadata,
      partialname: "searchInput", //{{> searchInput }}
    },
    controls: {
      expanded: true,
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
      // story: { height: "800px" },
    },
  },
  beforeEach: ({ canvasElement }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(e);
      action(e.type, { depth: 2 })({ target: e.target });
    };

    const handleSearch = (e) => {
      action(e.type, { depth: 2 })({ detail: e.detail });
    };

    canvasElement.addEventListener("qld-search", handleSearch);
    canvasElement.addEventListener("submit", handleSubmit);

    // Clean up function runs when switching between stories.
    return () => {
      canvasElement.removeEventListener("qld-search", handleSearch);
      canvasElement.removeEventListener("submit", handleSubmit);
    };
  },
  render: (args, context) =>
    new SearchInput({
      ...args,
      inputID: context.name.replace(/\s+/g, ""),
    }).html,
};

/**
 * The default is an outline variant
 */
export const Default = {
  name: "Default - Outline Variant",
  args: {
    initialSuggestions: undefined,
    form: undefined,
    searchParams: undefined,
    useDefaultSearchHandler: undefined,
    autocompleteEndpoint: undefined,
    searchResultsEndpoint: undefined,
  },
};

/**
 * Add `customClass: is-filled` for a filled variant
 */
export const FilledVariant = {
  args: { ...Default.args, customClass: "is-filled" },
};

/**
 * Apply a class `.dark` to the parent container of the <code>.qld-search-input</code> element.
 */
export const Dark = {
  globals: { backgrounds: { value: "dark" } },
  args: Default.args,
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
  args: {
    ...FilledVariant.args,
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

/** @type StoryObj */
export const WithForm = {
  parameters: {
    docs: {
      description: {
        story: `Use a html \`<form>\` element to submit search search results and direct your user to a dedicated search page once the search button is clicked. Include a \`form\` object with \`action\` and \`method\` parameters in the configuration object,
        `,
      },
    },
    chromatic: { disableSnapshot: true },
  },
  args: {
    useDefaultSearchHandler: true,
  },
  render: (args, { name }) =>
    new SearchInput({ ...args, inputID: name.replace(/\s+/g, "") }).html,
};

/**
 * Custom Search Submit Handler
 *
 * Listen for the custom event `qgds-search-submit` and handle the search submission in your own way.
 */
export const CustomSubmitHandler = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    inputName: "q",
  },
  decorators: [
    (Story) => {
      return `
      <div class="p-3">
          ${Story()}

          <div style="padding: 2rem;">
            <p>This example demonstrates how to listen for the custom event <code>qld-search-submit</code> and handle the search submission in your own way.</p>
            <p>Open the browser console to see the event payload logged when you submit the search form, and review the storybook Code References panel for code examples.</p>
          </div>
          
          <script>

            // In a frontend environment, listen for the custom event \`qld-search-submit\`
            // ...and write your own search submission logic. For example:
            
            document.addEventListener('qld-search-submit', function(event) {
              
              // Prevent the default form submission behavior
              event.preventDefault();

              // Access the search query and other form data from the event detail
              const payload = event.detail;
              const params = new URLSearchParams(payload.formdata);
              
              // Write your own custom function or logic here.
              // For demonstration purposes, we'll just log the payload to the console.
              console.log('Search Submit Event payload:', payload);

              // or submit the form normally
              // payload.form.submit();

              // or redirect to a custom target with query parameters
              window.location.href = 'https://dev.data.qld.gov.au/dataset?' + params.toString();

            });

          </script>
      </div>
      `;
    },
  ],
};

/** @type StoryObj */
export const NoForm = {
  parameters: {
    tags: ["!autodocs"],
  },
  render: (args, { name }) =>
    new SearchInput({ ...args, inputID: name.replace(/\s+/g, "") }).html,
};

/** @type StoryObj */
export const WithForm = {
  ...NoForm,
  args: {
    form: {
      action: "https://uat.forgov.qld.gov.au/search",
      method: "GET",
    },
  },
};
