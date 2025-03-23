// Banner.stories.js
import Handlebars from "handlebars";

import template from "./banner.hbs?raw";
import defaultdata from "./banner.data.json";

//Import data objects required for the banner and any nested components
import breadcrumbdata from "../breadcrumbs/breadcrumbs.data.json";
import buttondata from "../button/button.data.json";

const carddata = [
  {
    title: "Banner link 1",
    variantClass: "default",
    action: "single",
    link: "https://www.qld.gov.au",
    arrow: true,
  },
  {
    title: "Banner link 2 with wrapping text onto another line",
    variantClass: "alt",
    action: "single",
    link: "https://www.qld.gov.au",
    arrow: true,
  },
  {
    title: "Banner link 3",
    variantClass: "dark-alt",
    action: "single",
    link: "https://www.qld.gov.au",
    arrow: true,
  },
];

export default {
  tags: ["autodocs"],
  title: "3. Components/Banners",
  render: (args) => {
    //Adds breadcrumbs to all banner stories, if it isn't already defined or false
    args.breadcrumbs = args.breadcrumbs || breadcrumbdata["default"];
    return new Handlebars.compile(template)(args);
  },

  argTypes: {
    variantClass: {
      name: "Variant Class",
      description: `Settable backgrounds for the banner component`,
      control: {
        type: "radio",
        labels: {
          none: "Default",
          light: "Light",
          alt: "Light Alternative",
          dark: "Dark",
          "dark-alt": "Dark Alternative",
        },
      },
      options: ["none", "light", "alt", "dark", "dark-alt"],
    },

    image: {
      table: {
        disable: true,
      },
    },

    breadcrumbs: {
      table: {
        disable: true,
      },
    },

    cards: {
      table: {
        disable: true,
      },
    },

    buttons: {
      table: {
        disable: true,
      },
    },
  },

  parameters: {
    docs: {
      controls: {
        hideNoControlsWarning: true,
      },
    },
  },
};

/**
 * Default banner with breadcrumbs
 */

export const Default = {
  args: {
    ...defaultdata,
    abstract: "",
    image: false,
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
};

/**
 * Basic Banners
 */

export const BannerBasic = {
  args: {
    ...defaultdata,
    title: "A long page title that wraps onto another line",
    image: false,
    abstract:
      "Renew your licence at a customer service centre, government office or police station.",
    callToAction: "none",
  },

  argTypes: {
    backgroundType: {
      name: "Background Type",
      control: {
        type: "radio",
        labels: {
          none: "None",
          "with-texture": "With Texture",
        },
      },
      options: ["none", "with-texture"],
    },
    callToAction: {
      table: {
        disable: true,
      },
    },
  },
};

/**
 * Banner with feature image
 */
export const BannerAdvanced = {
  args: {
    ...defaultdata,
    abstract:
      "Renew your licence at a customer service centre, government office or police station.",
    callToAction: "buttons",
    cards: [],
    buttons: [],
  },

  argTypes: {
    backgroundType: {
      name: "Background Type",
      description: `Background options for the banner component`,
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

    callToAction: {
      name: "Call to action",
      description: `Settable call to action for the banner component`,
      control: {
        type: "radio",
        labels: {
          default: "None",
          buttons: "Buttons",
          cards: "Cards",
        },
      },
      options: ["default", "buttons", "cards"],
    },
  },

  decorators: [
    (Story, context) => {
      const { args } = context; // Destructure args from context
      const { callToAction, variantClass, backgroundType } = args; // Destructure specific properties

      // Handle "cards" callToAction
      if (callToAction === "cards") {
        args.buttons = [];
        args.cards = carddata;
      }

      // Handle "buttons" callToAction
      if (callToAction === "buttons") {
        args.cards = [];
        args.buttons = [
          {
            ...buttondata,
            iconClass: false,
          },
          {
            ...buttondata,
            classes: ["btn-secondary"],
            variantClass: "btn-secondary",
          },
        ];
      }

      // Normalise "none" values
      if (variantClass === "none") args.variantClass = "";
      if (backgroundType === "none") args.backgroundType = "";
      if (backgroundType === "none") args.image = false;

      // Return the updated story
      return Story({ args: { ...args } });
    },
  ],
};

/**
 * Banner with feature image (angled)
 */
export const WithFeatureImageAngle = {
  args: {
    ...defaultdata,
    image: {
      ...defaultdata.image,
      classes: ["image-angle"],
    },
  },
};
