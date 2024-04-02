/// DEV NOTE
/// This build file is only used for the demo/POC template rendering only.
// It will produce an index.html file in the /dist folder, using components from the /src/components/.. folder.

import QGDSTemplate from "./src/js/qgds-template.js";
import QGDSComponent from "./src/js/qgds-component.js";


//Build a static content page with some components
QGDSTemplate.make({
  layoutpath: "./src/layout/template/reference-sheet.html",         // Structural HTML layout, contains {{ component }} placeholders
  contentpath: "./src/layout/content/reference-sheet-body.html",    // Content - body content, contains {{ component }} placeholders
  outfile: "reference-sheet.html",  // Target location for this call. e.g. this compiles into /dist/index.html
  theme: "",                        // e.g. "dark". adds a "data-bs-theme" attribute to the <html> tag
  pagetitle: "Components List",     // <title> tag
  sidenav: QGDSComponent.make("sidenav", {
    path: "./src/components/_cheatsheet/sidenav.html",
    datafile: "./src/components/_cheatsheet/data.json",
  }),

  //Components that will be used on either the layout or content
  components: {
    breadcrumbs: QGDSComponent.make("breadcrumbs"),
    accordion: QGDSComponent.make("accordion"),
    alert: QGDSComponent.make("alert"),
    blockquote: QGDSComponent.make("blockquote"),
    button: QGDSComponent.make("button"),
    card: QGDSComponent.make("card"),
    callout: QGDSComponent.make("callout"),
    inpagenav: QGDSComponent.make("inpagenav"),
    pagination: QGDSComponent.make("pagination"),
    table: QGDSComponent.make("table"),
    // cardblock: QGDSComponent.make("cardblock", {
    //   path: "./src/components/bs5/card/cardblock.html",
    //   datafile: "./src/components/bs5/card/cardblock.data.json",
    // }),
  },
});

console.log(
  `HTML template builds completed\n===============================\n`,
);
