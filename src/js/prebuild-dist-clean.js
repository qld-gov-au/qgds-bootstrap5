import fs from "fs";
import mustache from "mustache";

/**
 * Setup example page templates.
 *
 * @type {import("esbuild").Plugin}
 */

export default {
  name: "Frontend HTML templates",
  setup: (build) => {
    build.onStart(() => {
      const { outdir, outfile } = build.initialOptions;

      //Delete all items in the outdir
      if (outdir && fs.existsSync(outdir)) {
        fs.rmSync(outdir, { recursive: true });
      }
      //Delete the outfile if it exists
      if (outfile && fs.existsSync(outfile)) {
        fs.rmSync(outfile);
      }
    });
  },
};
