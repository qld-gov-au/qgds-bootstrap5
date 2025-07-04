import fs from "fs";
import path from "path";

/**
 * Creates a temporary main.<overrideVar>.scss file with the override import injected after qld-variables import.
 * Returns the path to the temp file, or null if not created.
 */
export function createOverrideScssEntry({ cssDir, mainScss, overrideVar }) {
  const overrideFile = path.join(cssDir, `variables-${overrideVar}.scss`);
  const tempEntry = path.join(cssDir, `main.${overrideVar}.scss`);

  // Copy main.scss and inject override after qld-variables import
  let mainContent = fs.readFileSync(mainScss, "utf8");
  if (fs.existsSync(overrideFile)) {
    const lines = mainContent.split("\n");
    const qldVarsIndex = lines.findIndex(line => line.includes('@import "./qld-variables"'));
    if (qldVarsIndex !== -1) {
      lines.splice(qldVarsIndex + 1, 0, `@import './variables-${overrideVar}.scss';`);
      mainContent = lines.join("\n");
    }
  }
  fs.writeFileSync(tempEntry, mainContent);
  return tempEntry;
} 