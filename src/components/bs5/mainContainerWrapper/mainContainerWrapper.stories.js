import { MainContainerWrapperTest } from "./mainContainerWrapper.test.js";

import init from "./../../../js/handlebars.init";
import Handlebars from "handlebars";
//Data
import masterbrand_variant from '../header/header.variant.masterbrand.data.json';
import { menu_state } from "../navbar/navbar.data.json";
import breadcrumbsData from "../breadcrumbs/breadcrumbs.data.json";
import searchData from "../searchInput/searchInput.data.json";
import globalAlertData from "../globalAlert/globalAlert.data.json";
import sidenavData from "../sidenav/sidenav.data.json";
import contentFooterData from "../contentFooter/contentFooter.data.json";
import footerData from "../footer/footer.data.json";

const defaultData = {
  cdn: ".", //for storybook it's ., for normal usage "PROD"
  title: "title goes here",
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
  title: "!Layout/Main Container Wrapper",
  render: (args) => {
    init(Handlebars)
    return new MainContainerWrapperTest(args).html;
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
};

/**
 * Default head metadata
 * 
 */
export const Default = {};

