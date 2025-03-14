/**
 * @file callToAction.stories.js
 * @description Storybook configuration file for the CallToAction component.
 * @module callToAction.stories
 */

import { CallToAction } from "./callToAction.js";
import defaultdata from "./callToAction.data.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/CallToAction",
  // render: (args) => new CallToAction(args).html,
  render: (args) => new CallToAction(args).html,
  args: defaultdata,
  render: (args) => {
    return `
    <div class="container">
      <div class="row">
        <div class="col">
          ${new CallToAction({...args, label: 'View All'}).html}
        </div>
        <div class="col">
          ${new CallToAction({...args, label: 'Label', "class": [{"small": false}, {"view-all": false}]}).html}
        </div>
      </div>
    </div>
    `
  },
  parameters: {
    design: {
      name: "QGDS Figma Reference",
      type: "figma",
      url: "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=11056-321367&p=f&t=v3sxViBgYUUmwplL-0",
    },
  },
};

/**
 * Call To Action - Default
 */
export const Default = {
  args: defaultdata,
};

/**
 * Call To Action - Light
 * */
export const Light = {
  parameters: {
    backgrounds: {
      default: 'Light',
      values: [
        { name: 'Light', value: 'var(--qld-light-background)' },
      ],
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="light">
          ${Story()}
      </div>
      `;
    },
  ],
};

/**
 * Call To Action - Dark
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
 * Call To Action - Dark-Alt
 * */
export const DarkAlt = {
  parameters: {
    backgrounds: {
      default: 'DarkAlt',
      values: [
        { name: 'DarkAlt', value: 'var(--qld-dark-blue)' },
      ],
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="dark-alt">
          ${Story()}
      </div>
      `;
    },
  ],
};
