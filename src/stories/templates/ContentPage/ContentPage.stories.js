import {
  getStoryMobileParameters,
  getStoryMobileHeight,
} from '../../helpers';

//import DefaultTemplate from '../../../templates/page/contentpage.html';
// import NoAsideTemplate from '../../../template-pages/content-page-no-asides.html';
// import WithoutLocationTemplate from '../../../template-pages/content-page-without-location.html';

export default {
  title: 'Templates/ContentPage',
};

export const Default = {
  render: () => { return `
  comingsoon
   ` }, //DefaultTemplate,
  name: 'Default',
};

// export const NoAside = {
//   render: () => NoAsideTemplate,
//   name: 'NoAside',
// };
//
// export const WithoutLocation = {
//   render: () => WithoutLocationTemplate,
//   name: 'WithoutLocation',
// };

export const Mobile = {
  render: () => { return `
  comingsoon
   ` }, //DefaultTemplate,
  name: 'Mobile',
  parameters: getStoryMobileParameters(),
  height: getStoryMobileHeight(),
};
