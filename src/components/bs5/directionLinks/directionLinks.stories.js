/**
 * @file directionLinks.stories.js
 * @description Storybook configuration file for the DirectionLinks component.
 * @module directionLinks.stories
 */

import { DirectionLinks } from "./directionLinks.js";
import defaultdata from "./directionLinks.data.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Direction Links",
  args: defaultdata,
  render: (args) => {
    return `
    <div class="container">
      <div class="row">
        <div class="col">
          ${new DirectionLinks({...args, class: 'up', label: 'Up'}).html}
        </div>
        <div class="col">
          ${new DirectionLinks({...args, class: 'down', label: 'Down'}).html}
        </div>
        <div class="col">
          ${new DirectionLinks({...args, class: 'left', label: 'Left'}).html}
        </div>
        <div class="col">
          ${new DirectionLinks({...args, class: 'right', label: 'Right'}).html}
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
 * Default Accordion story
 */
export const Default = {};

/**
 * Direction Link - Light
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
 * Direction Link - Dark
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
 * Direction Link - Dark-Alt
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
