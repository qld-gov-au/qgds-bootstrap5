import { describe, expect, it } from "vitest";
import Handlebars from "handlebars";
import handlebarsInit from "../../../js/handlebars.init.js";
import { Callout } from "./Callout.js";

handlebarsInit(Handlebars);

const normaliseHtml = (html) => html.replace(/\s+/g, " ").trim();

describe("Callout", () => {
  it("renders a aria-labelledby tag when a title and ID are provided", () => {
    const callout = new Callout({
      id: "callout-test",
      title: "Callout title",
      content: "Callout content",
    });
    const normalisedHtml = normaliseHtml(callout.html);

    expect(normalisedHtml).toContain(`aria-labelledby="callout-test"`);
    expect(normalisedHtml).toContain(
      '<h3 class="callout-title" id="callout-test">Callout title</h3>',
    );
  });

  it("renders an aria-label tag when no explicit id is provided", () => {
    const callout = new Callout({
      title: "Callout title",
      ariaLabel: "Important callout",
      content: "Callout content",
    });
    const normalisedHtml = normaliseHtml(callout.html);

    expect(normalisedHtml).toContain(`aria-label="Important callout"`);
    expect(normalisedHtml).toContain(
      '<h3 class="callout-title">Callout title</h3>',
    );
    expect(normalisedHtml).not.toContain("aria-labelledby");
  });
});
