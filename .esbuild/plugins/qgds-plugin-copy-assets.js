import { copy } from "esbuild-plugin-copy";

export default function copyPlugin() {

  //Docs: https://www.npmjs.com/package/esbuild-plugin-copy
  return copy({
    resolveFrom: "cwd",
    verbose: false,
    watch: true,
    assets: [
      {from: ["./src/components/bs5/**/*.hbs"], to: ["./dist/assets/components/bs5/"],},
      {from: ["./src/js/handlebars.*"], to: ["./dist/assets/js/"],},
      {from: ["./src/img/*"], to: ["./dist/assets/img"]},
      // Sample data
      {from: ["./src/components/bs5/**/*.data.json"], to: ["./dist/sample-data/"],},

      // dist/components will be going away please use dist/assets/components
      {from: ["./src/js/handlebars.*"], to: ["./dist/components/"],},
      {from: ["./src/components/bs5/**/*.hbs"], to: ["./dist/components/bs5/"],},

      //Copy info files for reference
      {from: ["./src/templates/compiled/*.html"], to: ["./dist/"]},
      {from: ["./package.json"], to: ["./dist/package.json"]},
      {from: ["./README.md"], to: ["./dist/README.md"]},
    ],
  });

}
