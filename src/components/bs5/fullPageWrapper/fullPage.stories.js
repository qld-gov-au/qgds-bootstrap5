import { FullPageTest } from "./fullPage.test.js";
import init from "../../../js/handlebars.init.js";
import Handlebars from "handlebars";

import { dcTerms } from '../metaDcTerms/MetaDcTerms.data.json';
import metaOpenGraphData from '../metaOpenGraph/MetaOpenGraph.data.json';
import masterbrand_variant from '../header/header.variant.masterBrand.data.json';
import menu_state  from "../navbar/navbar.variant.menuState.data.json";
import breadcrumbsData from "../breadcrumbs/breadcrumbs.data.json";
import searchData from "../searchInput/searchInput.data.json";
import globalAlertData from "../globalAlert/globalAlert.data.json";
import sidenavData from "../sidenav/sidenav.data.json";
import contentFooterData from "../contentFooter/contentFooter.data.json";
import footerData from "../footer/footer.data.json";

const defaultData = {
  cdn: ".", //for StoryBook it's ., for normal usage "PROD"
  title: "title goes here",
  description: "my description",
  uri: "http://localhost/uri/here",
  dcTerms: dcTerms,
  seo: metaOpenGraphData.seo,
  og: metaOpenGraphData.og,
  header: masterbrand_variant,
  search: searchData,
  navbar: menu_state,
  breadcrumbs: breadcrumbsData.forGov,
  globalAlert: globalAlertData.critical,
  sidenav: sidenavData,
  contentFooter: contentFooterData,
  footer: footerData,
};

export default {
  title: "!Layout/Full Page",
  render: (args) => {
    init(Handlebars)
    return new FullPageTest(args).html;
  },
  args: defaultData,
  argTypes: {
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      controls: {

      },
    },
  },
  decorators: [
    (Story) => {
      return `
          ${Story()}
      `;
    },
  ],
};

/**
 * Default
 * 
 */
export const Default = {};

