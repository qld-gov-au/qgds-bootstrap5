// Tag.stories.js
import { Tag } from './Tag.js';
import defaultdata from './tag.data.json';

const themeVariants = {}

const sizes = {
  "tag-small": "Small",
  "tag-big": "Big (Default)",
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

const iconPositions = {
  "tag-icon-leading": "Leading icon",
  "tag-icon-trailing": "Trailing icon",
};

export default {
  tags: ['autodocs'],
  title: 'Components/Tag',
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
    iconSVG: {
      description: "SVG content of the icon",
      control: "text",
    },
    iconPosition: {
      description: "Position of the icon placement",
      control: {
        type: "radio",
        labels: iconPositions,
      },
      options: Object.keys(iconPositions),
    },
  },
};

/**
 * Show status tags for all possible variants with various sizes, emphasis levels, and types.
 * In the Default Light mode.
 * This Story can be used to help in troubleshooting.
 */
export const AllStatusTagsInDefaultMode = {
  render:() => {

    //Map through the emphasis levels and sizes objects.
    return Object.entries(emphasis).map(([emClass, emLabel]) => {

      return Object.entries(sizes).map(([sizeClass, sizeLabel]) => {

        //Construct tagItems for each types.
        let tagItems = [];
        Object.entries(types).map(([typeClass, typeLabel]) => {
          tagItems.push({
            content: `${typeLabel} ${sizeLabel} ${emLabel}`,
            classes: `${typeClass}`,
          });
        });

        //Generate Tag component markup from all possible tag types.
        const tagHtml =  new Tag({
          variant: defaultdata.status.variant,
          tagItems: tagItems,
          size: sizeClass,
          emphasis: emClass,
          iconSVG: defaultdata.status.iconSVG,
          iconPosition: defaultdata.status.iconPosition,
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
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
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
