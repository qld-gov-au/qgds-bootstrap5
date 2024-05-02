/* global process */
// ESBUILD PROJECT DEPENDENCIES
import * as esbuild from "esbuild";

//Local ESBUILD PLUGINS
import QGDSrawLoader from "./.esbuild/plugins/qgds-plugin-raw-loader.js";
import QDGScleanFolders from "./.esbuild/plugins/qgds-plugin-clean-output-folders.js";
import QDGSbuildLog from "./.esbuild/plugins/qgds-plugin-build-log.js";
import QDGScopy from "./.esbuild/plugins/qgds-plugin-copy-assets.js";

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
  external: ["fs", "path", "../img/*"],

  entryPoints: [
    {
      in: "./node_modules/bootstrap/dist/js/bootstrap.min.js",
      out: "./assets/js/bootstrap.min",
    },
    {
      in: "./src/main.js",
      out: "./assets/js/qld.bootstrap.min",
    },
    {
      in: "./src/main.scss",
      out: "./assets/css/qld.bootstrap",
    },
    {
      in: "./src/js/handlebars.helpers.js",
      out: "./assets/js/handlebars.helpers.bundle",
    }
  ],

  loader: {
    ".html": "text",
    ".hbs": "text",
    ".js": "jsx",
    ".jpg": "file",
    ".png": "file",
  },

  plugins: [
    QDGScopy(),
    QDGSbuildLog(),
    QGDSrawLoader(),
    QDGScleanFolders(),
    handlebarsPlugin(),
    sassPlugin(),
    // eslint({}), //todo: configure eslint
  ],
};

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


}

//Initate the project build...
StartBuild();
