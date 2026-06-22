// This file is loaded during Storybook's Node.js configuration phase
// It must not contain JSX or browser-only code

import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function managerEntries(entry = []) {
  return [...entry, join(__dirname, "./manager.tsx")];
}
