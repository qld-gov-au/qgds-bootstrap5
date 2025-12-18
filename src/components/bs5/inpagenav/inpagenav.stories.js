// inpagenav.stories.js
import { Inpagenav } from "./Inpagenav.js";
import defaultdata from "./inpagenav.data.json";
import metadata from "./metadata.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/In-page Nav",
  render: (args) => new Inpagenav(args).html,

  parameters: {
    docs: {
      controls: {
        exclude: ["variantClass", "navitems"],
      },
    },
    coderefs: {
      metadata,
      partialname: "inpagenav", //{{> inpagenav }}
    },
    backgrounds: { disable: false },
  },
  globals: { backgrounds: { value: "default" } },
};

/**
 * Default Inpage Nav
 */
export const Default = {
  args: defaultdata,
  globals: { backgrounds: { value: "default" } },
  decorators: [
    (Story) => {
      return `
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="qld-content-body" id="content">
            ${Story()}
            </div>
          </div>
        </div>
      </div>
      `;
    },
  ],
};

/**
 * Inpage Nav when used inside a <code>.dark</code> container.
 */
export const Dark = {
  args: defaultdata,
  globals: { backgrounds: { value: "dark" } },
  decorators: [
    (Story) => {
      return `
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="dark">
            ${Story()}
            </div>
          </div>
        </div>
      </div>
      `;
    },
  ],
};
