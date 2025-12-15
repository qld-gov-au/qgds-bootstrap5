/** @type { import('@storybook/html-vite').StorybookConfig } */
// Is an ESM module now

import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";

const config = {
  stories: [
    "../src/stories/Introduction.mdx",
    // Include all stories found under the src/components directory ( For example: alert/alert.stories.js )
    // Exlude any stories starting with an underscore ( For example: _exludeme.stories.js )
    "../src/**/!(*_)*.mdx",
    "../src/**/!(*_)*.stories.js",
  ],
  staticDirs: [{ from: "../dist", to: "/" }], //Bring dist in statically instead of having it minified
  addons: [
    //Storybook addons
    //https://storybook.js.org/addons/
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
    "@storybook/addon-links",
    "@chromatic-com/storybook",
    "storybook-addon-deep-controls",
    "@storybook/addon-docs",
    "./addons/qgds-multi-code-panels/preset.js",
  ],

  framework: {
    //Build the storybook with html-vite rendered - faster than webpack
    //https://www.npmjs.com/package/@storybook/html-vite
    name: "@storybook/html-vite",
    options: {},
  },

  //Autodocs for each component
  //https://storybook.js.org/docs/writing-docs/autodocs
  docs: {
    defaultName: "Overview",
  },

  //Each component's JS module, for example Alert.js, imports a HTML string to use for it's template.
  //We add a plugin to handle these .hbs extensions. (Or .mustache, .html etc)
  //https://storybook.js.org/docs/api/main-config-vite-final
  //Each component's JS module, for example Alert.js, imports a HTML string to use for it's template.
  //We add a plugin to handle these .hbs extensions. (Or .mustache, .html etc)
  //https://storybook.js.org/docs/api/main-config-vite-final

  viteFinal: async (config, { configType }) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const addonPath = path.resolve(__dirname, "addons");

    config.root = "./dist";

    // Add React plugin for JSX transformation in QGDS addons
    config.plugins = config.plugins || [];
    config.plugins.push(
      react({
        include: [`${addonPath}/**/*.{js,jsx,ts,tsx}`],
      }),
    );

    // Define environment variables for the browser
    config.define = {
      ...config.define,
      "import.meta.env.ENABLE_DYNAMIC_THEME": JSON.stringify(
        process.env.ENABLE_DYNAMIC_THEME === "true",
      ),
    };

    config.server = {
      ...config.server,
      fs: {
        allow: [
          // Allow access to assets
          path.resolve(process.cwd(), "src/assets"),
          path.resolve(process.cwd(), "src/img"),
        ],
      },
    };

    return config;
  },
};

export default config;
