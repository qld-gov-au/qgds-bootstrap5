// eslint-disable-next-line no-unused-vars
import Handlebars from "handlebars";
import handlebarsHelpers from "./handlebars.helpers.js";
import handlebarsPartials from "./handlebars.partials.js";


let isHandlebarsHelpersAndPartialsRegistered = false;

/*
 * init function to load all HandleBar partials and helpers into passed in handlebars
 * by default the helpers and partials will autoload if handleBars is found in environment
 *
 * @param {Handlebars} handlebars
 */
export default function init(handlebars) {
  if (typeof(handlebars) === 'undefined') {
    console.error("Handlebars.init requires HandleBars");
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
