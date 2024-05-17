import handlebarsHelpers from "./handlebars.helpers.js";
import Handlebars from "handlebars";
export * from "./handlebars.helpers.js";

export const init = () => handlebarsHelpers(Handlebars);

