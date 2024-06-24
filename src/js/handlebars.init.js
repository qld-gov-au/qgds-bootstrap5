import handlebarsHelpers from "./handlebars.helpers.js";
import handlebarsPartials from "./handlebars.partials.js";
import Handlebars from "handlebars";

/**
 * init function to load all HandleBar partials and helpers
 *
 * @param {Handlebars} handlebars
 */
export default function init(handlebars = Handlebars) {
  if (typeof(handlebars) === 'undefined') {
    if(typeof(Handlebars) !== 'undefined') {
      handlebars = Handlebars
    }
  }

  if(typeof(handlebars) !== 'undefined') {
    //only load once
    if (typeof handlebarsHelpers.registeredHandlebarsHelpers === 'undefined') {
      handlebarsHelpers(handlebars);
      handlebarsHelpers.registeredHandlebarsHelpers = true;
    }
    //only load once
    if (typeof handlebarsPartials.registeredHandlebarsPartials === 'undefined') {
      handlebarsPartials(handlebars);
      handlebarsPartials.registeredHandlebarsPartials = true;
      console.log('partials loaded');
    }
  } else {
    console.log("Handlebars not found, init failed");
  }
}

