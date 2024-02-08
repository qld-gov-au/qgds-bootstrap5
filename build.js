// PROJECT ESBUILD CONFIGURATION and BUILD FILE
import rawLoaderPlugin from "./src/js/rawLoaderPlugin.js";

import fs from "fs";
import mustache from "mustache";

//Required libraries
import { sassPlugin } from "esbuild-sass-plugin";
import { copy } from "esbuild-plugin-copy";
import eslint from "esbuild-plugin-eslint";
import handlebarsPlugin from "esbuild-plugin-handlebars";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import log from "./src/js/logger.js";

import * as esbuild from "esbuild";

//import templatesPlugin from "./src/js/templatesPlugin.js";

// Configuration
// https://esbuild.github.io/getting-started/#build-scripts

const buildConfig = {
  outdir: "./dist/",
  external: ["fs", "path", "../img/*"],
  entryPoints: [
    {
      in: "./node_modules/bootstrap/dist/js/bootstrap.js",
      out: "./assets/js/bootstrap.min",
    },
    {
      in: "./src/main.js",
      out: "./assets/js/main",
    },
    {
      in: "./src/main.scss",
      out: "./assets/css/qld.bootstrap",
    },
  ],
  bundle: true,
  minify: false,
  sourcemap: true,
  loader: {
    ".html": "text",
    ".mustache": "text",
    ".js": "jsx",
    ".jpg": "file",
  },

  target: ["es6"],
  logLevel: "info",

  plugins: [
    rawLoaderPlugin,

    // Pass the following plugins to ESBuild during transpilation
    sassPlugin({
      type: "css",
      async transform(source) {
        const { css } = await postcss([autoprefixer]).process(source, {
          from: "src/main.scss",
          to: "dist/assets/css/qld.bootstrap.css",
          map: true,
        });
        return css;
      },
    }),

    eslint({
      /* config */
    }),

    // Handlebars/mustache processing
    handlebarsPlugin(),

    //An inline plugin to remove all files from /dist folder.
    //Runs in the onStart phase of the build.
    {
      name: "Clean Dist",
      setup: (build) => {
        build.onStart(() => {
          const { outdir, outfile } = build.initialOptions;

          //Delete all items in the outdir
          if (outdir && fs.existsSync(outdir)) {
            fs.rmSync(outdir, { recursive: true });
          }
          //Delete the outfile if it exists
          if (outfile && fs.existsSync(outfile)) {
            fs.rmSync(outfile);
          }
        });
      },
    },

    //An inline plugin to compile our example templates, and replace the mustache placeholders their respective component.
    //templatesPlugin({}),

    // 1. Copy various files from /src to /dist as part of workflow.
    // 2. Copy files from /dist to /docs as part of workflow.
    copy({
      // this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
      // if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
      resolveFrom: "cwd",
      verbose: false,
      assets: [
        {
          from: ["./src/templates/compiled/*.html"],
          to: ["./dist/"],
        },
        {
          from: ["./src/components/bs5/**/*.mustache"],
          to: ["./dist/components/bs5/"],
        },
        {
          from: ["./src/assets/img/*"],
          to: ["./dist/assets/img"],
        },
        {
          from: ["./dist/**/*"],
          to: ["./docs/"],
        },
      ],
      watch: true,
    }),
  ],
};

(async () => {
  //await esbuild.build(buildConfig);
  // Summary of build:
  // src/main.scss => dist/assets/css/qld.bootstrap.css
  // src/main.js => dist/assets/js/main.js
  // node_modules/..../bootstrap.js => dist/assets/js/bootstrap.min.js
  // src/components/bs5/name/{name}/{name}.mustache => /dist/components/bs5/{name}/{name}.mustache
  // Frontend example templates:
  // src/templates/index.html => dist/index.html
  // src/templates/content.html => dist/content.html
  // src/templates/reference.html => dist/reference.html
})();

//WATCH for code changes

async function BuildAndWatch() {
  let ctx = await esbuild.context(buildConfig);
  await ctx.watch();

  log("green", `Build summary:\n`);

  log(
    "blue",
    `
    ✓ Removed previous build from /dist folder`,
  );

  log(
    "green",
    `
    \u2713 Compiled dist/assets/css/qld.bootstrap.css
    \u2713 Compiled dist/assets/js/bootstrap.min.js
    \u2713 Compiled dist/assets/js/main.js
    \u2713 Copied component mustache templates to /dist/components/bs5.html
    \u2713 Compiled preview templates to dist/index.html`,
  );

  log("yellow", `   \u2713 Build complete\n\n`);

  log("cyan", `   Watching for changes...\n`);
}

//Initate the project build...
BuildAndWatch();
