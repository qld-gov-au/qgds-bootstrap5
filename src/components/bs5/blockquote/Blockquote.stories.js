// Blockquote.stories.js
import { Blockquote } from './Blockquote.js';
import defaultdata from './blockquote.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/Blockquote',
  render: (args) => new Blockquote(args).html,
};

// Default blockquote story
export const Default = {
  args: defaultdata,
};
