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
});
