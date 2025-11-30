import defaultdata from "./banner.data.json";
import { Banner } from "./Banner";

//Import data objects required for the banner and any nested components
import breadcrumbdata from "../breadcrumbs/breadcrumbs.data.json";
import buttondata from "../button/button.data.json";

const exampleCardData = [
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
];

const exampleMixedCardData = [
  {
    title: "Banner link 1",
    variantClass: "default",
    action: "single",
    link: "https://www.qld.gov.au",
    arrow: true,
  },
  {
    title: "Banner link 2",
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
];

const exampleButtonData = [
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

export default {
  tags: ["autodocs", "core"],
  title: "3. Components/Banners",
  render: (args) => {
    //Adds breadcrumbs to all banner stories, if it isn't already defined or false
    args.breadcrumbs = args.breadcrumbs || breadcrumbdata["default"];
    return new Banner(args).html;
  },

  decorators: [
    (Story, context) => {
      const { args } = context; // Destructure args from context

      // Normalise "none" values
      if (args.variantClass === "none") args.variantClass = "";
      if (args.titleClasses === "none") args.titleClasses = "";
      if (["none", ""].includes(args.backgroundType))
        Object.assign(args, { backgroundType: "", image: false });

      // Merge title and subtitle if block style not used
      if (!args.titleClasses.includes("as-block")) {
        if (args.title) {
          args.title = `${args.title} ${args.subtitle ? args.subtitle : ""}`;
          args.subtitle = "";
        }
      }

      // Provide cards or buttons if callToAction is set to true
      switch (args.callToAction) {
        case "buttons":
          args.buttons = args.buttons ?? exampleButtonData;
          args.cards = false;
          break;
        case "cards":
          args.cards = args.cards ?? exampleCardData;
          args.buttons = false;
          break;
        case "cardsMixed":
          args.cards = args.cards ?? exampleMixedCardData;
          args.buttons = false;
          break;
        case "none":
        default:
          args.cards = false;
          args.buttons = false;
          break;
      }

      // Return the updated story
      return Story({ args: { ...args } });
    },
  ],

  argTypes: {
    // Disable controls for these fields
    breadcrumbs: { table: { disable: true } },
    cards: { table: { disable: true } },
    buttons: { table: { disable: true } },
    subtitle: { table: { disable: true } },

    titleClasses: {
      table: { disable: true },
      name: "Title Style",
      description: `Settable classes for the title component`,
      control: {
        type: "radio",
        labels: {
          none: "Default",
          "as-block": "Block title",
        },
      },
      options: ["none", "as-block"],
    },

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
          "with-hero-image": "With Hero Image",
        },
      },
      options: ["none", "with-texture", "with-bg-image", "with-hero-image"],
    },

    ["image.classes"]: {
      name: "Image Classes",
      description: `Settable classes for the hero image placement. Background Type must be set to "with-hero-image"`,
      control: {
        type: "radio",
        labels: {
          default: "Default",
          "align-grid": "Align grid",
          "align-right": "Align right",
          "align-right with-gradient": "Align right (with gradient)",
        },
      },
      options: [
        "default",
        "align-grid",
        "align-right",
        "align-right with-gradient",
      ],
    },

    callToAction: {
      name: "Call to Action",
      description: `Adds call to action options on the banner component`,
      control: {
        type: "radio",
        labels: {
          none: "None",
          buttons: "Buttons",
          cards: "Cards",
          cardsMixed: "Cards (Mixed)",
        },
      },
      options: ["none", "buttons", "cards", "cardsMixed"],
    },

    //Disable bannerType control
    bannerType: {
      table: { disable: true },
      control: { type: "hidden" }, // Hide the control in the Storybook UI
    },
  },
};

/**
 * Default banner with breadcrumbs
 */

export const Default = {
  args: {
    ...defaultdata,
    variantClass: "dark",
    bannerType: "banner-default",
    title: "Heading 1",
    subtitle: "",
    titleClasses: [],
    abstract: false,
    backgroundType: "",
    callToAction: false,
  },
};

/**
 * "No-banner" banner contains breadcurmbs only
 */
export const NoBanner = {
  args: {
    ...defaultdata,
    variantClass: "dark-alt",
    bannerType: "no-banner",
    title: false,
    subtitle: false,
    abstract: false,
    image: false,
  },

  argTypes: {
    //Remove default controls that aren't needed here
    callToAction: { table: { disable: true } },
    image: { table: { disable: true } },
    title: { table: { disable: true } },
    abstract: { table: { disable: true } },
    backgroundType: { table: { disable: true } },
    ["image.classes"]: { table: { disable: true } },
  },
};

/**
 * Banner basic
 */

export const BannerBasic = {
  args: {
    ...defaultdata,
    variantClass: "dark",
    bannerType: "banner-basic ",
    title: "Heading 1",
    subtitle: false,
    image: false,
    abstract:
      "Renew your licence at a customer service centre, government office or police station.",
    callToAction: "none",
  },

  argTypes: {
    //Remove default controls that aren't needed here
    callToAction: { table: { disable: true } },
    image: { table: { disable: true } },
    ["image.classes"]: { table: { disable: true } },
    backgroundType: {
      //Remove "with-hero-image" option
      options: ["none", "with-texture", "with-bg-image"],
      control: {
        type: "radio",
        labels: {
          none: "None",
          "with-texture": "With Texture",
          "with-bg-image": "With Background Image",
        },
      },
    },
  },
};

/**
 * Banner basic with backgrounds
 */
export const BannerBasicBackgrounds = {
  name: "Banner Basic (With Backgrounds)",
  args: {
    ...defaultdata,
    variantClass: "dark",
    bannerType: "banner-basic",
    title: "Heading 1",
    subtitle: "",
    titleClasses: [],
    backgroundType: "with-texture",
    abstract:
      "Renew your licence at a customer service centre, government office or police station.",
    callToAction: false,
  },

  argTypes: {
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
    image: { table: { disable: true } },
    ["image.classes"]: { table: { disable: true } },
  },
};

/**
 * With Call To Action Buttons
 */
export const BannerAdvancedButtons = {
  name: "Banner Advanced (With Buttons)",
  args: {
    ...defaultdata,
    variantClass: "dark",
    bannerType: "banner-advanced",
    title: "Heading 1",
    subtitle: "",
    titleClasses: [],
    backgroundType: "with-hero-image",
    ["image.classes"]: "align-grid",
    abstract:
      "Renew your licence at a customer service centre, government office or police station.",
    callToAction: "buttons",
    cards: [],
    buttons: exampleButtonData,
  },

  argTypes: {
    backgroundType: {
      name: "Background Type",
      control: {
        type: "radio",
        labels: {
          none: "None",
          "with-texture": "With Texture",
          "with-bg-image": "With Background Image",
          "with-hero-image": "With Hero Image",
        },
      },
      options: ["none", "with-texture", "with-bg-image", "with-hero-image"],
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
    variantClass: "dark",
    bannerType: "banner-advanced",
    title: "Heading 1",
    backgroundType: "",
    abstract:
      "Renew your licence at a customer service centre, government office or police station.",
    callToAction: "cards",
    cards: exampleCardData,
  },

  argTypes: {
    backgroundType: {
      name: "Background Type",
      control: {
        type: "radio",
        labels: {
          none: "None",
          "with-texture": "With Texture",
          "with-bg-image": "With Background Image",
          "with-hero-image": "With Hero Image",
        },
      },
      options: ["none", "with-texture", "with-bg-image", "with-hero-image"],
    },
  },
};

/**
 * With Image options
 */
export const BannerAdvancedHeroImage = {
  name: "Banner Advanced (Hero Image)",
  args: {
    ...defaultdata,
    variantClass: "dark",
    bannerType: "banner-advanced",
    title: "Heading 1",
    backgroundType: "with-hero-image",
    abstract:
      "Renew your licence at a customer service centre, government office or police station.",
    ["image.classes"]: ["align-right", "with-gradient"],
  },

  argTypes: {
    backgroundType: {
      name: "Background Type",
      control: {
        type: "radio",
        labels: {
          none: "None",
          "with-texture": "With Texture",
          "with-bg-image": "With Background Image",
          "with-hero-image": "With Hero Image",
        },
      },
      options: ["none", "with-texture", "with-bg-image", "with-hero-image"],
    },
  },
};

/**
 * Banner with Block Title
 */
export const BannerAdvancedBlockTitle = {
  name: "Banner Advanced (Block Title)",
  args: {
    ...defaultdata,
    variantClass: "dark",
    bannerType: "banner-advanced",
    title: "Disaster recovery",
    subtitle: "and support",
    abstract:
      "Financial help and support services to help you recover if you're affected by a disaster.",
    titleClasses: ["as-block"],
    backgroundType: "with-texture",
    callToAction: "buttons",
    breadcrumbs: {
      breadcrumbs: [
        { link: "#", linktext: "Home" },
        { link: "#", linktext: "Community support" },
        { link: "#", linktext: "Disaster support and recovery" },
        { link: "#", linktext: "Example page title 1" },
        { link: "#", linktext: "Example page title 2" },
        { link: "#", linktext: "Current page" },
      ],
    },
    ["image.classes"]: "align-grid",
  },
  argTypes: {
    backgroundType: {
      name: "Background Type",
      control: {
        type: "radio",
        labels: {
          none: "None",
          "with-texture": "With Texture",
          "with-bg-image": "With Background Image",
          "with-hero-image": "With Hero Image",
        },
      },
      options: ["none", "with-texture", "with-bg-image", "with-hero-image"],
    },
    subtitle: { table: { disable: false } },
  },
};
