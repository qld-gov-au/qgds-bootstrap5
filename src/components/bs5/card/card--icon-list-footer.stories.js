// card--icon-list-footer.stories.js
import { Card } from './Card.js';
import { Link } from '../link/link.js';
import defaultdata from './card.data.json';
import linkdata from '../link/link.data.json';

export default {
  tags: ["autodocs"],
  title: "3. Components/Card/Icon List Footer",
  render: (args) => {
    // Create icon list for card footer with proper CSS styling
    const iconListHtml = new Link(linkdata.linkGroup).html;

    return `
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      ${new Card({ ...args, footer: iconListHtml }).html}
      ${new Card({ ...args, variantClass: "light", footer: iconListHtml }).html}
      ${new Card({ ...args, variantClass: "alt", footer: iconListHtml }).html}
      ${new Card({ ...args, variantClass: "dark", footer: iconListHtml }).html}
      ${new Card({ ...args, variantClass: "dark-alt", footer: iconListHtml }).html}
      ${new Card({
        ...args,
        iconClasses: "qld-icon-design",
        iconPosition: "icon-left",
        footer: iconListHtml,
      }).html}
      ${new Card({
        ...args,
        iconClasses: "qld-icon-design",
        iconPosition: "icon-top",
        footer: iconListHtml,
      }).html}
      ${new Card({
        ...args,
        image: "./img/image-placeholder.png",
        imageAlt: "A grey placeholder image with an icon in the centre.",
        footer: iconListHtml,
      }).html}
      ${new Card({
        ...args,
        image: "./img/image-placeholder.png",
        imageAlt: "A grey placeholder image with an icon in the centre.",
        video: true,
        videoDuration: "2:34",
        footer: iconListHtml,
      }).html}
    </div>
    `;
  },
  args: {
    ...defaultdata.multiAction,
    title: "Card with Icon List Footer",
    description: "This card demonstrates the proper nesting of an Icon List component into the Card Footer with 1rem margin spacing as specified in the design requirements.",
  },
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
      description: {
        story: "This story demonstrates how to properly nest an Icon List component into the Card Footer with adjusted spacing (1rem margin) to match design specifications. The Icon List component supports leading icons for list items and maintains proper styling across all card variants.",
      },
      controls: {
        exclude: ["link", "arrow", "iconPosition", "footer"],
      },
    },
    design: {
      name: "QGDS Figma Reference - Cards",
      type: "figma",
      url: "https://www.figma.com/design/qKsxl3ogIlBp7dafgxXuCA/QGDS-UI-kit?node-id=card-component",
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
