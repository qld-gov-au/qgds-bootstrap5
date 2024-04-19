// card.stories.js
import { Card } from './Card.js';
import defaultdata from './card.data.json';

export default {
  tags: ["autodocs"],
  title: "Components/Card",
  render: (args) => {
    return `
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      ${new Card(args).html}
      ${new Card({ ...args, variantClass: "card-light" }).html}
      ${new Card({ ...args, variantClass: "card-alt" }).html}
      ${new Card({ ...args, variantClass: "card-dark" }).html}
      ${new Card({ ...args, variantClass: "card-dark-alt" }).html}
    </div>
    `;
  },
  args: defaultdata,
  argTypes: { },
};

export const Default = { };

export const Dark = {
  name: "Dark theme context",
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

export const Image = {
  args: {
    ...defaultdata,
    image: "./assets/img/image-placeholder.png",
    imageAlt: "A grey placeholder image with an icon in the centre.",
  },
};

export const ImageFooter = {
  args: {
    ...defaultdata,
    image: "./assets/img/image-placeholder.png",
    imageAlt: "A grey placeholder image with an icon in the centre.",
    footer: "Footer content",
  },
};

export const Footer = {
  args: {
    ...defaultdata,
    footer: "Footer content",
  },
};

export const LeadingIcon = {
  args: {
    ...defaultdata,
    iconClasses: "fa-solid fa-pen-ruler",
    iconPosition: "icon-left",
  },
};

export const LeadingIconFooter = {
  args: {
    ...defaultdata,
    iconClasses: "fa-solid fa-pen-ruler",
    iconPosition: "icon-left",
    footer: "Footer content",
  },
};

export const StackedIcon = {
  args: {
    ...defaultdata,
    iconClasses: "fa-solid fa-pen-ruler",
    iconPosition: "icon-top",
  },
};

export const StackedIconFooter = {
  args: {
    ...defaultdata,
    iconClasses: "fa-solid fa-pen-ruler",
    iconPosition: "icon-top",
    footer: "Footer content",
  },
};
