import { copy } from "esbuild-plugin-copy";

export default function copyPlugin() {

  //Docs: https://www.npmjs.com/package/esbuild-plugin-copy
  return copy({
    resolveFrom: "cwd",
    verbose: false,
    watch: false,
    assets: [
      { from: ["./src/templates/compiled/*.html"], to: ["./dist/"] },
      {
        from: ["./src/components/bs5/**/*.hbs"],
        to: ["./dist/components/bs5/"],
      },
      {
        from: ["./src/components/bs5/**/*.data.json"],
        to: ["./dist/sample-data/"],
      },
      {
        from: ["./src/js/handlebars.helpers.js"],
        to: ["./dist/assets/js"],
      },
      { from: ["./src/assets/img/*"], to: ["./dist/assets/img"] },
      { from: ["./dist/**/*"], to: ["./docs/"] },
      { from: ["./storybook-static/**/*"], to: ["./docs/storybook-static/"] },
    ],
  });

}
