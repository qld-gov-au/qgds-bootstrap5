// Blockquote.stories.js
import { Blockquote } from './Blockquote.js';
import defaultdata from './blockquote.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/Blockquote',
  render: (args) => new Blockquote(args).html,
};

/**
 * Default blockquote
 */
export const Default = {
  args: defaultdata,
};


/**
 * Light colour blockquote
 */
export const Light = {
  args: defaultdata,
  parameters: {
    backgrounds: {
      default: 'light',
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
      default: 'alternative',
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
