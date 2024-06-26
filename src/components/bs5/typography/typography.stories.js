// typography.stories.js
// import { Typography } from "./Typography.js";
// import defaultdata from "./typography.data.json";

export default {
  tags: ["autodocs"],
  title: "Components/Typography",
  render: () => {
    return `
    <div class="qld-content-body">
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>
    <p>Elementum euismod fringilla vitae varius. Justo imperdiet justo <strong>tincidunt vestibulum venenatis</strong> morbi molestie dolor orci. <a href="#">Risus sapien urna blandit eget</a>. Mi, nisl facilisis pellentesque bibendum. Gravida lobortis vel amet, ullamcorper vestibulum, in curabitur odio pulvinar.</p>
    <p>Example paragraph. <a href="#">Internal link</a> and an <a href="#" rel="external">external link</a>.</p>
    <p><a class="qld__text-link--no-visited" href="#no-visit">Link without visited state</a></p>
    <ul>
    <li>List item</li>
    <li>List item</li>
    <li>List item</li>
    <li>List item</li>
    <li>List item</li>
    </ul>
    <ol>
    <li>List item</li>
    <li>List item</li>
    <li>List item</li>
    <li>List item</li>
    <li>List item</li>
    </ol>
    </div>

    <dl>
      <dt>Website:</dt>
      <dd><a href="https://www.qld.gov.au" target="_blank">https://www.qld.gov.au</a></dd>
      <dt>Street address:</dt>
      <dd>123 Street Street</dd>
      <dd>Suburb QLD 4000</dd>
    </dl>

    `;
  },

  argTypes: {},

  /**
   * Additional parameters for the story.
   *
   * @type {Object}
   * @property {Object} design - Configuration for the design parameter.
   * @property {string} design.name - Name of the design parameter.
   * @property {string} design.type - Type of the design parameter.
   * @property {string} design.url - URL of the design parameter.
   */
  parameters: {
    design: [
      {
        name: "QGDS Figma - Typography",
        type: "figma",
        url: "https://www.figma.com/file/qKsxl3ogIlBp7dafgxXuCA/QLD-GOV-DDS?type=design&node-id=23805-306627&mode=design&t=5REJ3QGtTW1K0fGT-4",
      },
      {
        name: "QGDS Figma - Underline style",
        type: "figma",
        url: "https://www.figma.com/file/qKsxl3ogIlBp7dafgxXuCA/QLD-GOV-DDS?type=design&node-id=23805-301553&mode=design&t=5REJ3QGtTW1K0fGT-4",
      },
    ],
  },
};

/**
 * Default Callout
 */
export const Default = {};

/**
 * Light colour Callout
 */
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
      <div class="container-fluid"><div class="row"><div class="col-12">
      <div class="light">
          ${Story()}
      </div>
      </div></div></div>
      `;
    },
  ],
};

/**
 * Alternative Callout
 */
export const Alternative = {
  parameters: {
    backgrounds: {
      default: "Alternative",
      values: [{ name: "Alternative", value: "var(--qld-light-grey-alt)" }],
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="container-fluid"><div class="row"><div class="col-12">
      <div class="alt">
          ${Story()}
      </div>
      </div></div></div>
      `;
    },
  ],
};

/**
 * Dark Callout
 */
export const Dark = {
  parameters: {
    backgrounds: {
      default: "Dark",
      values: [{ name: "Dark", value: "var(--qld-brand-primary)" }],
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="container-fluid"><div class="row"><div class="col-12">
      <div class="dark">
          ${Story()}
      </div>
      </div></div></div>
      `;
    },
  ],
};

/**
 * Dark alternative Callout
 */
export const DarkAlternative = {
  parameters: {
    backgrounds: {
      default: "Dark alternative",
      values: [{ name: "Dark alternative", value: "var(--qld-dark-blue)" }],
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="container-fluid"><div class="row"><div class="col-12">
      <div class="dark-alt">
          ${Story()}
      </div>
      </div></div></div>
      `;
    },
  ],
};
