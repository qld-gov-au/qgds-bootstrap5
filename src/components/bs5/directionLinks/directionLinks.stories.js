/**
 * @file directionLinks.stories.js
 * @description Storybook configuration file for the Direction Links component.
 * @module directionLinks.stories
 */

import { DirectionLinks } from "./directionLinks.js";
import defaultdata from "./directionLinks.data.json";
import metadata from "./metadata.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Direction Links",
  globals: {
    backgrounds: {
      value: "default",
    },
  },
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
    backgrounds: { disable: false },
    controls: { disable: true },
    coderefs: {
      metadata,
      partialname: "directionLinks", //{{> directionLinks }}
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
  globals: {
    backgrounds: {
      value: "light",
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
  globals: {
    backgrounds: {
      value: "alt",
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
 * Direction Link - Dark-Alt
 * */
export const DarkAlt = {
  globals: {
    backgrounds: {
      value: "darkAlt",
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
