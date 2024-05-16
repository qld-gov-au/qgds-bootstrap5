/**
 * Registers Handlebars Helper for 'contains', 'ifCond', 'isMultipleOfThree' and 'isEndOfRow'
 * @param {module} Handlebars Templating engine
 * @returns {void} Result of the helper operation
 */

export default function handlebarsHelpers(Handlebars) {
  Handlebars.registerHelper("contains", function (needle, haystack, options) {
    needle = Handlebars.escapeExpression(needle);
    haystack = Handlebars.escapeExpression(haystack);
    return haystack.indexOf(needle) > -1
      ? options.fn(this)
      : options.inverse(this);
  });
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
  Handlebars.registerHelper('isMultipleOfThree', function(index) {
    return (index % 3 === 0); // This will check if the index of the current item in the iteration is a multiple of three (nav dropdown)
  });
  Handlebars.registerHelper('isEndOfRow', function(index) {
    return ((index + 1) % 3 === 0); // Since index is zero-based, add 1 to check if it's the end of a row.
  });
}
