// card--icon-list-footer.stories.js
import { Card, argTypes } from "./Card.js";
import { Link } from "../link/link.js";
import defaultdata from "./card.data.json";
import metadata from "./metadata.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Card/Icon List Footer",
  render: (args) => {
    // Create icon list for card footer following Figma design pattern
    const figmaLinkData = {
      title: "Related links",
      linkList: [
        {
          url: "#",
          id: "link-1",
          label: "Label",
          target: "_self",
          arialabel: "Label",
          iconClass: "qld-icon-arrow-right",
          iconPosition: "leading",
          download: null,
        },
        {
          url: "#",
          id: "link-2",
          label: "Label",
          target: "_self",
          arialabel: "Label",
          iconClass: "qld-icon-profile",
          iconPosition: "leading",
          download: null,
        },
        {
          url: "#",
          id: "link-3",
          label: "Label",
          target: "_self",
          arialabel: "Label",
          iconClass: "qld-icon-like",
          iconPosition: "leading",
          download: null,
        },
      ],
    };
    const iconListHtml = new Link(figmaLinkData).html;

    return `
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      ${new Card({ ...args, footer: iconListHtml }).html}
      ${new Card({ ...args, variantClass: "light", footer: iconListHtml }).html}
      ${new Card({ ...args, variantClass: "alt", footer: iconListHtml }).html}
      ${new Card({ ...args, variantClass: "dark", footer: iconListHtml }).html}
      ${new Card({ ...args, variantClass: "dark-alt", footer: iconListHtml }).html}
      ${
        new Card({
          ...args,
          iconClasses: "qld-icon-design",
          iconPosition: "icon-left",
          footer: iconListHtml,
        }).html
      }
      ${
        new Card({
          ...args,
          iconClasses: "qld-icon-design",
          iconPosition: "icon-top",
          footer: iconListHtml,
        }).html
      }
      ${
        new Card({
          ...args,
          image: "./img/image-placeholder.png",
          imageAlt: "A grey placeholder image with an icon in the centre.",
          footer: iconListHtml,
        }).html
      }
      ${
        new Card({
          ...args,
          image: "./img/image-placeholder.png",
          imageAlt: "A grey placeholder image with an icon in the centre.",
          video: true,
          videoDuration: "2:34",
          footer: iconListHtml,
        }).html
      }
    </div>
    `;
  },
  args: {
    ...defaultdata.multiAction,
    title: "Card with Icon List Footer",
    description:
      "This card demonstrates the proper nesting of an Icon List component into the Card Footer following the Figma design pattern with 0.75rem gap spacing between links and 12px gap between icons and text.",
  },
  argTypes,
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates how to properly nest an Icon List component into the Card Footer following the Figma design pattern with 0.75rem gap spacing between links and 12px gap between icons and text. Each link uses consistent 'Label' text with different leading icons (arrow-right, profile, like) as shown in the design reference.",
      },
      controls: {
        exclude: ["link", "arrow", "iconPosition", "footer"],
      },
    },
    coderefs: {
      metadata,
      partialname: "card", //{{> card }}
    },
  },
};

export const Default = {};

export const WithLeadingIcons = {
  name: "With leading icon variant",
  args: {
    iconClasses: "qld-icon-design",
    iconPosition: "icon-left",
  },
};

export const LightTheme = {
  name: "Light theme with icon list",
  args: {
    variantClass: "light",
  },
};

export const DarkTheme = {
  name: "Dark theme with icon list",
  args: {
    variantClass: "dark",
  },
};

export const WithVideo = {
  name: "Video card with icon list footer",
  args: {
    image: "./img/image-placeholder.png",
    imageAlt: "A grey placeholder image with an icon in the centre.",
    video: true,
    videoDuration: "2:34",
  },
};
