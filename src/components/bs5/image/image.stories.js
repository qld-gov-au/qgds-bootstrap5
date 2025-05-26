/**
 *
 * Image utilities to create responsive, fixed-ratio images.
 */

import Handlebars from "handlebars";

import imagedata from "./image.data.json";
import template from "./image.hbs?raw";

/**
 *
 * Images displayed in the Design System should use a standard aspect ratio. Guidance is available at <a href="https://www.designsystem.qld.gov.au/styles/images">https://www.designsystem.qld.gov.au/styles/images</a>.
 *
 * This QGDS Bootstrap 5 library provides utility classes for fixed-ratio images and position adjustments.
 *
 * ### Ratios
 * **Horizontal:**<br><code>.image-ratio-1x1</code>
 * <code>.image-ratio-3x2</code>
 * <code>.image-ratio-4x3</code>
 * <code>.image-ratio-16x9</code>
 *
 * **Vertical:**<br>
 * <code>.image-ratio-2x3</code>
 * <code>.image-ratio-3x4</code>
 *
 * **Position adjustment** (to help with cropping):<br>
 * <code>.position-x-left</code> <code>.position-x-center</code> <code>.position-x-right</code><br>
 * <code>.position-y-top</code> <code>.position-y-center</code> <code>.position-y-bottom</code>
 *
 */

export default {
  tags: ["autodocs"],
  title: "3. Components/Image",

  render: (args) => {
    return Handlebars.compile(template)(args);
  },

  argTypes: {
    "ratioClass": {
      name: "Fixed image ratio",
      description: "Set the ratio class for the image component.",
      control: {
        type: "radio",
        labels: {
          "image-ratio-1x1": "1:1 Ratio",
          "image-ratio-3x2": "3:2 Ratio",
          "image-ratio-2x3": "2:3 Ratio (Vertical)",
          "image-ratio-4x3": "4:3 Ratio",
          "image-ratio-3x4": "3:4 Ratio (Vertical)",
          "image-ratio-16x9": "16:9 Ratio",
        },
      },
      options: [
        "image-ratio-1x1",
        "image-ratio-3x2",
        "image-ratio-2x3",
        "image-ratio-4x3",
        "image-ratio-3x4",
        "image-ratio-16x9",
      ],
    },

    "positionX": {
      name: "Position X",
      description:
        "Adjust the image placement within the aspect ratio crop (horizontal).",
      control: {
        type: "radio",
        labels: {
          "position-x-left": "Left",
          "position-x-center": "Center",
          "position-x-right": "Right",
        },
      },
      options: ["position-x-left", "position-x-center", "position-x-right"],
    },

    "positionY": {
      name: "Position Y",
      description:
        "Adjust the image placement within the aspect ratio crop (vertical).",
      control: {
        type: "radio",
        labels: {
          "position-y-top": "Top",
          "position-y-center": "Center",
          "position-y-bottom": "Bottom",
        },
      },
      options: ["position-y-top", "position-y-center", "position-y-bottom"],
    },

    "width": {
      name: "Width",
      description:
        "Set the width of the image (e.g., '350', '100'). Use the unit fields to specify px or %.",
      control: "text",
    },

    "widthUnit": {
      name: "Width Unit",
      description:
        "Select the unit for the width of the image. Choose 'px' for pixels or '%' for percentage.",
      control: { type: "select" },
      options: ["px", "%"],
    },

    "height": {
      name: "Height",
      description:
        "Set the height of the image (optional - note responsive images will scale their height). Use the unit field to specify px or %.",
      control: "text",
    },

    "heightUnit": {
      name: "Height Unit",
      description:
        "Select the unit for the height of the image. Choose 'px' for pixels or '%' for percentage.",
      control: { type: "select" },
      options: ["px", "%"],
    },

    // Disable controls for the image source and alt text, as they are not meant to be changed in Storybook.
    "src": {
      table: {
        disable: true,
      },
    },
    "alt": {
      table: {
        disable: true,
      },
    },
  },

  decorators: [
    (Story, { args }) => {
      return `
        <div class="container">
          <div class="row">
            <div class="col-12 ${args.storycolumn || ""}">
              ${Story()}
            </div>
          </div>
        </div>
      `;
    },
  ],
};

/**
 * Fixed ratio image
 */
export const FixedRatio = {
  args: {
    ...imagedata,
    widthUnit: "px", // <-- ensure this is set
    //Custom class for the storybook wrapper only
    storycolumn: "col-md-6",
  },
};

/**
 * Image with caption (figure)
 */
export const FixedRatioWithCaption = {
  args: {
    ...imagedata,
    caption:
      "This is a caption for the image. It can be long or short. Longer captions, like this one, should wrap to the next line.",
  },
};

/**
 * Floats
 *
 * Images can be floated to the left or right within a container using Bootstrap 5's float utilities (<a href="https://getbootstrap.com/docs/5.0/utilities/float/#responsive">documentation</a>).
 * <code>.float-start</code>
 * <code>.float-end</code>
 * <code>.float-none</code>
 */
export const FloatedImage = {
  args: {
    ...imagedata,
    caption:
      "This is a caption for the image. It's a longer caption, so it wraps to the next line.",
    figureClass: "",
  },

  render: (args) => {
    let imageTag = Handlebars.compile(template)(args);

    let customTemplate = `
    <h2>Example image with caption, right aligned</h2>

    <div class="float-md-end ms-md-32 mb-md-32">${imageTag}</div>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    
    <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.</p>

    <h2>Example image with caption, left aligned</h2>
    <div class="float-md-start me-md-32 mb-md-32">${imageTag}</div>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

    <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.</p>
    `;

    return customTemplate;
  },
};
