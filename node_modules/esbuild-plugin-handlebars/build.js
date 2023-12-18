const esbuild = require("esbuild");

const esBuildConfig = {
  bundle: true,
  minify: true,
  platform: "node",
  target: "es6",
  outdir: "dist",
  entryPoints: ["./src/index.ts"],
};

esbuild
  .build(esBuildConfig)
  .then((result) => {
    console.log(result);
  })
  .catch(() => process.exit(1));
