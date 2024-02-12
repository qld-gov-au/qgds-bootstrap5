import fs from "fs";
import log from "../logger.js";

export default function cleanOutputFoldersPlugin() {
  return {
    name: "CleanOutputFolders",
    setup(build) {
      build.onStart(() => {
        //Console feedback
        log("cyan", `\u{1F4C2} Cleaning /dist and /docs folders\n\n`);

        // Clean the output folders
        const { outdir, outfile } = build.initialOptions;

        if (outdir && fs.existsSync(outdir)) {
          fs.rmSync(outdir, { recursive: true });
        }

        if (outfile && fs.existsSync(outfile)) {
          fs.rmSync(outfile);
        }

        // Clean the docs folder
        const docsdir = "./docs/";
        if (fs.existsSync(docsdir)) {
          fs.rmSync(docsdir, { recursive: true });
        }
      });
    },
  };
}
