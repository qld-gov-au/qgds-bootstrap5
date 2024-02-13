import fs from "fs";
import mustache from "mustache";
import chalk from "chalk";
import QGDSconfig from "./qgds-config.js";

//import QGDSIcons from "./qgds-icons.js";


/**
 * QGDSComponent represents the component builder in the QGDS framework.
 * @namespace
 *
 *  The QGDSComponent object is used to build a component by combining a
 *  source template file with {{ Mustache }} syntax, and optional data objects.
 *
 *  - The template file should be a path reference.
 *  - The data objects can be passed in as a JSON file reference, or as a JSON object, or both.
 *  - If a data.json file is available in the same directory as the template file, it will be used by default.
 *
 *  The component builder will return a compiled HTML string.
 *
 *  options: {
 *      path: "path/to/mustache.template.html",
 *      datafile: "path/to/data.json",
 *      datajson: { ... } //an optional data object to use with the mustache template
 *  }
 *
 *  @example Alert component
 *
 *  //Default alert component
 *  QGDSComponent.make("alert");
 *
 *  //Custom alert component
 *  QGDSComponent.make("alert", {
 *      path: "./src/components/bs5/alert/alert.html",
 *      datafile: "./src/components/bs5/alert/data.json",
 *      datajson: {
 *          "title": "Your transaction is complete"
 *      }
 *  })
 *
 */

const QGDSComponent = {

  defaultFramework: "bs5", //default

  make: function (name, options = {}) {

    try {
      
      /**
       * Frameworks:
       *
       * Components can be rendered from an alternate mustache template within the project structure.
       * This feature allows for the usage of multiple frameworks in the same project, such as Bootstrap 5, Material, or Tailwind.
       * To render a component using a specific framework, pass in the framework name as an option when calling the make() function:
       *
       * Example:
       * QGDSComponent.make("alert", { framework: "material" });
       */

      let framework = options.framework || QGDSComponent.defaultFramework;
      let componentPath = options.path || `../src/components/${framework}/${name}/${name}.html`;
      
      if (!fs.existsSync(componentPath)) {
        throw new Error(`Component file not found for ${name}: ${componentPath}`);
      }
    
      const componentHTML = fs.readFileSync(componentPath, { encoding: "utf8" });
      const optkeys = Object.keys(options);

      //3 possible data sources to merge into a final data{} object
      let 
        defaultfileJSON = {},
        datafileJSON = {},
        customdataJSON = {},
        templatedata = {},
        defaultDatafile = `../src/components/${framework}/${name}/data.json`;


      //Does default data file exist (/component/data.json) ?
      if(fs.existsSync(defaultDatafile)) {  
        defaultfileJSON = JSON.parse(fs.readFileSync(defaultDatafile, { encoding: "utf8" })); 
      }
      
      if(optkeys.includes("datafile")) {
        if(fs.existsSync(options.datafile) ) {
          datafileJSON = JSON.parse(fs.readFileSync(options.datafile, { encoding: "utf8" }));
        } else {
          throw new Error(`Data file requested but not found: ${options.datafile}. Continuing...` );
        }
      }

      if(optkeys.includes("data")) {
        try {
          customdataJSON = options.data;
        } catch (err) {
          throw new Error(`Error parsing datajson for ${name}: ${err}`);
        }
      }

      //Merge our 3 possible data sources
      templatedata = {
        ...defaultfileJSON,
        ...datafileJSON,
        ...customdataJSON,
      };

      if(Object.keys(templatedata).length === 0) {
        console.log(chalk.redBright.bold(`\u2717 Data was NOT provided for the ${name} component. It will not render correctly without data.`));  
      }
      //Load QGDSIcons into the template data
      //templatedata['icons'] = QGDSIcons.icons;
    
      //console.log( `${JSON.stringify(templatedata, 'undefined', 2)}`);
      console.log(`\u2192 Made component ` + chalk.cyan.bold(`${name}`) + ` from ${componentPath}`);

      //Compile the component HTML with Mustache JS
      return mustache.render(componentHTML, templatedata);


    } catch (err) {
      console.error(chalk.redBright(`\u26A0 ${err.message}`));
    
    }
    
    
  },

  setFramework: function (newframework) {
    
    //Current component framework
    if(this.defaultFramework !== newframework) {
      console.log(chalk.cyan(`\u2699 Setting default component framework to`) + ' ' + chalk.cyanBright.bold(`${newframework}`));
    }

    this.defaultFramework = newframework;

  },

};

QGDSComponent.setFramework("bs5");

export default QGDSComponent;
