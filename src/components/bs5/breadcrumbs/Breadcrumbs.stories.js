// Blockquote.stories.js
import { Breadcrumbs } from './Breadcrumbs.js';
import defaultdata from './breadcrumbs.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/Breadcrumbs',
  render: (args) => new Breadcrumbs(args).html,
  
  argTypes: {
    breadcrumbs: {
      name: 'Breadcrumbs',
      control: 'object',
      description: `Pass a JSON object containing an array of links to the component.`,
    },
  },
};

// Default Breadcrumbs story
export const Default = {
  args: defaultdata,
};
