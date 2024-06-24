/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
    stories: [
        "../src/stories/Introduction.mdx",
        // Include all stories found under the src/components directory ( For example: alert/alert.stories.js )
        // Exlude any stories starting with an underscore ( For example: _exludeme.stories.js )
        // "../src/**/!(*_)*.mdx",
        // "../src/**/!(*_)*.stories.js",
        process.env.STORYBOOK_SINGLE ? process.env.STORYBOOK_SINGLE : "../src/**/!(*_)*.mdx",
        process.env.STORYBOOK_SINGLE ? process.env.STORYBOOK_SINGLE : "../src/**/!(*_)*.stories.js",
    ],
    staticDirs: [
        { from: '../dist', to: '/assets' },
        { from: '../src/assets/img', to: '/assets/img' },
    ], //Bring dist in statically instead of having it minified
    addons: [//Storybook addons
    //https://storybook.js.org/addons/
    "@storybook/addon-a11y", "@storybook/addon-themes", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/addon-links", "@chromatic-com/storybook", "@storybook/addon-mdx-gfm"],

    framework: {
        //Build the storybook with html-vite rendered - faster than webpack
        //https://www.npmjs.com/package/@storybook/html-vite
        name: "@storybook/html-vite",
        options: {},
    },

    //Autodocs for each component
    //https://storybook.js.org/docs/writing-docs/autodocs
    docs: {
        defaultName: 'Overview'
    },


    //Each component's JS module, for example Alert.js, imports a HTML string to use for it's template.
    //We add a plugin to handle these .hbs extensions. (Or .mustache, .html etc)
    //https://storybook.js.org/docs/api/main-config-vite-final

    viteFinal: async (config, {configType}) => {
        config.root = './dist'
        // config.plugins.push({
        //     name: "html-transform",
        //     transform(src, id) {
        //         if (id.endsWith(".mustache") || id.endsWith(".html") || id.endsWith(".hbs")) {
        //             // Transform your HTML files here (src is the file content as a string)
        //             return src;
        //         }
        //     },
        // });

        return config;
    },
};

export default config;
