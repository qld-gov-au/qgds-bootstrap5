// ComponentExample.stories.js
import { Sidenav } from "./Sidenav.js";
import defaultdata from "./sidenav.data.json";

export default {
  tags: ["autodocs"],
  title: "Components/Side navigation",
  render: (args) => {
    return new Sidenav(args).html;  
  },

  argTypes: {
  },

  parameters: {
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
  args: defaultdata,
  decorators: [
    (Story) => {
      return `
      <div class="container-fluid">
        <div class="row">
        <div class="col-lg-4 col-md-5">
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
