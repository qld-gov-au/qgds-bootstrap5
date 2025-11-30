// card--multi-action.stories.js
import { Card, argTypes } from "./Card.js";
import defaultdata from "./card.data.json";

// include tags for footer option
import { Tag } from "../tag/Tag.js";
import tagdata from "../tag/tag.data.json";
import { CallToAction } from "../callToAction/callToAction.js";

export default {
  tags: ["autodocs", "core"],
  title: "3. Components/Card/Multi action",
  render: (args) => {
    const tags = new Tag({
      ...tagdata.action,
      classes: "",
    }).html;
    const cta = new CallToAction({ label: "View all", href: "#" }).html;

    return `
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      ${new Card(args).html}
      ${new Card({ ...args, iconClasses: "qld-icon-design", iconPosition: "icon-left", footer: "Footer content" }).html}
      ${new Card({ ...args, description: "Card body text lorem ipsum dolor sit amet.", footer: "" }).html}
      ${new Card({ ...args, footer: tags }).html}
      ${new Card({ ...args, description: "<ul><li><a href='javascript:void(0)'>Link text</a></li><li><a href='javascript:void(0)'>Link text</a></li><li><a href='javascript:void(0)'>Link text</a></li></ul>", footer: cta }).html}
      ${new Card({ ...args, iconClasses: "qld-icon-design", iconPosition: "icon-top", footer: "Footer content" }).html}
      ${new Card({ ...args, image: "./img/image-placeholder.png", imageAlt: "A grey placeholder image with an icon in the centre.", footer: "Footer content" }).html}
      ${new Card({ ...args, image: "./img/image-placeholder.png", imageAlt: "A grey placeholder image with an icon in the centre.", video: true, videoDuration: "2:34", footer: "Footer content" }).html}
      <div class="col" id="placeholder"></div>
      ${new Card({ ...args, image: "./img/image-placeholder.png", imageAlt: "A grey placeholder image with an icon in the centre.", footer: tags }).html}
      ${new Card({ ...args, image: "./img/image-placeholder.png", imageAlt: "A grey placeholder image with an icon in the centre.", video: true, videoDuration: "2:34", footer: tags }).html}
      ${new Card({ ...args, feature: true, featureImagePosition: "left", image: "./img/image-placeholder.png", imageAlt: "A grey placeholder image with an icon in the centre.", footer: tags }).html}
      ${new Card({ ...args, feature: true, featureImagePosition: "right", image: "./img/image-placeholder.png", imageAlt: "A grey placeholder image with an icon in the centre." }).html}
      ${new Card({ ...args, feature: true, featureImagePosition: "left", image: "./img/image-placeholder.png", imageAlt: "A grey placeholder image with an icon in the centre.", video: true, videoDuration: "2:45" }).html}
      ${new Card({ ...args, feature: true, featureImagePosition: "right", image: "./img/image-placeholder.png", imageAlt: "A grey placeholder image with an icon in the centre.", video: true, videoDuration: "2:23", footer: tags }).html}
    </div>
    `;
  },
  args: defaultdata.multiAction,
  argTypes,
  parameters: {
    docs: {
      controls: {
        exclude: ["link", "arrow", "iconPosition"],
      },
    },
  },
};

export const Default = {};
export const Light = {
  name: "Light theme",
  args: {
    ...defaultdata,
    variantClass: "light",
  },
};
export const Alt = {
  name: "Alt theme",
  args: {
    ...defaultdata,
    variantClass: "alt",
  },
};
export const Dark = {
  name: "Dark theme",
  args: {
    ...defaultdata,
    variantClass: "dark",
  },
};
export const DarkAlt = {
  name: "Dark-alt theme",
  args: {
    ...defaultdata,
    variantClass: "dark-alt",
  },
};
