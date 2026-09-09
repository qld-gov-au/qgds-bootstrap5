import { describe, expect, it } from "vitest";
import { JSDOM } from "jsdom";
import Handlebars from "handlebars";
import handlebarsInit from "../../../js/handlebars.init.js";
import { Footer } from "./Footer.js";
import defaultData from "./footer.data.json";

/**
 *
 * Test suite for the Footer component.
 *
 * @fileoverview This file contains tests for the Footer component using Vitest.
 *
 * @requires vitest
 * @requires ./Footer.js
 * @requires ./footer.data.json
 */

handlebarsInit(Handlebars);

describe("Footer", () => {
  it("renders footer element", () => {
    const { document } = new JSDOM(new Footer(defaultData).html).window;
    const footer = document.querySelector("footer.qld-footer");

    expect(footer).not.toBeNull();
  });

  it("applies footer variant class", () => {
    const { document } = new JSDOM(
      new Footer({ ...defaultData, variantClass: "dark" }).html,
    ).window;
    const footer = document.querySelector("footer");

    expect(footer.classList.contains("dark")).toBe(true);
  });

  it("renders the site name heading only when a sitename is supplied", () => {
    const withSitename = new JSDOM(new Footer({ sitename: "My Site" }).html)
      .window.document;
    expect(withSitename.querySelector("h2.footer-site-name").textContent).toBe(
      "My Site",
    );

    const withoutSitename = new JSDOM(new Footer({}).html).window.document;
    expect(withoutSitename.querySelector("h2.footer-site-name")).toBeNull();
  });

  describe("contact list", () => {
    it("renders a custom contact list, falling back to phone/email defaults", () => {
      const custom = new JSDOM(
        new Footer({
          contact: {
            showList: true,
            list: {
              fax: { icon: "qld-icon-fax", label: "<b>Fax:</b> 07 1234 5678" },
            },
          },
        }).html,
      ).window.document;
      expect(custom.querySelector(".footer-contact-fax")).not.toBeNull();
      expect(custom.querySelector(".footer-contact-phone")).toBeNull();

      const fallback = new JSDOM(new Footer({}).html).window.document;
      expect(fallback.querySelector(".footer-contact-phone")).not.toBeNull();
      expect(fallback.querySelector(".footer-contact-email")).not.toBeNull();
    });

    it("omits the contact list entirely when contact.showList is false", () => {
      const { document } = new JSDOM(
        new Footer({ contact: { showList: false } }).html,
      ).window;

      expect(document.querySelector(".footer-contact-phone")).toBeNull();
      expect(document.querySelector(".footer-contact-email")).toBeNull();
      expect(document.querySelectorAll(".footer-contact-item").length).toBe(0);
    });
  });

  describe("site links column", () => {
    it("renders a custom site links list, falling back to the default list", () => {
      const custom = new JSDOM(
        new Footer({
          footerLinks: {
            title: "Custom links",
            list: [
              {
                label: "Example",
                link: "https://example.com",
                target: "_blank",
              },
            ],
          },
        }).html,
      ).window.document;
      const link = custom.querySelector(".footer-link-list .nav-link");

      expect(link.textContent.trim()).toBe("Example");
      expect(link.getAttribute("href")).toBe("https://example.com");
      expect(link.getAttribute("target")).toBe("_blank");

      const fallback = new JSDOM(new Footer({}).html).window.document;
      expect(
        Array.from(
          fallback.querySelectorAll(".footer-link-list .nav-link"),
        ).some((a) => a.textContent.trim() === "Help"),
      ).toBe(true);
    });
  });

  describe("optional columns", () => {
    it("omits an optional column 1 when it has no content or links enabled", () => {
      const { document } = new JSDOM(new Footer({ optionalColumn1: {} }).html)
        .window;

      expect(document.querySelector(".optional-column-1")).toBeNull();
    });

    it("renders an optional column 1 title and follow/custom links per flags", () => {
      const { document } = new JSDOM(
        new Footer({
          optionalColumn1: {
            title: "Get social",
            showFollowLinks: true,
            showCustomLinks: false,
          },
          followLinks: [{ label: "Facebook", link: "#", icon: "facebook" }],
        }).html,
      ).window;
      const column = document.querySelector(".optional-column-1");

      expect(column.querySelector("h3").textContent.trim()).toBe("Get social");
      expect(column.querySelector(".footer-link-list--social")).not.toBeNull();
      expect(column.querySelector(".footer-link-list--custom")).toBeNull();
    });
  });

  describe("acknowledgements", () => {
    it("renders a default acknowledgement statement when none is supplied", () => {
      const { document } = new JSDOM(new Footer({}).html).window;

      expect(
        document.querySelector(".footer-acknowledgements p").textContent,
      ).toContain("Aboriginal and Torres Strait Islander");
    });

    it("renders custom acknowledgements when supplied", () => {
      const { document } = new JSDOM(
        new Footer({
          acknowledgements: [
            { title: "Custom title", content: "<p>Custom content</p>" },
          ],
        }).html,
      ).window;
      const section = document.querySelector(".footer-acknowledgements");

      expect(section.querySelector("h3").textContent.trim()).toBe(
        "Custom title",
      );
      expect(section.textContent).toContain("Custom content");
    });
  });

  describe("footer logo", () => {
    it("renders a custom logo image over the default crest when a src is set", () => {
      const { document } = new JSDOM(
        new Footer({
          footerLogo: { show: true, src: "/logo.png", alt: "Logo" },
        }).html,
      ).window;
      const img = document.querySelector(".footer-logo img");

      expect(img.getAttribute("src")).toBe("/logo.png");
      expect(document.querySelector(".footer-crest")).toBeNull();
    });

    it("omits the logo entirely when footerLogo.show is false", () => {
      const { document } = new JSDOM(
        new Footer({ footerLogo: { show: false } }).html,
      ).window;

      expect(document.querySelector(".footer-logo")).toBeNull();
      expect(document.querySelector(".footer-crest")).toBeNull();
    });
  });

  describe("copyright and organisation link", () => {
    it("renders default copyright text and honours showYearFrom", () => {
      const currentYear = new Date().getFullYear().toString();

      const fallback = new JSDOM(new Footer({}).html).window.document;
      expect(fallback.querySelector(".copyright").textContent).toContain(
        currentYear,
      );

      const withRange = new JSDOM(
        new Footer({
          copyright: {
            content: "&copy; Custom Org",
            showYearFrom: true,
            yearFrom: "1995",
          },
        }).html,
      ).window.document;
      expect(withRange.querySelector(".copyright").textContent).toContain(
        "1995 -",
      );
    });

    it("renders the organisation link by default and hides it when show is false", () => {
      const withDefault = new JSDOM(
        new Footer({ organisationLink: { show: true } }).html,
      ).window.document;
      const defaultLink = withDefault.querySelector('a[rel="external"]');
      expect(defaultLink.getAttribute("href")).toBe("https://www.qld.gov.au");
      expect(defaultLink.textContent.trim()).toBe("Queensland Government");

      const hidden = new JSDOM(
        new Footer({ organisationLink: { show: false } }).html,
      ).window.document;
      expect(hidden.querySelector('a[rel="external"]')).toBeNull();
    });
  });

  /** Accessibility audit 2026 July: QGDS-1186 and QGDS-1201 */
  describe("accessibility audit: column headings", () => {
    describe("optional column 1", () => {
      it("renders provided title as the heading and references it from the nav", () => {
        const { document } = new JSDOM(
          new Footer({
            ...defaultData,
            optionalColumn1: {
              ...defaultData.optionalColumn1,
              title: "Column 1 heading",
            },
          }).html,
        ).window;
        const nav = document.querySelector(
          'nav[aria-labelledby="footer-optional-column-1-heading"]',
        );
        const heading = document.getElementById(
          "footer-optional-column-1-heading",
        );

        expect(heading).not.toBeNull();
        expect(heading.tagName).toBe("H3");
        expect(heading.textContent.trim()).toBe("Column 1 heading");
        expect(nav.contains(heading)).toBe(true);
      });

      it("falls back to a visually-hidden heading when no title is supplied", () => {
        const { document } = new JSDOM(
          new Footer({ optionalColumn1: { showCustomLinks: true } }).html,
        ).window;
        const heading = document.getElementById(
          "footer-optional-column-1-heading",
        );

        expect(heading.textContent.trim()).toBe("Footer links");
        expect(heading.classList.contains("sr-only")).toBe(true);
      });
    });

    describe('"Site links" / "Footer navigation" column', () => {
      it("renders provided title as the heading and references it from the nav", () => {
        const { document } = new JSDOM(new Footer(defaultData).html).window;
        const nav = document.querySelector(
          'nav[aria-labelledby="footer-wog-links-heading"]',
        );
        const heading = document.getElementById("footer-wog-links-heading");

        expect(heading).not.toBeNull();
        expect(heading.tagName).toBe("H3");
        expect(nav.contains(heading)).toBe(true);
      });

      it("falls back to a visually-hidden heading when no title is supplied", () => {
        const { document } = new JSDOM(new Footer({}).html).window;
        const heading = document.getElementById("footer-wog-links-heading");

        expect(heading.textContent.trim()).toBe("Site links");
        expect(heading.classList.contains("sr-only")).toBe(true);
      });
    });

    describe("optional column 2", () => {
      it("renders provided title as the heading and references it from the nav", () => {
        const { document } = new JSDOM(
          new Footer({
            ...defaultData,
            optionalColumn2: {
              ...defaultData.optionalColumn2,
              title: "Follow us",
            },
          }).html,
        ).window;
        const nav = document.querySelector(
          'nav[aria-labelledby="footer-optional-column-2-heading"]',
        );
        const heading = document.getElementById(
          "footer-optional-column-2-heading",
        );

        expect(heading).not.toBeNull();
        expect(heading.tagName).toBe("H3");
        expect(heading.textContent.trim()).toBe("Follow us");
        expect(nav.contains(heading)).toBe(true);
      });

      it("falls back to a visually-hidden heading when no title is supplied", () => {
        const { document } = new JSDOM(
          new Footer({ optionalColumn2: { showFollowLinks: true } }).html,
        ).window;
        const heading = document.getElementById(
          "footer-optional-column-2-heading",
        );

        expect(heading.textContent.trim()).toBe("Footer links");
        expect(heading.classList.contains("sr-only")).toBe(true);
      });
    });
  });

  // Audit 40: "Facebook" / "LinkedIn" / "Instagram" should not be repeated as screen reader only text - on the Follow Us section.
  describe("accessibility audit: follow links", () => {
    it("uses accessibleLabel for follow link's aria-label and falls back to the visible label", () => {
      const { document } = new JSDOM(
        new Footer({
          optionalColumn1: { showFollowLinks: true },
          followLinks: [
            {
              label: "Facebook",
              accessibleLabel: "Visit our Facebook page",
              link: "#",
              icon: "facebook",
            },
            { label: "Youtube", link: "#", icon: "youtube" },
          ],
        }).html,
      ).window;
      const links = document.querySelectorAll(
        ".footer-link-list--social .nav-link",
      );

      const facebookLink = links[0];
      // aria-label should be set to the accessibleLabel
      expect(facebookLink.getAttribute("aria-label")).toBe(
        "Visit our Facebook page",
      );
      // icon is hidden from screen reader
      expect(
        facebookLink.querySelector(".qld-icon").getAttribute("aria-hidden"),
      ).toBe("true");

      const youtubeLink = links[1];
      // aria-label should fallback to visible label when accessibleLabel is not provided
      expect(youtubeLink.getAttribute("aria-label")).toBe("Youtube");
    });
  });
});
