// Navbar.stories.js
import { Header } from './Header.js';
import { Navbar } from '../navbar/Navbar.js';
import { menu_state } from '../navbar/navbar.data.json';
import { 
  masterbrand_variant, 
  subbrand_variant, 
  endorsed_variant, 
  standalone_variant } from './header.data.json';
  
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

// Endorsed brand
export const EndorsedBrand = {
  args: {
    ...endorsed_variant,
    ...menu_state,
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

// Standalone
export const StandaloneBrand = {
  args: {
    ...standalone_variant,
    ...menu_state,
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
        <style>
          :root {
            //Override example
          }
        </style>
        ${Story()}
      `;
    },
  ],
};
