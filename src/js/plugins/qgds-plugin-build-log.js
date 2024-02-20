import path from "path";
import log from "../helpers/logger.js";
import listFiles from "../helpers/listfiles.js";


export default function buildlog() {
  return {
    name: "qgds-build-logging",
    setup(build) {
      
      build.onStart(() => {
        log("yellow", "Starting build...\n");
      });

      build.onEnd((result) => {
        console.log("BUNDLING:");
        build.initialOptions.entryPoints.forEach((entry) => {
          log("cyan", entry.in);
        });
        
        console.log(`\n`);
        console.log("CREATED:");
        log("magenta", `CSS\t\t./dist/assets/css/qld.bootstrap.css`);
        log("blue", "JS\t\t./dist/assets/js/bootstrap.min.js");
        log("blue", `JS\t\t./dist/assets/js/main.js`);

        //List new components
        const root = process.cwd();
        const relativePath = "/dist/components/bs5/";
        const newMustacheFiles = listFiles(root + relativePath);
        
        newMustacheFiles.forEach((file) => {
          let newfile = file.replace(root, "");
          log("cyan", `Mustache:\t.${newfile}`);
        });

      });

      build.onEnd((result) => {
        console.log(`\n`);
        log("yellow", `✓ Build complete.\n\n`);
      });
    },
  }
}
