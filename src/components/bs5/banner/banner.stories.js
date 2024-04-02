// Banner.stories.js
import { Banner } from './Banner.js';
import defaultdata from './banner.data.json';

//Breadcrumbs
import { Breadcrumbs } from '../breadcrumbs/Breadcrumbs.js';
import breadcrumbdata from '../breadcrumbs/breadcrumbs.data.json';


export default {
  tags: ['autodocs'],
  title: 'Components/Banner',
  render: (args) => new Banner(args).html,
  argTypes: {
  },
};

// Default Breadcrumbs story
export const Default = {
  args: {
    ...defaultdata,
    breadcrumbs: "",
  },
};

// Default Breadcrumbs story
const breadcrumbs = new Breadcrumbs(breadcrumbdata);
export const WithBreadcrumbs = {
  args: { 
    ...defaultdata,
    breadcrumbs: breadcrumbs.html,
  },
}
