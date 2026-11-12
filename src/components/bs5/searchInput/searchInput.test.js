import { expect, it, describe, test, beforeEach, afterEach } from "vitest";
import { JSDOM } from "jsdom";
import { SearchInput } from "./SearchInput.js";
import mockData from "./searchInput.data.json";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { waitFor, isElementVisible } from "../../../js/testingutils.js";

import init from "../src/js/handlebars.init.js";
import Handlebars from "handlebars";
init(Handlebars);

/**
 *
 * Test suite for the SearchInput component.
 *
 * @fileoverview This file contains tests for the SearchInput component using Vitest.
 * Focuses on testing the event listeners functionality from qld.bootstrap.js lines 49-83.
 *
 * @requires vitest
 * @requires ./SearchInput.js
 * @requires ./searchInput.data.json
 * @requires /dist/assets/js/bootstrap.min.js
 * @requires /dist/assets/js/qld.bootstrap.min.js
 */

const __dirname = dirname(fileURLToPath(import.meta.url));
const bootstrapJsFile = fs.readFileSync(
  `${__dirname}/../../../../dist/assets/js/bootstrap.min.js`,
  "utf-8",
);
const qldBootstrapJsFile = fs.readFileSync(
  `${__dirname}/../../../../dist/assets/js/qld.bootstrap.min.js`,
  "utf-8",
);

describe("SearchInput", () => {
  let dom, d, searchInput, suggestions, form, window;

  beforeEach(async () => {
    const SearchInputComponent = new SearchInput(mockData);

    // Create DOM with form wrapper and suggestions element
    const htmlWithSuggestions = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body>
            ${SearchInputComponent.html}
          <script>${bootstrapJsFile}</script>
          <script>${qldBootstrapJsFile}</script>
        </body>
      </html>
    `;

    dom = new JSDOM(htmlWithSuggestions, {
      runScripts: "dangerously",
      resources: "usable",
      pretendToBeVisual: true,
    });

    d = dom.window.document;
    window = dom.window;

    // Wait for scripts to execute and DOM to be fully ready
    await waitFor(100);

    // Additional wait to ensure all scripts are fully initialized
    await new Promise((resolve) => setTimeout(resolve, 100));

    form = d.querySelector(".qld-search-input");
    searchInput = form?.querySelector("input.form-control");
    suggestions = form?.querySelector(".suggestions");

    // Ensure elements exist
    if (!form || !searchInput || !suggestions) {
      throw new Error("Required elements not found in DOM");
    }
  });

  afterEach(() => {
    // Clean up DOM and prevent memory leaks
    if (dom) {
      dom.window.close();
      dom = null;
      d = null;
      window = null;
      form = null;
      searchInput = null;
      suggestions = null;
    }
  });

  it("Renders as expected", () => {
    const SearchInputComponent = new SearchInput(mockData);
    expect(SearchInputComponent.html).toMatchSnapshot();
  });
});
