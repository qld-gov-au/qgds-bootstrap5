/* global process */
// build-templates.js
import fs from 'fs';
import path from 'path';
import mustache from 'mustache';

const componentsDir = path.resolve(process.cwd(), '../src/components/bs5');
const outputDir = path.resolve(process.cwd(), '../src/templates-js');

function processDirectory(directory) {
  fs.readdirSync(directory).forEach((file) => {
    
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (path.extname(file) === '.html') {
      const outputPath = path.join(outputDir, `${path.basename(file, '.html')}.js`);
      const template = fs.readFileSync(filePath, 'utf-8');
      
      //Component data
      let componentdata = {};
      const dataFilePath = path.join(directory, 'data.json');
      const dataFileExists = fs.existsSync(dataFilePath);
      
      if (dataFileExists) {
        componentdata = fs.readFileSync(dataFilePath, 'utf-8');
      } else {
        console.log(`File does not exist: ${dataFilePath}`);
      }

      const renderFunction = `export default (data) => \`${mustache.render(template, { componentdata })}\`;`;

      fs.writeFileSync(outputPath, renderFunction);
    }
  });
}

processDirectory(componentsDir);
