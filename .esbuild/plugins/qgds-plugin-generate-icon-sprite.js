import fs from "fs";
import path from "path";
import log from "../helpers/logger.js";
import { parse } from "node-html-parser";

/**
 * Generate an SVG icon sprite from individual SVG files in a directory.
 * @param {string} inputDir - Directory containing SVG icon files
 * @param {string} outputFile - Output file for the generated icon sprite
 */
export function QGDSgenerateIconSpritePlugin(inputDir = "./src/img/icons", outputFile = "./src/img/_icon-sprite.svg") {
  return {
    name: "qgds-generate-icon-sprite",
    setup(build) {

      const regenerate = () => {

        log("yellow", "\n Start generating icon sprite... \n");

        if (!fs.existsSync(inputDir)) {
          console.error(`Directory not found - ${inputDir}`);
          return;
        }

        const icons = fs
          .readdirSync(inputDir)
          .filter((file) => file.endsWith(".svg"));

        if (icons.length === 0) {
          log("red", `SVG files not found in ${inputDir}`);
          return;
        }

        let spriteContent = `<svg xmlns="http://www.w3.org/2000/svg" role="img">\n`;
        for (const file of icons) {
          const name = path.basename(file, ".svg");
          const fullPath = path.join(inputDir, file);

          log("blue", `  Parsing icon: ${name} (${fullPath})`);

          const rawSvg = fs.readFileSync(fullPath, "utf8");
          const root = parse(rawSvg);
          const svg = root.querySelector("svg");

          if (!svg) {
            log("red", `Invalid SVG on file - ${file}`);
            continue;
          }

          const viewBox = svg.getAttribute("viewBox") || "0 0 32 32";
          const innerContent = svg.innerHTML.trim();
          
          spriteContent += `  <symbol id="${name}" viewBox="${viewBox}">\n`;
          spriteContent += `    ${innerContent}\n`;
          spriteContent += `  </symbol>\n\n`;
        }
        spriteContent += `</svg>\n`;

        const outputDir = path.dirname(outputFile);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
          log("magenta", `Created output directory: ${outputDir}`);
        }

        fs.writeFileSync(outputFile, spriteContent);
        log("magenta", `End of generating SVG icon sprite to file: (${outputFile}) \n\n`);

      };

      build.onStart(() => {
        regenerate();
      });
    },
  };
}