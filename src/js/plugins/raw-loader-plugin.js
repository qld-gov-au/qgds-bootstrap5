// rawLoaderPlugin.js
import fs from "fs";
import log from "../logger.js";

export default function rawLoaderPlugin(showlog = false) {
  return {
    name: "raw-loader",
    setup(build) {
      build.onLoad({ filter: /\.(html|mustache)$/ }, async (args) => {
        const contents = await fs.promises.readFile(args.path, "utf8");

        if (showlog) log("magenta", `Loading ${args.path}...`);

        return { contents, loader: "text" };
      });
    },
  };
}
