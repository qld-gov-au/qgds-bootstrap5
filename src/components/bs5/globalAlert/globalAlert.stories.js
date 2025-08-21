// Tag.stories.js
import { GlobalAlert } from "./GlobalAlert.js";
import defaultdata from "./globalAlert.data.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Global Alert",
  render: (args) => new GlobalAlert(args).html,
  argTypes: {
    variant: {
      description: `Global alert theme`,
      control: {
        type: "radio",
        labels: {
          "global-alert-critical": "Critical",
          "global-alert-warning": "Warning",
          "global-alert-info": "General information",
        },
      },
      options: [
        "global-alert-critical",
        "global-alert-warning",
        "global-alert-info",
      ],
    },
  },

  decorators: [
    (Story, context) => {
      // Each global alert story has an array of alertItems
      // If the variant is set by user via SB Controls, we will use that variant for the first alert item, on the Default story only.
      const { args } = context;
      let storyName = context?.story?.name || "Default";

      if (args.variant && storyName === "Default") {
        args.alertItems[0].variant = args.variant || "global-alert-critical";
      }

      // Render the story with the updated args.
      return Story({ args: { ...args } });
    },
  ],
};

// Critical global alert story
export const Critical = {
  args: defaultdata.critical,
};

// Warning global alert story
export const Warning = {
  args: defaultdata.warning,
};

// Global information alert story
export const Info = {
  args: defaultdata.info,
};

// Multiple global alert story
export const Multiple = {
  args: defaultdata.multiple,
};
