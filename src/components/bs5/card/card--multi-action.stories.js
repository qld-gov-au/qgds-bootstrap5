// card--multi-action.stories.js
import { Card } from './Card.js';
import defaultdata from './card.data.json';

// include tags for footer option
import { Tag } from "../tag/Tag.js";
import tagdata from "../tag/tag.data.json";

export default {
  tags: ["autodocs"],
  title: "Components/Card/Multi action",
  render: (args) => {
    const tags = new Tag(tagdata.action).html;

    return `
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      ${new Card(args).html}
      ${new Card({ ...args, iconClasses: "fa-solid fa-pen-ruler", iconPosition: "icon-left" }).html}
      ${new Card({ ...args, description: "" }).html}
      ${new Card({ ...args, footer: tags }).html}
      ${new Card({ ...args, description: "<ul><li><a href='javascript:void(0)'>Link text</a></li><li><a href='javascript:void(0)'>Link text</a></li><li><a href='javascript:void(0)'>Link text</a></li></ul>", footer: "<div class='view-all'><a href='javascript:void(0)'>View all</a></div>" }).html}
      ${new Card({ ...args, iconClasses: "fa-solid fa-pen-ruler", iconPosition: "icon-top" }).html}
      ${new Card({ ...args, image: "./assets/img/image-placeholder.png", imageAlt: "A grey placeholder image with an icon in the centre." }).html}
      ${new Card({ ...args, image: "./assets/img/image-placeholder.png", imageAlt: "A grey placeholder image with an icon in the centre.", video: true, videoDuration: "2:34" }).html}
      ${new Card({ ...args, feature: true, featureImagePosition: "left", image: "./assets/img/image-placeholder.png", imageAlt: "A grey placeholder image with an icon in the centre.", footer: tags }).html}
      ${new Card({ ...args, feature: true, featureImagePosition: "right", image: "./assets/img/image-placeholder.png", imageAlt: "A grey placeholder image with an icon in the centre." }).html}
      ${new Card({ ...args, feature: true, featureImagePosition: "left", image: "./assets/img/image-placeholder.png", imageAlt: "A grey placeholder image with an icon in the centre.", video: true, videoDuration: "2:45" }).html}
      ${new Card({ ...args, feature: true, featureImagePosition: "right", image: "./assets/img/image-placeholder.png", imageAlt: "A grey placeholder image with an icon in the centre.", video: true, videoDuration: "2:23", footer: tags }).html}
    </div>
    `;
  },
  args: defaultdata.multiAction,
  argTypes: {
    date: {
      control: "text",
    },
    variantClass: {
      control: "select",
      options: {
        Default: "default",
        Light: "light",
        Alternative: "alt",
        Dark: "dark",
        "Dark alternative": "dark-alt",
      },
    },
    action: {
      control: "select",
      options: {
        None: "no",
        Single: "single",
        Multi: "multi",
      },
    },
  },
  parameters: {
    docs: {
      controls: {
        exclude: ["link", "arrow", "iconPosition"],
      },
    },
  },
};

export const Default = { };

export const Dark = {
  name: "Dark theme",
  parameters: {
    backgrounds: {
      default: "Dark",
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="dark">
          ${Story()}
      </div>
      `;
    },
  ],
};
