import fs from "fs";
import log from "../helpers/logger.js";

export default function cleanFoldersPlugin() {
  return {
    name: "qgds-clean-output-folders",
    setup(build) {
      build.onStart(() => {
        //Console feedback
        log("cyan", `\u{1F4C2} Cleaning /dist folders\n\n`);

        // Clean the output folders
        const { outdir, outfile } = build.initialOptions;

        if (outdir && fs.existsSync(outdir)) {
          fs.rmSync(outdir, { recursive: true, force: true, maxRetries: 3 });
        }

        if (outfile && fs.existsSync(outfile)) {
          fs.rmSync(outfile, { force: true });
        }

        // // Clean the docs folder
        // const docsdir = "./docs/";
        // if (fs.existsSync(docsdir)) {
        //   fs.rmSync(docsdir, { recursive: true });
        // }
      });
    },
  };
}
