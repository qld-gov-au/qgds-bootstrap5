/** @import {Meta, StoryObj} from "@storybook/html-vite" */
import { Header, argTypes } from "./Header.js";
import { Navbar } from "../navbar/Navbar.js";

import metadata from "./metadata.json";

// Mock data
import menu_state from "../navbar/navbar.data.json";
import searchInputData from "../searchInput/searchInput.data.json";

import masterbrand_variant from "./header.variant.masterBrand.data.json";
import subbrand_variant from "./header.variant.subBrand.data.json";
import cobrand_variant from "./header.variant.coBrand.data.json";
import endorsed_variant from "./header.variant.endorsed.data.json";
import standalone_variant from "./header.variant.standAlone.data.json";

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
        ${new Header(args).html}
        ${new Navbar(menu_state).html}
        `;
  },
  argTypes: {
    ...argTypes,
    searchInputData: {
      table: {
        control: "object",
        category: "Search input",
        readonly: true,
      },
    },
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      controls: {
        exclude: ["navigation", "preHeader.globalLink.url", "mainContent.url"],
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
    searchInputData: searchInputData,
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
    searchInputData: searchInputData,
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
    searchInputData: searchInputData,
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
    searchInputData: searchInputData,
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
    searchInputData: searchInputData,
  },
  decorators: [
    (Story) => {
      return `
          ${Story()}
      `;
    },
  ],
};
