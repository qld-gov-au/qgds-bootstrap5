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
        <div class="container">
            ${new Breadcrumbs(args).html}
        </div>
        `//expand arguments, specifically turn isdisabled into true
      },
    argTypes: {
    },
    parameters: {
        layout: 'fullscreen'  
    }
};

// Navbar story with 'Light' color theme
export const Default = {
    args: {
        ...default_variant,
        ...menu_state,
        ...defaultdata.default
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
        ...menu_state,
        ...defaultdata.default
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
