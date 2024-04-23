// inpagenav.stories.js
import { Inpagenav } from "./Inpagenav.js";
import defaultdata from "./inpagenav.data.json";

export default {
  tags: ["autodocs"],
  title: "Components/In-page Nav",
  render: (args) => new Inpagenav(args).html,

  parameters: {
    docs: {
      controls: {
        exclude: ["variantClass", "navitems"],
      },
    },
  },
};

/**
 * Default Inpage Nav
 */
export const Default = {
  args: defaultdata,
  decorators: [
    (Story) => {
      return `
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="">
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
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [{ name: "Dark", value: "var(--qld-dark-background)" }],
    },
  },
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
