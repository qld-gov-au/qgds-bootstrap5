import fs from "fs";
import log from "../helpers/logger.js";

/**
 * Clean the output folders /dist.
 * Skip cleaning during the initial build or initial watch mode.
 *
 * @returns {Object} Object with a name and a setup function.
 */
export default function cleanFoldersPlugin() {
  let isInitialBuild = true;
  return {
    name: "qgds-clean-output-folders",
    setup(build) {
      build.onStart(() => {
        if (!isInitialBuild) {
          //Console feedback
          log("cyan", `\u{1F4C2} Cleaning /dist folders\n\n`);

          // Clean the output folders
          const { outdir, outfile } = build.initialOptions;

          if (outdir && fs.existsSync(outdir)) {
            fs.rmSync(outdir, { recursive: true });
          }

          if (outfile && fs.existsSync(outfile)) {
            fs.rmSync(outfile);
          }

          // // Clean the docs folder
          // const docsdir = "./docs/";
          // if (fs.existsSync(docsdir)) {
          //   fs.rmSync(docsdir, { recursive: true });
          // }
        }
      });
    },
  };
}
