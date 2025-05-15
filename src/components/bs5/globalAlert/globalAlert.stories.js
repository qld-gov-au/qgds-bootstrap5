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
      // Map the "variant" control to the first alert item in the "alertItems" array.
      // This ensures the selected variant is applied correctly to the first alert item.
      const { args } = context;
      const defaultVariant = "global-alert-critical";

      // Update the first alert item's variant based on the "variant" control or fallback to the default.
      args.alertItems[0].variant = args.variant || defaultVariant;

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
