/* global process */
// ESBUILD PROJECT DEPENDENCIES
import * as esbuild from "esbuild";
import { createScssTransformer } from "./.esbuild/helpers/scssOverride.js";

//Local ESBUILD PLUGINS
import QGDSupdateHandlebarsPartialsPlugin from "./.esbuild/plugins/qgds-plugin-handlebar-partial-builder.js";
import QGDSrawLoader from "./.esbuild/plugins/qgds-plugin-raw-loader.js";
import QDGScleanFolders from "./.esbuild/plugins/qgds-plugin-clean-output-folders.js";
import QDGSbuildLog from "./.esbuild/plugins/qgds-plugin-build-log.js";
import QDGScopy from "./.esbuild/plugins/qgds-plugin-copy-assets.js";
import { QGDSgenerateIconAssetsPlugin } from "./.esbuild/plugins/qgds-plugin-generate-icon-assets.js";
import { versionPlugin } from "./.esbuild/plugins/qgds-plugin-version.js";
// import { createOverrideScssEntry } from "./.esbuild/helpers/scssOverride.js";

//Open source ESBUILD PLUGINS
import { sassPlugin } from "esbuild-sass-plugin";
import handlebarsPlugin from "esbuild-plugin-handlebars";

//Command line arguments are available via argv object
import minimist from "minimist";
const argv = minimist(process.argv.slice(2));

// https://esbuild.github.io/getting-started/#build-scripts
const buildConfig = {
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ["es6"],
  logLevel: "info",
  outdir: "./dist/",
  external: ["fs", "path", "bootstrap", "../img/*"],

  entryPoints: [
    {
      in: "./src/js/qld.bootstrap.js",
      out: "./assets/js/qld.bootstrap.min",
    },
    {
      in: "./src/css/main.scss",
      out: "./assets/css/qld.bootstrap",
    },
    {
      in: "./src/js/handlebars.helpers.js",
      out: "./assets/js/handlebars.helpers.bundle",
    },
    {
      in: "./src/js/handlebars.init.js",
      out: "./assets/js/handlebars.init.min",
    },
  ],

  loader: {
    ".html": "text",
    ".hbs": "text",
    ".js": "jsx",
    ".jpg": "file",
    ".png": "file",
  },

  plugins: [
    QGDSupdateHandlebarsPartialsPlugin(),
    ...(argv.icons ? [QGDSgenerateIconAssetsPlugin()] : []), // Generate icons assets when --icons flag is set
    QDGScopy(),
    QGDSrawLoader(),
    versionPlugin(),
    QDGScleanFolders(),
    handlebarsPlugin(),
    sassPlugin(),
    QDGSbuildLog(),
  ],
};

const buildNodeConfig = {
  loader: buildConfig.loader,
  bundle: true,
  minify: false,
  sourcemap: true,
  minifyIdentifiers: false,
  logLevel: buildConfig.logLevel,
  outdir: buildConfig.outdir,
  external: buildConfig.external,
  platform: "node",
  target: ["node20"],
  format: "esm",
  entryPoints: [
    {
      in: "./src/js/handlebars.init.cjs",
      out: "./assets/node/handlebars.init.min",
    },
  ],
  plugins: [
    QGDSupdateHandlebarsPartialsPlugin(),
    QDGScopy(),
    QGDSrawLoader(),
    versionPlugin(),
    handlebarsPlugin(),
  ],
};

async function StartBuild() {
  const overrideVar = argv.override;
  let sassPluginConfig = {};

  if (overrideVar) {
    // Use the in-memory transformer for SCSS overrides
    sassPluginConfig = {
      transform: createScssTransformer(overrideVar),
    };
    // Update the output file name to include the override theme name
    const mainCssEntry = buildConfig.entryPoints.find(entry => entry.in.includes("main.scss"));
    if (mainCssEntry) {
      mainCssEntry.out = `./assets/css/qld.bootstrap.${overrideVar}`;
    }
  }

  // Replace the default sassPlugin with the potentially modified one
  const pluginIndex = buildConfig.plugins.findIndex(p => p.name === 'sass-plugin');
  if (pluginIndex !== -1) {
    buildConfig.plugins[pluginIndex] = sassPlugin(sassPluginConfig);
  }

  let ctx = await esbuild.context(buildConfig);

  if (argv.watch === true) {
    await ctx.watch();
  } else {
    await ctx.rebuild();
    await ctx.dispose();
  }

  //node js module
  let ctxNode = await esbuild.context(buildNodeConfig);
  await ctxNode.rebuild();
  await ctxNode.dispose();
}

//Initate the project build...
StartBuild();
