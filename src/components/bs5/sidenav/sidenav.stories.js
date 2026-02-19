// ComponentExample.stories.js
import { Sidenav } from "./Sidenav.js";
import defaultdata from "./sidenav.data.json";
import metadata from "./metadata.json";

export default {
  tags: ["autodocs"],
  title: "2. Layout/Side navigation",
  render: (args) => {
    return new Sidenav(args).html;
  },

  argTypes: {},
  globals: { backgrounds: { value: "default" } },
  parameters: {
    coderefs: {
      metadata,
      partialname: "sidenav", //{{> sidenav }}
    },
    backgrounds: { disable: false },
    docs: {
      controls: {
        exclude: ["navlist", "navtitlelink"],
      },
    },
  },
};

/**
 * Default side navigation
 *
 */
export const Default = {
  args: defaultdata,
  globals: { backgrounds: { value: "default" } },
  decorators: [
    (Story) => {
      return `
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-4 col-md-5">
            ${Story()}
          </div>
        </div>
      </div>
      `;
    },
  ],
};

/**
 * Dark side navigation
 *
 */
export const Dark = {
  globals: { backgrounds: { value: "dark" } },
  args: defaultdata,
  decorators: [
    (Story) => {
      return `
      <div class="container-fluid dark">
        <div class="row">
          <div class="col-lg-4 col-md-5">
            ${Story()}
          </div>
        </div>
      </div>
      `;
    },
  ],
};
