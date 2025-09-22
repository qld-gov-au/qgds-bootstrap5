// Tag.stories.js
import { Tag } from './Tag.js';
import defaultdata from './tag.data.json';

const sizes = {
  "": "Small (Default)",
  "tag-large": "Large",
};

const emphasis = {
  "tag-low": "Low",
  "tag-high": "High",
};

const types = {
  "tag-neutral": "Neutral",
  "tag-success": "Success",
  "tag-warning": "Warning",
  "tag-error": "Error",
  "tag-information": "Information",
}

/**
 * Construct Status tag for all possible variants with various sizes, emphasis levels, and types.
 * @returns {HTML} HTMLMarkup of the tags.
 */
function statusVariantsMarkup() {
  //Map through the emphasis levels and sizes objects.
  return Object.entries(emphasis).map(([emClass, emLabel]) => {
    return Object.entries(sizes).map(([sizeClass, sizeLabel]) => {
      //Construct tagItems for each types.
      let tagItems = [];
      Object.entries(types).map(([typeClass, typeLabel]) => {
        tagItems.push({
          content: `${typeLabel}`,
          classes: `${typeClass}`,
        });
      });

      //Generate Tag component markup from all possible tag types.
      const tagHtml =  new Tag({
        variant: defaultdata.status.variant,
        tagItems: tagItems,
        size: sizeClass,
        emphasis: emClass,
      }).html;

      //Return Tag component markup in grid with tag's emphasis and size as label. 
      return `<div class="d-grid mb-4">
                <div class="fw-bold">${emLabel} ${sizeLabel}</div>
                <div class="btn-toolbar">
                  ${tagHtml}
                </div>
              </div>`;
    }).join('')
  }).join('');
}

export default {
  tags: ['autodocs'],
  title: '3. Components/Tag',
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

// Info Tag story
export const Information = {
  args: defaultdata.info,
};

// Action Tag story
export const Action = {
  args: defaultdata.action,
};

// Filter Tag story
export const Filter = {
  args: defaultdata.filter,
};

// Large Tag story
export const Large = {
  args: defaultdata.large,
};

// Dark Tag story
export const Dark = {
  args: defaultdata.dark,
};

// Status Tag story
export const Status = {
  args: defaultdata.status,
  argTypes: {
    size: {
      description: "Size",
      control: {
        type: "radio",
        labels: sizes,
      },
      options: Object.keys(sizes),
    },
    emphasis: {
      description: "Emphasis",
      control: {
        type: "radio",
        labels: emphasis,
      },
      options: Object.keys(emphasis),
    },
  },
};

/**
 * Show the Default mode of Status tags in all possible variants.
 * This Story can be used to help in troubleshooting.
 */
export const AllStatusVariantsInDefaultMode = {
  render:() => {
    return statusVariantsMarkup();
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
};

// Parent Context Support Stories
export const ParentContextDark = {
  name: 'Parent Context - Dark',
  args: {
    variant: "", // No variant to test parent context override
    tagItems: [
      {
        content: "Information tag",
        classes: "tag-information",
      },
      {
        content: "<a href='javascript:void(0)'>Action tag</a>",
        classes: "tag-link",
      },
      {
        content: "Large filter tag",
        classes: "tag-large",
        "applied-filter": true,
      },
      {
        content: "Info tag",
        classes: "tag-info",
      },
    ],
  },
  render: (args) => {
    return `
      <div class="dark p-4" style="background-color: #1a1a1a;">
        <h6 class="text-white mb-3">Tags inside .dark parent context</h6>
        ${new Tag(args).html}
      </div>
    `;
  },
  parameters: {
    backgrounds: {
      default: 'Dark',
      values: [
        { name: 'Dark', value: '#1a1a1a' },
      ],
    },
  },
};

export const ParentContextDarkAlt = {
  name: 'Parent Context - Dark Alt',
  args: {
    variant: "", // No variant to test parent context override
    tagItems: [
      {
        content: "Information tag",
        classes: "tag-information",
      },
      {
        content: "<a href='javascript:void(0)'>Action tag</a>",
        classes: "tag-link",
      },
      {
        content: "Large filter tag",
        classes: "tag-large",
        "applied-filter": true,
      },
      {
        content: "Info tag",
        classes: "tag-info",
      },
    ],
  },
  render: (args) => {
    return `
      <div class="dark-alt p-4" style="background-color: #2c3e50;">
        <h6 class="text-white mb-3">Tags inside .dark-alt parent context</h6>
        ${new Tag(args).html}
      </div>
    `;
  },
  parameters: {
    backgrounds: {
      default: 'Dark Alt',
      values: [
        { name: 'Dark Alt', value: '#2c3e50' },
      ],
    },
  },
};

export const ParentContextComparison = {
  name: 'Parent Context vs Component Variant Comparison',
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
        ${new Tag({...testTags, variant: "tag-dark"}).html}
      </div>

      <div class="dark p-3 mb-4" style="background-color: #1a1a1a;">
        <h6 class="text-white">Parent Context: .dark (no component variant)</h6>
        ${new Tag(testTags).html}
      </div>

      <div class="mb-4">
        <h6>Component Variant: tag-dark-alt</h6>
        ${new Tag({...testTags, variant: "tag-dark-alt"}).html}
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
