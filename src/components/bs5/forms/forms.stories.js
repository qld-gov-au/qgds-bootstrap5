// Blockquote.stories.js
import { Forms } from './Forms.js';
import defaultdata from './forms.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/Forms',
  render: (args) => new Forms(args).html,
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
    <div class="valid">${new Forms(args).html}</div>
    <div class="invalid">${new Forms(args).html}</div>
    `
  }
}