import fs from "fs";
import path from "path";

export function scssOverridePlugin(overrideVar) {
  return {
    name: "scss-override",
    setup(build) {
      build.onStart(() => {
        console.log("build started");
      });
      // Intercept SCSS files to handle variable overrides
      build.onLoad({ filter: /main\.scss$/ }, async (args) => {
        const filePath = args.path;
        console.log("args", args);

        // Check if this is the main.scss file
        console.log("filePath", filePath);
        if (filePath.endsWith("main.scss")) {
          const dir = path.dirname(filePath);
          const overrideFile = path.join(dir, `variables-${overrideVar}.scss`);

          // Check if override file exists
          if (fs.existsSync(overrideFile)) {
            let contents = fs.readFileSync(filePath, "utf8");

            // Insert the override import after the qld-variables import
            const importPattern = /@import\s+["']\.\/qld-variables["'];?/;
            const overrideImport = `@import "./variables-${overrideVar}";`;

            // if (importPattern.test(contents)) {
            //   contents = contents.replace(importPattern, `$&\n${overrideImport}`);
            // } else {
            // If pattern not found, add after the qld-variables import line
            const lines = contents.split("\n");
            const qldVarsIndex = lines.findIndex((line) =>
              line.includes('@import "./qld-variables"'),
            );
            console.log("qldVarsIndex", qldVarsIndex);
            if (qldVarsIndex !== -1) {
              lines.splice(qldVarsIndex + 1, 0, overrideImport);
              contents = lines.join("\n");
            }
            // }

            return {
              contents,
              loader: "scss",
            };
          }
        }

        return null; // Let esbuild handle the file normally
      });
    },
  };
}
