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
};

export const Mobile = {
  render: () => { return `
  comingsoon
   `}, // DefaultTemplate,
  parameters: getStoryMobileParameters(),
  height: getStoryMobileHeight(),
};
