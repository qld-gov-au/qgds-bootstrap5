// Formcheck.stories.js
import { Formcheck } from './Formcheck.js';

import radiodata from './formcheck.radio.data.json';
import checkboxdata from './formcheck.checkbox.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/Formcheck/Radio',
  render: (args) => {
    return `${new Formcheck(args).html}`
  },
  //https://storybook.js.org/docs/api/arg-types 
  argTypes: {
  },

  
};

// Default story for Formcheck component
export const Default = {
  args: {...radiodata},
  parameters: {
    controls: { include: `listitems` },
  },
};

export const RadioDark = {
  args: {...radiodata},
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
  title: 'Components/Formcheck/Checkbox',
  args: {...checkboxdata},
};

export const CheckboxDark = {
  
  args: {...checkboxdata},
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

export const RadioSmall = {
  
  args: {...radiodata, id: "radioSmall"},
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

export const RadioSmallDark = {
  
  args: {...radiodata, id: "radioSmallDark"},
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
      <div class="dark"><div class="small">
          ${Story()}
      </div></div>
      `;
    },
  ],
};

export const CheckboxSmall = {
  args: {...checkboxdata, id: "checkboxSmall"},
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
  args: {...checkboxdata, id: "checkboxSmallDark"},
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

export const RadioValid = {
  args: {...radiodata, id: "radioValid"},
  render: (args) => {
    return `
    <div class="valid">${new Formcheck(args).html}</div>
    `
  },
}

export const RadioValidSmall = {
  args: {...radiodata, id: "radioValidSmall"},
  render: (args) => {
    return `
    <div class="small"><div class="valid">${new Formcheck(args).html}</div></div>
    `
  },
}

export const RadioValidDark = {
  args: {...radiodata, id: "radioValidDark"},
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

export const RadioValidSmallDark = {
  args: {...radiodata, id: "radioValidSmallDark"},
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

export const CheckboxValid = {
  args: {...checkboxdata, id: "checkboxValid"},
  render: (args) => {
    return `
    <div class="valid">${new Formcheck(args).html}</div>
    `
  },
}

export const CheckboxValidSmall = {
  args: {...checkboxdata, id: "checkboxValidSmall"},
  render: (args) => {
    return `
    <div class="small"><div class="valid">${new Formcheck(args).html}</div></div>
    `
  },
}

export const CheckboxValidDark = {
  args: {...checkboxdata, id: "checkboxValidDark"},
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
  args: {...checkboxdata, id: "checkboxValidSmallDark"},
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

export const RadioInvalid = {
  args: {...radiodata, id: "radioInvalid"},
  render: (args) => {
    return `
    <div class="invalid">${new Formcheck(args).html}</div>
    `
  },
}

export const RadioInvalidSmall = {
  args: {...radiodata, id: "radioInvalidSmall"},
  render: (args) => {
    return `
    <div class="small"><div class="invalid">${new Formcheck(args).html}</div></div>
    `
  },
}
export const RadioInvalidDark = {
  args: {...radiodata, id: "radioInvalidDark"},
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

export const RadioInvalidSmallDark = {
  args: {...radiodata, id: "radioInvalidSmallDark"},
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

export const CheckboxInvalid = {
  args: {...checkboxdata, id: "checkboxInvalid"},
  render: (args) => {
    return `
    <div class="invalid">${new Formcheck(args).html}</div>
    `
  },
}

export const CheckboxInvalidSmall = {
  args: {...checkboxdata, id: "checkboxInvalidSmall"},
  render: (args) => {
    return `
    <div class="small"><div class="invalid">${new Formcheck(args).html}</div></div>
    `
  },
}

export const CheckboxInvalidDark = {
  args: {...checkboxdata, id: "checkboxInvalidDark"},
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
  args: {...checkboxdata, id: "checkboxInvalidSmallDark"},
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
