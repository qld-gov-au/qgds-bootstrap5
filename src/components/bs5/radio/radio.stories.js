// Blockquote.stories.js
import { Radio } from './Radio.js';
import defaultdata from './radio.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/Radio',
  render: (args) => new Radio(args).html,
};

// Default blockquote story
export const Default = {
    args: defaultdata
};
