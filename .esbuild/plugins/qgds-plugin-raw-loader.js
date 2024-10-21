// rawLoaderPlugin.js
import fs from "fs";
import log from "../helpers/logger.js";

export default function rawLoaderPlugin(showlog = false) {
  return {
    name: "qgds-raw-loader",
    setup(build) {
      build.onLoad({ filter: /\.(html|mustache|hbs)$/ }, async (args) => {
        const contents = await fs.promises.readFile(args.path, "utf8");

        if (showlog) log("magenta", `Loading ${args.path}...`);

        return { contents, loader: "text" };
      });
    },
  };
}
