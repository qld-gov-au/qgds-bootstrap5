// tag--status.stories.js
import { Tag } from "./Tag.js";
import defaultdata from "./tag.data.json";

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
};

/**
 * Construct Status tag for all possible variants with various sizes, emphasis levels, and types.
 * @returns {HTML} HTMLMarkup of the tags.
 */
function statusVariantsMarkup() {
  //Map through the emphasis levels and sizes objects.
  return Object.entries(emphasis)
    .map(([emClass, emLabel]) => {
      return Object.entries(sizes)
        .map(([sizeClass, sizeLabel]) => {
          //Construct tagItems for each types.
          let tagItems = [];
          Object.entries(types).map(([typeClass, typeLabel]) => {
            tagItems.push({
              content: `${typeLabel}`,
              classes: `${typeClass}`,
            });
          });

          //Generate Tag component markup from all possible tag types.
          const tagHtml = new Tag({
            variant: defaultdata.status.variant,
            classes: "p-4 my-2",
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
        })
        .join("");
    })
    .join("");
}

export default {
  tags: ["autodocs", "core"],
  title: "3. Components/Tag/Status",
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

/**
 * Show the Default mode of Status tags in all possible variants.
 * This Story can be used to help in troubleshooting.
 */
export const AllStatusVariantsInDefaultMode = {
  render: () => {
    return statusVariantsMarkup();
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
};
