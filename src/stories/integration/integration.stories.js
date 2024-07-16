
import { MainIntegration } from './MainIntegration';
//Data
import headerData from './header.data.json';
import navbarData from './navigation.data.json';
import breadcrumbsData from './breadcrumb.data.json';
import searchData from './search.data.json';
import globalAlertData from './globalAlert.data.json';
import inpagenavData from './inpagenav.data.json';
import sidenavData from './sidenav.data.json';
import contentFooterData from './contentFooter.data.json';
import footerData from './footer.data.json';
//Content Data
import contentData from './content.data.json';
import template from "./main.hbs?raw";
import metaOpenGraphData from "../../components/bs5/metaOpenGraph/MetaOpenGraph.data.json";
import { dcTerms } from '../../components/bs5/metaDcTerms/MetaDcTerms.data.json';

/** sample data **/
const defaultData = {
  template: template, // Adjust template path relative to this file
  cdn: ".", //for storybook it's ., for normal usage "PROD"
  title: "title goes here",
  "icon-root": headerData["icon-root"],
  icons: headerData.icons,
  description: "my description",
  uri: "http://localhost/uri/here",
  dcTerms: dcTerms,
  seo: metaOpenGraphData.seo,
  og: metaOpenGraphData.og,
  header: headerData,
  search: searchData,
  navbar: navbarData,
  breadcrumbs: breadcrumbsData,
  globalAlert: globalAlertData,
  sidenav: sidenavData,
  inpagenav: inpagenavData,
  content: contentData,
  contentFooter: contentFooterData,
  footer: footerData,
};

export default {
  title: 'Integration/Main Integration Template',
  render: (args) => {
    return new MainIntegration(args).html;
  },
  args: defaultData,
  props: {
    data: { ...defaultData },
  },
  parameters: {
    layout: 'fullscreen',
  },
};


/**
 * Default Integration story
 */
export const Default = {};


// /**
//  * Integration in 'Light' colour theme.
//  */
// export const Light = {
//     args: {
//         ...header,
//         ...navigation,
//         ...footer,
//     },
//     parameters: {
//         backgrounds: {
//             default: 'Light',
//             values: [
//                 {name: 'Light', value: 'var(--qld-light-background)'},
//             ],
//         },
//     },
// };
//
//
// /**
//  * Integration in 'Alternative' colour theme.
//  */
// export const Alternative = {
//     args: {
//         ...header,
//         ...navigation,
//         ...footer,
//     },
//     parameters: {
//         backgrounds: {
//             default: 'Alternative',
//             values: [
//                 {name: 'Alternative', value: 'var(--qld-light-grey-background)'},
//             ],
//         },
//     },
//
// };
//
//
// /**
//  * Accordion in 'Dark' colour theme.
//  */
// export const Dark = {
//     args: {
//         ...header,
//         ...navigation,
//         ...footer,
//     },
//     parameters: {
//         backgrounds: {
//             default: 'Dark',
//             values: [
//                 {name: 'Dark', value: 'var(--qld-dark-background)'},
//             ],
//         },
//     },
//
// };
//
// /**
//  * Accordion in 'Dark alternative' colour theme.
//  */
// export const DarkAlternative = {
//     args: {
//         ...header,
//         ...navigation,
//         ...footer,
//     },
//     parameters: {
//         backgrounds: {
//             default: 'Dark Alternative',
//             values: [
//                 {name: 'Dark Alternative', value: 'var(--qld-dark-alt-background)'},
//             ],
//         },
//     },
//
// };




