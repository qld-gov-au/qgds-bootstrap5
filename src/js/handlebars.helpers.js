/* global Handlebars */
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
  // now - return current timestamp i.e {{now}}
  handlebars.registerHelper('now', function() {
    return new Date().toISOString();
  });
  // formatDate - Format Date, for footer meta data i.e {{formatDate '2023-06-23'}}
  handlebars.registerHelper('formatDate', function(dateString, defaultDate, format) {
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
    // Format date based on the format string
    switch (format) {
    case 'YYYY':
      return `${year}`;
    case 'MMMM YYYY':
      return `${month} ${year}`;
    default:
      return `${day} ${month} ${year}`;
    }
  });

  // formatDateOrToday - Format Date if passed or today i.e. {{formatDateOrToday '2023-06-23'}} or {{formatDateOrToday}} <!-- This will use the current date -->
  handlebars.registerHelper('formatDateOrToday', function(dateString, format) {
    // Use the current date if dateString is missing or invalid
    const dateToFormat = dateString || new Date().toISOString();
    // Call the formatDate helper with the determined date and format
    return handlebars.helpers.formatDate(dateString, dateToFormat, format);
  });

  /**
   * Format time duration into a string.
   *
   * Supports two formats: "short" and "long".
   * - Short format: Display the duration in simplified format of "HH:MM:SS". It is the default format.
   * - Long format: Display the duration in descriptive format of "X hours Y minutes Z seconds".
   *
   * @param {Object | String} duration - Duration object with properties: 'hours', 'minutes', and 'seconds'. Duration string: "HH:MM:SS".
   * @param {String} format - Option for format type 'short' or 'long'. If none provided, 'short' is the defaut value.
   *
   * @returns {String} Formatted duration
   * Examples:
   * - 03:00:00 - 3 hours
   * - 03:15:00 - 3 hours 15 minutes
   * - 01:30:45 - 1 hour 30 minutes 45 seconds
   * - 02:00:45 - 2 hours 45 seconds
   * - 07:12 - 7 minutes 12 seconds
   * - 00:45 - 45 seconds
   *
   * Usage:
   * {{formatDuration duration}}
   * {{formatDuration duration "long"}}
   */
  handlebars.registerHelper('formatDuration', function(duration, format) {
    // Return empty string when there is no duration.
    if (!duration) {
      return "";
    }

    // Nothing to process here when the duration is already in short format string
    // (to support existing CMS metadata).
    if (typeof(duration) === 'string' && format !== "long") {
      return duration;
    }

    let durationString = "";
    let parts = [];
    let hours, minutes, seconds;

    // Support for string type 'duration'.
    if (typeof(duration) === 'string') {
      const durationSplit = duration.split(":");  
      seconds = durationSplit[0];
      if (durationSplit.length == 2) {
        [minutes = "", seconds = ""] = durationSplit;
      } else if (durationSplit.length == 3) {
        [hours = "", minutes = "", seconds = ""] = durationSplit;
      }
    } else {
      // Support for object type 'duration'.
      [hours = "", minutes = "", seconds = ""] = duration;
    }

    // Long format: "X hours Y minutes Z seconds"
    if (format === "long") {
      if (hours > 0) {
        parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
      }
      if (minutes > 0) {
        parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
      }
      if (seconds > 0) {
        parts.push(`${seconds} second${seconds > 1 ? 's' : ''}`);
      }
      durationString = parts.join(" ");

    // Short format: "HH:MM:SS"
    } else {
      // Omitting hours when zero
      if (hours > 0) {
        parts.push(hours.toString().padStart(2, 0));
      }
      parts.push(minutes.toString().padStart(2, 0));
      parts.push(seconds.toString().padStart(2, 0));
      durationString = parts.join(":");
    }
    return durationString;
  });
}

if(typeof(Handlebars) !== 'undefined') {
  handlebarsHelpers(Handlebars);
}
