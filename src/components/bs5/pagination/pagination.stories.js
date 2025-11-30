// Blockquote.stories.js
import { Pagination } from "./Pagination.js";
import defaultdata from "./pagination.data.json";

export default {
  tags: ["autodocs", "core"],
  title: "3. Components/Pagination",
  render: (args) => new Pagination(args).html,

  parameters: {
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
