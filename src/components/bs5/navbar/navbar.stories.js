import { Navbar } from './Navbar.js';
import defaultdata from './navbar.data.json';

export default {
  tags: ['autodocs'],
  title: '3. Components/Navbar',
  render: (args) => new Navbar(args).html,
  args: {}, // Remove defaultdata from here
  argTypes: {
    vertOrientation: {
      name: 'Vertical Orientation',
      description: 'Use the vertical orientation for the navbar component.',
      control: 'boolean',
    },
    // altColour: {
    //   name: 'Alternative Colour',
    //   description: 'Use the alternative colour scheme for the navbar component.',
    //   control: 'boolean',
    // },
    
    'metadata.altColour': {
      name: 'Alternative Colour',
      description: 'Alternative colour setting in metadata.',
      control: 'boolean',
    },
    navbarBrandName: {
      name: 'Brand Name',
      description: 'The brand name for the navbar component. This is only visible in mobile view.',
      control: 'text',
    },
    navigation: {
      name: 'Navigation',
      description: 'The navigation items for the navbar component.',
      control: 'object',
    },
    metadata: {
      name: 'Metadata',
      description: 'Metadata for the navbar component.',
      control: 'object',
    },
  },
  parameters: {
    design: {
      name: "QGDS Figma Reference",
      type: "figma",
      url: "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=5990-97604&p=f&t=LpEqEay1h4fgTRLl-0",
    },
  },
};

export const Default = {
  args: defaultdata, // Move defaultdata to individual stories instead
};
