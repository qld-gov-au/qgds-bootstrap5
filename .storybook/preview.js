import "../dist/assets/js/bootstrap.min.js";
import "../dist/assets/js/main.js";
import "../dist/assets/css/qld.bootstrap.css";
import {withThemeByClassName} from '@storybook/addon-themes';
import {allModes} from "./modes.js";
// import { withThemeByDataAttribute } from '@storybook/addon-themes';

/** @type { import('@storybook/html-vite').Preview } */
const preview = {

    parameters: {
        // actions: {argTypesRegex: "^on[A-Z].*"},
        backgrounds: {
            values: [
                {name: 'default', value: '#FFFFFF'},
                {name: 'light', value: '#EFF4F9'},
                {name: 'alternative', value: '#E8E8E8'},
            ],
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        chromatic: {
            //🔶 Test each story for ArticleCard in two modes
            modes: {
                // Light: allModes["Light"],
                // "Light alternative": allModes["Light alternative"],
                // Dark: allModes["Dark"],
                // "Dark alternative": allModes["Dark alternative"],
                mobile: allModes["mobile"],
                desktop: allModes["desktop"],
                "1200px": { viewport: 1200 }, //original non-modes based baseline
            },
        },
        docs: {
            source: {
                excludeDecorators: true,
            },
        },
        expanded: true,
        hideNoControlsWarning: true,
        html: {
            highlighter: {
                wrapLines: false,
            },
        },
        viewport: {
            viewports: { //QLD-media Breakpoints
                small: {name: "Small", styles: {width: "400px", height: "800px"}},
                medium: {name: "Medium", styles: {width: "699px", height: "800px"}},
                large: {name: "Large", styles: {width: "992px", height: "800px"}},
                xlarge: {name: "Extra Large", styles: {width: "1312px", height: "1000px"}},
                xxlarge: {name: "Extra Large", styles: {width: "1599px", height: "1000px"}},
                navbreakpoint: {name: "Nave Breakpoint", styles: {width: "992px", height: "800px"}},
            },
        },
    },

    decorators: [

        // data-bs-theme="dark" does not work, use legacy way
        withThemeByClassName({
            themes: {
                "Light": 'light',
                "Light alternative": 'alt',
                "Dark": 'dark',
                "Dark alternative": 'dark-alt',
            },
            defaultTheme: 'light',
        }),
        //QGDS BS theming is not using data-bs-theme="dark" correctly. https://getbootstrap.com/docs/5.3/customize/color-modes/
        // withThemeByDataAttribute({
        //   themes: {
        //     light: 'light',
        //     dark: 'dark',
        //   },
        //   defaultTheme: 'light',
        //   attributeName: 'data-bs-theme',
        // }),
        (Story) => {
            return `
			<div class="container-fluid">
				<div class="row">
					<div class="col-12">
					${Story()}
					</div>
				</div>
			</div>
			
      		`;
        },
    ],
};

export default preview;
