// tag--large.stories.js
import { Tag } from "./Tag.js";
import defaultdata from "./tag.data.json";
import metadata from "./metadata.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Tag/Large",
  render: (args) => new Tag(args).html,
  argTypes: {
    variant: {
      description: `Tags theme`,
      control: {
        type: "radio",
        labels: {
          "tag-default": "Default",
          "tag-alt": "Alt",
          "tag-dark": "Dark",
          "tag-dark-alt": "Dark-alt",
        },
      },
      options: ["tag-default", "tag-alt", "tag-dark", "tag-dark-alt"],
    },
  },
  parameters: {
    coderefs: {
      metadata,
      partialname: "tag", //{{> tag }}
    },
  },
};

// Large Tag story
export const Large = {
  args: defaultdata.large,
};

// Large Information Tag story with all variants
export const LargeInformation = {
  name: "Large Information variants",
  args: {
    ...defaultdata.info,
    tagItems: defaultdata.info.tagItems.map((item) => ({
      ...item,
      classes: `${item.classes} tag-large`,
    })),
  },
};

// Large Action Tag story with all variants
export const LargeAction = {
  name: "Large Action variants",
  args: {
    ...defaultdata.action,
    tagItems: defaultdata.action.tagItems.map((item) => ({
      ...item,
      classes: `${item.classes} tag-large`,
    })),
  },
};
