// updateHandlebarsPartialsPlugin.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { build } from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_DIR = path.resolve(__dirname, './../../src/components');
const PARTIALS_JS_FILE = path.resolve(__dirname, '../../src/js/handlebars.partials.js');


function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });

    arrayOfFiles = arrayOfFiles || [];

    files.forEach((file) => {
        //console.log(file);
        if (file.isDirectory()) {
            arrayOfFiles = getAllFiles(path.join(dirPath, file.name), arrayOfFiles);
        } else if (file.isFile() && (file.name.endsWith('.hbs') && !file.name.endsWith('.test.hbs'))) {
            arrayOfFiles.push(path.join(dirPath, file.name));
        }
    });

    return arrayOfFiles;
}

export default function QGDSupdateHandlebarsPartialsPlugin() {
    return {
        name: 'update-handlebars-partials',
        setup(build) {
            build.onStart(async () => {

                const files = getAllFiles(COMPONENTS_DIR);
                //console.log(files);
                const fileNames = new Map();
                let duplicateFound = false;

                let importLines = '';
                let registerLines = '';

                for (const file of files) {
                    //console.log(file);
                    const componentName = path.basename(file, '.hbs')
                    //console.log(componentName);
                    // Duplicate check
                    if (fileNames.has(componentName)) {
                        console.error(`Error: Duplicate component name found: "${componentName}" second partial located at ${file} and ${fileNames.get(componentName)}`);
                        duplicateFound = true;
                        continue;
                    }
                    fileNames.set(componentName, file);

                    const importName = componentName.replace(/-/g, '');
                    const componentPath = path.relative(path.dirname(PARTIALS_JS_FILE), file).replace(/\\/g, '/');

                    importLines += `import ${importName} from "${componentPath}?raw";\n`;
                    registerLines += `    handlebars.registerPartial("${componentName}", ${importName});\n`;
                }

                if (duplicateFound) {
                    process.exit(1);
                }

                const newContent = `/** THIS IS A GENERATED FILE **/

${importLines}

/**
 * Registers Handlebars Partials
 * @param {Handlebars} handlebars Templating engine
 * @returns {void} Result of the helper operation
 */
export default function handlebarsPartials(handlebars) {
${registerLines}
}
`;

                fs.writeFileSync(PARTIALS_JS_FILE, newContent);
                console.log('handlebar.partials.js has been updated.');
            });
        },
    }
};