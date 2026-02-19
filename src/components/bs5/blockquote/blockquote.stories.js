// Blockquote.stories.js
import { Blockquote } from "./Blockquote.js";
import defaultdata from "./blockquote.data.json";
import metadata from "./metadata.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Blockquote",
  render: (args) => new Blockquote(args).html,

  parameters: {
    coderefs: {
      metadata,
      partialname: "blockquote", //{{> blockquote }}
    },
    docs: {},
  },
};

/**
 * Default blockquote
 */
export const Default = {
  args: defaultdata,
};

// Controls are auto-generated here by Storybook from argTypes

/**
 * Light colour blockquote
 */
export const Light = {
  args: {
    ...defaultdata,
    "cite-text": "Elvis the King",
  },
  parameters: {
    backgrounds: {
      default: "light",
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
 * Alternative colour blockquote
 */
export const Alternative = {
  args: defaultdata,
  parameters: {
    backgrounds: {
      default: "alternative",
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="alt">
          ${Story()}
      </div>
      `;
    },
  ],
};
