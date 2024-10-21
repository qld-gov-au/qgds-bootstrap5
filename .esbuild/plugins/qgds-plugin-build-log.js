/* global process */
import log from "../helpers/logger.js";
import listFilesHbs, {listFilesCSS, listFilesJS} from "../helpers/listFilesHbs.js";


export default function buildlog() {
  return {
    name: "qgds-build-logging",
    setup(build) {
      
      build.onStart(() => {
        log("yellow", "Starting build...\n");
      });

      // eslint-disable-next-line no-unused-vars
      build.onEnd((result) => {
        console.log("BUNDLING:");
        build.initialOptions.entryPoints.forEach((entry) => {
          log("cyan", `${entry.in} -> ${entry.out}`);
        });
        const root = process.cwd();

        log( "black", "\n");
        log( "black", "CREATED:");

        listFilesCSS(root + "/dist/").forEach((file) => {
          let newfile = file.replace(root, "");
          log("magenta", `CSS:\t\t.${newfile}`);
        });


        listFilesJS(root + "/dist/").forEach((file) => {
          let newfile = file.replace(root, "");
          log("blue", `JS:\t\t.${newfile}`);
        });


        //List new assets

        listFilesHbs(root + "/dist/").forEach((file) => {
          let newfile = file.replace(root, "");
          log("cyan", `Template:\t.${newfile}`);
        });


      });

      // eslint-disable-next-line no-unused-vars
      build.onEnd((result) => {
        console.log(`\n`);
        log("yellow", `✓ Build complete.\n\n`);
      });
    },
  }
}
