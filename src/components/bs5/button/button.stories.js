// Button.stories.js
import { Button } from "./Button.js";
import defaultdata from "./button.data.json";

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
  { isdisabled: false, label: "Enabled" },
  { isdisabled: true, label: "Disabled" },
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

      return `<div class="d-grid mb-4">
              <div class="fw-bold">${variantLabel}</div>
              <div class="d-flex gap-3">
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
    <div class="d-flex gap-3">
      ${new Button(args).html}
      ${new Button({ ...args, isdisabled: true }).html}
    </div>
    `; //expand arguments, specifically turn isdisabled into true
  },

  argTypes: {
    isdisabled: {
      table: {
        disable: true,
      },
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
    design: {
      name: "QGDS Figma Reference",
      type: "figma",
      url: "https://www.figma.com/file/qKsxl3ogIlBp7dafgxXuCA/QLD-GOV-DDS?type=design&node-id=5990-98058&mode=design&t=YBUAJHIxqF46Um9y-0",
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
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [{ name: "Dark", value: "var(--qld-sapphire-blue)" }],
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

        return `<div class="d-grid mb-4" style="max-width: 300px;">
                <div class="fw-bold">${variantLabel} - Long Labels</div>
                <div class="d-grid gap-2">
                  ${longLabelButton}
                  ${longLabelDisabledButton}
                </div>
              </div>`;
      })
      .join("");

    return `
      <div class="d-grid gap-4">
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
