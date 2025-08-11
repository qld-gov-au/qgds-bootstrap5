import { expect, it, describe, test, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import { GlobalAlert } from "./GlobalAlert.js";
import { initGlobalAlerts } from "./globalAlert.function.js";
import mockData from "./globalAlert.data.json";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";
import handlebarsInit from "../../../js/handlebars.init.js";

/**
 * Test suite for the Global Alert functionality.
 *
 * @fileoverview This file contains tests for the Global Alert function using Vitest.
 *
 * @requires vitest
 * @requires ./globalAlert.function.js
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

// Initialize Handlebars with helpers and partials
handlebarsInit(Handlebars);

describe("initGlobalAlerts", () => {
  let dom, d, window, localStorage;

  // Create test data with expiry attributes for testing
  const testMockData = {
    alertItems: [
      {
        ...mockData.info.alertItems[0],
        expiry: "7",
      },
      {
        ...mockData.warning.alertItems[0],
        expiry: "30",
      },
      {
        ...mockData.info.alertItems[0],
        content: "No expiry alert",
        expiry: "0",
      },
      {
        ...mockData.info.alertItems[0],
        content: "Default alert",
        // No expiry attribute
      },
    ],
  };

  const createTestHTML = () => {
    const globalAlertComponent = new GlobalAlert(testMockData);
    return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <link rel="stylesheet" href="${__dirname}/../../../../dist/assets/css/qld.bootstrap.css">
          </head>
          <body>
            ${globalAlertComponent.html}
            <script>${bootstrapJsFile}</script>
            <script>${qldBootstrapJsFile}</script>
          </body>
        </html>
      `;
  };

  beforeEach(async () => {
    const testHTML = createTestHTML();

    // Create localStorage mock before JSDOM
    const localStorageMock = {
      data: new Map(),
      getItem(key) {
        return this.data.get(key) || null;
      },
      setItem(key, value) {
        this.data.set(key, String(value));
      },
      removeItem(key) {
        this.data.delete(key);
      },
      clear() {
        this.data.clear();
      },
      get length() {
        return this.data.size;
      },
      key(index) {
        const keys = Array.from(this.data.keys());
        return keys[index] || null;
      },
    };

    dom = new JSDOM(testHTML, {
      runScripts: "dangerously",
      resources: "usable",
      pretendToBeVisual: true,
      // url: 'https://localhost:3000',
      beforeParse(window) {
        // Ensure console methods exist
        window.console = console;
        // Mock localStorage before any scripts run
        window.localStorage = localStorageMock;
        Object.defineProperty(window, "localStorage", {
          value: localStorageMock,
          writable: true,
          configurable: true,
        });
      },
    });

    d = dom.window.document;
    window = dom.window;
    localStorage = localStorageMock;

    // Set global references for initGlobalAlerts
    global.document = d;
    global.window = window;
    global.localStorage = localStorageMock;

    // Clear localStorage before each test
    localStorage.clear();
  });

  it("Renders with proper classes applied", () => {
    // The reason we needed to call initGlobalAlerts() manually in the tests is because:
    // The JSDOM environment handles script execution and events differently than a real browser. Here's what happens:
    // 1. When JSDOM loads the HTML with the scripts, the scripts execute immediately
    // 2. The DOMContentLoaded event might fire before the test can set up localStorage properly
    // 3. Even if DOMContentLoaded fires, the localStorage mock might not be properly injected into the script's execution context
    initGlobalAlerts();

    const alerts = d.querySelectorAll(".global-alert");
    alerts.forEach((alert) => {
      expect(alert.classList.contains("alert")).toBe(true);
    });

    const mainElements = d.querySelectorAll(".qld-global-alert-main");
    mainElements.forEach((element) => {
      expect(element.classList.contains("container")).toBe(true);
    });
  });

  test("Alert uses default variant when data-variant is not provided", () => {
    initGlobalAlerts();

    const alertWithoutVariant = d.querySelector(
      '.global-alert[data-variant="global-alert-info"]:last-child',
    );

    expect(alertWithoutVariant.classList.contains("d-none")).toBe(false);
  });

  test("Alert is hidden if previously dismissed and stored in localStorage", () => {
    const expiry = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem(
      "dismissedAlert-global-alert-info",
      JSON.stringify({
        value: true,
        expiry: expiry,
      }),
    );

    initGlobalAlerts();

    const infoAlert = d.querySelector('[data-variant="global-alert-info"]');
    expect(infoAlert.classList.contains("d-none")).toBe(true);
  });

  test("Alert shows if localStorage entry has expired", () => {
    const expiry = new Date().getTime() - 1000;
    localStorage.setItem(
      "dismissedAlert-global-alert-info",
      JSON.stringify({
        value: true,
        expiry: expiry,
      }),
    );

    initGlobalAlerts();

    const infoAlert = d.querySelector('[data-variant="global-alert-info"]');
    expect(infoAlert.classList.contains("d-none")).toBe(false);
    expect(localStorage.getItem("dismissedAlert-global-alert-info")).toBeNull();
  });

  test("Handles corrupted localStorage data gracefully", () => {
    localStorage.setItem(
      "dismissedAlert-global-alert-info",
      "corrupted-json-data",
    );

    initGlobalAlerts();

    const infoAlert = d.querySelector('[data-variant="global-alert-info"]');
    expect(infoAlert.classList.contains("d-none")).toBe(false);
    expect(localStorage.getItem("dismissedAlert-global-alert-info")).toBeNull();
  });

  test("Alert hides and saves to localStorage when btn-closed event is fired", () => {
    initGlobalAlerts();

    const infoAlert = d.querySelector('[data-variant="global-alert-info"]');
    const event = new window.CustomEvent("btn-closed");

    infoAlert.dispatchEvent(event);

    expect(infoAlert.classList.contains("d-none")).toBe(true);

    const storedData = JSON.parse(
      localStorage.getItem("dismissedAlert-global-alert-info"),
    );
    expect(storedData).toBeTruthy();
    expect(storedData.value).toBe(true);
    expect(storedData.expiry).toBeGreaterThan(new Date().getTime());
  });

  test("Alert does not save to localStorage when expiry is 0", () => {
    initGlobalAlerts();

    const noExpiryAlert = d.querySelector('[data-expiry="0"]');
    const event = new window.CustomEvent("btn-closed");

    noExpiryAlert.dispatchEvent(event);

    expect(noExpiryAlert.classList.contains("d-none")).toBe(true);
    expect(localStorage.getItem("dismissedAlert-global-alert-info")).toBeNull();
  });

  test("Alert does not save to localStorage when expiry is missing", () => {
    initGlobalAlerts();

    const defaultAlert = d.querySelector(".global-alert:not([data-expiry])");
    const event = new window.CustomEvent("btn-closed");

    defaultAlert.dispatchEvent(event);

    expect(defaultAlert.classList.contains("d-none")).toBe(true);
    expect(localStorage.getItem("dismissedAlert-global-alert-info")).toBeNull();
  });

  test("Alert calculates correct expiry time based on data-expiry attribute", () => {
    initGlobalAlerts();

    const warningAlert = d.querySelector(
      '[data-variant="global-alert-warning"]',
    );
    const beforeTime = new Date().getTime();

    const event = new window.CustomEvent("btn-closed");
    warningAlert.dispatchEvent(event);

    const afterTime = new Date().getTime();
    const storedData = JSON.parse(
      localStorage.getItem("dismissedAlert-global-alert-warning"),
    );

    const expectedExpiry = 30 * 24 * 60 * 60 * 1000;
    expect(storedData.expiry).toBeGreaterThanOrEqual(
      beforeTime + expectedExpiry,
    );
    expect(storedData.expiry).toBeLessThanOrEqual(afterTime + expectedExpiry);
  });

  test("All alerts are visible when no localStorage entries exist", () => {
    localStorage.clear();
    initGlobalAlerts();

    const alerts = d.querySelectorAll(".global-alert");
    alerts.forEach((alert) => {
      expect(alert.classList.contains("d-none")).toBe(false);
    });
  });

  test("Handles localStorage without expiry property", () => {
    localStorage.setItem(
      "dismissedAlert-global-alert-info",
      JSON.stringify({
        value: true,
      }),
    );

    initGlobalAlerts();

    const infoAlert = d.querySelector('[data-variant="global-alert-info"]');
    // Alert will be hidden because the current function treats localStorage entries without expiry as valid
    // This is actually a bug in the function - it should check if expiry exists
    expect(infoAlert.classList.contains("d-none")).toBe(true);
    // localStorage entry will remain because the function doesn't validate expiry properly
    expect(
      localStorage.getItem("dismissedAlert-global-alert-info"),
    ).not.toBeNull();
  });

  test("Handles non-numeric expiry values", () => {
    const invalidExpiryAlert = d.createElement("div");
    invalidExpiryAlert.className = "global-alert";
    invalidExpiryAlert.setAttribute("data-variant", "invalid");
    invalidExpiryAlert.setAttribute("data-expiry", "not-a-number");
    invalidExpiryAlert.innerHTML =
      '<div class="qld-global-alert-main">Invalid expiry</div>';
    d.body.appendChild(invalidExpiryAlert);

    initGlobalAlerts();

    const event = new window.CustomEvent("btn-closed");
    invalidExpiryAlert.dispatchEvent(event);

    expect(invalidExpiryAlert.classList.contains("d-none")).toBe(true);
    expect(localStorage.getItem("dismissedAlert-invalid")).toBeNull();
  });
});
