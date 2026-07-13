// Blockquote.stories.js
import { Pagination } from "./Pagination.js";
import defaultdata from "./pagination.data.json";
import metadata from "./metadata.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Pagination",
  render: (args) => new Pagination(args).html,

  parameters: {
    coderefs: {
      metadata,
      partialname: "pagination", //{{> pagination }}
    },
    docs: {
      controls: {
        exclude: ["previous", "next", "pages"],
        hideNoControlsWarning: true,
      },
    },
    backgrounds: { disable: false },
  },
  globals: { backgrounds: { value: "default" } },
};

/**
 * Pagination (Default)
 */
export const Default = {
  args: defaultdata,
};

/**
 * Pagination when used inside a <code>.light</code> container
 */
export const Light = {
  args: defaultdata,
  globals: {
    backgrounds: {
      value: "light",
    },
  },

  decorators: [
    (Story) => {
      return `
      <div class="light">
          ${Story()}
      </div>
      `;
    },
  ],
};

/**
 * Pagination when used inside a <code>.alt</code> container
 */

export const LightAlternative = {
  args: defaultdata,

  globals: {
    backgrounds: {
      value: "alt",
    },
  },

  decorators: [
    (Story) => {
      return `
      <div class="">
          ${Story()}
      </div>
      `;
    },
  ],
};

/**
 * Pagination when used inside a <code>.dark</code> container
 */

export const Dark = {
  args: defaultdata,

  globals: {
    backgrounds: {
      value: "dark",
    },
  },

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
 * Pagination when used inside a <code>.dark-alt</code> container
 */

export const DarkAlternative = {
  args: defaultdata,

  globals: {
    backgrounds: {
      value: "darkAlt",
    },
  },

  decorators: [
    (Story) => {
      return `
      <div class="dark-alt">
          ${Story()}
      </div>
      `;
    },
  ],
};

/**
 * Pagination with high page counts
 */

export const HighPageCount = {
  args: {
    ...defaultdata,
    pages: [
      { href: "#", linktext: "98", arialabel: "Page 98", customClasses: "" },
      { href: "#", linktext: "", customClasses: "more", more: true },
      { href: "#", linktext: "99", arialabel: "Page 99" },
      {
        href: "#",
        linktext: "100",
        arialabel: "Page 100, current page",
        customClasses: "active",
      },
      { href: "#", linktext: "101", arialabel: "Page 101", customClasses: "" },
      { href: "#", linktext: "", customClasses: "more", more: true },
      { href: "#", linktext: "120", arialabel: "Page 120", customClasses: "" },
    ],
  },

  globals: {
    backgrounds: {
      value: "default",
    },
  },

  decorators: [
    (Story) => {
      return `
      <div class="">
          ${Story()}
      </div>
      `;
    },
  ],
};
