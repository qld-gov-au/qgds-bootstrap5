import fs from 'fs';
import mustache from 'mustache';

// Load the Mustache templates
const headerTemplate = fs.readFileSync('./src/partials/header.html', 'utf8');
//const mainTemplate = fs.readFileSync('./src/partials/main.html', 'utf8');
//const footerTemplate = fs.readFileSync('./src/partials/footer.html', 'utf8');

const indexTemplate = fs.readFileSync('./src/index.html', 'utf8');

// Compile the templates
const headerRendered = mustache.render(headerTemplate, { pageTitle: 'My Website' });
//const mainRendered = mustache.render(mainTemplate, {}); // Add data as needed
//const footerRendered = mustache.render(footerTemplate, {}); // Add data as needed

// Combine the templates into the final HTML
const finalHTML = mustache.render(indexTemplate, {
  header: headerRendered,
  //main: mainRendered,
  //footer: footerRendered,
});

// Write the final HTML to an output file
fs.writeFileSync('./dist/index.html', finalHTML);

console.log('HTML build completed.');