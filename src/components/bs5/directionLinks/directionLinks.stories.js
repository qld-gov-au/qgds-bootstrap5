/**
 * @file directionLinks.stories.js
 * @description Storybook configuration file for the Direction Links component.
 * @module directionLinks.stories
 */

import { DirectionLinks } from "./directionLinks.js";
import defaultdata from "./directionLinks.data.json";
import { Disabled } from "../dateinput/Dateinput.stories.js";

export default {
  tags: ["autodocs"],
  title: "3. Components/Direction Links",
  render: (args) => {
    return `
    <!-- Grid container -->
    <div class="container">
      <div class="row">
        <div class="col">          
          <!-- Component HTML -->
          ${new DirectionLinks({ ...args, class: "up", label: "Up" }).html}        
          </div>
        <div class="col">
          <!-- Component HTML -->
            ${new DirectionLinks({ ...args, class: "down", label: "Down" }).html}
        </div>
        <div class="col">
          <!-- Component HTML -->
            ${new DirectionLinks({ ...args, class: "left", label: "Left" }).html}        
        </div>
        <div class="col">          
          <!-- Component HTML -->
            ${new DirectionLinks({ ...args, class: "right", label: "Right" }).html}        
        </div>
      </div>
    </div>
    `;
  },
  args: defaultdata,
  argTypes: {
    class: {
      control: { type: "select" },
      options: ["left", "right", "up", "down"],
    },
    id: { control: "text" },
    href: { control: "text" },
    target: {
      control: { type: "select" },
      options: ["_self", "_blank", "_parent", "_top"],
    },
    arialabel: { control: "text", name: "aria-label" },
    label: { control: "text" },
  },
  parameters: {
    controls: { disable: true },
    design: {
      name: "QGDS Figma Reference",
      type: "figma",
      url: "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=5624-62902&t=8gBcIy6lPlfZ8NHz-0",
    },
  },
};

/**
 * Default story
 */
export const Default = {};

/**
 * Direction Link - Light
 * */
export const Light = {
  parameters: {
    backgrounds: {
      default: "Light",
      values: [{ name: "Light", value: "var(--qld-light-background)" }],
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
 * Direction Link - Light-Alt
 * */
export const LightAlt = {
  parameters: {
    backgrounds: {
      default: "LightAlt",
      values: [{ name: "LightAlt", value: "var(--qld-light-alt-background)" }],
    },
  },
  decorators: [
    (Story) => {
      return `
        <div class="light-alt">
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
      default: "Dark",
      values: [{ name: "Dark", value: "var(--qld-dark-background)" }],
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
      default: "DarkAlt",
      values: [{ name: "DarkAlt", value: "var(--qld-dark-alt-background)" }],
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
