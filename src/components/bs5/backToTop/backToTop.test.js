import { afterEach, describe, expect, it, vi } from "vitest";
import { JSDOM } from "jsdom";
import { BackToTop } from "./backToTop.js";
import { backToTop as initBackToTop } from "./backToTop.functions.js";

import mockData from "./backToTop.data.json";

import Handlebars from "handlebars";
import handlebarsInit from "../../../js/handlebars.init.js";
handlebarsInit(Handlebars);

/**
 * Test suite for the BackToTop component.
 *
 * @fileoverview This file contains tests for the BackToTop component using Vitest.
 * Focuses on testing the DOM structure, JSON data handling, scrolling and hide/show functionality.
 *
 * @requires vitest
 * @requires ./backToTop.js
 * @requires ./backToTop.functions.js
 * @requires ./backToTop.data.json
 *
 */

describe("Back To Top", () => {
  let dom;

  afterEach(() => {
    vi.unstubAllGlobals();
    dom?.window.close();
  });

  it("Renders as expected", () => {
    const backToTop = new BackToTop({
      ...mockData,
      directionalLink: {
        ...mockData.directionalLink,
        href: "https://example.test/",
      },
    });

    expect(backToTop.html).toContain('class="back-to-top');
    expect(backToTop.html).toContain('class="qld-dir-link');
    expect(backToTop.html).toContain('href="https://example.test/"');
  });

  it("Accepts a custom label and href", () => {
    const backToTop = new BackToTop({
      ...mockData,
      directionalLink: {
        ...mockData.directionalLink,
        label: "Start of page",
        href: "https://example.test/custom",
      },
    });

    expect(backToTop.html).toContain("Start of page");
    expect(backToTop.html).toContain('href="https://example.test/custom"');
  });

  // Confirms activation resets scrolling and prevents link navigation.
  it("scrolls to the top when activated", () => {
    dom = new JSDOM(new BackToTop(mockData).html, {
      url: "https://example.test/",
    });
    const { document, MouseEvent } = dom.window;
    const link = document.querySelector(".back-to-top .qld-dir-link");

    expect(link).not.toBeNull();
    document.body.scrollTop = 100;
    document.documentElement.scrollTop = 100;
    vi.stubGlobal("document", document);
    initBackToTop();

    const click = new MouseEvent("click", { bubbles: true, cancelable: true });
    link.dispatchEvent(click);

    expect(document.body.scrollTop).toBe(0);
    expect(document.documentElement.scrollTop).toBe(0);
    expect(click.defaultPrevented).toBe(true);
  });

  // Confirms it can be hidden with the hide_back_to_top property.
  it("Can be hidden when hide_back_to_top is true", () => {
    const backToTop = new BackToTop({
      ...mockData,
      hide_back_to_top: true,
    });

    expect(backToTop.html).toBe("");
  });
});
