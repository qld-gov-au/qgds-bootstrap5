
/// DEV NOTE
/// This build file is only used for the demo/POC template rendering only.
// It will produce an index.html file in the /dist folder, using components from the /src/components/.. folder.

import QGDSTemplate from "../../src/js/qgds-template.js";
import QGDSComponent from "../../src/js/qgds-component.js";
//import chalk from "chalk";

//QGDSComponent.setFramework("material");
let allcomponents = {
  alert: QGDSComponent.make("alert"),
  accordion: QGDSComponent.make("accordion"),
  breadcrumbs: QGDSComponent.make("breadcrumbs"),
  blockquote: QGDSComponent.make("blockquote"),
  button: QGDSComponent.make("button"),
  card: QGDSComponent.make("card"),
  callout: QGDSComponent.make("callout"),
  inpagenav: QGDSComponent.make("inpagenav"),
  pagination: QGDSComponent.make("pagination"),
  table: QGDSComponent.make("table"),
};

Object.keys(allcomponents).forEach((name) => {
  
  console.log(name);

  QGDSTemplate.make({
    template: "cmpreference",
    title: `Component ${name}`,
    content: `../src/templates/content/component-examples/${name}.html`,
    outfile: `component-examples/${name}.html`,
  });

});


//console.log(chalk.greenBright(`\u2713 HTML template builds completed\n===============================\n`));
