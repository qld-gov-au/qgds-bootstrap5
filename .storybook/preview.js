import * as React from "react";
import { useEffect } from "storybook/preview-api";
import { addons } from "storybook/preview-api";
import DocumentationTemplate from "./DocumentationTemplate.mdx";

import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
  Markdown,
} from "@storybook/addon-docs/blocks";

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../src/css/main.scss";
import { withThemeByClassName } from "@storybook/addon-themes";
import {
  withDynamicTheme,
  dynamicThemeGlobalTypes,
} from "./dynamicThemeDecorator.js";

import { breakpoints } from "../src/js/constants.js";

// Check if dynamic theme should be enabled via environment variable
const ENABLE_DYNAMIC_THEME = import.meta.env.ENABLE_DYNAMIC_THEME;
import { INITIAL_VIEWPORTS } from "storybook/viewport";

// Initialize Handlebars helpers IMMEDIATELY, before any stories load
import init from "../src/js/handlebars.init.js";
import Handlebars from "handlebars";
init(Handlebars);

import "../src/js/qld.bootstrap.js";

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
      options: {
        //QLD-media Breakpoints
        small: {
          name: "Small",
          styles: { width: `${breakpoints.sm}px`, height: "800px" },
        },
        medium: {
          name: "Medium",
          styles: { width: `${breakpoints.md}px`, height: "800px" },
        },
        large: {
          name: "Large",
          styles: { width: `${breakpoints.lg}px`, height: "800px" },
        },
        xlarge: {
          name: "Extra Large",
          styles: { width: `${breakpoints.xl}px`, height: "1000px" },
        },
        xxlarge: {
          name: "Extra Extra Large",
          styles: { width: "1599px", height: "1000px" },
        },
        navbreakpoint: {
          name: "Nave Breakpoint",
          styles: { width: `${breakpoints.lg}px`, height: "800px" },
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
      page: DocumentationTemplate,
      toc: {
        disable: false,
        headingSelector: "h2, h3",
        title: "",
      },
      source: {
        excludeDecorators: true,
        state: "open",
        type: "dynamic",
      },
      codePanel: false,
    },
    backgrounds: {
      options: {
        default: { name: "Default", value: "var(--qld-default-background)" },
        light: { name: "Light", value: "var(--qld-light-background)" },
        alt: { name: "Light Alt", value: "var(--qld-light-alt-background)" },
        dark: { name: "Dark", value: "var(--qld-dark-background)" },
        darkAlt: { name: "Dark Alt", value: "var(--qld-dark-alt-background)" },
      },
      disable: true,
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
    initialGlobals: {
      backgrounds: { value: "default" },
    },
  },

  sidebar: {
    showRoots: false,
  },

  decorators: [
    /**
     * Channel Communication Decorator
     *
     * Establishes a channel connection between the Storybook preview (inner iframe)
     * and Storybook manager (outer frame) to send coderefs data to the
     * "Code References" panel whenever a story is rendered or updated.
     *
     * @fires CODEREFS_UPDATE - Emits payload to manager with template, json, html, name, notes, and metadata
     */

    (Story, context) => {
      const { args, parameters } = context;

      const coderefs = parameters.coderefs || {};
      const metadata = coderefs?.metadata || {};
      const storyArgs = coderefs?.args || args;

      useEffect(() => {
        const channel = addons.getChannel();

        // If coderefs.show is explicitly false, send "hide" signal and exit
        if (coderefs.show === false) {
          channel.emit("CODEREFS_UPDATE", { showPanel: false });
          return;
        }

        // Default tabs to show
        const showtabs = {
          htmlstory: coderefs.tabs?.htmlstory !== false,
          htmlcomponent: coderefs.tabs?.htmlcomponent !== false,
          json: coderefs.tabs?.json !== false,
          template: coderefs.tabs?.template !== false,
          howtouse: coderefs.tabs?.howtouse !== false,
          notes: coderefs.tabs?.notes !== undefined,
        };

        // Check if any tabs are visible
        const hasVisibleTabs = Object.values(showtabs).some(Boolean);

        // If no tabs to show, send "hide" signal and exit
        if (!hasVisibleTabs) {
          channel.emit("CODEREFS_UPDATE", { showPanel: false });
          return;
        }

        // Get the story's rendered HTML

        // Full Story HTML
        const htmlstoryContent = Story(args, context);

        // Component only HTML
        const hbspartial = Handlebars.partials[coderefs.partialname] || false;

        if (!hbspartial) {
          console.warn(
            `[CODEREFS] Partial "${coderefs.partialname}" not found in Handlebars partials.`,
          );
        }

        const htmlcomponentContent =
          typeof hbspartial === "string"
            ? Handlebars.compile(hbspartial)(args)
            : "Missing partialname in story config, or component does use a handlebars template.";

        // Data we're sending from preview frame to manager frame
        const payload = {
          showPanel: true,
          showTabs: showtabs,
          template: hbspartial || "No template available",
          json: storyArgs,
          htmlstory: htmlstoryContent,
          htmlcomponent: htmlcomponentContent,
          notes: coderefs.tabs?.notes || "Nil",
          name: context.name || "Unknown",
          partialname: coderefs.partialname || "Unknown",
          metadata: metadata,
        };

        console.log("[PREVIEW] Sending CODEREFS_UPDATE:", payload);
        channel.emit("CODEREFS_UPDATE", payload);
      }, [args, parameters.coderefs]);

      return Story();
    },

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
