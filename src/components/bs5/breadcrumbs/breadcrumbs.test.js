import { expect, it, describe, test } from "vitest";
import { JSDOM } from "jsdom";
import { Breadcrumbs } from "./Breadcrumbs.js";
import mockData from "./breadcrumbs.data.json";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { waitForEventOn } from "../../../js/testingutils.js";

/**
 *
 * Test suite for the Breadcrumbs component.
 *
 * @fileoverview This file contains tests for the Breadcrumbs component using Vitest.
 *
 * @requires vitest
 * @requires ./Breadcrumbs.js
 * @requires ./breadcrumbs.data.json
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

describe("Breadcrumbs", async () => {
  const BreadcrumbsComponent = new Breadcrumbs(mockData.forGov);
  const dom = new JSDOM(
    `<!DOCTYPE html>${BreadcrumbsComponent.html}<script>${bootstrapJsFile}</script><script>${qldBootstrapJsFile}</script>`,
    {
      runScripts: "dangerously", // required to run scripts at all
    },
  );
  it("Renders as expected", () => {
    expect(BreadcrumbsComponent.html).toMatchSnapshot();
  });

  const d = dom.window.document;
  const window = dom.window;
  const updatedBreadcrumb = await waitForEventOn(
    window,
    "DOMContentLoaded",
    () => d.querySelector(".breadcrumb"),
  );

  it("Initialises the Breadcrumb component", () => {
    const breadcrumb = d.querySelector(".breadcrumb");
    expect(breadcrumb).toBeDefined();
    expect(
      breadcrumb.querySelectorAll(".breadcrumb-item").length,
    ).toBeGreaterThan(0);
    expect(breadcrumb.querySelector(".breadcrumb-toggle-link")).toBeDefined();
  });

  it("Initialises the Breadcrumb component with a max length of 5 with a sub menu vertical", () => {
    const breadcrumb = d.querySelector(".breadcrumb");
    const breadcrumbList = breadcrumb.querySelectorAll(".breadcrumb-item");
    expect(breadcrumbList.length).toBeGreaterThan(4);

    expect(updatedBreadcrumb.outerHTML).toMatchSnapshot();
    expect(breadcrumb.querySelector(".breadcrumb-vertical")).not.toBeNull();
  });

  it("Creates a toggle button for the breadcrumb", () => {
    const breadcrumb = d.querySelector(".breadcrumb");
    expect(breadcrumb).toBeDefined();
    const toggleButton = breadcrumb.querySelector(".breadcrumb-toggle-link");
    expect(toggleButton).toBeDefined();
    expect(toggleButton.getAttribute("aria-label")).toBe(
      "Expand the breadcrumbs",
    );
    expect(toggleButton.classList.contains("breadcrumb-toggle-link")).toBe(
      true,
    );
  });

  it("Expands the vertical breadcrumb when the toggle button is clicked", async () => {
    const breadcrumb = d.querySelector(".breadcrumb");
    const toggleButton = breadcrumb.querySelector(".breadcrumb-toggle-link");
    expect(toggleButton).toBeDefined();
    expect(toggleButton.getAttribute("aria-label")).toBe(
      "Expand the breadcrumbs",
    );
    const verticalMenu = d.querySelector(".breadcrumb-collapse-wrapper");
    expect(verticalMenu).toBeDefined();
    expect(toggleButton.parentElement.classList.contains("expanded")).toBe(
      false,
    );
    // Click the toggle button to expand the vertical menu.
    toggleButton.click();
    expect(toggleButton.parentElement.classList.contains("expanded")).toBe(
      true,
    );
  });

  test("An expanded menu collapses when clicked", async () => {
    const breadcrumb = d.querySelector(".breadcrumb");
    const toggleButton = breadcrumb.querySelector(".breadcrumb-toggle-link");
    expect(toggleButton).toBeDefined();
    expect(toggleButton.parentElement.classList.contains("expanded")).toBe(
      true,
    );
    toggleButton.click();

    expect(toggleButton.parentElement.classList.contains("expanded")).toBe(
      false,
    );
  });

  test("An expanded menu collapses when clicked outside of breadcrumbs", async () => {
    const breadcrumb = d.querySelector(".breadcrumb");
    const toggleButton = breadcrumb.querySelector(".breadcrumb-toggle-link");
    expect(toggleButton).toBeDefined();
    expect(toggleButton.parentElement.classList.contains("expanded")).toBe(
      false,
    );
    toggleButton.click();

    expect(toggleButton.parentElement.classList.contains("expanded")).toBe(
      true,
    );

    d.body.click();

    expect(toggleButton.parentElement.classList.contains("expanded")).toBe(
      false,
    );
  });
});
