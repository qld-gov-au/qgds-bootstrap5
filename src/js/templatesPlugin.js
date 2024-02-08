import fs from "fs";
import mustache from "mustache";

//JS Components we are using in the template. Load as required.
//They are referenced by mustcahe syntax e.g. {{ components.banner }}
import Alert from "../components/bs5/alert/Alert.js";
import Banner from "../components/bs5/banner/Banner.js";

/**
 * Setup example page templates.
 *
 * @type {import("esbuild").Plugin}
 */

let components = {
  header: fs.readFileSync("../components/common/header/header.html", "utf8"),
  footer: fs.readFileSync("../components/common/footer/footer.html", "utf8"),
  alert: new Alert().html,
  banner: new Banner().html,
};

let templatesPlugin = {
  name: "Templates plugin",
  setup: (build) => {
    build.onBuild(() => {
      const templates = [
        {
          name: "Index",
          in: "../templates/index.html",
          out: "../dist/index.html",
          components: components,
        },
        // {
        //   in: "../templates/compiled/index.html",
        //   out: "../dist/index.html",
        //   template: fs.readFileSync("../templates/compiled/index.html", "utf8"),
        // },
      ];

      //Setup the mustche template data.
      // The keys need to match the {{ placeholderName }} in the HTML template.  e.g. {{ components.header }}

      // Compile the templates
      templates.forEach((template) => {
        let rendered = mustache.render(template.in, template.components);
        fs.writeFileSync(template.out, rendered);
      });
    });
  },
};

export default function () {
  return templatesPlugin;
}
