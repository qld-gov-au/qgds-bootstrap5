// Navbar.stories.js
import { Header } from './Header.js';
import { Navbar } from '../navbar/Navbar.js';
import { Breadcrumbs } from '../breadcrumbs/Breadcrumbs.js';

import { default_variant, dark_variant } from './header.data.json';
import { menu_state } from '../navbar/navbar.data.json';
import defaultdata from '../breadcrumbs/breadcrumbs.data.json';

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
    ...default_variant,
    ...menu_state,
    ...defaultdata.default,
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
    ...dark_variant,
    ...menu_state,
    ...defaultdata.default,
  },
  parameters: {
    backgrounds: {
      default: "Dark alternative",
      values: [{ name: "Dark alternative", value: "var(--qld-dark-blue)" }],
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
