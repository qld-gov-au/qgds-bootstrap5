import { addons } from "storybook/internal/manager-api";
import { defaultConfig } from "storybook-addon-tag-badges/manager-helpers";

/**
 * Custom badge configuration for QGDS component library
 * Defines badges for core components (from Figma UI kit) and extended components (Queensland-specific)
 */
addons.setConfig({
  tagBadges: [
    // Core component badge - indicates component exists in Figma UI kit
    {
      tags: "core",
      badge: {
        text: "Core",
        bgColor: "#0A6C38", // Queensland green
        fgColor: "#FFFFFF",
        tooltip:
          "Core component - Available in the Queensland Government Design System Figma UI kit",
      },
      display: {
        sidebar: ["component"],
        toolbar: true,
      },
    },

    // Extended component badge - Queensland-specific components not in core Figma kit
    {
      tags: "extended",
      badge: {
        text: "Extended",
        bgColor: "#7C3D94", // Queensland purple
        fgColor: "#FFFFFF",
        tooltip:
          "Extended component - Queensland-specific component not available in the core Figma UI kit",
      },
      display: {
        sidebar: ["component"],
        toolbar: true,
      },
    },

    // Alias badge for "also known as" component names
    {
      tags: /^aka:/,
      badge: ({ tag }) => {
        const alias = tag.replace("aka:", "");
        return {
          text: `Also: ${alias}`,
          bgColor: "#4D96D2", // Queensland blue
          fgColor: "#FFFFFF",
          tooltip: `This component is also known as "${alias}"`,
        };
      },
      display: {
        sidebar: ["component"],
        toolbar: true,
      },
    },

    // Include default badges from the addon (new, deprecated, experimental, etc.)
    ...defaultConfig,
  ],
});
