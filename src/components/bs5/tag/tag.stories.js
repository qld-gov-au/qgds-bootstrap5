// Tag.stories.js
import { Tag } from "./Tag.js";
import defaultdata from "./tag.data.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Tag",
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
};

// Default Tag story
export const Default = {
  args: defaultdata.default,
};

// Filter Tag story
export const Filter = {
  args: defaultdata.filter,
};

export const ParentContextComparison = {
  name: "Parent Context vs Component Variant Comparison",
  render: () => {
    const testTags = {
      variant: "",
      tagItems: [
        {
          content: "Information",
          classes: "tag-information",
        },
        {
          content: "<a href='javascript:void(0)'>Action</a>",
          classes: "tag-link",
        },
        {
          content: "Filter",
          classes: "tag-large",
          "applied-filter": true,
        },
        {
          content: "Large",
          classes: "tag-large",
        },
      ],
    };

    return `
      <div class="mb-4">
        <h6>Default (Light Theme)</h6>
        ${new Tag(testTags).html}
      </div>

      <div class="mb-4">
        <h6>Component Variant: tag-dark</h6>
        ${new Tag({ ...testTags, variant: "tag-dark" }).html}
      </div>

      <div class="dark p-3 mb-4" style="background-color: #1a1a1a;">
        <h6 class="text-white">Parent Context: .dark (no component variant)</h6>
        ${new Tag(testTags).html}
      </div>

      <div class="mb-4">
        <h6>Component Variant: tag-dark-alt</h6>
        ${new Tag({ ...testTags, variant: "tag-dark-alt" }).html}
      </div>

      <div class="dark-alt p-3 mb-4" style="background-color: #2c3e50;">
        <h6 class="text-white">Parent Context: .dark-alt (no component variant)</h6>
        ${new Tag(testTags).html}
      </div>
    `;
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
};
