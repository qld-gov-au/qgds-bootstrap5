// rawLoaderPlugin.js
import fs from "fs";

const rawLoaderPlugin = {
  name: "raw-loader",
  setup(build) {
    build.onLoad({ filter: /\.(html|mustache)$/ }, async (args) => {
      const contents = await fs.promises.readFile(args.path, "utf8");
      return { contents, loader: "text" };
    });
  },
};

export default rawLoaderPlugin;
