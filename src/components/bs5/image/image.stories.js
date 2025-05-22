/**
 *
 * Image utilities to create a responsive and fixed-ratio images.
 */

import Handlebars from "handlebars";

import imagedata from "./image.data.json";
import template from "./image.hbs?raw";

/**
 *
 * Images displayed in the Design System should be presented with a standard aspect ratio. Guidance is available at <a href="https://www.designsystem.qld.gov.au/styles/images">https://www.designsystem.qld.gov.au/styles/images</a>.
 *
 * This QGDS Bootstrap 5 library provides the following utility classes for fixed-ratio images and position adjustments.
 *
 * ###Ratios
 * **Horizontal**<br><code>.image-ratio-1x1</code>
 * <code>.image-ratio-3x2</code>
 * <code>.image-ratio-4x3</code>
 * <code>.image-ratio-16x9</code>

 * **Vertical**<br>
 * <code>.image-ratio-2x3</code>
 * <code>.image-ratio-3x4</code>

 * **Position adjustment**<br>
 * <code>.position-x-left</code> <code>.position-x-center</code> <code>.position-x-right</code><br>
 * <code>.position-y-top</code> <code>.position-y-center</code> <code>.position-y-bottom</code>
 *
 * ###Responsive
 * Images will also accept the Bootstrap 5 responsive image utility class <code>.img-fluid</code>, which ensures they scale to the container they are rendered into.
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
      description: `Settable ratio class for the Image component`,
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
      // The options for the ratio classes.
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
      description: `Adjust the image placement within the fixed ratio crop (horizontal)`,
      control: {
        type: "radio",
        labels: {
          "position-x-left": "Left",
          "position-x-center": "Center",
          "position-x-right": "Right",
        },
      },
      // The options for the position classes.
      options: ["position-x-left", "position-x-center", "position-x-right"],
    },

    "positionY": {
      name: "Position Y",
      description: `Adjust the image placement within the fixed ratio crop (vertical)`,
      control: {
        type: "radio",
        labels: {
          "position-y-top": "Top",
          "position-y-center": "Center",
          "position-y-bottom": "Bottom",
        },
      },
      // The options for the position classes.
      options: ["position-y-top", "position-y-center", "position-y-bottom"],
    },

    //Disbale controls for the image source and alt text, as they are not meant to be changed in the storybook.
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
    "style": {
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
 *  Fixed ratio image
 *
 */

export const FixedRatio = {
  args: {
    ...imagedata,
    //Custom class for the storybook wrapper only
    storycolumn: "col-md-6",
  },
};

/**
 *
 * Image with caption (Figure)
 *
 */

export const FixedRatioWithCaption = {
  args: {
    ...imagedata,
    caption: "This is a caption for the image.",
  },
};

/**
 * Floats
 *
 * Images can be floated to the left or right within a container using Bootstrap 5's float utilities. (https://getbootstrap.com/docs/5.0/utilities/float/#responsive)
 * <code>.float-start</code>
 * <code>.float-end</code>
 * <code>.float-none</code>
 */

export const FixedRatioFloat = {
  args: {
    ...imagedata,
    caption: "This is a caption for the image.",
    figureClass: "",
  },

  render: (args) => {
    let imageTag = Handlebars.compile(template)(args);

    let customTemplate = `
      
    <h2>Expand on the heading in the first paragraph</h2>

    <!-- Image with fixed ratio, and floated on medium and above screens -->
    <div class="float-md-end ms-md-32 mb-md-32">
      ${imageTag}
    </div>
  
    <p>
      The first paragraph under a heading helps people decide if they've found the information they need. Search engines also use first paragraphs when analysing content.
    </p>

    <p>
      Use the first paragraph to make the purpose of your content easier to find in searches. It should include a topic sentence and summarise the following paragraphs.
    </p>

    <p>
      You can use first paragraphs to improve long-form content, such as reports. First paragraphs can summarise the main points in each section.
    </p>

    <p>
      Copy and paste all the first paragraphs together to compile a summary of your content. If you're missing any main points, rewrite some of your first paragraphs.
    </p>

    <h2>Structure each paragraph well</h2>

    <p>
      The first sentence in each paragraph should be a topic or transition sentence. A topic sentence tells people what the paragraph is about. A transition sentence explicitly connects the previous paragraph with the new.
    </p>

    <p>Each paragraph should contain sentences that are arranged logically and relate only to the topic.</p>

    <p>A paragraph's concluding sentence usually summarises the topic or leads into the next paragraph.</p>
    `;

    return customTemplate;
  },
};

/**
 * Image with caption
 *
 * Images can be wrapped in a <code>&lt;figure&gt;</code> element to provide a caption. The <code>&lt;figcaption&gt;</code> element is used to provide a caption for the image.
 *
 */

export const Figure = {
  args: {
    ...imagedata,
    caption: "This is a caption for the image.",
    classes: {
      ...imagedata.classes,
    },
  },
};
