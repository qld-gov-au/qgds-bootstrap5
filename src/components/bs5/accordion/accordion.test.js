import { expect, test } from "vitest";

/**
 *
 * Test suite for the Accordion component.
 *
 * @fileoverview This file contains tests for the Accordion component using Vitest.
 *
 * @requires vitest
 * @requires ./Accordion.js
 * @requires ./accordion.data.json
 */

import { Accordion } from "./Accordion.js";
import mockData from "./accordion.data.json";

test("Accordion component exists", () => {
  const AccordionComponent = new Accordion({ data: mockData });
  expect(AccordionComponent).toBeDefined();
});
