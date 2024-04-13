import {
  getStoryMobileParameters,
  getStoryMobileHeight,
} from '../../helpers';

//import DefaultTemplate from '../../../templates/page/landingpage.html';


export default {
  title: 'Templates/ApplicationPage',
};

export const Default = {
  render: () => { return `
  comingsoon
   `}, // DefaultTemplate,
  name: 'Default',
};

export const Mobile = {
  render: () => { return `
  comingsoon
   `}, // DefaultTemplate,
  name: 'Mobile',
  parameters: getStoryMobileParameters(),
  height: getStoryMobileHeight(),
};
