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
  //https://github.com/twbs/bootstrap/issues/40962 bootstrap 5.x is not ready for sass 1.80, so silence what we can't change (review 2026)
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          'legacy-js-api',
          'mixed-decls',
          'color-functions',
          'global-builtin',
          'import',
        ],
        indentType: 'space',
        indentWidth: 2,
        includePaths: ['./node_modules'],
      },
    },
  },
});
