import { defineConfig } from "vite";

export default defineConfig({
  root: "./dist",
  plugins: [
    {
      name: "html-transform",
      transform(src, id) {
        if (
          id.endsWith(".mustache") ||
          id.endsWith(".html") ||
          id.endsWith(".hbs")
        ) {
          // Transform your HTML files here (src is the file content as a string)
          return src;
        }
      },
    },
  ],
  // assetsInclude: ["**/*.hbs", "**/*.hbs?raw"],
  test: {
    passWithNoTests: true, // Do not fail when no tests are found
    reporters: ["verbose"], // Use the verbose reporter
  },
});
