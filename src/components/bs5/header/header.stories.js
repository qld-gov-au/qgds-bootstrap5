// Navbar.stories.js
import { Header } from './Header.js';
import { Navbar } from '../navbar/Navbar.js';
import { masterbrand_variant, subbrand_variant } from './header.data.json';
import { menu_state } from '../navbar/navbar.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/Header',
  render: (args) => {
    return `
        ${new Header(args).html}
        ${new Navbar(args).html}
        `//expand arguments, specifically turn isdisabled into true
  },
  argTypes: {
  },
  parameters: {
    layout: 'fullscreen',  
  },
};

// Navbar story with 'Light' color theme
export const MasterBrand = {
  args: {
    ...masterbrand_variant,
    ...menu_state,
    ...defaultdata.default,
  },
  parameters: {
    backgrounds: {
      default: "Light",
      values: [
        { name: 'Light', value: 'var(--qld-light-background)' },
      ],
    },
  },
  decorators: [
    (Story) => {
      return `
        ${Story()}
      `;
    },
  ],
};


// Navbar story with 'Dark' color theme
export const Subbrand = {
  args: {
    ...subbrand_variant,
    ...menu_state,
    ...defaultdata.default,
  },
  parameters: {
    backgrounds: {
      default: "Light",
      values: [
        { name: 'Light', value: 'var(--qld-light-background)' },
      ],
    },
  },
  decorators: [
    (Story) => {
      return `
        ${Story()}
      `;
    },
  ],
};
