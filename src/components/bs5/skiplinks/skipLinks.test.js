import { expect, describe, test } from "vitest";
import { JSDOM, VirtualConsole } from "jsdom";
import { SkipLinks } from "./SkipLinks.js";
import defaultData from "./skipLinks.data.json";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { waitForEventOn } from "../../../js/testingutils.js";

/**
 *
 * Test suite for the Skip Links component.
 *
 * @fileoverview This file contains tests for the Skip Links component using Vitest.
 *
 * @requires vitest
 * @requires ./SkipLinks.js
 * @requires ./skiplinks.data.json
 * @requires /dist/assets/js/qld.bootstrap.min.js
 */

const __dirname = dirname(fileURLToPath(import.meta.url));
const qldBootstrapJsFile = fs.readFileSync(
  `${__dirname}/../../../../dist/assets/js/qld.bootstrap.min.js`,
  "utf-8",
);

describe("Skip Links", () => {
  let skipLinks;

  test("Skip Links renders as expected", () => {
    skipLinks = new SkipLinks(defaultData);
    expect(skipLinks.html).toMatchSnapshot();
  });

  test("Skip links log incorrectly assigned links as errors.", async () => {
    skipLinks = new SkipLinks({
      skipLinks: [
        ...defaultData.skipLinks,
        { targetId: "i-dont-exist", label: "Skip to nowhere" },
        { targetId: "unfocusable", label: "Skip to unfocusable" },
      ],
    });

    const virtualConsole = new VirtualConsole();
    const errorMessages = [];
    virtualConsole.on("error", (message) => {
      errorMessages.push(message);
    });

    const dom = new JSDOM(
      `<!DOCTYPE html>
        ${skipLinks.html}
        <nav id="main-nav" tabindex="-1"></nav>
        <main id="content" tabindex="-1"></main>
        <div id="unfocusable" ></div>
        <script>${qldBootstrapJsFile}</script>`,
      {
        runScripts: "dangerously",
        virtualConsole,
        url: "https://example.org/",
      },
    );

    const { window } = dom;

    const resolvedMessages = await waitForEventOn(
      window,
      "DOMContentLoaded",
      () => errorMessages,
    );

    expect(resolvedMessages).toEqual([
      'A skip link with label "Skip to nowhere" is targeting a non-existent element with id "i-dont-exist".',
    ]);

    // JSDOM does not implement navigation so must manual test for main functionality
  });
});
