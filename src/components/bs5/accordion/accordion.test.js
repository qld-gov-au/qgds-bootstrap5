import { expect, it, describe, test } from "vitest";
import { JSDOM } from "jsdom";
import { Accordion } from "./Accordion.js";
import mockData from "./accordion.data.json";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

/**
 *
 * Test suite for the Accordion component.
 *
 * @fileoverview This file contains tests for the Accordion component using Vitest.
 *
 * @requires vitest
 * @requires ./Accordion.js
 * @requires ./accordion.data.json
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

describe("Accordion", () => {
  const AccordionComponent = new Accordion(mockData);
  const dom = new JSDOM(
    `<!DOCTYPE html>${AccordionComponent.html}<script>${bootstrapJsFile}</script><script>${qldBootstrapJsFile}</script>`,
    {
      runScripts: "dangerously", // required to run scripts at all
    },
  );
  const d = dom.window.document;

  it("Renders as expected", () => {
    expect(AccordionComponent.html).toMatchSnapshot();
  });

  test("An expanded item collapses when clicked", async () => {
    const collapse = d.querySelector(".accordion-collapse.show");
    const button = collapse.parentElement.querySelector(".accordion-button");

    button.click();

    // There is a short animation before reaching the final state when class "show" is added.
    const isOpen = await new Promise((resolve) => {
      collapse.addEventListener("hidden.bs.collapse", function handler() {
        console.log("Collapse!");
        resolve(Array.from(collapse.classList).includes("show"));
        collapse.removeEventListener("hidden.bs.collapse", handler);
      });
    });

    expect(isOpen).toBe(false);
  });

  test("A collapsed item expands when clicked", async () => {
    const collapse = d.querySelector(".accordion-collapse:not(.show)");
    const button = collapse.parentElement.querySelector(".accordion-button");

    button.click();

    const isOpen = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(Array.from(collapse.classList).includes("show"));
      }, 300);
    });

    expect(isOpen).toBe(true);
  });

  test("All items expand when open toggle button is clicked.", async () => {
    const button = d.querySelector(".accordion-toggle-btn");
    button.click();

    // isAllOpen = true if every item includes the class "show";
    const isAllOpen = await new Promise((resolve) => {
      setTimeout(() => {
        const items = d.querySelectorAll(".accordion-item .accordion-collapse");

        resolve(
          // items is a NodeListOf<Element>, so convert to Array to run .every method
          Array.from(items).every((item) => {
            // item.classList is a DomTokenList, so convert to Array to run .includes method (JSDom not helping us here.)
            return Array.from(item.classList).includes("show");
          }),
        );
      }, 300);
    });
    // expect all items to have "show" class
    expect(isAllOpen).toBe(true);
  });

  test("All items collapse when close toggle button is clicked.", async () => {
    // Click the toggle all button
    d.querySelector(".accordion-toggle-btn").click();

    // isAllClosed = true if no item includes class "show"
    const isAllClosed = await new Promise((resolve) => {
      setTimeout(() => {
        const items = d.querySelectorAll(".accordion-item .accordion-collapse");

        resolve(
          // items is a NodeListOf<Element>, so convert to Array to run .every method
          Array.from(items).every((item) => {
            // item.classList is a DomTokenList, so convert to Array to run .includes method (JSDom not helping us here.)
            return !Array.from(item.classList).includes("show");
          }),
        );
      }, 300);
    });

    expect(isAllClosed).toBe(true);
  });
});
