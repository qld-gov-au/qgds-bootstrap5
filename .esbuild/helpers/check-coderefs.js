// check-coderefs.js

/*
  This script checks all Storybook story files in the src/components/bs5 directory
  to verify if they include 'coderefs' in their parameters configuration. 
  
  This parameter enables a custom Code References panel in the Storybook UI.

  It generates a report listing:
  - Stories that have coderefs configured.
  - Stories that are missing coderefs and need to be updated.

  The report is saved to 'coderefs-check-report.txt' and also printed to the console.

  Usage: Run this script with Node.js: `node .esbuild/helpers/check-coderefs.js`

*/

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all story files
function getAllStoryFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...getAllStoryFiles(fullPath));
    } else if (item.name.endsWith(".stories.js")) {
      files.push(fullPath);
    }
  }
  return files;
}

// Check if file has coderefs in parameters
function hasCoderefs(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    // Look for coderefs anywhere in the file within a parameters block
    // This handles cases where other properties come before coderefs
    return /parameters:\s*\{[\s\S]*?coderefs:/m.test(content);
  } catch (error) {
    return false;
  }
}

// Main function
function checkStoryFiles() {
  const basePath = path.join(__dirname, "src", "components", "bs5");
  const storyFiles = getAllStoryFiles(basePath);

  const results = {
    withCoderefs: [],
    withoutCoderefs: [],
  };

  storyFiles.forEach((filePath) => {
    const relativePath = path.relative(__dirname, filePath);
    if (hasCoderefs(filePath)) {
      results.withCoderefs.push(relativePath);
    } else {
      results.withoutCoderefs.push(relativePath);
    }
  });

  // Generate report
  let report = "COMPONENT STORIES CODEREFS CHECK\n";
  report += "=".repeat(60) + "\n\n";

  report += `Total story files: ${storyFiles.length}\n`;
  report += `With coderefs: ${results.withCoderefs.length}\n`;
  report += `Without coderefs: ${results.withoutCoderefs.length}\n\n`;

  report += "Stories WITH coderefs:\n";
  report += "-".repeat(60) + "\n";
  results.withCoderefs.sort().forEach((file) => {
    report += `${file}\n`;
  });

  report += "\n\nStories WITHOUT coderefs (NEED UPDATE):\n";
  report += "-".repeat(60) + "\n";
  results.withoutCoderefs.sort().forEach((file) => {
    report += `${file}\n`;
  });

  // Write to file
  fs.writeFileSync("coderefs-check-report.txt", report, "utf8");

  // Also output to console
  console.log(report);
  console.log("\nReport saved to: coderefs-check-report.txt");
}

// Run the check
checkStoryFiles();
