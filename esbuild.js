/* global process */
// ESBUILD PROJECT DEPENDENCIES
import * as esbuild from "esbuild";

//Local ESBUILD PLUGINS
import QGDSupdateHandlebarsPartialsPlugin from "./.esbuild/plugins/qgds-plugin-handlebar-partial-builder.js";
import QGDSrawLoader from "./.esbuild/plugins/qgds-plugin-raw-loader.js";
import QDGScleanFolders from "./.esbuild/plugins/qgds-plugin-clean-output-folders.js";
import QDGSbuildLog from "./.esbuild/plugins/qgds-plugin-build-log.js";
import QDGScopy from "./.esbuild/plugins/qgds-plugin-copy-assets.js";
import { versionPlugin } from "./.esbuild/plugins/qgds-plugin-version.js";

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
  format: 'esm',
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
}
async function StartBuild() {
  let ctx = await esbuild.context(buildConfig);

  if (argv.watch === true) {
    // "npm run watch"
    await ctx.watch();

  } else {
    // "npm run build" or "node build.js"
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
