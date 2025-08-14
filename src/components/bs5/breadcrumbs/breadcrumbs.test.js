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

describe("Breadcrumbs", () => {
  const BreadcrumbsComponent = new Breadcrumbs(mockData.forGov);
  const dom = new JSDOM(
    `<!DOCTYPE html>${BreadcrumbsComponent.html}<script>${bootstrapJsFile}</script><script>${qldBootstrapJsFile}</script>`,
    {
      runScripts: "dangerously", // required to run scripts at all
    },
  );
  const d = dom.window.document;

  it("Renders as expected", () => {
    expect(BreadcrumbsComponent.html).toMatchSnapshot();
  });

  /* test("An expanded breadcrumb collapses when focussed out", async () => {
    const breadcrumbWrapper = d.querySelector(".breadcrumb");
    const toggleLink = d.querySelector(".breadcrumb-toggle-link");

    toggleLink.click();

    // There is a short animation before reaching the final state when max height is at 100%.
    const isOpen = await waitForEventOn(
      breadcrumbWrapper,
      "hidden.bs.collapse",
      () => {
        return Array.from(breadcrumbWrapper.innerHeight > 0);
      },
    );

    expect(isOpen).toBe(false);
  }); */

  test("Breadcrumb toggle link expands into a menu when focussed", async () => {
    const toggleLink = d.querySelector(".breadcrumb-toggle-link");

    //toggleLink.click();

    /* const isOpen = await waitForEventOn(collapse, "shown.bs.collapse", () =>
      Array.from(collapse.classList).includes("show"),
    );

    expect(isOpen).toBe(true); */
  });
});
