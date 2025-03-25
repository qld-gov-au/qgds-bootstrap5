// Banner.stories.js
import Handlebars from "handlebars";

import template from "./banner.hbs?raw";
import defaultdata from "./banner.data.json";

//Import data objects required for the banner and any nested components
import breadcrumbdata from "../breadcrumbs/breadcrumbs.data.json";
import buttondata from "../button/button.data.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Banners",
  render: (args) => {
    //Adds breadcrumbs to all banner stories, if it isn't already defined or false
    args.breadcrumbs = args.breadcrumbs || breadcrumbdata["default"];
    return new Handlebars.compile(template)(args);
  },

  decorators: [
    (Story, context) => {
      const { args } = context; // Destructure args from context

      console.log(args);

      // Normalise "none" values
      if (args.variantClass === "none") args.variantClass = "";
      if (args.backgroundType === "none" || args.backgroundType === "") {
        args.backgroundType = "";
        args.image = false;
      }

      if (args.backgroundType.includes("with-bg-image")) {
        const activeVariant = args.variantClass || "default";
        args.image = {};
        args.image.url = `assets/img/banner-desktop-${activeVariant}.jpg`;
      }

      // Return the updated story
      return Story({ args: { ...args } });
    },
  ],

  argTypes: {
    // Disable controls for multiple fields
    callToAction: { table: { disable: true } },
    //image: { table: { disable: true } },
    breadcrumbs: { table: { disable: true } },
    cards: { table: { disable: true } },
    buttons: { table: { disable: true } },

    variantClass: {
      name: "Variant Class",
      description: `Settable backgrounds for the banner component`,
      control: {
        type: "radio",
        labels: {
          none: "Default",
          light: "Light",
          "light-alt": "Light Alternative",
          dark: "Dark",
          "dark-alt": "Dark Alternative",
        },
      },
      options: ["none", "light", "light-alt", "dark", "dark-alt"],
    },

    backgroundType: {
      name: "Background Type",
      control: {
        type: "radio",
        labels: {
          none: "None",
          "with-texture": "With Texture",
          "with-bg-image": "With Background Image",
        },
      },
      options: ["none", "with-texture", "with-bg-image"],
    },

    "image.classes": {
      name: "Image Classes",
      control: {
        type: "radio",
        labels: {
          default: "Default",
          "align-grid": "Align grid",
          "align-right": "Align right",
        },
      },
      options: ["default", "align-grid", "align-right"],
    },
  },
};

/**
 * Default banner with breadcrumbs
 */

export const Default = {
  args: {
    ...defaultdata,
    title: "Heading 1",
    abstract: "",
    backgroundType: "with-bg-image",
    image: false,
  },

  argTypes: {
    //Remove default controls that aren't needed here
    callToAction: { table: { disable: true } },
    image: { table: { disable: true } },
    "image.classes": { table: { disable: true } },
  },
};

/**
 * "No-banner" banner
 */
export const NoBanner = {
  args: {
    ...defaultdata,
    variantClass: "no-banner dark-alt",
    title: false,
    abstract: false,
    image: false,
  },

  argTypes: {
    //Remove default controls that aren't needed here
    callToAction: { table: { disable: true } },
    image: { table: { disable: true } },
    "image.classes": { table: { disable: true } },
  },
};

/**
 * Basic Banners
 */

export const BannerBasic = {
  args: {
    ...defaultdata,
    title: "Heading 1",
    image: false,
    abstract:
      "Renew your licence at a customer service centre, government office or police station.",
    callToAction: "none",
  },

  argTypes: {
    //Remove default controls that aren't needed here
    callToAction: { table: { disable: true } },
    image: { table: { disable: true } },
    "image.classes": { table: { disable: true } },
  },
};

/**
 * With Call To Action Buttons
 */
export const BannerAdvancedButtons = {
  name: "Banner Advanced (With Buttons)",
  args: {
    ...defaultdata,
    abstract:
      "Renew your licence at a customer service centre, government office or police station.",
    callToAction: "buttons",
    cards: [],
    buttons: [
      {
        ...buttondata,
        iconClass: false,
      },
      {
        ...buttondata,
        classes: ["btn-secondary"],
        variantClass: "btn-secondary",
      },
    ],
  },

  argTypes: {
    //Add an extra option to the backgroundType control
    backgroundType: {
      name: "Background Type",
      control: {
        type: "radio",
        labels: {
          none: "None",
          "with-image": "With Image",
          "with-texture": "With Texture",
        },
      },
      options: ["none", "with-image", "with-texture"],
    },
  },
};

/**
 * With Call To Action Cards
 */
export const BannerAdvancedCards = {
  name: "Banner Advanced (With Cards)",
  args: {
    ...defaultdata,
    abstract:
      "Renew your licence at a customer service centre, government office or police station.",
    callToAction: "cards",
    cards: [
      {
        title: "Banner link 1",
        variantClass: "default",
        action: "single",
        link: "https://www.qld.gov.au",
        arrow: true,
      },
      {
        title: "Banner link 2",
        variantClass: "default",
        action: "single",
        link: "https://www.qld.gov.au",
        arrow: true,
      },
      {
        title: "Banner link 3",
        variantClass: "default",
        action: "single",
        link: "https://www.qld.gov.au",
        arrow: true,
      },
    ],
  },

  argTypes: {
    //Add an extra option to the backgroundType control
    backgroundType: {
      name: "Background Type",
      control: {
        type: "radio",
        labels: {
          none: "None",
          "with-image": "With Image",
          "with-texture": "With Texture",
        },
      },
      options: ["none", "with-image", "with-texture"],
    },
  },
};

/**
 * Banner with feature image (angled)
 */
// export const WithFeatureImageAngle = {
//   args: {
//     ...defaultdata,
//     image: {
//       ...defaultdata.image,
//       classes: ["image-angle"],
//     },
//   },
// };
