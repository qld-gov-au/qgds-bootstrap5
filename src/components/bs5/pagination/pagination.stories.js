// Blockquote.stories.js
import { Pagination } from './Pagination.js';
import defaultdata from './pagination.data.json';

export default {
  tags: ['autodocs'],
  title: 'Components/Pagination',
  render: (args) => new Pagination(args).html,
  
  argTypes: {
  },
};

// Default Breadcrumbs story
export const Default = {
  args: defaultdata,
};
