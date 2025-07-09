import fs from "fs";
import path from "path";

/**
 * Creates a temporary main.<flagVar>.scss file with the flag scss import injected after qld-variables import.
 * Returns the path to the temp file, or null if not created.
 */
export function createOverrideFlagScssEntry({ cssDir, mainScss, flagVar }) {
  const flagFile = path.join(cssDir, `flags/qld-variables-${flagVar}.scss`);
  const tempEntry = path.join(cssDir, `main.${flagVar}.scss`);

  // Copy main.scss and inject Flag after qld-variables import
  let mainContent = fs.readFileSync(mainScss, "utf8");
  if (fs.existsSync(flagFile)) {
    const lines = mainContent.split("\n");
    const qldVarsIndex = lines.findIndex(line => line.includes('@import "./qld-variables"'));

    if (qldVarsIndex !== -1) {
      lines.splice(qldVarsIndex + 1, 0, `@import './flags/qld-variables-${flagVar}.scss';`);
      mainContent = lines.join("\n");
    } else {
        console.warn(
          `[SCSS Flag] Warning: Could not find '@import \"./qld-variables\";' to inject the Flag.`,
        );
      }
  } else {
    console.warn(
      `[SCSS Flag] Warning: Flag file not found at ${flagFile}`,
    );
  }

  fs.writeFileSync(tempEntry, mainContent);
  return tempEntry;
} 