// SearchInput.stories.js
import { SearchInput } from "./SearchInput.js";
import defaultdata from "./searchInput.data.json";
import metadata from "./metadata.json";

// Save the initial defaultSuggestions data with fallback
const initData = defaultdata.defaultSuggestions || null;

export default {
  tags: ["autodocs", "extended"],
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

/**
 * Custom Search Submit Handler
 *
 * Listen for the custom event `qgds-search-submit` and handle the search submission in your own way.
 */

export const CustomSubmitHandler = {
  args: {
    ...defaultdata,
    inputName: "q",
    tags: {},
    defaultSuggestions: false,
    hasDefaultSuggestions: false,
    hasDynamicSuggestions: false,
    dynamicSuggestionsServiceLink: false,
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
