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
  const dom = new JSDOM(`<!DOCTYPE html>${AccordionComponent.html}`);
  const d = dom.window.document;

  it("Renders as expected", () => {
    expect(AccordionComponent.html).toMatchSnapshot();
  });

  test("An expanded item collapses when clicked", async () => {
    const collapse = d.querySelector(".accordion-collapse.show");
    // const item = d.querySelector(".accordion-item");
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

  // test("All items expand when open toggle button is clicked.", () =>
  //   new Promise((done) => {
  //     // Click the toggle all button
  //     d.querySelector(".accordion-toggle-btn").click();

  //     // wait 100ms
  //     setTimeout(() => {
  //       const items = d.querySelectorAll(".accordion-item .accordion-collapse");

  //       // expect all items to have "show" class
  //       expect(
  //         // items is a NodeListOf<Element>, so convert to Array to run .every method
  //         Array.from(items).every((item) => {
  //           // item.classList is a DomTokenList, so convert to Array to run .includes method (JSDom not helping us here.)
  //           const ret = Array.from(item.classList).includes("show");
  //           return ret;
  //         }),
  //       ).toBe(true);

  //       done();
  //     }, 500);
  //   }));
});
