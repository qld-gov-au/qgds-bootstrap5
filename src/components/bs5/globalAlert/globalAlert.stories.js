// Tag.stories.js
import { GlobalAlert } from './GlobalAlert.js';
import defaultdata from './globalAlert.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/GlobalAlert',
  render: (args) => new GlobalAlert(args).html,
  argTypes: {
    varient: {
      description: `Global alert theme`,
      control: {
        type: "radio",
        labels: {
          "global-alert-critical": "Critical",
          "global-alert-warning": "Warning",
          "global-alert-info": "General information",
          "global-alert-multiple": "Multiple",
        },
      },
      options: ["global-alert-critical", "global-alert-warning", "global-alert-info", "global-alert-multiple"],
    },
  },
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
