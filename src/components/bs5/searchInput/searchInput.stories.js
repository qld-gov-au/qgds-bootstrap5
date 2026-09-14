// SearchInput.stories.js

/** @import {Meta, StoryObj} from "@storybook/html-vite" */
import { SearchInput } from "./SearchInput.js";
import defaultdata from "./searchInput.data.json";
import metadata from "./metadata.json";
import { expect } from "storybook/test";
import { waitFor } from "../../../js/testingutils.js";

// Save the initial defaultSuggestions data with fallback
const initData = defaultdata.defaultSuggestions || null;

/** @type Meta */
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
};

export const Default = {
  args: {
    ...defaultdata,
    showDefaultSuggestions: true,
    inputID: "default-search",
  },
  name: "Default - Outline Variant",
};

/**
 * With `customClass: is-filled`
 */
export const FilledVariant = {
  args: { ...defaultdata, customClass: "is-filled", inputID: "filled-search" },
};

export const FullWidth = {
  args: {
    ...defaultdata,
    customClass: "full-width",
    inputID: "fullwidth-search",
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
    inputID: "dark-search",
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
  args: {
    ...defaultdata,
    customClass: "is-filled",
    inputID: "DarkFilledSearch",
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
 * Custom Search Submit Handler
 *
 * Listen for the custom event `qgds-search-submit` and handle the search submission in your own way.
 */
export const CustomSubmitHandler = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    ...defaultdata,
    inputName: "q",
    tags: {},
    defaultSuggestions: false,
    hasDefaultSuggestions: false,
    hasDynamicSuggestions: false,
    dynamicSuggestionsServiceLink: false,
    inputID: "CustomSubmitHandlerSearch",
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

// Interactions
/**
 * Search dropdown appears on focus
 * @type StoryObj
 */
export const DropdownOnFocus = {
  tags: ["!autodocs"],
  parameters: {
    docs: {
      description: {
        story:
          "When the input is focused, a suggestions dropdown should appear.",
      },
    },
  },
  args: {
    ...defaultdata,
    inputID: "DropdownOnFocus",
  },
  play: async ({ canvas, canvasElement, userEvent, step }) => {
    const inputElement = canvasElement.querySelector(".qld-search-input input");
    const suggestionsElement = canvasElement.querySelector(
      ".qld-search-input .suggestions",
    );
    await step("Search dropdown should appear on focus", async () => {
      await userEvent.click(inputElement);
      await waitFor(500);
      await expect(suggestionsElement).toBeVisible();
    });
  },
};

/**
 * Search dropdown disappears if search tabbed back out of
 * @type StoryObj
 */
export const TabBack = {
  tags: ["!autodocs"], // testing story only
  parameters: {
    chromatic: { disableSnapshot: true }, // do not need the snapshot - this is an interaction test.
  },
  args: {
    ...DropdownOnFocus.args,
  },
  decorators: [
    (Story) =>
      `<p tabindex="0">Previous focusable element<p>${Story()}<p tabindex="0">Next focusable element<p>`,
  ],

  play: async ({ canvasElement, userEvent, context, step }) => {
    const suggestionsElement = canvasElement.querySelector(
      ".qld-search-input .suggestions",
    );
    await DropdownOnFocus.play(context);
    await step("Search dropdown should disappear when tab back", async () => {
      await userEvent.tab({ shift: true });
      await waitFor(500);
      await expect(suggestionsElement).not.toBeVisible();
    });
  },
};

/**
 * Search dropdown disappears if search tabbed back out of
 * @type StoryObj
 */
export const DynamicSuggestions = {
  tags: ["!autodocs"], // testing story only
  parameters: {
    chromatic: { disableSnapshot: false }, // get a snapshot of this
  },
  args: {
    ...DropdownOnFocus.args,
  },
  play: async ({ canvasElement, userEvent, context, step }) => {
    const inputElement = canvasElement.querySelector(".qld-search-input input");
    const suggestionsElement = canvasElement.querySelector(
      ".qld-search-input .suggestions",
    );
    // await DropdownOnFocus.play(context);
    await step(
      "Suggestions should show dynamic suggestions when typing",
      async () => {
        await userEvent.type(inputElement, "apply");
        await waitFor(500);
        await expect(inputElement).toHaveValue("apply");
        await expect(suggestionsElement).toBeVisible();
        await expect(
          suggestionsElement.querySelector(".default-suggestions"),
        ).not.toBeVisible();
        await expect(
          suggestionsElement.querySelector(".dynamic-suggestions"),
        ).toBeVisible();
      },
    );
  },
};

/**
 * Escape clears search value and default suggestions are shown
 * @type StoryObj
 */
export const EscapeClearsValue = {
  tags: ["!autodocs"], // testing story only
  parameters: {
    chromatic: { disableSnapshot: true }, // do not need the snapshot - this is an interaction test.
  },
  args: {
    ...DropdownOnFocus.args,
  },
  play: async ({ canvasElement, userEvent, context, step }) => {
    const inputElement = canvasElement.querySelector(".qld-search-input input");
    const suggestionsElement = canvasElement.querySelector(
      ".qld-search-input .suggestions",
    );
    await DynamicSuggestions.play(context);
    await step(
      "Input value should clear if escape key pressed, and search suggestions should show default suggestions.",
      async () => {
        await userEvent.keyboard(`{Escape}`);
        await waitFor(500);
        await expect(inputElement).toHaveValue("");
        await expect(suggestionsElement).toBeVisible();
        await expect(
          suggestionsElement.querySelector(".default-suggestions"),
        ).toBeVisible();
        await expect(
          suggestionsElement.querySelector(".dynamic-suggestions"),
        ).not.toBeVisible();
      },
    );
  },
};

/**
 * Esc hides dropdown if no value, and allows to be tabbed out of.
 * @type StoryObj
 */
export const EscapeThenTab = {
  tags: ["!autodocs"], // testing story only
  parameters: {
    chromatic: { disableSnapshot: true }, // do not need the snapshot - this is an interaction test.
  },
  args: {
    ...DropdownOnFocus.args,
  },
  decorators: [
    (Story) =>
      `<p tabindex="0">Previous focusable element<p>${Story()}<p tabindex="0" >Next focusable element<p>`,
  ],
  play: async ({ canvasElement, userEvent, context, step, canvas }) => {
    const inputElement = canvasElement.querySelector(".qld-search-input input");
    const suggestionsElement = canvasElement.querySelector(
      ".qld-search-input .suggestions",
    );
    const buttonElement = canvasElement.querySelector(
      ".qld-search-input button[type='submit']",
    );
    const nextElement = canvas.getByText("Next focusable element");

    await DropdownOnFocus.play(context);

    await step("Esc hides dropdown if no value.", async () => {
      inputElement.value = "";
      await userEvent.keyboard(`{Escape}`);
      await waitFor(500);
      await expect(suggestionsElement).not.toBeVisible();
    });

    await step(
      "Tabbing onward does not reveal the suggestions again",
      async () => {
        await userEvent.tab();
        await expect(buttonElement).toHaveFocus();
        await expect(suggestionsElement).not.toBeVisible();
        await userEvent.tab();
        await expect(nextElement).toHaveFocus();
        await expect(suggestionsElement).not.toBeVisible();
      },
    );
  },
};

/**
 * If a suggestions item has focus, Escape key will hide suggestions and refocus the input.
 * @type StoryObj
 */
export const EscapeSuggestions = {
  tags: ["!autodocs"], // testing story only
  parameters: {
    chromatic: { disableSnapshot: true }, // do not need the snapshot - this is an interaction test.
  },
  args: {
    ...DropdownOnFocus.args,
  },
  play: async ({ canvasElement, userEvent, context, step, canvas }) => {
    const inputElement = canvasElement.querySelector(".qld-search-input input");
    const suggestionsElement = canvasElement.querySelector(
      ".qld-search-input .suggestions",
    );

    await DropdownOnFocus.play(context);

    await step("Tab into suggesstions dropdown", async () => {
      await userEvent.tab();
      await userEvent.tab();
      await expect(suggestionsElement).toContainElement(document.activeElement);
    });

    await step(
      "Escape key should hide suggestions and refocus the input",
      async () => {
        await userEvent.keyboard("{Escape}");
        await waitFor(500);
        await expect(inputElement).toHaveFocus();
        await expect(suggestionsElement).not.toBeVisible();
      },
    );
  },
};

/**
 * A click outside collapses the search dropdown
 * @type StoryObj
 */
export const ClickOutside = {
  tags: ["!autodocs"], // testing story only
  parameters: {
    chromatic: { disableSnapshot: true }, // do not need the snapshot - this is an interaction test.
  },
  args: {
    ...DropdownOnFocus.args,
  },
  play: async ({ canvasElement, userEvent, context, step }) => {
    const inputElement = canvasElement.querySelector(".qld-search-input input");
    const suggestionsElement = canvasElement.querySelector(
      ".qld-search-input .suggestions",
    );

    await DropdownOnFocus.play(context);

    step("Click outside should collapse the search dropdown", async () => {
      await userEvent.click(canvasElement);
      await waitFor(500);
      await expect(inputElement).not.toHaveFocus();
      await expect(suggestionsElement).not.toBeVisible();
    });
  },
};

// Click outside disappears dropdown.
