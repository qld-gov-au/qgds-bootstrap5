#!/usr/bin/env node

import { validateComponent, validateDataFile } from "./validate-component.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

console.log("🧪 Running validation tests for button component");
console.log("=================================================\n");

// Test 1: Valid button data
console.log("Test 1: Validating correct button data");
console.log("--------------------------------------");
const validResult = validateComponent("button", projectRoot);
console.log(`Result: ${validResult.isValid ? "PASS" : "FAIL"}\n`);

// Test 2: Invalid button data
console.log("Test 2: Validating invalid button data");
console.log("-------------------------------------");
const invalidDataPath = path.join(
  projectRoot,
  "test",
  "button.invalid.data.json",
);
const invalidResult = validateDataFile("button", invalidDataPath, projectRoot);
console.log(
  `Result: ${!invalidResult.isValid ? "PASS" : "FAIL"} (expected to fail)\n`,
);

// Summary
console.log("📊 Test Summary");
console.log("===============");
console.log(`✅ Valid data test: ${validResult.isValid ? "PASSED" : "FAILED"}`);
console.log(
  `❌ Invalid data test: ${!invalidResult.isValid ? "PASSED" : "FAILED"}`,
);

const allTestsPassed = validResult.isValid && !invalidResult.isValid;
console.log(
  `\n🎯 Overall result: ${allTestsPassed ? "ALL TESTS PASSED" : "SOME TESTS FAILED"}`,
);

process.exit(allTestsPassed ? 0 : 1);
