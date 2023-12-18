# esbuild-plugin-handlebars

> an [esbuild](https://github.com/evanw/esbuild) plugin to handle ... handlebars!

## Installation

```bash
yarn add -D esbuild-plugin-handlebars
# or
npm install -D esbuild-plugin-handlebars
```

## Usage

```js
const esbuild = require("esbuild");
const handlebarsPlugin = require("esbuild-plugin-handlebars");

esbuild
  .build({
    entryPoints: ["input.js"],
    outfile: "output.js",
    bundle: true,
    plugins: [handlebarsPlugin()],
  })
  .then((result) => console.log(result))
  .catch(() => process.exit(1));
```

You can also set additionalHelpers and precompileOptions:

```js
const hbsOptions = {
        additionalHelpers: {},
        additionalPartials: {},
        precompileOptions: {}
      }

// usual esbuild config
{
 ...
 plugins: [handlebarsPlugin(hbsOptions)],
 ...
}

```
