/* global process */
// ESBUILD PROJECT DEPENDENCIES
import * as esbuild from "esbuild";
import log from "./src/js/logger.js";
import listFiles from "./src/js/listfiles.js";

//Local build plugins
import rawLoaderPlugin from "./src/js/plugins/raw-loader-plugin.js";
import cleanOutputFoldersPlugin from "./src/js/plugins/clean-output-folders.js";

//Open source ESBUILD PLUGINS
import { sassPlugin } from "esbuild-sass-plugin";
import { copy } from "esbuild-plugin-copy";
import handlebarsPlugin from "esbuild-plugin-handlebars";

//Command line arguments are available in argv object
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const timerName = `Build time`;

// Configuration https://esbuild.github.io/getting-started/#build-scripts
const buildConfig = {
  outdir: "./dist/",
  external: ["fs", "path", "../img/*"],
  entryPoints: [
    {
      in: "./node_modules/bootstrap/dist/js/bootstrap.min.js",
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
    ".png": "file",
  },

  target: ["es6"],
  logLevel: "info",

  plugins: [
    cleanOutputFoldersPlugin(),
    rawLoaderPlugin(),
    handlebarsPlugin(),
    sassPlugin(),
    // eslint({}), //todo

    // https://www.npmjs.com/package/esbuild-plugin-copy
    // Copy sepcific assets into /dist folder for frontend use and exporting to /docs
    copy({
      resolveFrom: "cwd",
      verbose: false,
      assets: [
        { from: ["./src/templates/compiled/*.html"], to: ["./dist/"] },
        {
          from: ["./src/components/bs5/**/*.mustache"],
          to: ["./dist/components/bs5/"],
        },
        { from: ["./src/assets/img/*"], to: ["./dist/assets/img"] },
        { from: ["./dist/**/*"], to: ["./docs/"] },
      ],
      watch: false,
    }),

    //Plugins printing status to the console
    {
      name: "build-logging",
      setup(build) {
        build.onStart(() => {
          //Start a timer on console
          console.time(timerName);
        });
        // eslint-disable-next-line no-unused-vars
        build.onEnd((result) => {
          //Logging to console
          log("magenta", "CSS created:");
          log("magenta", `./dist/assets/css/qld.bootstrap.css`);
          console.log(`\n`);

          //JS
          log("blue", "JS created:");
          log("blue", "./dist/assets/js/bootstrap.min.js");
          log("blue", `./dist/assets/js/main.js`);
          console.log(`\n`);

          //Components
          const newMustacheFiles = listFiles("./dist/components/bs5");
          log("green", "COMPONENT partials (mustache) created:");
          log("green", newMustacheFiles.join("\n"));
          console.log(`\n`);

          //HTML templates
          log("cyan", "HTML templates created:");
          log("cyan", "Preview templates compiled to: dist/index.html");
          console.log(`\n`);

          //Complete
          let watchMsg = argv.watch
            ? `✓ Build process completed. Watching for changes...`
            : `✓ Build process completed.`;

          log("yellow", watchMsg);
          console.log(`\n\n`);

          //Timer end on console
          console.timeEnd(timerName);
          console.log(`\n`);
        });
      },
    },
  ],
};

async function StartBuild() {
  let ctx = await esbuild.context(buildConfig);

  if (argv.watch === true) {
    // "npm run watch" or "node build.js --watch"
    await ctx.watch();
  } else {
    // "npm run build" or "node build.js"
    await ctx.rebuild();
    await ctx.dispose();
  }
}

//Initate the project build...
StartBuild();
