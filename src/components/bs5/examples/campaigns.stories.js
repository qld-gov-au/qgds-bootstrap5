import { Header } from '../header/Header';
import { Navbar } from '../navbar/Navbar';
import { SearchInput } from "../searchInput/SearchInput";
import { Footer } from "../footer/Footer";

// Mock data
import { SaversHeader, SaversSearch, SaversNavigation, SaversFooter } from './qld-savers.data.json';

// Savers palette
const sample_argtypes = {
    '--qld-color-default-color-light-background-default': '#ffffff',
    '--qld-color-default-color-light-background-default-shade': '#f5f5f5',
    '--qld-color-default-color-light-background-light': '#eff4f9',
    '--qld-color-default-color-light-background-light-shade': '#e5eef5',
    '--qld-color-default-color-light-background-alt': '#f4f4f4',
    '--qld-color-default-color-light-background-alt-shade': '#d6eff4',
    '--qld-color-default-color-light-border-default': '#ebebeb',
    '--qld-color-default-color-light-border-light': '#ccddee',
    '--qld-color-default-color-light-border-alt': '#6F8690',
    '--qld-color-default-color-light-action-primary': '#06658A',
    '--qld-color-default-color-light-action-primary-hover': '#161616',
    '--qld-color-default-color-light-action-secondary': '#009BAD',
    '--qld-color-default-color-light-action-secondary-hover': '#161616',
    '--qld-color-default-color-light-link-on-action': '#06658A',
    '--qld-color-default-color-light-link-default': '#046994',
    '--qld-color-default-color-light-link-visited': '#551A8B',
    '--qld-color-default-color-light-accent-design-accent': '#b80b4d',
    '--qld-color-default-color-light-focus-default': '#02A2B5',
    '--qld-color-default-color-light-underline-default': '#1B88B7',
    '--qld-color-default-color-light-underline-default-hover': '#09549F',
    '--qld-color-default-color-light-underline-visited': '#8b63b0',
    '--qld-color-default-color-light-underline-visited-hover': '#551a8b',
    '--qld-color-default-color-light-text-default': '#333333',
    '--qld-color-default-color-light-text-lighter': '#636363',
    '--qld-color-default-color-light-text-heading': '#FFF',
    '--qld-color-default-color-light-site-title': '#b80b4d',
    '--qld-color-default-color-light-crest-fill': '#022A50',
    '--qld-color-default-color-dark-background-default': '#000',
    '--qld-color-default-color-dark-background-default-shade': '#005C84',
    '--qld-color-default-color-dark-background-alt': '#FFF',
    '--qld-color-default-color-dark-background-alt-shade': '#161616',
    '--qld-color-default-color-dark-border-default': '#4A93B3',
    '--qld-color-default-color-dark-border-alt': '#09ACFE',
    '--qld-color-default-color-dark-action-primary': '#4A93B3',
    '--qld-color-default-color-dark-action-primary-hover': '#FFFFFF',
    '--qld-color-default-color-dark-action-secondary': '#FFD559',
};
const arg_types = {
    '--qld-color-default-color-light-background-default': { control: 'color' },
    '--qld-color-default-color-light-background-default-shade': { control: 'color' },
    '--qld-color-default-color-light-background-light': { control: 'color' },
    '--qld-color-default-color-light-background-light-shade': { control: 'color' },
    '--qld-color-default-color-light-background-alt': { control: 'color' },
    '--qld-color-default-color-light-background-alt-shade': { control: 'color' },
    '--qld-color-default-color-light-border-default': { control: 'color' },
    '--qld-color-default-color-light-border-light': { control: 'color' },
    '--qld-color-default-color-light-border-alt': { control: 'color' },
    '--qld-color-default-color-light-action-primary': { control: 'color' },
    '--qld-color-default-color-light-action-primary-hover': { control: 'color' },
    '--qld-color-default-color-light-action-secondary': { control: 'color' },
    '--qld-color-default-color-light-action-secondary-hover': { control: 'color' },
    '--qld-color-default-color-light-link-on-action': { control: 'color' },
    '--qld-color-default-color-light-link-default': { control: 'color' },
    '--qld-color-default-color-light-link-visited': { control: 'color' },
    '--qld-color-default-color-light-accent-design-accent': { control: 'color' },
    '--qld-color-default-color-light-focus-default': { control: 'color' },
    '--qld-color-default-color-light-underline-default': { control: 'color' },
    '--qld-color-default-color-light-underline-default-hover': { control: 'color' },
    '--qld-color-default-color-light-underline-visited': { control: 'color' },
    '--qld-color-default-color-light-underline-visited-hover': { control: 'color' },
    '--qld-color-default-color-light-text-default': { control: 'color' },
    '--qld-color-default-color-light-text-lighter': { control: 'color' },
    '--qld-color-default-color-light-text-heading': { control: 'color' },
    '--qld-color-default-color-light-site-title': { control: 'color' },
    '--qld-color-default-color-light-crest-fill': { control: 'color' },
    '--qld-color-default-color-dark-background-default': { control: 'color' },
    '--qld-color-default-color-dark-background-default-shade': { control: 'color' },
    '--qld-color-default-color-dark-background-alt': { control: 'color' },
    '--qld-color-default-color-dark-background-alt-shade': { control: 'color' },
    '--qld-color-default-color-dark-border-default': { control: 'color' },
    '--qld-color-default-color-dark-border-alt': { control: 'color' },
    '--qld-color-default-color-dark-action-primary': { control: 'color' },
    '--qld-color-default-color-dark-action-primary-hover': { control: 'color' },
    '--qld-color-default-color-dark-action-secondary': { control: 'color' },
};

export default {
    title: 'Examples/Campaigns',
    render: (args) => {
        const headerHtml = new Header({ ...args, searchInput: new SearchInput(SaversSearch).html }).html;
        const navbarHtml = new Navbar(SaversNavigation).html;
        const footerHtml = new Footer(SaversFooter).html;
        return `
    ${headerHtml}
    ${navbarHtml}
    ${footerHtml}
    `;
    },
    parameters: {
        layout: 'fullscreen',
    },
};

export const QueenslandSavers = {
    args: {
        ...sample_argtypes,
        ...SaversHeader,
        ...SaversNavigation,
        ...SaversFooter,
    },
    argTypes: arg_types,
    parameters: {
        backgrounds: {
            default: 'Light',
            values: [
                { name: 'Light', value: 'var(--qld-light-background)' },
            ],
        },
    },
    decorators: [
        (Story, context) => {
            const { variantClass, ...args } = context.args;

            const cssVariables = Object.keys(args).filter(key => key.startsWith('--')).map(key => {
                return `${key}: ${args[key]};`;
            }).join('\n');

            return `
        <style>
          :root {
            ${cssVariables}
          }
        </style>
        ${Story()}
      `;
        },
    ],
};