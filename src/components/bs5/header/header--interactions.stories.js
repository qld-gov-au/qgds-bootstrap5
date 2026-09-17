/** @import {Meta, StoryObj} from "@storybook/html-vite" */
import defaultMeta, { MasterBrand } from "./header.stories.js";

import { waitFor } from "../../../js/testingutils.js";
import { expect } from "storybook/test";

export default {
  ...defaultMeta,
  tags: ["!autodocs"], // Do not create an overview page for these stories
  title: "2. Layout/Header/Interactions", // Must be a string literal - see https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#string-literal-titles
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: MasterBrand.args,
  globals: {
    viewport: "medium",
  },
  decorators: [
    (Story) => `${Story()}
      <button type="button" style="margin-top: 100px;">I'm just here for the focus.</button>
    `,
  ],
};

/**
 * Search Panel should appear when mobile "Show Search" button is clicked
 * @type StoryObj
 */
export const MobileSearch = {
  play: async ({ canvasElement, userEvent, step }) => {
    const showSearchButton = canvasElement.querySelector(
      "#qld-header-toggle-search-button",
    );
    const searchPanel = canvasElement.querySelector("#qld-header-search"); // This is element which is shown/hidden to
    const searchInput = searchPanel.querySelector("input#search"); // The input itself

    await step(
      "Click search button should show search panel and move focus to search input",
      async () => {
        await waitFor(100);
        await expect(searchPanel).not.toBeVisible();
        await expect(showSearchButton).toHaveTextContent("Search");
        await userEvent.click(showSearchButton);
        await waitFor(500);
        await expect(searchPanel).toBeVisible();
        await expect(searchInput).toHaveFocus();
        await expect(showSearchButton).toHaveTextContent("Close");
      },
    );
  },
};

/**
 * While mobile search is open and search input has focus, tabbing back closes the search panel and refocuses showSearchButton
 * @type StoryObj
 */
export const MobileSearchTabBack = {
  play: async ({ canvasElement, userEvent, step, context }) => {
    const showSearchButton = canvasElement.querySelector(
      "#qld-header-toggle-search-button",
    );
    const searchPanel = canvasElement.querySelector("#qld-header-search"); // This is element which is shown/hidden to

    await MobileSearch.play(context);

    await step(
      "Tabbing back closes the search panel and refocuses showSearchButton",
      async () => {
        await userEvent.tab({ shift: true });
        await expect(searchPanel).not.toBeVisible();
        await expect(showSearchButton).toHaveTextContent("Search");
        await expect(showSearchButton).toHaveFocus();
      },
    );
  },
};

/**
 * While mobile search is open and search input has focus and no value, Escape key closes the search panel and refocuses showSearchButton
 * @type StoryObj
 */
export const MobileSearchEscape = {
  play: async ({ canvasElement, userEvent, step, context }) => {
    const showSearchButton = canvasElement.querySelector(
      "#qld-header-toggle-search-button",
    );
    const searchPanel = canvasElement.querySelector("#qld-header-search"); // This is element which is shown/hidden to

    await MobileSearch.play(context);

    await step(
      "Escape key closes the search panel and refocuses showSearchButton",
      async () => {
        await userEvent.keyboard("{Escape}");
        await expect(searchPanel).not.toBeVisible();
        await expect(showSearchButton).toHaveTextContent("Search");
        await expect(showSearchButton).toHaveFocus();
      },
    );
  },
};

/**
 * Tabbing forward past mobile search panel elements closes search panel and focuses the menu button.
 * @type StoryObj
 */
export const MobileSearchTabForward = {
  play: async ({ canvasElement, userEvent, step, context }) => {
    const showSearchButton = canvasElement.querySelector(
      "#qld-header-toggle-search-button",
    );
    const searchPanel = canvasElement.querySelector("#qld-header-search"); // This is element which is shown/hidden to
    const searchInputButton = searchPanel.querySelector("button#search-button"); // The input itself
    const menuButton = canvasElement.querySelector("#burgerBtn");

    await MobileSearch.play(context);

    await step(
      "Tabbing forward past mobile search panel elements closes search panel and focuses the menu button",
      async () => {
        await waitFor(500);
        const suggestionsItems = searchPanel.querySelectorAll(".suggestions a");
        await userEvent.tab();
        // The search button should have focus
        await expect(searchInputButton).toHaveFocus();

        // Tab through all menu items
        for (let i = 0; i < suggestionsItems.length; i++) {
          await userEvent.tab();
        }

        // The final suggestion item should have focus
        await expect(
          suggestionsItems.item(suggestionsItems.length - 1),
        ).toHaveFocus();

        // Tab out of menu
        await userEvent.tab();

        // Suggestions should have closed and focus to menu button
        await expect(searchPanel).not.toBeVisible();
        await expect(showSearchButton).toHaveTextContent("Search");
        await expect(menuButton).toHaveFocus();
      },
    );
  },
};
