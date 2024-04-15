// Navbar.stories.js
import { Header } from './Header.js';
import { master_brand } from './header.data.json';

export default {
    tags: ['autodocs'],
    title: 'Components/Header',
    render: (args) => new Header(args).html,
    argTypes: {
    },
};

// Navbar story with 'Light' color theme
export const LightMode = {
    args: {
        ...master_brand,
    },
    parameters: {
        backgrounds: {
            default: "Light",
            values: [{ name: "Light", value: "var(--qld-light-background)" }],
        },
    },
    decorators: [
        (Story) => {
            return `
      <div class="light">
          ${Story()}
      </div>
      `;
        },
    ],
};

// Navbar story with 'Alternative' color theme
export const Alternative = {
    args: {
        ...master_brand,
    },
    parameters: {
        backgrounds: {
            default: "Alternative",
            values: [{ name: "Alternative", value: "var(--qld-light-grey-alt)" }],
        },
    },
    decorators: [
        (Story) => {
            return `
      <div class="alt">
          ${Story()}
      </div>
      `;
        },
    ],
};

// Navbar story with 'Dark' color theme
export const Dark = {
    args: {
        ...master_brand,
    },
    parameters: {
        backgrounds: {
            default: "Dark",
            values: [{ name: "Dark", value: "var(--qld-sapphire-blue)" }],
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

// Navbar story with 'DarkAlternative' color theme
export const DarkAlternative = {
    args: {
        ...master_brand,
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
      <div class="dark-alt">
          ${Story()}
      </div>
      `;
        },
    ],
};