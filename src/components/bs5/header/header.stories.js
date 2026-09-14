/** @import {Meta, StoryObj} from "@storybook/html-vite" */
import { Header, argTypes } from "./Header.js";
import { Navbar } from "../navbar/Navbar.js";
import { SearchInput } from "../searchInput/SearchInput.js";

import metadata from "./metadata.json";

// Mock data
import menu_state from "../navbar/navbar.data.json";
import searchData from "../searchInput/searchInput.data.json";

import masterbrand_variant from "./header.variant.masterBrand.data.json";
import subbrand_variant from "./header.variant.subBrand.data.json";
import cobrand_variant from "./header.variant.coBrand.data.json";
import endorsed_variant from "./header.variant.endorsed.data.json";
import standalone_variant from "./header.variant.standAlone.data.json";

import { waitFor } from "../../../js/testingutils.js";
import { expect } from "storybook/test";
/**
 * #### Regarding the "Delivering for Queensland" logo.
 *
 * The `hasDeliveringForQLDLogo` option should always be set to `true` for all brand configurations.
 * This overrides the standard Coat Of Arms logo, and will always be displayed in the preheader region on mobile and table screens regardless of brand configuration.
 *
 * The "Delivering for QLD" logo is also displayed on desktop screens in the main content region except under these conditions:
 * - When `mainContent.siteTitle` has a value, the displayed logo will default to a standard COA stacked logo for space reasons.
 * - When `mainContent.logo.src` has a value, will display the chosen custom logo.
 *
 */
export default {
  tags: ["autodocs"],
  title: "2. Layout/Header",
  render: (args) => {
    return `
        ${new Header({ ...args, searchInput: new SearchInput(searchData).html }).html}
        ${new Navbar(menu_state).html}
        `;
  },
  argTypes,
  parameters: {
    layout: "fullscreen",
    docs: {
      controls: {
        exclude: [
          "navigation",
          "preHeader.globalLink.url",
          "mainContent.url",
          "assets.siteSearch.value",
          "assets.siteSearch.placeholder",
          "assets.siteSearch.label",
          "assets.siteSearch.formAction.url",
        ],
      },
      story: { height: "400px" },
    },
    coderefs: {
      metadata,
      partialname: "header", //{{> header }}
      tabs: {
        notes:
          "The QGDS Header requires the Navbar component for primary menu (refer Navbar story).",
      },
    },
    backgrounds: { disable: true },
  },
};

export const MasterBrand = {
  args: {
    ...masterbrand_variant,
  },
  decorators: [
    (Story) => {
      return `
        ${Story()}
      `;
    },
  ],
};

export const SubBrand = {
  args: {
    ...subbrand_variant,
  },
  decorators: [
    (Story) => {
      return `
        ${Story()}
      `;
    },
  ],
};

// Co brand
export const CoBrand = {
  args: {
    ...cobrand_variant,
  },
  decorators: [
    (Story) => {
      return `
          ${Story()}
      `;
    },
  ],
};

// Endorsed brand
export const EndorsedBrand = {
  args: {
    ...endorsed_variant,
  },
  decorators: [
    (Story) => {
      return `
          ${Story()}
      `;
    },
  ],
};

// Standalone
export const StandaloneBrand = {
  args: {
    ...standalone_variant,
  },
  decorators: [
    (Story) => {
      return `
          ${Story()}
      `;
    },
  ],
};

/**
 * Search Panel should appear when mobile "Show Search" button is clicked
 * @type StoryObj
 */
export const MobileSearch = {
  tags: ["!autodocs"], // Do not render as a component variant in Overview page
  parameters: {
    chromatic: { disableSnapshot: true }, // do not need the snapshot - this is an interaction test.
  },
  globals: {
    viewport: "medium",
  },
  args: MasterBrand.args,
  decorators: [
    (Story) => `${Story()}
      <button type="button" style="margin-top: 100px;">I'm just here for the focus.</button>
    `,
  ],
  play: async ({ canvasElement, userEvent, step }) => {
    const showSearchButton = canvasElement.querySelector(
      "#qld-header-toggle-search-button",
    );
    const searchPanel = canvasElement.querySelector("#qld-header-search"); // This is element which is shown/hidden to
    const searchInput = searchPanel.querySelector("input#search"); // The input itself

    await step(
      "Click search button should show search panel and move focus to search input",
      async () => {
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
  ...MobileSearch,
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
  ...MobileSearch,
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
  ...MobileSearch,
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
