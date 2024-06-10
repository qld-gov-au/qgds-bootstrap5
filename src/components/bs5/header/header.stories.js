// Navbar.stories.js
import { Header } from './Header.js';
import { Navbar } from '../navbar/Navbar.js';
import { SearchInput } from "../searchInput/SearchInput.js";

//Sample components
import { Banner } from '../banner/Banner.js'; 
import { Footer } from '../footer/Footer.js'; 

// Mock data
import { menu_state } from '../navbar/navbar.data.json';
import searchData from '../searchInput/searchInput.data.json';
import breadcrumbs from '../banner/banner.data.json';
import footerData from '../footer/footer.data.json';

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
        ${new Header({...args, searchInput: new SearchInput(searchData).html}).html}
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
    ...menu_state
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
    ...menu_state
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
    ...menu_state
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
          --qld-core-default-color-neutral-black: #131212;
          --qld-core-default-color-neutral-darkest: #222020;
          --qld-core-default-color-neutral-darker: #444444;
          --qld-core-default-color-neutral-dark: #78797e;
          --qld-core-default-color-neutral-light: #e0e0e0;
          --qld-core-default-color-neutral-lighter: #ebebeb;
          --qld-core-default-color-neutral-lightest: #f5f5f5;
          --qld-core-default-color-neutral-white: #ffffff;
          --qld-core-default-color-status-caution-default: #ffcc2c;
          --qld-core-default-color-status-caution-darker: #B38800;
          --qld-core-default-color-status-caution-lighter: #fff2c9;
          --qld-core-default-color-status-caution-lightest: #fffaea;
          --qld-core-default-color-status-info-default: #0085b3;
          --qld-core-default-color-status-info-darker: #006a8f;
          --qld-core-default-color-status-info-lighter: #e5eef5;
          --qld-core-default-color-status-info-lightest: #eff4f9;
          --qld-core-default-color-status-error-default: #e22339;
          --qld-core-default-color-status-error-darker: #8a1220;
          --qld-core-default-color-status-error-lighter: #fdf0f0;
          --qld-core-default-color-status-error-lightest: #fff6f6;
          --qld-core-default-color-status-success-default: #339d37;
          --qld-core-default-color-status-success-darker: #0a690d;
          --qld-core-default-color-status-success-lighter: #f2faf4;
          --qld-core-default-color-status-success-lightest: #f7fbf8;
          --qld-core-default-color-status-underline-light: #ffffffb8;
          --qld-core-default-color-status-underline-dark: #03213fb8;
          --qld-core-default-color-brand-primary-dark-blue: #05325f;
          --qld-core-default-color-brand-primary-sapphire-blue: #09549f;
          --qld-core-default-color-brand-primary-light-blue: #0085b3;
          --qld-core-default-color-brand-primary-light-green: #6bbe27;
          --qld-core-default-color-brand-secondary-darkgreen: #008635;
          --qld-core-default-color-brand-secondary-golden-yellow: #ffe500;
          --qld-core-default-color-brand-other-modern-maroon: #a70240;
          --qld-core-default-color-brand-other-gov-maroon: #771e32;
          --qld-core-default-color-code-green: #6bbe27;
          --qld-core-default-color-code-light-blue: #a7e5ff;
          --qld-core-default-color-code-violet: #c88df7;
          --qld-core-default-color-code-muted: #c0d7ec;
          --qld-core-default-color-contained-layout-background: #09549F;
          --qld-core-default-color-contained-layout-background-dark: #09549F;
          --qld-color-default-color-light-background-default: #ffffff;
          --qld-color-default-color-light-background-default-shade: #f5f5f5;
          --qld-color-default-color-light-background-light: #eff4f9;
          --qld-color-default-color-light-background-light-shade: #e5eef5;
          --qld-color-default-color-light-background-alt: #f4f4f4;
          --qld-color-default-color-light-background-alt-shade: #d6eff4;
          --qld-color-default-color-light-border-default: #ebebeb;
          --qld-color-default-color-light-border-light: #ccddee;
          --qld-color-default-color-light-border-alt: #6F8690;
          --qld-color-default-color-light-action-primary: #06658A;
          --qld-color-default-color-light-action-primary-hover: #161616;
          --qld-color-default-color-light-action-secondary: #009BAD;
          --qld-color-default-color-light-action-secondary-hover: #161616;
          --qld-color-default-color-light-link-on-action: #06658A;
          --qld-color-default-color-light-link-default: #046994;
          --qld-color-default-color-light-link-visited: #551A8B;
          --qld-color-default-color-light-accent-design-accent: #FFD559;
          --qld-color-default-color-light-focus-default: #02A2B5;
          --qld-color-default-color-light-underline-default: #1B88B7;
          --qld-color-default-color-light-underline-default-hover: #09549F;
          --qld-color-default-color-light-underline-visited: #8b63b0;
          --qld-color-default-color-light-underline-visited-hover: #551a8b;
          --qld-color-default-color-light-text-default: #333333;
          --qld-color-default-color-light-text-lighter: #636363;
          --qld-color-default-color-light-text-heading: #003549;
          --qld-color-default-color-light-site-title: #022A50;
          --qld-color-default-color-light-crest-fill: #022A50;
          --qld-color-default-color-dark-background-default: #046994;
          --qld-color-default-color-dark-background-default-shade: #005C84;
          --qld-color-default-color-dark-background-alt: #080707;
          --qld-color-default-color-dark-background-alt-shade: #161616;
          --qld-color-default-color-dark-border-default: #4A93B3;
          --qld-color-default-color-dark-border-alt: #09ACFE;
          --qld-color-default-color-dark-action-primary: #4A93B3;
          --qld-color-default-color-dark-action-primary-hover: #FFFFFF;
          --qld-color-default-color-dark-action-secondary: #FFD559;
        }
        </style>
        <main>
          ${Story()}
        </main>
        <div>
          ${new Banner(breadcrumbs).html}
          ${new Footer(footerData).html}
        </div>
      `;
    },
  ],
};
