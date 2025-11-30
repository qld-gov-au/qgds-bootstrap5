// card--no-action.stories.js
import { Card, argTypes } from "./Card.js";
import defaultdata from "./card.data.json";

export default {
  tags: ["autodocs", "core"],
  title: "3. Components/Card/No action",
  render: (args) => {
    return `
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      ${new Card(args).html}
      ${new Card({ ...args, footer: "Footer content" }).html}
      <div class="col" id="placeholder"></div>
      ${new Card({ ...args, iconClasses: "qld-icon-design", iconPosition: "icon-left" }).html}
      ${new Card({ ...args, iconClasses: "qld-icon-design", iconPosition: "icon-left", footer: "Footer content" }).html}
      <div class="col" id="placeholder"></div>
      ${new Card({ ...args, iconClasses: "qld-icon-design", iconPosition: "icon-top" }).html}
      ${new Card({ ...args, iconClasses: "qld-icon-design", iconPosition: "icon-top", footer: "Footer content" }).html}
      <div class="col" id="placeholder"></div>
      ${new Card({ ...args, image: "./assets/img/image-placeholder.png", imageAlt: "A grey placeholder image with an icon in the centre." }).html}
      ${new Card({ ...args, image: "./assets/img/image-placeholder.png", imageAlt: "A grey placeholder image with an icon in the centre.", footer: "Footer content" }).html}
    </div>
    `;
  },
  args: defaultdata.noAction,
  argTypes,
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
