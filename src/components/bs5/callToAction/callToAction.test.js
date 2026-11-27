import { describe, expect, it } from "vitest";
import { JSDOM } from "jsdom";
import { CallToAction } from "./callToAction.js";
import mockData from "./callToAction.data.json";

import Handlebars from "handlebars";
import handlebarsInit from "../../../js/handlebars.init.js";

handlebarsInit(Handlebars);

/**
 * Test suite for the Call To Action component.
 * Focuses on the component's rendered DOM structure and JSON handling.
 *
 * @requires vitest
 * @requires jsdom
 * @requires ./callToAction.js
 * @requires ./callToAction.data.json
 */

describe("CallToAction", () => {
  // Ensures the primary action has the configured destination and visible label.
  it("renders the CTA label and destination", () => {
    const document = JSDOM.fragment(new CallToAction(mockData).html);
    const link = document.querySelector("a.qld-cta-link");

    expect(link).not.toBeNull();
    expect(link?.getAttribute("aria-label")).toBe(mockData["arialabel"]);
    expect(link?.textContent.trim()).toBe(mockData["label"]);
    expect(link?.getAttribute("href")).toBe(mockData["href"]);
  });

  // Accepts an ID property and applies it to the rendered anchor element.
  it("applies the provided ID to the anchor element", () => {
    const id = "test-cta-id";
    const document = JSDOM.fragment(new CallToAction({ ...mockData, id }).html);
    const link = document.querySelector("a.qld-cta-link");

    expect(link).not.toBeNull();
    expect(link?.getAttribute("id")).toBe(id);
  });

  // Accepts an array of class objects and applies them to the rendered anchor element.
  it("renders a small CTA with the provided class", () => {
    const document = JSDOM.fragment(
      new CallToAction({
        ...mockData,
        class: [{ small: true }, { "view-all": false }],
      }).html,
    );

    const link = document.querySelector("a.qld-cta-link");

    expect(link).not.toBeNull();
    expect(link?.classList.contains("small")).toBe(true);
    expect(link?.classList.contains("view-all")).toBe(false);
  });
});
