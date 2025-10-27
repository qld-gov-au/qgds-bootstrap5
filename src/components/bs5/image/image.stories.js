/**
 *
 * Image utilities to create responsive, fixed-ratio images.
 */

import Handlebars from "handlebars";

import imagedata from "./image.data.json";
import template from "./image.hbs?raw";

/**
 *
 * Images in the Design System should use a standard aspect ratio (below). More guidance is available at <a href="https://www.designsystem.qld.gov.au/styles/images">https://www.designsystem.qld.gov.au/styles/images</a>.
 *
 * This library provides utility classes for aspect-ratio images and cropping position adjustments.
 *
 * ### Utility Classes
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
 * ... or expressed as a percentage (increments of 10):<br>
 * <code>.position-x-10</code> <code>.position-x-20</code> <code>.position-x-30</code> ... <code>.position-x-100</code><br>
 * <code>.position-y-10</code> <code>.position-y-20</code> <code>.position-y-30</code> ... <code>.position-y-100</code>
 */

// Default Story
export default {
  tags: ["autodocs"],
  title: "3. Components/Image",

  render: (args) => {
    return Handlebars.compile(template)(args);
  },

  argTypes: {
    ratioClass: {
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

    otherClass: {
      name: "Other Classes",
      description:
        "Optional. Any additional classes to apply to the image element for custom styling.",
      control: "text",
    },

    figureClass: {
      name: "Figure Class",
      description:
        "Optional. Any custom class to pass to the figure element for additional styling.",
      control: "text",
    },

    positionX: {
      name: "Position X",
      description:
        "Optional. Adjust the horizontal image placement within the aspect ratio crop.",
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

    positionY: {
      name: "Position Y",
      description:
        "Optional. Adjust the vertical image placement within the aspect ratio crop.",
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

    width: {
      name: "Width",
      description:
        "Optional. Set the width of the image (e.g., '350', '100'). Use the unit fields to specify px or %.",
      control: "text",
    },

    widthUnit: {
      name: "Width Unit",
      description:
        "Select the unit for the width of the image. Choose 'px' for pixels or '%' for percentage.",
      control: { type: "select" },
      options: ["px", "%"],
    },

    height: {
      name: "Height",
      description:
        "Optional. Set the height of the image (optional - note responsive images will scale their height). Use the unit field to specify px or %.",
      control: "text",
    },

    heightUnit: {
      name: "Height Unit",
      description:
        "Optional. Select the unit for the height of the image. Choose 'px' for pixels or '%' for percentage.",
      control: { type: "select" },
      options: ["px", "%"],
    },

    caption: {
      name: "Caption",
      description:
        "Optional. Main caption text for the image (16px, line-height 24px). Provides context or additional information about the image. For accessibility: caption should complement (not duplicate) the alt text. Alt text describes what's in the image; caption provides context or additional information. Both are read by screen readers.",
      control: "text",
    },

    credit: {
      name: "Credit",
      description:
        "Optional. Credit/attribution text for the image (14px, line-height 20px, lighter color). Displays below the caption text.",
      control: "text",
    },

    // Disabled controls, not needed in Storybook UI
    // "tabindex", "role", "storycolumn"
    tabindex: {
      table: { disable: true },
    },

    role: {
      table: { disable: true },
    },

    storycolumn: {
      table: { disable: true },
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
 * Default Image
 */

export const DefaultImage = {
  args: {
    ...imagedata,
    ratioClass: "image-ratio-3x2",
  },
};

/**
 * Fixed ratio images
 */
export const UtilityClasses = {
  // Render several images, each with different ratios
  args: {
    image1x1: Handlebars.compile(template)({
      ...imagedata,
      ratioClass: "image-ratio-1x1",
      positionX: "position-x-left",
      positionY: "position-y-30",
    }),
    image3x2: Handlebars.compile(template)({
      ...imagedata,
      ratioClass: "image-ratio-3x2",
    }),
    image2x3: Handlebars.compile(template)({
      ...imagedata,
      ratioClass: "image-ratio-2x3",
    }),
    image4x3: Handlebars.compile(template)({
      ...imagedata,
      ratioClass: "image-ratio-4x3",
    }),
    image3x4: Handlebars.compile(template)({
      ...imagedata,
      ratioClass: "image-ratio-3x4",
      positionX: "position-x-40",
      positionY: "position-y-top",
    }),
    image16x9: Handlebars.compile(template)({
      ...imagedata,
      ratioClass: "image-ratio-16x9",
    }),
  },

  render: (args) => {
    return `
      <h2>Fixed Ratio Images with utility classes</h2>
      <div class="row">
        <strong>Default</strong><br><br>
        <div class="col-12 col-md-6 mb-4">${args.image3x2} <br><small>.image-ratio-3x2 (Default)</small></div>
      </div>
      <div class="row">
        <strong>Horizontal</strong><br><br>
        <div class="col-12 col-md-4 mb-4">${args.image1x1} <br><small>.image-ratio-1x1<br>.position-x-left<br>.position-y-30</small></div>
        <div class="col-12 col-md-4 mb-4">${args.image4x3} <br><small>.image-ratio-4x3</small></div>
        <div class="col-12 col-md-4 mb-4">${args.image16x9} <br><small>.image-ratio-16x9</small></div>
      </div>
      <div class="row">
        <strong>Vertical</strong><br><br>
        <div class="col-12 col-md-4 mb-4">${args.image2x3} <br><small>.image-ratio-2x3</small></div>
        <div class="col-12 col-md-4 mb-4">${args.image3x4} <br><small>.image-ratio-3x4<br>.position-x-40<br>.position-y-top</small></div>
      </div>
    `;
  },
};

/**
 * Figure with Image and caption
 *
 * This example demonstrates the structured caption with caption and credit fields.
 * The caption uses 16px font with 24px line-height, while the credit uses 14px font with 20px line-height and lighter color.
 */
export const FigureWithImageCaption = {
  args: {
    ...imagedata,
    caption:
      "This is a caption for the image. It can be long or short. Longer captions, like this one, should wrap to the next line.",
    credit: "Photo by Queensland Government",
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
  },

  render: (args) => {
    args.src = "assets/img/image-example-couple-beach-md.jpg";

    let imageTag = Handlebars.compile(template)({ ...args, caption: null });
    let imageTagWithCaption = Handlebars.compile(template)(args);

    let customTemplate = `
    <h2>Example image with caption, right aligned</h2>

    <!-- Bootstrap classes control layout -->
    <div class="mb-32 float-md-end ms-md-32 w-md-50">
      ${imageTagWithCaption}
    </div>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    
    <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.</p>

    <h2>Example image without caption, left aligned</h2>
    
    <!-- Bootstrap classes control layout -->
    <div class="mb-32 float-md-start me-md-32">
      ${imageTag}
    </div>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

    <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.</p>
    `;

    return customTemplate;
  },
};
