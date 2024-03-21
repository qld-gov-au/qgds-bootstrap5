// Button.stories.js
import { Button } from './Button.js';
import defaultdata from './button.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/Button',
  render: (args) => {
    return `
    ${new Button(args).html}
    ${new Button({...args, isdisabled: true}).html}
    `//expand arguments, specifically turn isdisabled into true
  },

  //https://storybook.js.org/docs/api/arg-types 
  argTypes: {
    isdisabled: {
      table: {
        disable: true,
      },
    },
    variantClass: {
      name: "Variants",
      description: `Settable variant for the component`,
      control: {
        type: "radio",
        labels: {
          "btn-primary": "Primary",
          "btn-secondary": "Secondary",
          // "btn-outline-primary": "Primary outline",
          //"btn-outline-secondary": "Secondary outline",
          "btn-tertiary": "Tertiary",
        },
      },
      options: [
        "btn-primary",
        "btn-secondary",
        // "btn-outline-primary",
        //"btn-outline-secondary",
        "btn-tertiary",
        //"dark btn-primary",
      ],
    },
  },

  parameters: {
    design: {
      name: "QGDS Figma Reference",
      type: "figma",
      url: "https://www.figma.com/file/qKsxl3ogIlBp7dafgxXuCA/QLD-GOV-DDS?type=design&node-id=5990-98058&mode=design&t=YBUAJHIxqF46Um9y-0",
    },
    docs: {
      controls: {
        //exclude: ["isdisabled"], // hide isdisabled controls
        
      },
    },
  },


};

// Default blockquote story
export const Default = {
  args: defaultdata,
};

/**
 * Dark Breadcrumbs story
 * */
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