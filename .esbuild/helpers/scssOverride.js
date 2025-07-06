import fs from "fs";
import path from "path";
import postcss from "postcss";
import autoprefixer from 'autoprefixer';

/**
 * Creates a transformer function for esbuild-sass-plugin to inject an override SCSS import.
 * This avoids creating temporary files on disk.
 */
export function createScssTransformer(overrideVar) {
  return async function (source, resolveDir) {
    const overrideFile = path.join(resolveDir, `variables-${overrideVar}.scss`);
    if (fs.existsSync(overrideFile)) {
      const importStatement = `@import './variables-${overrideVar}.scss';`;
      const result = await postcss([autoprefixer]).process(source)
      const newSource = source.replace(
        /(@import\s+['\"]\.\/qld-variables['\"]\s*;)/,
        `$1\n${importStatement}`,
      );
      console.log(
        "newSource",
        result,
        result.css.indexOf('@import "./qld-variables"'),
      );
      if (newSource !== source) {
        console.log(`[SCSS Override] Injected: ${importStatement}`);
        return newSource;
      } else {
        console.warn(
          `[SCSS Override] Warning: Could not find '@import \"./qld-variables\";' to inject the override.`,
        );
      }
    } else {
      console.warn(
        `[SCSS Override] Warning: Override file not found at ${overrideFile}`,
      );
    }
    return source;
  };
}
