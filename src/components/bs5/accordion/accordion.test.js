import { expect, it, describe, test } from "vitest";
import { JSDOM } from "jsdom";
import Handlebars from "handlebars";
import handlebarsHelpers from "../../../js/handlebars.helpers.js";
import { Accordion } from "./Accordion.js";
import mockData from "./accordion.data.json";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { waitForEventOn } from "../../../js/testingutils.js";

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

// Register Handlebars helpers before running tests
handlebarsHelpers(Handlebars);

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

  test("A collapsed item opens when Find in Page matches its content", async () => {
    const collapse = d.querySelector("#collapse-Two");
    const shown = waitForEventOn(collapse, "shown.bs.collapse", () => {
      return collapse.classList.contains("show");
    });

    expect(collapse.getAttribute("hidden")).toBe("until-found");

    collapse.dispatchEvent(new dom.window.Event("beforematch"));

    expect(await shown).toBe(true);
    expect(collapse.hasAttribute("hidden")).toBe(false);

    const hidden = waitForEventOn(collapse, "hidden.bs.collapse", () => {
      return collapse.getAttribute("hidden") === "until-found";
    });
    dom.window.bootstrap.Collapse.getInstance(collapse).hide();

    expect(await hidden).toBe(true);
  });

  test("Toggle-all button updates to 'Close all' when Find in Page opens every remaining panel", async () => {
    const toggleButton = d.querySelector(".accordion-toggle-btn");
    const collapseTwo = d.querySelector("#collapse-Two");
    const collapseThree = d.querySelector("#collapse-Three");

    expect(toggleButton.textContent).toBe("Open all");
    expect(toggleButton.getAttribute("aria-expanded")).toBe("false");
    expect(toggleButton.getAttribute("aria-controls")).toBe(
      Array.from(d.querySelectorAll(".accordion-collapse"))
        .map((el) => el.id)
        .join(" "),
    );

    const twoShown = waitForEventOn(collapseTwo, "shown.bs.collapse");
    collapseTwo.dispatchEvent(new dom.window.Event("beforematch"));
    await twoShown;

    // Not every panel is open yet, so the button should not have changed.
    expect(toggleButton.textContent).toBe("Open all");

    const threeShown = waitForEventOn(collapseThree, "shown.bs.collapse");
    collapseThree.dispatchEvent(new dom.window.Event("beforematch"));
    await threeShown;

    expect(toggleButton.textContent).toBe("Close all");
    expect(toggleButton.getAttribute("aria-expanded")).toBe("true");
    expect(toggleButton.classList.contains("accordion-toggle-btn--open")).toBe(
      true,
    );

    // Restore original state (only "One" expanded) for subsequent tests.
    const twoHidden = waitForEventOn(collapseTwo, "hidden.bs.collapse");
    const threeHidden = waitForEventOn(collapseThree, "hidden.bs.collapse");
    dom.window.bootstrap.Collapse.getInstance(collapseTwo).hide();
    dom.window.bootstrap.Collapse.getInstance(collapseThree).hide();
    await Promise.all([twoHidden, threeHidden]);

    expect(toggleButton.textContent).toBe("Open all");
    expect(toggleButton.getAttribute("aria-expanded")).toBe("false");
  });

  test("An expanded item collapses when clicked", async () => {
    const collapse = d.querySelector(".accordion-collapse.show");
    const button = collapse.parentElement.querySelector(".accordion-button");

    button.click();

    // There is a short animation before reaching the final state when class "show" is added.
    const isOpen = await waitForEventOn(collapse, "hidden.bs.collapse", () => {
      return Array.from(collapse.classList).includes("show");
    });

    expect(isOpen).toBe(false);
  });

  test("A collapsed item expands when clicked", async () => {
    const collapse = d.querySelector(".accordion-collapse:not(.show)");
    const button = collapse.parentElement.querySelector(".accordion-button");

    button.click();

    const isOpen = await waitForEventOn(collapse, "shown.bs.collapse", () =>
      Array.from(collapse.classList).includes("show"),
    );

    expect(isOpen).toBe(true);
  });

  test("All items expand when open toggle button is clicked.", async () => {
    const button = d.querySelector(".accordion-toggle-btn");

    // Once when the event has fired for all items, check all their classes.
    // We need to exclude already-open items with :not(.show) because they will not fire the shown event.
    const items = d.querySelectorAll(
      ".accordion-item .accordion-collapse:not(.show)",
    );

    const promises = Array.from(items).map((item) => {
      return waitForEventOn(item, "shown.bs.collapse", () => {
        return Array.from(item.classList).includes("show");
      });
    });

    button.click();

    const isOpenResults = await Promise.all(promises);
    const isAllOpen = isOpenResults.every((result) => result === true);

    expect(isAllOpen).toBe(true);
  });

  test("All items collapse when close toggle button is clicked.", async () => {
    // Click the toggle all button

    // Select only the items with .show to as only these will fire the "hidden" event
    const items = d.querySelectorAll(
      ".accordion-item .accordion-collapse.show",
    );

    const promises = Array.from(items).map((item) => {
      return waitForEventOn(item, "hidden.bs.collapse", () => {
        return !Array.from(item.classList).includes("show");
      });
    });

    d.querySelector(".accordion-toggle-btn").click();

    const isOpenResults = await Promise.all(promises);
    const isAllClosed = isOpenResults.every((result) => result === true);

    expect(isAllClosed).toBe(true);
  });
});

describe("Nested accordion groups", () => {
  const nestedAccordion = new Accordion({
    groupid: "nested-accordion",
    toggleAll: true,
    accordionItems: [
      {
        id: "Nested-One",
        title: "Nested accordion item",
        expanded: true,
        content: "<p>Nested content</p>",
      },
    ],
  });
  const outerAccordion = new Accordion({
    groupid: "outer-accordion",
    toggleAll: true,
    accordionItems: [
      {
        id: "Outer-One",
        title: "Outer accordion item",
        expanded: true,
        content: nestedAccordion.html,
      },
    ],
  });
  const dom = new JSDOM(
    `<!DOCTYPE html>${outerAccordion.html}<script>${bootstrapJsFile}</script><script>${qldBootstrapJsFile}</script>`,
    {
      runScripts: "dangerously",
    },
  );
  const d = dom.window.document;

  test("Hiding a nested item does not hide its expanded parent item", async () => {
    const outerCollapse = d.querySelector("#collapse-Outer-One");
    const nestedCollapse = d.querySelector("#collapse-Nested-One");
    const nestedHidden = waitForEventOn(nestedCollapse, "hidden.bs.collapse");

    dom.window.bootstrap.Collapse.getOrCreateInstance(nestedCollapse).hide();

    await nestedHidden;

    expect(nestedCollapse.getAttribute("hidden")).toBe("until-found");
    expect(outerCollapse.hasAttribute("hidden")).toBe(false);
    expect(outerCollapse.classList.contains("show")).toBe(true);
  });

  test("The outer toggle-all button only changes its own accordion group", async () => {
    const outerToggle = d.querySelector(
      "#outer-accordion",
    ).previousElementSibling.firstElementChild;
    const outerCollapse = d.querySelector("#collapse-Outer-One");
    const nestedCollapse = d.querySelector("#collapse-Nested-One");
    const nestedShown = waitForEventOn(nestedCollapse, "shown.bs.collapse");

    dom.window.bootstrap.Collapse.getOrCreateInstance(nestedCollapse).show();
    await nestedShown;

    outerToggle.click();

    const outerHidden = waitForEventOn(outerCollapse, "hidden.bs.collapse");

    outerToggle.click();
    await outerHidden;

    expect(outerCollapse.classList.contains("show")).toBe(false);
    expect(nestedCollapse.classList.contains("show")).toBe(true);
    expect(
      d
        .querySelector("#nested-accordion")
        .previousElementSibling.firstElementChild.classList.contains(
          "accordion-toggle-btn--open",
        ),
    ).toBe(true);
  });
});

describe("Nested accordion groups without toggle-all buttons", () => {
  const nestedAccordion = new Accordion({
    groupid: "nested-accordion-without-toggle-all",
    toggleAll: false,
    accordionItems: [
      {
        id: "Nested-Without-Toggle-All",
        title: "Nested accordion item",
        expanded: true,
        content: "<p>Nested content</p>",
      },
    ],
  });
  const outerAccordion = new Accordion({
    groupid: "outer-accordion-without-toggle-all",
    toggleAll: false,
    accordionItems: [
      {
        id: "Outer-Without-Toggle-All",
        title: "Outer accordion item",
        expanded: true,
        content: nestedAccordion.html,
      },
    ],
  });
  const dom = new JSDOM(
    `<!DOCTYPE html>${outerAccordion.html}<script>${bootstrapJsFile}</script><script>${qldBootstrapJsFile}</script>`,
    {
      runScripts: "dangerously",
    },
  );
  const d = dom.window.document;

  test("Hiding a nested item does not hide its expanded parent item", async () => {
    const outerCollapse = d.querySelector(
      "#collapse-Outer-Without-Toggle-All",
    );
    const nestedCollapse = d.querySelector(
      "#collapse-Nested-Without-Toggle-All",
    );
    const nestedHidden = waitForEventOn(nestedCollapse, "hidden.bs.collapse");

    dom.window.bootstrap.Collapse.getOrCreateInstance(nestedCollapse).hide();

    await nestedHidden;

    expect(nestedCollapse.getAttribute("hidden")).toBe("until-found");
    expect(outerCollapse.hasAttribute("hidden")).toBe(false);
    expect(outerCollapse.classList.contains("show")).toBe(true);
  });
});
