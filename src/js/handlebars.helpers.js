/**
 * Registers Handlebars Helpers
 * @param {Handlebars} handlebars Templating engine
 * @returns {void} Result of the helper operation
 */

export default function handlebarsHelpers(handlebars) {
  // contains - if first object is in collection (second object) to return true
  handlebars.registerHelper("contains", function (needle, haystack, options) {
    needle = handlebars.escapeExpression(needle);
    haystack = handlebars.escapeExpression(haystack);
    return haystack.indexOf(needle) > -1
      ? options.fn(this)
      : options.inverse(this);
  });
  // ifCond - checks conditions
  handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
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
  // isType - Checks is expected type
  handlebars.registerHelper('isType', function (value, expected, options) {
    if (value === expected) {
      return options.fn(this); // Render the block if condition is true
    } else {
      return options.inverse(this); // Render the else block if present
    }
  });
  // ifAny - {{{#ifAny variable1 variable2 variable3 variable4 etc}}, if any set then return true
  handlebars.registerHelper('ifAny', function (...args) {
    const options = args.pop(); // The last argument is the options object
    return args.some(arg => !!arg) ? options.fn(this) : options.inverse(this);
  });
  // formatDate - Format Date, for footer meta data i.e {{formatDate '2023-06-23'}}
  handlebars.registerHelper('formatDate', function(dateString, defaultDate) {
    // Use the dateString if provided, otherwise use the defaultDate, otherwise error
    let date;
    if (dateString) {
      date = new Date(dateString);
    }
    if (isNaN(date) && defaultDate) {
      date = new Date(defaultDate);
    }

    // Check if the date is valid
    if (isNaN(date)) {
      return 'Invalid Date';
    }

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var day = date.getDate();
    var month = monthNames[date.getMonth()];
    var year = date.getFullYear();
    return `${day} ${month} ${year}`;
  });

  // formatDateOrToday - Format Date if passed or today i.e. {{formatDateOrToday '2023-06-23'}} or {{formatDateOrToday}} <!-- This will use the current date -->
  handlebars.registerHelper('formatDateOrToday', function(dateString) {
    // Use the current date if dateString is missing or invalid
    const dateToFormat = dateString || new Date().toISOString();
    // Call the formatDate helper with the determined date and format
    return handlebars.helpers.formatDate(dateToFormat);
  });
}

//Only load once if Handlebars is available
if(typeof(Handlebars) !== 'undefined') {
  this.registedHandlebarsHelpers = undefined;
  if (typeof this.registedHandlebarsHelpers === 'undefined') {
    // eslint-disable-next-line no-undef
    handlebarsHelpers(Handlebars);
    this.registedHandlebarsHelpers = true;
  }
} else {
  console.log("HandleBars is undefined, did not load helpers")
}
