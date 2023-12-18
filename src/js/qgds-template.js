/**
 * QGDSTemplate module for building HTML templates.
 * @module QGDSTemplate
 */

import fs from "fs";
import mustache from "mustache";

// Master templates
const QGDSTemplate = {

  layouts: {
    contentpage: fs.readFileSync("./src/layout/template/contentpage.html", "utf8"),
    landingpage: fs.readFileSync("./src/layout/template/landingpage.html", "utf8")
  },

  sections: {
    header: fs.readFileSync("./src/layout/header/header.html", "utf8"),
    footer: fs.readFileSync("./src/layout/footer/footer.html", "utf8"),
    inpagenav: '',
    breadcrumbs: '',
    sidenav: fs.readFileSync("./src/components/nav/sidenav-example.html", "utf8"),
  },

  /**
   * Builds a template using the specified options and saves it to the output file.
   * @param {Object} options - The options for building the template.
   * @param {string} options.layout - The layout template to be used. Layout is the top level HTML5 template including HEAD, footer JS etc and other fixed elements liked navigation and search bar
   * @param {string} options.content - The content file to be rendered. Content is the main body content of the page.
   * @param {string} [options.header] - The header section template.
   * @param {string} [options.breadcrumbs] - The breadcrumbs section template.
   * @param {string} [options.sidenav] - The sidenav section template.
   * @param {string} [options.footer] - The footer section template.
   * @param {string} options.outfile - The output file path. Defaults to dist/index.html but can be any file name.
   */

  make: function(options) {
  
    let content = fs.readFileSync(`./src/layout/content/${options.content}.html`, "UTF-8");
    
    console.log(`Building template ./src/layout/content/${options.content}.html`);

    let compiledHTML = mustache.render(
      this.layouts[options.layout], {
        header: options.header || this.sections.header,
        breadcrumbs: options.breadcrumbs || this.sections.breadcrumbs,
        sidenav: options.sidenav || this.sections.sidenav,
        footer: options.footer || this.sections.footer,
        main: mustache.render( content, options || {}),
        theme: options.theme || "qgds-default",
        ...options
      }
    );

    fs.writeFileSync(`./dist/${options.outfile}`, compiledHTML);
    console.log(`Built template ./dist/${options.outfile}`);

  }
};

export default QGDSTemplate;

console.log("HTML build completed.");
