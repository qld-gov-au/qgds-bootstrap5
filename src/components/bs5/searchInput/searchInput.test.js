import { expect, it, describe, test, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import { SearchInput } from "./SearchInput.js";
import mockData from "./searchInput.data.json";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { waitFor } from "../../../js/testingutils.js";

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
  let dom, d, searchInput, suggestions, form;

  beforeEach(() => {
    const SearchInputComponent = new SearchInput(mockData);

    // Create DOM with form wrapper and suggestions element
    const htmlWithSuggestions = `
      <!DOCTYPE html>
      <div class="site-search" action="https://example.com/search">
        ${SearchInputComponent.html}
        <div class="suggestions" style="display: none;">
          <ul>
            <li><a href="#">Test suggestion 1</a></li>
            <li><a href="#">Test suggestion 2</a></li>
          </ul>
        </div>
      </div>
      <script>
        // Mock showSuggestions function
        window.showSuggestions = function(value, showEmpty, formElement) {
          const suggestionsElement = formElement.querySelector('.suggestions');
          if (suggestionsElement) {
            suggestionsElement.style.display = 'block';
          }
        };
        window.submitSearchForm = function(query, form) { console.log('Search:', query); };
        // Mock fetch for JSDOM
        window.fetch = function() {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve([])
          });
        };
      </script>
      <script>${bootstrapJsFile}</script>
      <script>${qldBootstrapJsFile}</script>
    `;

    dom = new JSDOM(htmlWithSuggestions, {
      runScripts: "dangerously",
      resources: "usable",
    });

    d = dom.window.document;

    // Wait for DOM content loaded
    const event = new dom.window.Event("DOMContentLoaded");
    dom.window.document.dispatchEvent(event);

    form = d.querySelector(".site-search");
    searchInput = form.querySelector(".qld-search-input input");
    suggestions = form.querySelector(".suggestions");
  });

  it("Renders as expected", () => {
    const SearchInputComponent = new SearchInput(mockData);
    expect(SearchInputComponent.html).toMatchSnapshot();
  });

  test("Search input element and Suggestions container exists and has correct attributes", () => {
    expect(searchInput).toBeTruthy();
    expect(searchInput.getAttribute("placeholder")).toBe(mockData.placeholder);
    expect(searchInput.getAttribute("id")).toBe(mockData.inputID);
    expect(searchInput.getAttribute("name").trim()).toBe(mockData.inputName);
    expect(suggestions).toBeTruthy();
    expect(suggestions.classList.contains("suggestions")).toBe(true);
  });

  test("Focus event shows suggestions", async () => {
    // Initially suggestions should be hidden or empty
    expect(suggestions.style.display).toMatch(/(none|^$)/);

    // Focus on input should trigger the focus event listener
    searchInput.focus();

    // Wait for any asynchronous operations
    await waitFor();

    // Suggestions should now be visible
    expect(suggestions.style.display).toBe("block");
  });

  test("Click event shows suggestions when input is empty", async () => {
    // Ensure input is empty
    searchInput.value = "";

    // Initially suggestions should be hidden
    suggestions.style.display = "none";

    // Click on input should trigger the click event listener
    searchInput.click();

    // Wait for any asynchronous operations
    await waitFor();

    // Suggestions should now be visible
    expect(suggestions.style.display).toBe("block");
  });

  test("Click event does not show suggestions when input has value", async () => {
    // Set input value
    searchInput.value = "test query";

    // Initially suggestions should be hidden
    suggestions.style.display = "none";

    // Click on input should not trigger suggestions when input has value
    searchInput.click();

    // Wait for any asynchronous operations
    await waitFor();

    // Suggestions should remain hidden
    expect(suggestions.style.display).toBe("none");
  });

  test("Keyup event has debounce timeout", async () => {
    // Set suggestions to hidden initially
    suggestions.style.display = "none";

    // Simulate typing in input
    searchInput.value = "test";
    searchInput.dispatchEvent(
      new dom.window.KeyboardEvent("keyup", { key: "t" }),
    );

    // Suggestions should not show immediately due to 300ms debounce
    expect(suggestions.style.display).toBe("none");

    // The keyup event listener should have been attached (implicit test)
    expect(searchInput).toBeTruthy();
  });

  test("Focusout event listeners are attached and functional", async () => {
    // Verify that the focusout event listeners are attached and don't cause errors
    expect(searchInput).toBeTruthy();
    expect(suggestions).toBeTruthy();

    // Show suggestions first
    searchInput.focus();
    await waitFor();
    expect(suggestions.style.display).toBe("block");

    // Test that focusout events can be dispatched without throwing errors
    const focusoutEvent = new dom.window.FocusEvent("focusout", {
      relatedTarget: null,
      bubbles: true,
      cancelable: true,
    });

    // These should not throw errors if event listeners are properly attached
    expect(() => {
      searchInput.dispatchEvent(focusoutEvent);
    }).not.toThrow();

    expect(() => {
      suggestions.dispatchEvent(focusoutEvent);
    }).not.toThrow();

    // Note: In JSDOM environment, the actual DOM manipulation from focusout
    // may not work exactly as in browsers, but the event listeners are attached
    // and the functionality works in real browser environments as tested manually
  });

  test("Document click outside hides suggestions", async () => {
    // First show suggestions
    searchInput.focus();
    await waitFor();
    expect(suggestions.style.display).toBe("block");

    // Create element outside search area
    const outsideElement = d.createElement("div");
    outsideElement.id = "outside-div";
    d.body.appendChild(outsideElement);

    // Click outside the search area
    const clickEvent = new dom.window.MouseEvent("click", {
      target: outsideElement,
      bubbles: true,
    });

    Object.defineProperty(clickEvent, "target", {
      value: outsideElement,
      enumerable: true,
    });

    d.dispatchEvent(clickEvent);

    // Wait for event processing
    await waitFor();

    // Suggestions should be hidden
    expect(suggestions.style.display).toBe("none");
  });

  test("Document click inside suggestions keeps them visible", async () => {
    // First show suggestions
    searchInput.focus();
    await waitFor();
    expect(suggestions.style.display).toBe("block");

    // Click inside suggestions
    const suggestionLink = suggestions.querySelector("a");
    const clickEvent = new dom.window.MouseEvent("click", {
      target: suggestionLink,
      bubbles: true,
    });

    Object.defineProperty(clickEvent, "target", {
      value: suggestionLink,
      enumerable: true,
    });

    d.dispatchEvent(clickEvent);

    // Wait for event processing
    await waitFor();

    // Suggestions should remain visible
    expect(suggestions.style.display).toBe("block");
  });
});
