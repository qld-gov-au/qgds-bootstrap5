// ComponentExample.stories.js
import { ContentWrapperTest } from "./ContentWrapper.test.js";
import defaultdata from "./contentWrapper.data.json";

export default {
  title: "!Layout/Components/Content Wrapper",
  render: (args) => {
    return new ContentWrapperTest(args).html;
  },

  argTypes: {
    title: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `
This is a partial-block to embed more content inside another partial. See [Handlebars Partial Blocks](https://handlebarsjs.com/guide/partials.html#partial-blocks) for more details.
pass "title" to set title at top content block.
        `,
      },
    },
  },
};

/**
 * Default Content Wrapper
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
 * Dark Content Wrapper
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
