import fs from "fs";
import path from "path";

import { mergeConfig } from "vite";

const config = {
  stories: [
    // Include all stories found under the src/components directory ( For example: alert/alert.stories.js )
    // Exlude any stories starting with an underscore ( For example: _exludeme.stories.js )
    "../src/components/**/!(*_)*.stories.js",
  ],
  addons: [
    //Storybook addons
    //https://storybook.js.org/addons/
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-designs",
    "@storybook/addon-links",
  ],

  framework: {
    //Build the storybook with html-vite rendered - faster than webpack
    //https://www.npmjs.com/package/@storybook/html-vite
    // todo: consider @storybook/builder-vite instead?
    name: "@storybook/html-vite",
    options: {},
  },

  //Autodocs for each component
  //https://storybook.js.org/docs/writing-docs/autodocs
  docs: {
    autodocs: "tag",
    defaultName: 'Overview',
  },

	
  //Each component's JS module, for example Alert.js, imports a HTML string to use for it's template.
  //We add a plugin to handle these .hbs extensions. (Or .mustache, .html etc)
  //https://storybook.js.org/docs/api/main-config-vite-final

  viteFinal: async (config, { configType }) => {
    	config.plugins.push({
      name: "html-transform",
      transform(src, id) {
        if (id.endsWith(".mustache") || id.endsWith(".html") || id.endsWith(".hbs")) {
          // Transform your HTML files here (src is the file content as a string)
          return src;
        }
      },
    });

    return config;
  },
};

export default config;
