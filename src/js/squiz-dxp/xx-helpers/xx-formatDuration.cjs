module.exports = function formatDuration(duration, format = "short") {
    if (!duration) {
        return "";
    }

    // Nothing to process here when the duration is already in short format string
    // (to support existing CMS metadata).
    if (typeof (duration) === 'string' && format !== "long") {
        return duration;
    }

    let durationString = "";
    let parts = [];
    let hours, minutes, seconds;

    // Support for string type 'duration'.
    if (typeof (duration) === 'string') {
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