// Button.stories.js
import { Button } from './Button.js';
import defaultdata from './button.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/Button',
  render: (args) => new Button(args).html,

  //https://storybook.js.org/docs/api/arg-types 
  argTypes: {
    classes: {
      name: "Classes",
      description: `Settable classes for the compo nent`,
      control: {
        type: "radio",
        labels: {
          "btn-primary": "Primary",
          "btn-secondary": "Secondary",
          // "btn-outline-primary": "Primary outline",
          "btn-outline-secondary": "Secondary outline",
          "btn-tertiary": "Tertiary",
        },
      },
      options: [
        "btn-primary",
        "btn-secondary",
        // "btn-outline-primary",
        "btn-outline-secondary",
        "btn-tertiary",
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
        //exclude: ["headers", "rows", "footer"],
      },
    },
  },


};

// Default blockquote story
export const Default = {
  args: defaultdata,
};
