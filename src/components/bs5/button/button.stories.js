// Button.stories.js
import { Button } from './Button.js';
import defaultdata from './button.data.json';

/**
 * Define the variants for Button component.
 * Object key: variant's CSS class.
 * Object value: variant's label on Storybook.
 */
const buttonVariants = {
  "btn-primary": "Primary",
  "btn-secondary": "Secondary",
  "btn-tertiary": "Tertiary",
}

export default {
  tags: ['autodocs'],
  title: 'Components/Button',
  args: defaultdata,
  render: (args) => {
    return `
    <div class="btn-toolbar">
      ${new Button(args).html}
      ${new Button({...args, isdisabled: true}).html}
    </div>
    `//expand arguments, specifically turn isdisabled into true
  },

  argTypes: {
    isdisabled: {
      table: {
        disable: true,
      },
    },
    variantClass: {
      name: "Variants",
      description: 'Settable variant type for Button component',
      control: {
        type: "radio",
        labels: buttonVariants,
      },
      options: Object.keys(buttonVariants),
    },
    iconPosition: {
      description: 'Position of the icon placement',
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
      default: 'Dark',
      values: [
        { name: 'Dark', value: 'var(--qld-sapphire-blue)' },
      ],
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
  render:() => {
    const states = [
      { isdisabled: false, label: 'Enabled' },
      { isdisabled: true, label: 'Disabled' },
    ];

    /* Return all button variants with label = variant + state */
    return Object.entries(buttonVariants).map(([variantClass, variantLabel]) => {
      const variantButtons = states.map(state =>
        new Button({
          ...defaultdata,
          variantClass,
          ...state,
          label: state.label,
        }).html,
      ).join('');

      return `<div class="d-grid mb-4">
                <div class="fw-bold">${variantLabel}</div>
                <div class="btn-toolbar">
                  ${variantButtons}
                </div>
              </div>`;

    }).join('');
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
  render:() => {
    const states = [
      { isdisabled: false, label: 'Enabled' },
      { isdisabled: true, label: 'Disabled' },
    ];

    /* Return all button variants with label = variant + state */
    return Object.entries(buttonVariants).map(([variantClass, variantLabel]) => {
      const variantButtons = states.map(state =>
        new Button({
          ...defaultdata,
          variantClass,
          ...state,
          label: state.label,
        }).html,
      ).join('');

      return `<div class="d-grid mb-4">
                <div class="fw-bold">${variantLabel}</div>
                <div class="btn-toolbar">
                  ${variantButtons}
                </div>
              </div>`;

    }).join('');
  },
  parameters: {
    backgrounds: {
      default: 'Dark',
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
