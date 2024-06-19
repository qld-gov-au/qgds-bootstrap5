// FormcheckCheckbox.stories.js
import { Formcheck } from '../../Formcheck.js';
import defaultdata from './checkbox.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/Forms/Checkbox',
  render: (args) => {
    return `${new Formcheck(args).html}`
  },
  //https://storybook.js.org/docs/api/arg-types 
  argTypes: {
  },

  
};

export const Default = {
  args: {...defaultdata},
};

export const CheckboxDark = {
  
  args: {...defaultdata},
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

export const CheckboxSmall = {
  args: {...defaultdata, id: "checkboxSmall"},
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

export const CheckboxSmallDark = {
  args: {...defaultdata, id: "checkboxSmallDark"},
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
      <div class="small">
          ${Story()}
      </div>
      </div>
      `;
    },
  ],
};

export const CheckboxValid = {
  args: {...defaultdata, id: "checkboxValid"},
  render: (args) => {
    return `
    <div class="valid">${new Formcheck(args).html}</div>
    `
  },
}

export const CheckboxValidSmall = {
  args: {...defaultdata, id: "checkboxValidSmall"},
  render: (args) => {
    return `
    <div class="small"><div class="valid">${new Formcheck(args).html}</div></div>
    `
  },
}

export const CheckboxValidDark = {
  args: {...defaultdata, id: "checkboxValidDark"},
  render: (args) => {
    return `
    <div class="dark">
    <div class="valid">${new Formcheck(args).html}</div></div>
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
      <div class="dark"><div class="valid">
          ${Story()}
      </div></div>
      `;
    },
  ],
}

export const CheckboxValidSmallDark = {
  args: {...defaultdata, id: "checkboxValidSmallDark"},
  render: (args) => {
    return `
    <div class="dark">
    <div class="valid">${new Formcheck(args).html}</div></div>
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
      <div class="dark"><div class="small"><div class="valid">
          ${Story()}
      </div></div></div>
      `;
    },
  ],
}

export const CheckboxInvalid = {
  args: {...defaultdata, id: "checkboxInvalid"},
  render: (args) => {
    return `
    <div class="invalid">${new Formcheck(args).html}</div>
    `
  },
}

export const CheckboxInvalidSmall = {
  args: {...defaultdata, id: "checkboxInvalidSmall"},
  render: (args) => {
    return `
    <div class="small"><div class="invalid">${new Formcheck(args).html}</div></div>
    `
  },
}

export const CheckboxInvalidDark = {
  args: {...defaultdata, id: "checkboxInvalidDark"},
  render: (args) => {
    return `
    <div class="dark">
    <div class="invalid">${new Formcheck(args).html}</div></div>
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
      <div class="dark"><div class="invalid">
          ${Story()}
      </div></div>
      `;
    },
  ],
}

export const CheckboxInvalidSmallDark = {
  args: {...defaultdata, id: "checkboxInvalidSmallDark"},
  render: (args) => {
    return `
    <div class="dark">
    <div class="invalid">${new Formcheck(args).html}</div></div>
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
      <div class="dark"><div class="small"><div class="invalid">
          ${Story()}
      </div></div></div>
      `;
    },
  ],
}
