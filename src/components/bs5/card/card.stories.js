// Blockquote.stories.js
import { Card } from './Card.js';
import defaultdata from './cardblock.data.json';

export default {
    
  tags: ['autodocs'],
  title: 'Components/Card',
  render: (args) => new Card(args).html,
  
  argTypes: {
    title: { // this object is configuring the field objects
      name: 'Title', // name of the field
    },
    description: {
      name: "Blank",
      description: "Bblank",
      control: {
        type: "select",
      },
      table: { // refers to the whole table in the storybook properties section
        disable: true, // completely removes this field
      },
    },
    // image: "assets/img/ds-example-image-1.jpg",
    // alt: "A photo of cliffs by the ocean with trees in the foreground",
    // link: "https://web.dev",
    // footer: false,
    classes: {
      name: "Classes",
      description: `Settable classes for the component`,
      control: {
        type: "radio",
        //tell it what options to show
        labels: {
          "": "Default",
          "card-alternative": "Alternative",
          "card-primary": "Dark",
          "card-primary--dark": "Dark alternative",
        },
      },
      options: [
        "", //default, we don't need additional classes
        "card-alternative",
        "card-primary",
        "card-primary--dark",
      ]
    },
    sizes: {
      name: "Sizes",
      description: `Settable sizes`,
      control: {
        type: "radio",
        labels: {
          "card-large": "Large",
          "card-medium": "Medium",
          "card-small": "Small",
        },
      },
      options: [
        "card-large",
        "card-medium",
        "card-small",
      ]
    }
  },
    
    // breadcrumbs: {
    //   name: 'Breadcrumbs',
    //   control: 'object',
    //   description: `Pass a JSON object containing an array of links to the component.`,
    // },
  };

export const Default = {
  args: defaultdata.cards[0],
  parameters: {
    backgrounds: { // from .storybook > preview.js
      default: "light",
    },
  },
};

export const DefaultAlt = {
  args: defaultdata.cards[0],
  parameters: {
    backgrounds: { // from .storybook > preview.js
      default: "light",
    },
  },
  decorators: [
    (Story) => {
      return `
        <div data-bs-theme="alternative">
        ${Story()}
        </div>
      `;
    }
  ]
};

export const Dark = {
  args: defaultdata.cards[0],
  parameters: {
    backgrounds: { // from .storybook > preview.js
      default: "dark",
    },
  },
  decorators: [
    (Story) => {
      return `
        <div data-bs-theme="dark">
        ${Story()}
        </div>
      `;
    }
  ]
}

export const DarkAlt = {
  args: defaultdata.cards[0],
  parameters: {
    backgrounds: { // from .storybook > preview.js
      default: "dark",
    },
  },
  decorators: [
    (Story) => {
      return `
        <div data-bs-theme="dark-alternative">
        ${Story()}
        </div>
      `;
    }
  ]
}