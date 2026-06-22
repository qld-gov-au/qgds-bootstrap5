// Blockquote.stories.js
import { Blockquote } from "./Blockquote.js";
import defaultdata from "./blockquote.data.json";

import manifest from "./manifest.json";
//import schema from "./blockquote.schema.json";

/**
 * ## Blockquote
 */

export default {
  tags: ["autodocs"],
  title: "3. Components/Blockquote",
  render: (args) => new Blockquote(args).html,
  parameters: {
    docs: {},
  },
};

export const Overview = {
  name: "Overview",
  description:
    "The Blockquote component is used to display quoted content, typically with an attribution to the source of the quote. It is styled to stand out from the main content and can be used in various contexts where quotations are needed.",
  tags: ["!dev"],
  render: () => ``,
  parameters: {
    controls: { disable: true },
    docs: {
      source: { code: null },
      canvas: { className: "d-none" },
    },
  },
};

/**
 * Default blockquote
 */
export const Default = {
  args: defaultdata,
};

/**
 * Light colour blockquote
 */
export const Light = {
  args: defaultdata,
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="container-fluid"><div class="row"><div class="col-12">
      <div class="light">
          ${Story()}
      </div>
      </div></div></div>
      `;
    },
  ],
};

/**
 * Alternative colour blockquote
 */
export const Alternative = {
  args: defaultdata,
  parameters: {
    backgrounds: {
      default: "alternative",
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="container-fluid"><div class="row"><div class="col-12">
      <div class="alt">
          ${Story()}
      </div>
      </div></div></div>
      `;
    },
  ],
};

/**
 *<div class="pb-32 mb-32">
- [Master component file (Figma)](https://www.figma.com/file/qKsxl3ogIlBp7dafgxXuCA/QLD-GOV-DDS?type=design&node-id=11056-321340&mode=design&t=YLfxdziHdqD2Ty0o-0)
- [Design System website](https://www.designsystem.qld.gov.au/components/callouts#section__quote-example)
* <br><br><hr><br><br>
* </div>
*/

export const DesignResources = {
  name: "Design Resources",
  tags: ["!dev"],
  render: () => "", // Renders nothing visually
  parameters: {
    controls: { disable: true }, // Hide the controls table
    docs: {
      source: { code: null }, // Hide the "Show code" block
      canvas: { className: "d-none" }, // Hide the preview box (requires Bootstrap d-none class)
    },
  },
};

/**
 * The Blockquote component accepts the following JSON structure:
 */

export const ComponentData = {
  tags: ["!dev"],
  render: () => {
    return `
      <div class="p-32">
        <h3>Component Data</h3>
      </div>
    `;
  },
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        language: "JSX",
        code: `${JSON.stringify(defaultdata, null, 2)}`,
      },
    },
  },
};
