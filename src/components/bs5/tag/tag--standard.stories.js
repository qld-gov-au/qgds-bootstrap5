// tag--standard.stories.js
import { Tag } from './Tag.js';
import defaultdata from './tag.data.json';

export default {
  tags: ['autodocs'],
  title: '3. Components/Tag/Standard',
  render: (args) => new Tag(args).html,
  argTypes: {
    variant: {
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

// Info Tag story
export const Information = {
  args: defaultdata.info,
};

// Action Tag story
export const Action = {
  args: defaultdata.action,
};