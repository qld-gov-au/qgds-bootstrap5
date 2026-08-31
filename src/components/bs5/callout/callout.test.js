import { describe, expect, it } from "vitest";
import Handlebars from "handlebars";
import handlebarsInit from "../../../js/handlebars.init.js";
import { Callout } from "./Callout.js";

handlebarsInit(Handlebars);

const normaliseHtml = (html) => html.replace(/\s+/g, " ").trim();

describe("Callout", () => {
  it("renders a labeled region when a title is provided", () => {
    const callout = new Callout({
      id: "callout-test",
      title: "Callout title",
      content: "Callout content",
    });
    const normalisedHtml = normaliseHtml(callout.html);

    expect(normalisedHtml).toMatch(
      /<div class="callout" role="region" aria-labelledby="callout-test"\s*>/,
    );
    expect(normalisedHtml).toContain(
      '<h3 class="callout-title" id="callout-test">Callout title</h3>',
    );
  });

  it("renders an aria-label region when no explicit id is provided", () => {
    const callout = new Callout({
      title: "Callout title",
      ariaLabel: "Important callout",
      content: "Callout content",
    });
    const normalisedHtml = normaliseHtml(callout.html);

    expect(normalisedHtml).toMatch(
      /<div class="callout" role="region" aria-label="Important callout"\s*>/,
    );
    expect(normalisedHtml).toContain(
      '<h3 class="callout-title">Callout title</h3>',
    );
    expect(normalisedHtml).not.toContain("aria-labelledby");
  });

  it("does not render a region label when the title has no explicit id or aria-label", () => {
    const callout = new Callout({
      title: "Callout title",
      content: "Callout content",
    });
    const normalisedHtml = normaliseHtml(callout.html);

    expect(normalisedHtml).toContain('<div class="callout" >');
    expect(normalisedHtml).toContain(
      '<h3 class="callout-title">Callout title</h3>',
    );
    expect(normalisedHtml).not.toContain('role="region"');
    expect(normalisedHtml).not.toContain("aria-labelledby");
    expect(normalisedHtml).not.toContain("aria-label");
  });

  it("does not render a region label when the title is absent", () => {
    const callout = new Callout({
      id: "callout-no-title",
      content: "Callout content",
    });
    const normalisedHtml = normaliseHtml(callout.html);

    expect(normalisedHtml).toContain('<div class="callout" >');
    expect(normalisedHtml).not.toContain('role="region"');
    expect(normalisedHtml).not.toContain("aria-labelledby");
    expect(normalisedHtml).not.toContain("aria-label");
  });
});
