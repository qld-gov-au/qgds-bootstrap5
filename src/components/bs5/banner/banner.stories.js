// Banner.stories.js
import Handlebars from "handlebars";

import template from "./banner.hbs?raw";
import defaultdata from "./banner.data.json";

//Import data objects required for the banner and any nested components
import breadcrumbdata from "../breadcrumbs/breadcrumbs.data.json";
import buttondata from "../button/button.data.json";
import carddata from "../card/card.data.json";

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
          "": "Default",
          light: "Light",
          alt: "Light Alternative",
          dark: "Dark",
          "dark-alt": "Dark Alternative",
        },
      },

      options: ["", "light", "alt", "dark", "dark-alt"],
    },

    texture: {
      name: "Texture",
      description: `Settable textures for the banner component`,
      control: {
        type: "radio",
        labels: {
          "none-bad": "None",
          "with-texture": "With Texture",
        },
      },
      options: ["none", "with-texture"],
    },

    "image.classes": {
      name: "Image Classes",
      description: `Settable image for the banner component`,
      control: {
        type: "radio",
        labels: {
          "align-fixed": "Align Fixed",
          "align-right": "Align Right",
          "align-grid": "Align Grid",
        },
      },
    },

    breadcrumbs: {
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
        exclude: ["image", "breadcrumbs"],
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
    variantClass: "dark-alt",
    title: false,
    abstract: false,
    image: false,
  },
};

/**
 * Banner with lead content
 */
export const WithAbstract = {
  args: {
    ...defaultdata,
    image: false,
  },
};

/**
 * Banner with background pattern
 */
export const WithTexture = {
  args: {
    ...defaultdata,
    title: "A long page title that wraps onto another line",
    texture: "with-texture",
    image: false,
  },
};

/**
 * Banner with feature image
 */
export const WithImage = {
  args: {
    ...defaultdata,
    variantClass: `${defaultdata.variantClass} has-image`,
    cta: "",
  },
  argTypes: {
    cta: {
      control: {
        type: "radio",
        options: ["none", "buttons", "cards"],
      },
    },
  },
  parameters: {
    controls: {
      exclude: ["cards"], // Exclude `cards` from manual control since it's derived
    },
  },
  decorators: [
    (Story, context) => {
      const { cta } = context.args;
      const cards = cta === "cards" ? carddata : {};
      return Story({ args: { ...context.args, cards } });
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

/**
 * Banner with call to action buttons
 */

export const WithCallToActionButtons = {
  title: "3. Components/Banners/Call to action/Buttons",
  args: {
    ...defaultdata,
    title: "Register your vehicle or motorcycle",
    abstract:
      "You can use this service to get a quote for your vehicle or motorcycle registration.",
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
};

/**
 * Banner with call to action cards
 */

export const WithCallToActionCards = {
  title: "3. Components/Banners/Call to action/Buttons",
  args: {
    ...defaultdata,

    title: "Register your vehicle or motorcycle",
    abstract:
      "You can use this service to get a quote for your vehicle or motorcycle registration.",
    cards: [
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
        title: "Banner link 2 with wrapping text onto another line",
        variantClass: "dark",
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
    ],
    image: false,
  },
};
