import * as esbuild from "esbuild";
import fs from "fs";
import path from "path";
import minimist from "minimist";

import { copy } from "esbuild-plugin-copy";

const argv = minimist(process.argv.slice(2));

/**
 * Build a component for Squiz DXP Component Service from an existing Design System component.
 * @returns 
 */
export default function buildDxpComponent() {
  return {
    name: 'qgds-build-dxp-component',
    setup(build) {
      build.onStart(() => {
        const baseDir = path.resolve('./component/blockquote');
        const distDir = path.resolve(baseDir, 'dxp-dist');
        const previewDir = path.resolve(distDir, 'previews');
        const templatePath = path.resolve(baseDir, '../templates/preview-template.html');

        // Ensure directories exist
        fs.mkdirSync(previewDir, { recursive: true });

        // Replace placeholders in the template and write to preview.html
        let templateContent = fs.readFileSync(templatePath, 'utf8');
        templateContent = templateContent.replace('[component://static-header]', '<!-- Header content here -->');
        templateContent = templateContent.replace('[component://output]', '<!-- Dynamic output content here -->');
        templateContent = templateContent.replace('[component://static-footer]', '<!-- Footer content here -->');

        fs.writeFileSync(path.resolve(previewDir, 'preview.html'), templateContent);

        // Other file operations
        fs.copyFileSync(path.resolve(baseDir, 'blockquote.data.json'), path.resolve(previewDir, 'example.data.json'));
        fs.writeFileSync(path.resolve(distDir, 'manifest.json'), '{}');
        fs.writeFileSync(path.resolve(distDir, 'main.cjs'), '');
      });
    }
  };
}

