// Blockquote.stories.js
import { FormCheck } from './FormCheck.js';
import defaultdata from './form-check.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/FormCheck',
  render: (args) => new FormCheck(args).html,
};

// Default blockquote story
export const Default = {
    args: defaultdata
};

export const Dark = {
  
  args: defaultdata,
  parameters: {
    backgrounds: {
      default: 'Dark',
      values: [
        { name: 'Dark', value: 'var(--qld-sapphire-blue)' },
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

export const Validation = {
  args: defaultdata,
  render: (args) => {
    return `
    <div class="valid">${new FormCheck(args).html}</div>
    <div class="invalid">${new FormCheck(args).html}</div>
    `
  }
}