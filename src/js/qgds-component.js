import fs from "fs";
import mustache from "mustache";

/**
 * QGDSComponent represents the component builder in the QGDS framework.
 * @namespace
 *
 *  The QGDSComponent object is used to build a component by combining a 
 *  source template file using {{Mustache}} syntax, and optional data objects.
 * 
 *  - The template file should be a path reference.
 *  - The data objects can be passed in as a JSON file reference, or as a JSON object, or both.
 *  - If a data.json file is available in the same directory as the template file, it will be used by default.
 *  
 *  The component builder will return a compiled HTML string.
 *  
 *  opts: {
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
 *      path: "./src/components/alert/alert.bs5.html",
 *      datafile: "./src/components/alert/data.json",
 *      datajson: {
 *          "title": "Your transaction is complete"
 *      }        
 *  })
 * 
 */



const QGDSComponent = {
    
    framework: "bs5",
    
    make: function(name, opts = {}) {

        let componentPath = opts.path || `./src/components/${name}/${name}.${this.framework}.html`;
        let componentHTML = fs.readFileSync(componentPath, "UTF-8");
        const optkeys = Object.keys(opts);

        //3 possible data sources to merge into a final data{} object
        let defaultfileJSON = {};
        let datafileJSON = {};
        let customdataJSON = {};
        let templatedata = {};


        //1. Does default data file exist (/component/data.json) ?
        let defaultDatafile = `./src/components/${name}/data.json`;

        if ( fs.existsSync(defaultDatafile) ) {
            try {
                defaultfileJSON = JSON.parse( fs.readFileSync(defaultDatafile, "UTF-8") );
            } catch (err) {
                console.error(`Error parsing datafile for ${name}: ${defaultDatafile}, ${err}`);
            }
        }

        //Was a custom data FILE reqeusted?
        if ( optkeys.includes('datafile') ) {
            try {
                datafileJSON = JSON.parse( fs.readFileSync(opts.datafile, "UTF-8") );
                defaultfileJSON = {}; //Override the default datafile.
            } catch (err) {
                console.error(`ERROR: Error parsing datafile for ${name}: ${opts.datafile}, ${err}`);
            }
        }

        //Custom data OBJECT provided?
        if( optkeys.includes('data') ) {
            try {
                customdataJSON = opts.data;
            } catch (err) {
                console.error(`Error parsing datajson for ${name}: ${err}`);
            }
        }

        //Merge our 3 possible data sources
        templatedata = { ...customdataJSON, ...defaultfileJSON, ...datafileJSON }
        //console.log( `${JSON.stringify(templatedata, 'undefined', 2)}`);
        console.log(`Made component ${name} from ${componentPath}`);

        //Compile the component HTML with Mustache JS 
        return mustache.render(componentHTML, templatedata);

    }
};

export default QGDSComponent;