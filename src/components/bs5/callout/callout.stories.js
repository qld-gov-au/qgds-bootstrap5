// Blockquote.stories.js
import { Callout } from './Callout.js';
import defaultdata from './callout.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/Callout',
  render: (args) => new Callout(args).html,
  
  argTypes: {
    // breadcrumbs: {
    //   name: 'Breadcrumbs',
    //   control: 'object',
    //   description: `Pass a JSON object containing an array of links to the component.`,
    // },
  },
};

// Default Breadcrumbs story
export const Default = {
  args: defaultdata,
};
