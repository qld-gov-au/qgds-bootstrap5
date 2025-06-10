import fs from "fs";
import path from "path";
import log from "../helpers/logger.js";
import svgToMiniDataURI from "mini-svg-data-uri";

/**
 * Generate CSS variables of icons from SVG files.
 * @param {string} inputDir - Directory containing SVG icon files
 * @param {string} outputIconVars - Output SASS file for the generated CSS variables
 * @param {string} outputIconNames - Output SASS file for the generated icon names - to build icon utility classes
 * @param {string} outputIconJs - Output JS file for the generated icon names - to be used in Storybook
 */
export function QGDSgenerateIconAssetsPlugin(inputDir = "./src/img/icons", 
  outputIconVars = "./src/components/bs5/icons/_icons.variables.scss", 
  outputIconNames = "./src/components/bs5/icons/_icons.list.scss", 
  outputIconJs = "./src/components/bs5/icons/_icons.list.js") {

  return {
    name: "qgds-generate-icon-variables",

    setup(build) {

      const regenerate = () => {
        
        const prefixIconQgds = 'qgds-icon-';
        log("yellow", "\n Start generating icon variables... \n");

        if (!fs.existsSync(inputDir)) {
          console.error(`Input directory not found: ${inputDir}`);
          return;
        }

        const icons = fs.readdirSync(inputDir).filter((file) => file.endsWith(".svg"));

        if (icons.length === 0) {
          log("red", `SVG files not found in ${inputDir}`);
          return;
        }

        let cssVariables = `:root {\n`;
        let iconNames = `$icon-names: (\n`;
        let iconJs = [];

        for (const file of icons) {
          const name = path.basename(file, ".svg");
          const fullPath = path.join(inputDir, file);

          log("blue", `  Processing icon: ${name} (${fullPath})`);

          const svgContent = fs.readFileSync(fullPath, "utf8");
          const dataUri = svgToMiniDataURI(svgContent);

          cssVariables += `  --${prefixIconQgds}${name}: url("${dataUri}");\n`;
          iconNames += `  ${name},\n`;
          iconJs.push(name);
        }
        cssVariables += `}\n`;
        iconNames += `);\n`;

        fs.writeFileSync(outputIconVars, cssVariables);
        fs.writeFileSync(outputIconNames, iconNames);
        fs.writeFileSync(outputIconJs, `// Auto-generated\nexport default ${JSON.stringify(iconJs, null, 2)};\n`);

        log("magenta", `End of generating icon variables (${outputIconVars}) and icon SCSS names (${outputIconNames}) \n\n`);
      };

      build.onStart(() => {
        regenerate();
      });

    },
  };
}