// Tag.stories.js
import { Tag } from './Tag.js';
import defaultdata from './tag.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/Tag',
  render: (args) => new Tag(args).html,
  argTypes: {
    varient: {
      description: `Tags theme`,
      control: {
        type: "radio",
        labels: {
          "tag-default": "Default",
          "tag-alt": "Alt",
          "tag-dark": "Dark",
          "tag-dark-alt": "Dark-alt",
        },
      },
      options: ["tag-default", "tag-alt", "tag-dark", "tag-dark-alt"],
    },
  },
};

// Default Tag story
export const Default = {
  args: defaultdata.default,
};

// Large Tag story
export const Large = {
  args: defaultdata.large,
};

// Action Tag story
export const Action = {
  args: defaultdata.action,
};

// Dark Tag story
export const Dark = {
  args: defaultdata.dark,
};

// Info Tag story
export const Information = {
  args: defaultdata.info,
};

// Filter Tag story
export const Filter = {
  args: defaultdata.filter,
};
