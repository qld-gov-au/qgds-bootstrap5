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
  args: defaultdata,
};

export const RadioDark = {
  
  args: {...defaultdata, id: "radioDark"},
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
  args: {...defaultdata, type: "checkbox", id: "checkboxDefault"},
};

export const CheckboxDark = {
  
  args: {...defaultdata, type: "checkbox", id: "checkboxDark"},
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
  
  args: {...defaultdata, id: "radioSmall"},
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
  
  args: {...defaultdata, id: "radioSmallDark"},
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
  args: {...defaultdata, type: "checkbox", id: "checkboxSmall"},
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
  args: {...defaultdata, type: "checkbox", id: "checkboxSmallDark"},
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
  args: {...defaultdata, id: "radioValid"},
  render: (args) => {
    return `
    <div class="valid">${new Formcheck(args).html}</div>
    `
  }
}

export const RadioValidSmall = {
  args: {...defaultdata, id: "radioValidSmall"},
  render: (args) => {
    return `
    <div class="small"><div class="valid">${new Formcheck(args).html}</div></div>
    `
  }
}

export const RadioValidDark = {
  args: {...defaultdata, id: "radioValidDark"},
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
  args: {...defaultdata, id: "radioValidSmallDark"},
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
  args: {...defaultdata, type: "checkbox", id: "checkboxValid"},
  render: (args) => {
    return `
    <div class="valid">${new Formcheck(args).html}</div>
    `
  }
}

export const CheckboxValidSmall = {
  args: {...defaultdata, type: "checkbox", id: "checkboxValidSmall"},
  render: (args) => {
    return `
    <div class="small"><div class="valid">${new Formcheck(args).html}</div></div>
    `
  }
}

export const CheckboxValidDark = {
  args: {...defaultdata, type: "checkbox", id: "checkboxValidDark"},
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
  args: {...defaultdata, type: "checkbox", id: "checkboxValidSmallDark"},
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
  args: {...defaultdata, id: "radioInvalid"},
  render: (args) => {
    return `
    <div class="invalid">${new Formcheck(args).html}</div>
    `
  }
}

export const RadioInvalidSmall = {
  args: {...defaultdata, id: "radioInvalidSmall"},
  render: (args) => {
    return `
    <div class="small"><div class="invalid">${new Formcheck(args).html}</div></div>
    `
  }
}
export const RadioInvalidDark = {
  args: {...defaultdata, id: "radioInvalidDark"},
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
  args: {...defaultdata, id: "radioInvalidSmallDark"},
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
  args: {...defaultdata, type: "checkbox", id: "checkboxInvalid"},
  render: (args) => {
    return `
    <div class="invalid">${new Formcheck(args).html}</div>
    `
  }
}

export const CheckboxInvalidSmall = {
  args: {...defaultdata, type: "checkbox", id: "checkboxInvalidSmall"},
  render: (args) => {
    return `
    <div class="small"><div class="invalid">${new Formcheck(args).html}</div></div>
    `
  }
}

export const CheckboxInvalidDark = {
  args: {...defaultdata, type: "checkbox", id: "checkboxInvalidDark"},
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
  args: {...defaultdata, type: "checkbox", id: "checkboxInvalidSmallDark"},
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