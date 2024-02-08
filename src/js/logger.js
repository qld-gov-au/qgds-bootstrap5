/**
 * Logs a message with color.
 */
export default function log(color, message) {
  const colors = {
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    red: "\x1b[31m",
    reset: "\x1b[0m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
  };

  console.log(colors[color], message, colors.reset);
}
