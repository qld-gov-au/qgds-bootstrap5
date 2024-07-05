/**
 * Logs a message with color.
 * @param {string} color - The color of the message.
 * @param {string} message - The message to be logged.
 * @returns {void}
 */
export default function log(color, message) {
  const colors = {
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    red: "\x1b[31m",
    reset: "\x1b[0m",
    black: "\x1b[0m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
  };

  console.log(colors[color], message, colors.reset);
}
