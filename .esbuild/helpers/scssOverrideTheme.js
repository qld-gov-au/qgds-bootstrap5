import fs from "fs";
import path from "path";

/**
 * Creates a temporary main.<themeVar>.scss file with the theme scss import injected after qld-variables import.
 * Only creates/updates the file if content has changed or file doesn't exist.
 * Returns the path to the temp file, or null if not created.
 */
export function createOverrideThemeScssEntry({ cssDir, mainScss, themeVar }) {
  const themeFile = path.join(cssDir, `themes/${themeVar}.scss`);
  const tempEntry = path.join(cssDir, `main.${themeVar}.scss`);

  // Copy main.scss and inject Theme after qld-variables import
  let mainContent = fs.readFileSync(mainScss, "utf8");
  if (fs.existsSync(themeFile)) {
    mainContent = `@import './themes/${themeVar}.scss';` + mainContent;
  } else {
    console.warn(
      `[SCSS Theme] Warning: Theme variables file not found at ${themeFile}`,
    );
  }

  // Only write file if it doesn't exist or content has changed
  let shouldWrite = true;
  if (fs.existsSync(tempEntry)) {
    const existingContent = fs.readFileSync(tempEntry, "utf8");
    shouldWrite = existingContent !== mainContent;
  }

  if (shouldWrite) {
    fs.writeFileSync(tempEntry, mainContent);
    console.log(`[SCSS Theme] Created/updated temp entry: ${tempEntry}`);
  } else {
    console.log(
      `[SCSS Theme] No changes detected, reusing existing: ${tempEntry}`,
    );
  }

  return tempEntry;
}
