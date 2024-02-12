/**
 * @fileoverview This build file is only used for the demo/POC template rendering only.
 * It will produce an index.html file in the /dist folder, using components from the /src/components/.. folder.
 */

import QGDSTemplate from "../../src/js/qgds-template.js";
import QGDSComponent from "../../src/js/qgds-component.js";

// Build a static content page with some components
QGDSTemplate.make({
  /**
   * @property {Object} templates - Object containing paths to the HTML templates used for the page and content.
   * @property {string} templates.page - Path to the structural HTML layout template, which contains {{ component }} placeholders.
   * @property {string} templates.content - Path to the content template, which contains {{ component }} placeholders.
   */
  templates: {
    page: "index",
    content: "default",
  },

  /**
   * @property {string} outfile - Target location for the compiled HTML file.
   */
  outfile: "index.html",

  /**
   * @property {string} theme - Theme to be applied to the HTML file.
   */
  theme: "dark",

  /**
   * @property {string} pagetitle - Title of the HTML page.
   */
  pagetitle: "Content Page example",

  /**
   * @property {Object} components - Object containing the components to be used in the templates.
   */
  components: {
    accordion: QGDSComponent.make("accordion"),
    pagination: QGDSComponent.make("pagination"),
    banner: QGDSComponent.make("banner", {
      data: {
        breadcrumbs: QGDSComponent.make("breadcrumbs"),
        title: "Register your vehicle or motorcycles",
        content:
          "Motor vehicles and motorcycles (including mopeds and tricycles) used on Queensland roads must be registered.",
        classes: "banner-default",
      },
    }),
    inpagenav: QGDSComponent.make("inpagenav"),
    alerts: {
      closure: QGDSComponent.make("alert"),
      receipt: QGDSComponent.make("alert", {
        data: {
          classes: "alert-success",
          title: "Your transaction is complete",
          content:
            "<p>Your reference number is ATMR-1234-456. <a href='#'>Download a receipt</a></p>",
        },
      }),
      reminder: QGDSComponent.make("alert", {
        datafile: "./src/components/bs5/alert/service-unavailable.json",
      }),
    },
    blockquote: QGDSComponent.make("blockquote"),
    button: QGDSComponent.make("button"),
    card: QGDSComponent.make("card"),
    callout: QGDSComponent.make("callout", {
      data: {
        title: "This is a callout title",
        content: "This is a callout description",
        classes: "mb-5",
      },
    }),
    cardblock: QGDSComponent.make("cardblock", {
      path: "./src/components/bs5/card/cardblock.html",
      datafile: "./src/components/bs5/card/cardblock.data.json",
    }),
    table: QGDSComponent.make("table"),
  },
});

console.log(`HTML template builds completed\n===============================\n`);
