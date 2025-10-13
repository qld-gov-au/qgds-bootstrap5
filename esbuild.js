/* global process */
// ESBUILD PROJECT DEPENDENCIES
import * as esbuild from "esbuild";
import path from "path";

//Local ESBUILD PLUGINS
import QGDSupdateHandlebarsPartialsPlugin from "./.esbuild/plugins/qgds-plugin-handlebar-partial-builder.js";
import QGDSrawLoader from "./.esbuild/plugins/qgds-plugin-raw-loader.js";
import QDGScleanFolders from "./.esbuild/plugins/qgds-plugin-clean-output-folders.js";
import QDGSbuildLog from "./.esbuild/plugins/qgds-plugin-build-log.js";
import QDGScopy from "./.esbuild/plugins/qgds-plugin-copy-assets.js";
import { QGDSgenerateIconAssetsPlugin } from "./.esbuild/plugins/qgds-plugin-generate-icon-assets.js";
import { versionPlugin } from "./.esbuild/plugins/qgds-plugin-version.js";
import { createOverrideThemeScssEntry } from "./.esbuild/helpers/scssOverrideTheme.js";

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
      in: "./src/css/main.scss", //default masterbrand theme
      out: "./assets/css/qld.bootstrap",
    },
    {
      in: "./src/css/main.legacy.scss", //legacy masterbrand theme (before October 2025)
      out: "./assets/css/qld.bootstrap.legacy",
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
    sassPlugin({
      //Hide sass deprecation warnings with a quiet flag...  npm run build -- --quiet
      silenceDeprecations: argv.quiet
        ? ["import", "global-builtin", "mixed-decls", "color-functions"]
        : [],
    }),
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
  // Choose configuration based on theme
  let config = buildConfig;

  const tempEntries = [];

  if (argv.theme) {
    const themes = Array.isArray(argv.theme) ? argv.theme : [argv.theme];
    const cssDir = path.resolve("src/css");
    const mainScss = path.join(cssDir, "main.scss");

    themes.forEach((themeVar) => {
      const tempEntry = createOverrideThemeScssEntry({
        cssDir,
        mainScss,
        themeVar,
      });

      tempEntries.push(tempEntry);
      config.entryPoints.push({
        in: tempEntry,
        out: `./assets/css/qld.${themeVar}.bootstrap`,
      });

      console.log(`theme SCSS entry created: ${tempEntry}`);
    });
  }

  let ctx = await esbuild.context(config);
  if (argv.watch === true) {
    await ctx.watch();
  } else {
    await ctx.rebuild();
    await ctx.dispose();
    // Note: Temp files are preserved for performance - they're only recreated when content changes
  }

  //node js module
  let ctxNode = await esbuild.context(buildNodeConfig);
  await ctxNode.rebuild();
  await ctxNode.dispose();
}

//Initate the project build...
StartBuild();
