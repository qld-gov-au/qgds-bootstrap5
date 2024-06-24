// ComponentExample.stories.js
import { SidenavWrapperTest } from "./SidenavWrapper.test.js";
import defaultdata from "./../sidenav/sidenav.data.json";
import init from "./../../../js/handlebars.init";
import Handlebars from "handlebars";
export default {
  tags: ["autodocs"],
  title: "!Layout/Components/Side Navigation Wrapper",
  render: (args) => {
    init(Handlebars);
    return new SidenavWrapperTest(args).html;
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
        
          ${Story()}
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
