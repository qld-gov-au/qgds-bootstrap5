/**
 * @file promotionalPanel.types.stories.js
 * @description Promotional Panel types and content alignments using the bold (dark) variant.
 * @module promotionalPanel.types.stories
 */

import base from "./promotionalPanel.stories.js";
import defaultdata from "./promotionalPanel.data.json";

export default {
  ...base,
  args: defaultdata,
  tags: ["!autodocs"],
  title: "3. Components/Promotional Panel/Types",
};

/**
 * Panel types with different content alignments
 */
export const PromoLeft = {
  args: {
    ...defaultdata,
    type: "promo",
    variantClass: "dark",
    contentAlignment: "content-left",
  },
};

export const PromoRight = {
  args: {
    ...defaultdata,
    type: "promo",
    variantClass: "dark",
    contentAlignment: "content-right",
  },
};

export const ContainedLeft = {
  args: {
    ...defaultdata,
    type: "contained",
    variantClass: "dark",
    contentAlignment: "content-left",
    promoImage: "./assets/img/image-example-couple-beach-md.jpg",
  },
};

export const ContainedRight = {
  args: {
    ...defaultdata,
    type: "contained",
    variantClass: "dark",
    contentAlignment: "content-right",
    promoImage: "./assets/img/image-example-couple-beach-md.jpg",
  },
};

export const IndentTextLeft = {
  args: {
    ...defaultdata,
    type: "indent-text",
    variantClass: "dark",
    contentAlignment: "content-left",
    promoImage: "./assets/img/image-example--family.jpg",
  },
};

export const IndentTextRight = {
  args: {
    ...defaultdata,
    type: "indent-text",
    variantClass: "dark",
    contentAlignment: "content-right",
    promoImage: "./assets/img/image-example--family.jpg",
  },
};

export const IndentImageLeft = {
  args: {
    ...defaultdata,
    type: "indent-img",
    variantClass: "dark",
    contentAlignment: "content-left",
    promoImage: "./assets/img/image-example--walk-to-school.jpg",
  },
};

export const IndentImageRight = {
  args: {
    ...defaultdata,
    type: "indent-img",
    variantClass: "dark",
    contentAlignment: "content-right",
    promoImage: "./assets/img/image-example--walk-to-school.jpg",
  },
};

export const EmptyPromoType = {
  args: {
    ...defaultdata,
    type: "",
    variantClass: "dark",
    contentAlignment: "content-right",
    promoImage: "./assets/img/image-example--walk-to-school.jpg",
  },
};

export const EmptyVariantClass = {
  args: {
    ...defaultdata,
    type: "indent-img",
    variantClass: "",
    contentAlignment: "",
    promoImage: "./assets/img/image-example--walk-to-school.jpg",
  },
};
