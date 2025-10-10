import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../src/js/qld.bootstrap.js";
import "../src/css/main.masterbrand.scss";
import { withThemeByClassName } from "@storybook/addon-themes";
import {
  withDynamicTheme,
  dynamicThemeGlobalTypes,
} from "./dynamicThemeDecorator.js";

// Check if dynamic theme should be enabled via environment variable
const ENABLE_DYNAMIC_THEME = import.meta.env.ENABLE_DYNAMIC_THEME;
import { allBackgrounds } from "./modes.js";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import init from "../src/js/handlebars.init.js";
import Handlebars from "handlebars";

// NOTE: TurboSnap Performance Warning
// The handlebars.init.js import above loads handlebars.partials.js which is
// auto-generated during build. Changes to this file trigger TurboSnap to
// rebuild all stories. To prevent false positives:
// 1. The generator plugin ensures deterministic file ordering
// 2. The generated file is excluded from linting
// See: .esbuild/plugins/qgds-plugin-handlebar-partial-builder.js

/** @type { import('@storybook/html-vite').Preview } */
const preview = {
  globalTypes: {
    ...(ENABLE_DYNAMIC_THEME ? dynamicThemeGlobalTypes : {}),
  },
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
      viewports: {
        //QLD-media Breakpoints
        small: { name: "Small", styles: { width: "400px", height: "800px" } },
        medium: { name: "Medium", styles: { width: "700px", height: "800px" } },
        large: { name: "Large", styles: { width: "992px", height: "800px" } },
        xlarge: {
          name: "Extra Large",
          styles: { width: "1312px", height: "1000px" },
        },
        xxlarge: {
          name: "Extra Extra Large",
          styles: { width: "1599px", height: "1000px" },
        },
        navbreakpoint: {
          name: "Nave Breakpoint",
          styles: { width: "992px", height: "800px" },
        },
        ...INITIAL_VIEWPORTS,
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
    deepControls: { enabled: true },
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
        method: "alphabetical",
        // Set order of components in the Layout category
        order: ["*", ["Header", "Footer", "Breadcrumbs", "Side navigation"]],
      },
    },
    a11y: {
      // Optional configuration for the a11y addon
      config: {},
      options: {
        runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"],
        checks: {
          "color-contrast": { options: { noScroll: true } },
          region: { enabled: false },
        },
        restoreScroll: true,
      },
    },
  },

  decorators: [
    ...(ENABLE_DYNAMIC_THEME ? [withDynamicTheme] : []),
    // data-bs-theme="dark" won't be used
    withThemeByClassName({
      themes: {
        None: "",
        Light: "light",
        "Light alternative": "alt",
        Dark: "dark",
        "Dark alternative": "dark-alt",
      },
      defaultTheme: "None",
    }),
    (Story, { parameters }) => {
      init(Handlebars);
      const { pageLayout, wrapperClasses } = parameters;
      switch (pageLayout) {
        case "with-wrapper":
          return `
            <div class="${wrapperClasses}">
              ${Story()}	
            </div>
          `;
        default:
          return `			
              ${Story()}			
              `;
      }
    },
  ],

  tags: ["autodocs"],
};

export default preview;
