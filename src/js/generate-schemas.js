#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");
const typesDir = path.join(projectRoot, "src", "types");
const schemaDir = path.join(projectRoot, "src", "schemas");

// Get command line arguments (component name filter)
const args = process.argv.slice(2);
const targetComponent = args[0]; // e.g., 'footer', 'button', etc.

// Ensure schema directory exists
if (!fs.existsSync(schemaDir)) {
  fs.mkdirSync(schemaDir, { recursive: true });
}

// Configuration for schema generation
const schemas = [
  {
    type: "ButtonData",
    file: "button.types.ts",
    output: "button.schema.json",
  },
  {
    type: "FooterData",
    file: "footer.types.ts",
    output: "footer.schema.json",
  },
  {
    type: "ModalData",
    file: "button.types.ts",
    output: "modal.schema.json",
  },
  {
    type: "TextboxData",
    file: "button.types.ts",
    output: "textbox.schema.json",
  },
];

console.log("Generating JSON schemas from TypeScript types...");

// Filter schemas based on target component if provided
let schemasToGenerate = schemas;
if (targetComponent) {
  schemasToGenerate = schemas.filter(
    (schema) =>
      schema.type.toLowerCase().includes(targetComponent.toLowerCase()) ||
      schema.output.toLowerCase().includes(targetComponent.toLowerCase()),
  );

  if (schemasToGenerate.length === 0) {
    console.log(`No schemas found matching "${targetComponent}"`);
    console.log("Available schemas:", schemas.map((s) => s.type).join(", "));
    process.exit(1);
  }

  console.log(`Filtering schemas for: ${targetComponent}`);
}

schemasToGenerate.forEach(({ type, file, output }) => {
  const inputFile = path.join(typesDir, file);
  const outputFile = path.join(schemaDir, output);

  try {
    const command = `npx ts-json-schema-generator --path ${inputFile} --type ${type} --tsconfig tsconfig.schemas.json --out ${outputFile}`;

    console.log(`Generating schema for ${type}...`);
    execSync(command, {
      cwd: projectRoot,
      stdio: "inherit",
    });

    console.log(`✓ Generated ${output}`);
  } catch (error) {
    console.error(`✗ Failed to generate schema for ${type}:`, error.message);
  }
});

console.log("Schema generation complete!");
