import { describe, expect, it } from "vitest";
import { JSDOM } from "jsdom";
import { Blockquote } from "./Blockquote.js";
import mockData from "./blockquote.data.json";
import Handlebars from "handlebars";
import handlebarsInit from "../../../js/handlebars.init.js";

handlebarsInit(Handlebars);

/**
 * Test suite for the Blockquote component.
 * Focuses on the component's rendered DOM structure and content.
 */

describe("Blockquote", () => {
  // Ensures quoted content, citation URL, and attribution appear in the expected structure.
  it("renders quote text and attribution", () => {
    const data = {
      ...mockData,
      "cite-url": "https://www.w3.org/People/Berners-Lee/",
    };
    const document = JSDOM.fragment(new Blockquote(data).html);
    const figure = document.querySelector("figure.blockquote");
    const quote = figure?.querySelector("blockquote");
    const attribution = figure?.querySelector("figcaption.quote-source");

    expect(figure).not.toBeNull();
    expect(quote?.textContent).toContain(
      "The goal of the Web is to serve humanity",
    );
    expect(quote?.getAttribute("cite")).toBe(data["cite-url"]);
    expect(attribution?.textContent.trim()).toBe("Sir Tim Berners-Lee");
  });

  // Ensures an empty citation URL does not leave an empty cite attribute.
  it("omits the cite attribute when cite-url is empty", () => {
    const data = {
      ...mockData,
      "cite-url": "",
    };
    const document = JSDOM.fragment(new Blockquote(data).html);
    const quote = document.querySelector("blockquote");

    expect(quote?.hasAttribute("cite")).toBe(false);
  });

  // Ensures a custom class is attached to the component's figure element.
  it("applies custom class to figure element", () => {
    const customClass = "custom-blockquote-class";
    const data = {
      ...mockData,
      classes: customClass,
    };
    const document = JSDOM.fragment(new Blockquote(data).html);
    const figure = document.querySelector("figure.blockquote");

    expect(figure?.classList.contains(customClass)).toBe(true);
  });
});
