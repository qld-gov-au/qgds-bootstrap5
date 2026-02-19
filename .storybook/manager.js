import { addons } from "storybook/internal/manager-api";
//import { defaultConfig } from "storybook-addon-tag-badges/manager-helpers";

/**
 * Custom badge configuration for QGDS component library
 * Defines badges for core components (from Figma UI kit) and extended components (Queensland-specific)
 */
addons.setConfig({
  tagBadges: [
    // Extended component badge - Queensland-specific components not in core Figma kit
    {
      tags: "extended",
      badge: {
        text: "Extended",
        style: {
          backgroundColor: "#7C3D94", // Queensland purple
          color: "#FFFFFF",
        },
        tooltip:
          "Extended component - Available in this library only / yet to be added to Queensland Government Design System Figma UI kit",
      },
      display: {
        sidebar: ["component"],
        toolbar: true,
      },
    },

    // Include default badges from the addon (new, deprecated, experimental, etc.)
    //...defaultConfig,
  ],
});
