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
            --qld-color-light__site-title: #000000;
            --qld-color-light__design-accent: #FF0084;
            --qld-color-light__heading: #1C0A20;
            --qld-color-light__text: #414141;
            --qld-color-light__text--lighter: #333333;
            --qld-color-light__link: #710074;
            --qld-color-light__link--visited: #810036;
            --qld-color-light__link--on-action: #FFFFFF;
            --qld-color-light__action--primary: #420725;
            --qld-color-light__action--primary-hover: #000000;
            --qld-color-light__focus: #9C008D;
            --qld-color-light__border: #A5A5A5;
            --qld-color-light__background: #FFFFFF;
            --qld-color-light__background--shade: #F6F6F6;
            --qld-color-light__underline: #97009b;
            --qld-color-light__underline--hover: #710074;
            --qld-color-light__underline--visited: #94003e;
            --qld-color-light__underline--hover-visited: #810036;
            --qld-color-light__action--secondary: #59449A;
            --qld-color-light__action--secondary-hover: #810036;
            --qld-color-light__border--alt: #595959;
            --qld-color-light__background--alt: #FFEAF5;
            --qld-color-light__background--alt-shade: #F8E1ED;
            --qld-color-dark__design-accent: #FF0084;
            --qld-color-dark__heading: #FFFFFF;
            --qld-color-dark__text: #FFFFFF;
            --qld-color-dark__text--lighter: #FECBE5;
            --qld-color-dark__link: #faddec;
            --qld-color-dark__link--visited: #faddec;
            --qld-color-dark__link--on-action: #000000;
            --qld-color-dark__action--primary: #FC5CAF;
            --qld-color-dark__action--primary-hover: #FFC85E;
            --qld-color-dark__focus: #FFCAE5;
            --qld-color-dark__border: #FFA3D2;
            --qld-color-dark__background: #000000;
            --qld-color-dark__background--shade: #141414;
            --qld-color-dark__underline: #5d2158;
            --qld-color-dark__underline--hover: #faddec;
            --qld-color-dark__underline--visited: #5d2158;
            --qld-color-dark__underline--hover-visited: #faddec;
            --qld-color-dark__action--secondary: #FFFFFF;
            --qld-color-dark__action--secondary-hover: #FFEF60;
            --qld-color-dark__border--alt: #ffd1e8;
            --qld-color-dark__background--alt: #34001B;
            --qld-color-dark__background--alt-shade: #210011;
          }
        </style>
        ${Story()}
      `;
    },
  ],
};
