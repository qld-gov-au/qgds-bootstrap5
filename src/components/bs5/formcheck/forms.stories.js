// Blockquote.stories.js
import { Formcheck } from './Formcheck.js';
import defaultdata from './formcheck.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/Formcheck',
  render: (args) => {
    return `
    ${new Formcheck(args).html}
    ${new Formcheck({...args, state: "disabled", label: "Disabled"}).html}
    `
  },
  //https://storybook.js.org/docs/api/arg-types 
  argTypes: {
    isdisabled: {
      table: {
        disable: true,
      },
    },
  },

};

// Default blockquote story
export const Default = {
    args: defaultdata
};

export const RadioDark = {
  
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

export const Checkbox = {
  args: {...defaultdata, type: "checkbox"},
};

export const CheckboxDark = {
  
  args: {...defaultdata, type: "checkbox"},
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

export const Small = {
  
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
      <div class="small">
          ${Story()}
      </div>
      `;
    },
  ],
};

export const RadioValid = {
  args: defaultdata,
  render: (args) => {
    return `
    <div class="valid">${new Formcheck(args).html}</div>
    `
  }
}

export const RadioValidDark = {
  args: defaultdata,
  render: (args) => {
    return `
    <div class="valid"><div class="dark">${new Formcheck(args).html}</div></div>
    `
  },  
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
      <div class="small">
          ${Story()}
      </div>
      `;
    },
  ],
}

export const RadioInvalid = {
  args: defaultdata,
  render: (args) => {
    return `
    <div class="invalid">${new Formcheck(args).html}</div>
    `
  }
}
export const RadioInvalidDark = {
  args: defaultdata,
  render: (args) => {
    return `
    <div class="invalid"><div class="dark">${new Formcheck(args).html}</div></div>
    `
  },  
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
      <div class="small">
          ${Story()}
      </div>
      `;
    },
  ],
}
