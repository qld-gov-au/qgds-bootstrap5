// Navbar.stories.js
import { Header } from './Header.js';
import { default_variant, dark_variant } from './header.data.json';

export default {
    tags: ['autodocs'],
    title: 'Components/Header',
    render: (args) => new Header(args).html,
    argTypes: {
    },
};

// Navbar story with 'Light' color theme
export const Default = {
    args: {
        ...default_variant,
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
      <div class="default">
          ${Story()}
      </div>
      `;
        },
    ],
};



// Navbar story with 'Dark' color theme
export const Dark = {
    args: {
        ...dark_variant,
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
