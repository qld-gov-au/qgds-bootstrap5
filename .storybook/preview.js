import "../dist/assets/js/bootstrap.min.js";
import "../dist/assets/js/qld.bootstrap.min.js";
import "../dist/assets/css/qld.bootstrap.css";
import {withThemeByClassName} from '@storybook/addon-themes';
import {allBackgrounds} from "./modes.js";
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

/** @type { import('@storybook/html-vite').Preview } */
const preview = {
    parameters: {
        //actions: { argTypesRegex: "^on[A-Z].*" },
        chromatic: {
            //🔶 Test each story for ArticleCard in two modes
            modes: {
                // Light: allModes["Light"],
                // "Light alternative": allModes["Light alternative"],
                // Dark: allModes["Dark"],
                // "Dark alternative": allModes["Dark alternative"],
                //mobile: allModes["mobile"],
                //desktop: allModes["desktop"],
                //"1200px": {viewport: 1200}, //original non-modes based baseline
            },
        },
        viewport: {
            viewports: { //QLD-media Breakpoints
                small: {name: "Small", styles: {width: "400px", height: "800px"}},
                medium: {name: "Medium", styles: {width: "700px", height: "800px"}},
                large: {name: "Large", styles: {width: "992px", height: "800px"}},
                xlarge: {name: "Extra Large", styles: {width: "1312px", height: "1000px"}},
                xxlarge: {name: "Extra Extra Large", styles: {width: "1599px", height: "1000px"}},
                navbreakpoint: {name: "Nave Breakpoint", styles: {width: "992px", height: "800px"}},
                ...INITIAL_VIEWPORTS
            },
        },
        hideNoControlsWarning: true,
        expanded: true,
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        html: {
            highlighter: {
                wrapLines: false,
            },
        },
        docs: {
            source: {
                excludeDecorators: true,
            },
        },
        backgrounds: {
            //default: 'default',
            values: [
                allBackgrounds["default"],
                allBackgrounds["Light"],
                allBackgrounds["Light alternative"],
                allBackgrounds["Dark"],
                allBackgrounds["Dark alternative"],
            ],
        },
        options: {
            storySort: {
                method: 'alphabetical',
            }
        },
        a11y: {
            // Optional configuration for the a11y addon
            config: {},
            options: {
                checks: { 'color-contrast': { options: { noScroll: true } } },
                restoreScroll: true,
            },
        },
    },

    decorators: [
        // data-bs-theme="dark" won't be used
        withThemeByClassName({
            themes: {
                "None": '',
                "Light": 'light',
                "Light alternative": 'alt',
                "Dark": 'dark',
                "Dark alternative": 'dark-alt',
            },
            defaultTheme: 'None',
        }),
        (Story) => {
            return `
			
					${Story()}
			
      		`;
        },
    ],

    tags: ["autodocs", "autodocs"]
};

export default preview;
