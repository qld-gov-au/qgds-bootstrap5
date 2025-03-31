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
  handlebars.registerHelper("isType", function (value, expected, options) {
    if (value === expected) {
      return options.fn(this); // Render the block if condition is true
    } else {
      return options.inverse(this); // Render the else block if present
    }
  });
  // ifAny - {{{#ifAny variable1 variable2 variable3 variable4 etc}}, if any set then return true
  handlebars.registerHelper("ifAny", function (...args) {
    const options = args.pop(); // The last argument is the options object
    return args.some((arg) => !!arg) ? options.fn(this) : options.inverse(this);
  });
  // now - return current timestamp i.e {{now}}
  handlebars.registerHelper("now", function () {
    return new Date().toISOString();
  });
  // formatDate - Format Date, for footer meta data i.e {{formatDate '2023-06-23'}}
  handlebars.registerHelper(
    "formatDate",
    function (dateString, defaultDate, format) {
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
        return "Invalid Date";
      }

      var monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var day = date.getDate();
      var month = monthNames[date.getMonth()];
      var year = date.getFullYear();
      // Format date based on the format string
      switch (format) {
      case "YYYY":
        return `${year}`;
      case "MMMM YYYY":
        return `${month} ${year}`;
      default:
        return `${day} ${month} ${year}`;
      }
    },
  );

  // formatDateOrToday - Format Date if passed or today i.e. {{formatDateOrToday '2023-06-23'}} or {{formatDateOrToday}} <!-- This will use the current date -->
  handlebars.registerHelper("formatDateOrToday", function (dateString, format) {
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
  handlebars.registerHelper("formatDuration", function (duration, format) {
    // Return empty string when there is no duration.
    if (!duration) {
      return "";
    }

    // Nothing to process here when the duration is already in short format string
    // (to support existing CMS metadata).
    if (typeof duration === "string" && format !== "long") {
      return duration;
    }

    let durationString = "";
    let parts = [];
    let hours, minutes, seconds;

    // Support for string type 'duration'.
    if (typeof duration === "string") {
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
        parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
      }
      if (minutes > 0) {
        parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
      }
      if (seconds > 0) {
        parts.push(`${seconds} second${seconds > 1 ? "s" : ""}`);
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

  /**
   * Used to get class names added to an element based on their boolean values in an array
   * @param {string} names - Comma-separated list of class names to check for
   * @param {array} array - Array of objects to check for true values
   * @returns {string} - Space-separated list of class names that have true values
   */
  handlebars.registerHelper("getClassNames", function (names, array) {
    // Split the comma-separated string of names into an array
    let nameList = names.split(",").map((name) => name.trim());

    // Create an array to hold the names that have true values
    let matchedItems = [];

    for (let i = 0; i < nameList.length; i++) {
      let name = nameList[i];
      // Check if any item in the array matches the name and is true
      for (let j = 0; j < array.length; j++) {
        if (array[j][name] === true) {
          matchedItems.push(name); // Add to matchedItems if found and true
          break;
        }
      }
    }

    // If we found any matched items, return them as a space-separated string
    if (matchedItems.length > 0) {
      return matchedItems.join(" ");
    } else {
      return "";
    }
  });

  // Array Join helper
  handlebars.registerHelper("join", function (arr, separator) {
    //If not array, return as is
    if (!Array.isArray(arr)) {
      return arr;
    }
    //Separator is optional, default is space
    separator = typeof separator === "string" ? separator : " ";
    return arr.join(separator);
  });
}

if (typeof Handlebars !== "undefined") {
  handlebarsHelpers(Handlebars);
}
