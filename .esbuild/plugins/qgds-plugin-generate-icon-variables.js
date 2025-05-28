import fs from "fs";
import path from "path";
import log from "../helpers/logger.js";
import svgToMiniDataURI from "mini-svg-data-uri";

/**
 * Generate CSS variables of icons from SVG files.
 * @param {string} inputDir - Directory containing SVG icon files
 * @param {string} outputFile - Output SASS file for the generated CSS variables
 * @param {string} prefix - CSS variable prefix for icons
 */
export function QGDSgenerateIconVariablesPlugin(inputDir = "./src/img/icons", outputFile = "./src/components/bs5/icons/_icon-variables.scss", prefix = "--qgds-icon") {
  return {
    name: "qgds-generate-icon-variables",
    setup(build) {

      const regenerate = () => {
        log("yellow", "\n Start generating icon variables... \n");

        if (!fs.existsSync(inputDir)) {
          console.error(`Input directory not found: ${inputDir}`);
          return;
        }

        const icons = fs
          .readdirSync(inputDir)
          .filter((file) => file.endsWith(".svg"));

        if (icons.length === 0) {
          log("red", `SVG files not found in ${inputDir}`);
          return;
        }

        let cssVariables = ":root {\n";
        for (const file of icons) {
          const name = path.basename(file, ".svg");
          const fullPath = path.join(inputDir, file);

          log("blue", `  Processing icon: ${name} (${fullPath})`);

          const svgContent = fs.readFileSync(fullPath, "utf8");
          const dataUri = svgToMiniDataURI(svgContent);

          cssVariables += `  ${prefix}-${name}: url("${dataUri}");\n`;
        }
        cssVariables += "}\n";

        const outputDir = path.dirname(outputFile);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
          log("magenta", `Created output directory: ${outputDir}`);
        }

        fs.writeFileSync(outputFile, cssVariables);
        log("magenta", `End of generating icon variables to file: (${outputFile}) \n\n`);
      };

      build.onStart(() => {
        regenerate();
      });

    },
  };
}