// Blockquote.stories.js
import { Pagination } from './Pagination.js';
import defaultdata from './pagination.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/Pagination',
  render: (args) => new Pagination(args).html,
  
  parameters: {
    docs: {
      controls: {
        exclude: ['previous', 'next', 'pages'],
        hideNoControlsWarning: true,
      },
    },
  },
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

  parameters: {
    backgrounds: {
      default: 'Light',
      values: [
        { name: 'Light', value: 'var(--qld-light-background)' },
      ],
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
 * Pagination when used inside a <code>.light-alternative</code> container
 */

export const LightAlternative = {
  
  args: defaultdata,

  parameters: {
    backgrounds: {
      default: 'Light Alternative',
      values: [
        { name: 'Light Alternative', value: 'var(--qld-light-alt-background)' },
      ],
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

  parameters: {
    backgrounds: {
      default: 'Dark',
      values: [
        { name: 'Dark', value: 'var(--qld-primary)' },
      ],
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

  parameters: {
    backgrounds: {
      default: 'Dark Alternative',
      values: [
        { name: 'Dark Alternative', value: 'var(--qld-primary-dark)' },
      ],
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

