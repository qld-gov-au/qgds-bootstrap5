
/// DEV NOTE
/// This build file is only used for the demo/POC template rendering only.
// It will produce an index.html file in the /dist folder, using components from the /src/components/.. folder.

import QGDSTemplate from "../../src/js/qgds-template.js";
import QGDSComponent from "../../src/js/qgds-component.js";
import chalk from "chalk";

//QGDSComponent.setFramework("material");

let eventname = "Tropical Cyclone Kirrily";

//Build a static content page with some components
QGDSTemplate.make({
  template: "cheatsheet",
  components: {
    sidenav: QGDSComponent.make("sidenav", {
      path: "./src/components/bs5/_cheatsheet/cheatsheet-sidenav.html",
      datafile: "./src/components/bs5/_cheatsheet/cheatsheet-data.json",
    }),
    breadcrumbs: QGDSComponent.make("breadcrumbs"),
    accordion: QGDSComponent.make("accordion"),
    alert: {
      success: QGDSComponent.make("alert", {
        data: {
          classes: "alert-success",
          dismiss: true,
          title: "Your order has been completed",
          content: "Your receipt number is <strong>A-1234-6789</strong>. A copy of this receipt has been sent to your email address.",
        },
      }),
      info: QGDSComponent.make("alert", {
        data: { 
          classes: "alert-info",
          title:  `${eventname}: Emergency shelters are now open`,
          content: `<p>I am a content message for an information alert. I support HTML and variables such as event names</p>
                    <p>
                      <a href='#'>Find your closest shelter</a>
                    <p>`,
        },
      }),
      warning: QGDSComponent.make("alert", {
        data: { 
          classes: "alert-warning",
          dismiss: true,
          title: "I am a dismissble warning alert",
        },
      }),
      danger: QGDSComponent.make("alert", {
        data: { 
          classes: "alert-danger",
          title: "Road closure",
        },
      }),
      light: QGDSComponent.make("alert", {
        data: { 
          classes: "alert-light",
          title: "I am a light alert",
        },
      }),
      dark: QGDSComponent.make("alert", {
        data: { 
          classes: "alert-dark",
          title: "I am a dark alert",
        },
      }),
    },
    blockquote: QGDSComponent.make("blockquote"),
    button: {
      primary: QGDSComponent.make("button", {
        data: {
          classes: "btn-primary",
          text: "Primary button",
        },
      }),
      secondary: QGDSComponent.make("button", {
        data: {
          classes: "btn-secondary",
          text: "Secondary button",
        },
      }),
      outlinePrimary: QGDSComponent.make("button", {
        data: {
          classes: "btn-outline-primary",
          text: "Button",
        },
      }),
      outlineSecondary: QGDSComponent.make("button", {
        data: {
          classes: "btn-outline-secondary",
          text: "Button",
        },
      }),
    },    
    callout: QGDSComponent.make("callout"),
    inpagenav: QGDSComponent.make("inpagenav"),
    pagination: QGDSComponent.make("pagination"),
    table: QGDSComponent.make("table"),
    cardblock: QGDSComponent.make("cardblock", {
      path: "./src/components/bs5/card/cardblock.html",
      datafile: "./src/components/bs5/card/cardblock.data.json",
    }),
  },
});

console.log(chalk.greenBright(`\u2713 HTML template builds completed\n===============================\n`));
