// Button.stories.js
import { Button } from "./Button.js";
import defaultdata from "./button.data.json";
import metadata from "./metadata.json";

import buttonSchema from "./button.schema.json";

/**
 * Define the variants for Button component.
 * Object key: variant's CSS class.
 * Object value: variant's label on Storybook.
 */
const buttonVariants = {
  "btn-primary": "Primary",
  "btn-secondary": "Secondary",
  "btn-tertiary": "Tertiary",
};

/**
 * Define different status of button
 */
const statuses = [
  { isdisabled: false, isprogress: false, label: "Enabled" },
  { isdisabled: true, isprogress: false, label: "Disabled" },
  {
    isdisabled: false,
    isprogress: true,
    progressLabel: "Loading",
    label: "Progress",
  },
];

/**
 * Construct the HTML for buttons in all possible variants.
 * @returns {HTML} HTML Markup
 */
function buttonVariantsMarkup() {
  return Object.entries(buttonVariants)
    .map(([variantClass, variantLabel]) => {
      const variantButtons = statuses
        .map(
          (status) =>
            new Button({
              ...defaultdata,
              variantClass,
              ...status,
            }).html,
        )
        .join("");

      return `<div class="d-grid p-32">
              <div class="fw-bold">${variantLabel}</div>
              <div class="d-flex gap-3">

                <!-- Example buttons -->
                ${variantButtons}

              </div>
            </div>`;
    })
    .join("");
}

export default {
  tags: ["autodocs"],
  title: "3. Components/Button",
  args: defaultdata,
  render: (args) => {
    return `
    <!-- Wrapper div for storybook only -->
    <div class="d-flex gap-3 p-32">

      <!-- Example link presented as QGDS button -->
      ${new Button(args).html.trim()}

      <!-- Example link presented as QGDS button -->
      ${new Button({ ...args, isdisabled: true }).html.trim()}

      <!-- Example button presented as QGDS button -->
      ${new Button({ ...args, isprogress: true, iconClass: "", label: "Loading button", progressLabel: "Loading...", islink: false, dataatts: 'data-loading-btn="true"' }).html.trim()}
    
    
      </div>
    `; //expand arguments, specifically turn isdisabled into true
  },

  argTypes: {
    isdisabled: {
      table: {
        disable: true,
      },
    },
    isprogress: {
      name: "Progress State",
      description: "Show loading spinner and progress label",
      control: "boolean",
    },
    progressLabel: {
      name: "Progress Label",
      description:
        "Text to show when in progress state (e.g., 'Loading', 'Saving', 'Please wait')",
      control: "text",
      if: { arg: "isprogress", truthy: true },
    },
    variantClass: {
      name: "Variants",
      description: "Settable variant type for Button component",
      control: {
        type: "radio",
        labels: buttonVariants,
      },
      options: Object.keys(buttonVariants),
    },
    iconPosition: {
      description: "Position of the icon placement",
      control: "radio",
      options: ["leading", "trailing"],
    },
    target: {
      control: "select",
      options: ["_self", "_blank", "_parent", "_top"],
    },
  },

  parameters: {
    backgrounds: {
      disabled: false,
    },
    coderefs: {
      metadata,
      partialname: "button", //{{> button }}
      tabs: {
        custom: {
          label: "Schema",
          content: new Button(defaultdata).html,
        },
      },
    },
  },
};

/**
 * Default Button story
 */
export const Default = {};

/**
 * Dark Button story
 * */
export const Dark = {
  globals: {
    backgrounds: {
      value: "dark",
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="dark">
          ${Story()}
      </div>
      `;
    },
  ],
};

/**
 * Show all button variants in the Default Light mode.
 * This Story can be used to help in troubleshooting.
 */
export const AllVariantsInDefaultMode = {
  render: () => {
    return buttonVariantsMarkup();
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
};

/**
 * Show all button variants in the Dark mode.
 * This Story can be used to help in troubleshooting.
 */
export const AllVariantsInDarkMode = {
  render: () => {
    return buttonVariantsMarkup();
  },
  parameters: {
    backgrounds: {
      default: "Dark",
    },
    controls: {
      disable: true,
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="dark">
          ${Story()}
      </div>
      `;
    },
  ],
};

/**
 * Show buttons with long labels that wrap text when hitting container limits.
 * This demonstrates how button text wraps and becomes centered.
 */
export const LongLabelsWrapping = {
  render: () => {
    const longLabelButtons = Object.entries(buttonVariants)
      .map(([variantClass, variantLabel]) => {
        const longLabelButton = new Button({
          ...defaultdata,
          variantClass,
          iconClass: "", // no icon for this demo
          label: "This is a very long button label that should wrap",
          isdisabled: false,
        }).html;

        const longLabelDisabledButton = new Button({
          ...defaultdata,
          variantClass,
          iconClass: "", // no icon for this demo
          label: "Another extremely long button label for disabled",
          isdisabled: true,
        }).html;

        return `<div class="d-grid mb-4 " style="max-width: 300px;">
                <div class="fw-bold">${variantLabel} - Long Labels</div>
                <div class="d-grid gap-2">
                  ${longLabelButton}
                  ${longLabelDisabledButton}
                </div>
              </div>`;
      })
      .join("");

    return `
      <div class="d-grid gap-4 p-32">
        <div>
          <h5 class="mb-3">Buttons with Long Labels (300px container)</h5>
          <div class="d-flex flex-wrap gap-4">
            ${longLabelButtons}
          </div>
        </div>
        <div style="max-width: 200px;">
          <h5 class="mb-3">Even Narrower Container (200px)</h5>
          ${
            new Button({
              ...defaultdata,
              iconClass: "", // no icon for this demo
              variantClass: "btn-primary",
              label: "Long button text in a narrow container",
              isdisabled: false,
            }).html
          }
        </div>
      </div>
    `;
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
};
