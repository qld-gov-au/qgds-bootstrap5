// Tag.stories.js
import { Tag } from './tag.js';
import defaultdata from './tag.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/Tag',
  render: (args) => new Tag(args).html,
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
