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
function formatDuration(duration, format = "short") {
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
  }

  export { formatDuration };