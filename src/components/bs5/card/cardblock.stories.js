// Blockquote.stories.js
import { Cardblock } from './Cardblock.js';
import { Card } from './Card.js';
import defaultdata from './cardblock.data.json';

export default {
    
  tags: ['autodocs'],
  title: 'Components/Cardblock',
  render: (args) => new Cardblock(args).html,
  
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
  },
};

export const Default = {
  args: defaultdata,
  parameters: {
    backgrounds: { // from .storybook > preview.js
      default: "dark",
    }
  }
};
