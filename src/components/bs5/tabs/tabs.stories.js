// ComponentExample.stories.js
import { Tabs } from "./tabs.js";
import defaultdata from "./tabs.data.json";
import metadata from "./metadata.json";

// Generate argTypes for tab items dynamically
const generateTabItemArgTypes = () => {
  const argTypes = {};
  const tabCount = defaultdata.data.items.length;

  for (let i = 0; i < tabCount; i++) {
    argTypes[`data.items.${i}.tab_text`] = {
      name: `tabs item ${i} tab_text`,
      description: `Tab ${i + 1} label text`,
      control: "text",
    };
    argTypes[`data.items.${i}.title`] = {
      name: `tabs item ${i} title`,
      description: `Tab ${i + 1} section heading`,
      control: "text",
    };
    argTypes[`data.items.${i}.icon`] = {
      name: `tabs item ${i} icon`,
      description: `Tab ${i + 1} icon classes`,
      control: "text",
    };
    argTypes[`data.items.${i}.content`] = {
      name: `tabs item ${i} content`,
      description: `Tab ${i + 1} content HTML`,
      control: "text",
    };
    argTypes[`data.items.${i}.disabled`] = {
      name: `tabs item ${i} disabled`,
      description: `Tab ${i + 1} disabled state`,
      control: "boolean",
    };
  }

  return argTypes;
};

export default {
  tags: ["autodocs"],
  title: "3. Components/Tabs",
  render: (args) => {
    return new Tabs(args).html;
  },

  //https://storybook.js.org/docs/api/arg-types
  argTypes: {
    type_variant: {
      description: "Type of tab system",
      control: "select",
      options: ["container-tabs", "section-tabs"],
    },
    variant: {
      description: "Type variant for the tab system",
      control: "select",
      options: ["default", "light", "alt", "dark", "dark-alt"],
    },
    tab_variant: {
      description:
        "The previous sibling variant value is used to set the tab system colour scheme in the tab section component.",
      control: "select",
      options: ["default", "light", "alt", "dark", "dark-alt"],
    },
    unique_id: {
      description: "Each tab system must have a unique id",
      control: "text",
      defaultValue: "12345",
    },
    // Dynamically generated tab item controls
    ...generateTabItemArgTypes(),
  },

  parameters: {
    coderefs: {
      metadata,
      partialname: "tabs", //{{> tabs }}
    },
  },
};

/**
 *
 * Tabs - Section Tabs Default Dark
 */
export const SectionTabsDefaultDark = {
  args: defaultdata,
};

/**
 * Tabs - Container Tabs Default
 */
export const ContainerTabsDefault = {
  args: {
    ...defaultdata,
    type_variant: "container-tabs",
    unique_id: "234566",
    variant: "default",
  },
};

/**
 * Tabs - Container Tabs Light
 */
export const ContainerTabsLight = {
  args: {
    ...defaultdata,
    type_variant: "container-tabs",
    unique_id: "345678",
    variant: "light",
  },
};

/**
 * Tabs - Container Tabs Alt
 */
export const ContainerTabsAlt = {
  args: {
    ...defaultdata,
    type_variant: "container-tabs",
    unique_id: "456789",
    variant: "alt",
  },
};

/**
 * Tabs - Container Tabs Dark
 */
export const ContainerTabsDark = {
  args: {
    ...defaultdata,
    type_variant: "container-tabs",
    unique_id: "567890",
    variant: "dark",
  },
};

/**
 * Tabs - Container Tabs Dark-Alt
 */
export const ContainerTabsDarkAlt = {
  args: {
    ...defaultdata,
    type_variant: "container-tabs",
    unique_id: "123456",
    variant: "dark-alt",
  },
};
