/* global Handlebars */

/**
 * Registers Handlebars Helpers
 * @param {module} Handlebars Templating engine
 * @returns {void} Result of the helper operation
 */

export default function handlebarsHelpers(Handlebars) {
  // Contains - 
  Handlebars.registerHelper("contains", function (needle, haystack, options) {
    needle = Handlebars.escapeExpression(needle);
    haystack = Handlebars.escapeExpression(haystack);
    return haystack.indexOf(needle) > -1
      ? options.fn(this)
      : options.inverse(this);
  });
  // ifCond - checks conditions 
  Handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
    switch (operator) {
    case "==":
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case "===":
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case "!=":
      return v1 != v2 ? options.fn(this) : options.inverse(this);
    case "!==":
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case "<":
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case "<=":
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case ">":
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case ">=":
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    case "&&":
      return v1 && v2 ? options.fn(this) : options.inverse(this);
    case "||":
      return v1 || v2 ? options.fn(this) : options.inverse(this);
    case "contains":
      if (typeof v1 == "string" && typeof v2 == "string") {
        return v1.toLowerCase().indexOf(v2.toLowerCase()) >= 0
          ? options.fn(this)
          : options.inverse(this);
      } else return options.inverse(this);
    default:
      return options.inverse(this);
    }
  });
  // Checks is expected type
  Handlebars.registerHelper('isType', function (value, expected, options) {
    if (value === expected) {
      return options.fn(this); // Render the block if condition is true
    } else {
      return options.inverse(this); // Render the else block if present
    }
  });
  // Assigns a tab index that starts at 2
  let tabindexCount = 2;
  Handlebars.registerHelper('tabindex', function() {
    return tabindexCount++;
  });
}

if(typeof(Handlebars) !== 'undefined') {
  handlebarsHelpers(Handlebars);
}
