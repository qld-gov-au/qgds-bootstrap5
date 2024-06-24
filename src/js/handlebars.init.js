import handlebarsHelpers from "./handlebars.helpers.js";
import handlebarsPartials from "./handlebars.partials.js";
import Handlebars from "handlebars";

/**
 * init function to load all HandleBar partials and helpers
 *
 * @param {Handlebars} handlebars
 */
let isHandlebarsHelpersAndPartialsRegistered = false;

export default function init(handlebars = Handlebars) {
  if (typeof(handlebars) === 'undefined') {
    if(typeof(Handlebars) !== 'undefined') {
      handlebars = Handlebars
    }
  }

  if(typeof(handlebars) !== 'undefined') {
    if (!isHandlebarsHelpersAndPartialsRegistered) {
      isHandlebarsHelpersAndPartialsRegistered = true;
    } else {
      console.log("HandleBars Helpers And Partials already loaded, loading again")
    }
    handlebarsHelpers(handlebars);

    handlebarsPartials(handlebars);
  } else {
    console.log("Handlebars not found, init failed");
  }
}

init();

