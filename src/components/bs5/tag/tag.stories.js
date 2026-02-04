// Tag.stories.js
import { Tag } from "./Tag.js";
import defaultdata from "./tag.data.json";
import metadata from "./metadata.json";

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
          "tag-light": "Light",
          "tag-alt": "Alt",
          "tag-dark": "Dark",
          "tag-dark-alt": "Dark-alt",
        },
      },
      options: [
        "tag-default",
        "tag-light",
        "tag-alt",
        "tag-dark",
        "tag-dark-alt",
      ],
    },
  },
  parameters: {
    coderefs: {
      metadata,
      partialname: "tag", //{{> tag }}
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
      classes: "p-4 my-2",
      tagItems: [
        {
          content: "default",
          classes: "",
        },
        {
          content: "Information",
          classes: "tag-info",
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
          classes: "tag-info tag-large",
        },
        {
          content: "Large",
          classes: "tag-link tag-large",
        },
      ],
    };

    return `
      <div class="mb-4">
        <h6>Default</h6>
        ${new Tag(testTags).html}
      </div>

      <div class="mb-4">
        <h6>Component Variant: tag-light</h6>
        ${new Tag({ ...testTags, variant: "tag-light" }).html}
      </div>

      <div class="mb-4">
        <h6>Component Variant: tag-alt</h6>
        ${new Tag({ ...testTags, variant: "tag-alt" }).html}
      </div>

      <div class="mb-4">
        <h6>Component Variant: tag-dark</h6>
        ${new Tag({ ...testTags, variant: "tag-dark" }).html}
      </div>

      <div class="mb-4">
        <h6>Component Variant: tag-dark-alt</h6>
        ${new Tag({ ...testTags, variant: "tag-dark-alt" }).html}
      </div>
    `;
  },
  parameters: {
    controls: {
      disable: true,
    },
    coderefs: {
      show: false,
    },
  },
};
