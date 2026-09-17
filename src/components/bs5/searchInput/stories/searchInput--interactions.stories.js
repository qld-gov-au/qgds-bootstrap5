/** @import {Meta, StoryObj} from "@storybook/html-vite" */

import { expect } from "storybook/test";
import { waitFor } from "../../../../js/testingutils.js";
import defaultMeta from "./searchInput.stories.js";

/** @type Meta */
export default {
  ...defaultMeta,
  tags: ["!autodocs"], // Do not generate an overview page for these stories.
  title: "3. Components/Search Input/Interactions", // Must be a string literal - see https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#string-literal-titles
};

/**
 * Search dropdown appears on focus
 * @type StoryObj
 */
export const DropdownOnFocus = {
  parameters: {
    docs: {
      description: {
        story:
          "When the input is focused, a suggestions dropdown should appear.",
      },
    },
  },
  args: {
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
  parameters: {
    chromatic: { disableSnapshot: false }, // get a snapshot of this
  },
  args: {
    ...DropdownOnFocus.args,
  },
  play: async ({ canvasElement, userEvent, step }) => {
    const inputElement = canvasElement.querySelector(".qld-search-input input");
    const suggestionsElement = canvasElement.querySelector(
      ".qld-search-input .suggestions",
    );
    await step(
      "Suggestions should show dynamic suggestions when typing",
      async () => {
        await userEvent.type(inputElement, "apply");
        await waitFor(500);
        await expect(inputElement).toHaveValue("apply");
        await waitFor(1000);
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
  parameters: {
    chromatic: { disableSnapshot: true }, // do not need the snapshot - this is an interaction test.
  },
  args: {
    ...DropdownOnFocus.args,
  },
  play: async ({ canvasElement, userEvent, context, step }) => {
    const suggestionsElement = canvasElement.querySelector(
      ".qld-search-input .suggestions",
    );

    await DropdownOnFocus.play(context);

    step("Click outside should collapse the search dropdown", async () => {
      await userEvent.click(canvasElement);
      await waitFor(500);
      await expect(suggestionsElement).not.toBeVisible();
    });
  },
};
