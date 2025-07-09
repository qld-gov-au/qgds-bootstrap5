import { expect, it, describe, test } from "vitest";
import { JSDOM } from "jsdom";
import { Accordion } from "./Accordion.js";
import mockData from "./accordion.data.json";

/**
 *
 * Test suite for the Accordion component.
 *
 * @fileoverview This file contains tests for the Accordion component using Vitest.
 *
 * @requires vitest
 * @requires ./Accordion.js
 * @requires ./accordion.data.json
 */

describe("Accordion", () => {
  const AccordionComponent = new Accordion(mockData);
  const dom = new JSDOM(`<!DOCTYPE html>${AccordionComponent.html}`, {
    runScripts: "dangerously",
    resources: "usable",
  });
  const d = dom.window.document;

  it("Renders as expected", () => {
    expect(AccordionComponent.html).toMatchSnapshot();
  });

  test("An expanded item collapses when clicked", async () => {
    const collapse = d.querySelector(".accordion-collapse.show");
    const button = collapse.parentElement.querySelector(".accordion-button");

    button.click();

    console.log(collapse.className);
    const isOpen = await new Promise((resolve) => {
      setTimeout(() => {
        console.log(collapse.className);
        resolve(!Array.from(collapse.classList).includes("show"));
      }, 300);
    });

    console.log(isOpen);
    expect(isOpen).toBe(true);
  });

  test("All items expand when open toggle button is clicked.", async () => {
    // Click the toggle all button
    d.querySelector(".accordion-toggle-btn").click();

    console.log();
    const isAllOpen = await new Promise((resolve) => {
      setTimeout(() => {
        const items = d.querySelectorAll(".accordion-item .accordion-collapse");

        // items is a NodeListOf<Element>, so convert to Array to run .every method
        const success = Array.from(items).every((item) => {
          // item.classList is a DomTokenList, so convert to Array to run .includes method (JSDom not helping us here.)
          return Array.from(item.classList).includes("show");
        });
        console.log(success);
        resolve(success);
      }, 500);
    });
    // expect all items to have "show" class
    expect(isAllOpen).toBe(true);
  });
});
