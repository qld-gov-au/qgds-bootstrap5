import { PageLayout } from "./pageLayout.js";
//Data
import masterbrand_variant from "../header/header.variant.masterBrand.data.json";
import menu_state from "../navbar/navbar.variant.menuState.data.json";
import globalAlertData from "../globalAlert/globalAlert.data.json";
import tableData from "../table/table.data.json";
import backToTopData from "../backToTop/backToTop.data.json";
import footerData from "../footer/footer.data.json";
import contentFooterData from "../contentFooter/contentFooter.data.json";

const defaultData = {
  cdn: ".", //for storybook it's ., for normal usage "PROD"
  title: "title goes here",
  backToTop: backToTopData,
  header: masterbrand_variant,
  navbar: menu_state,
  table: tableData,
  globalAlert: globalAlertData.critical,
  footer: footerData,
  contentFooter: contentFooterData,
};

export default {
  title: "6. Templates/Page Layout",
  render: (args) => {
    return new PageLayout(args).html;
  },
  args: defaultData,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
    docs: {
      controls: {},
    },
  },
};

/**
 * Default head metadata
 *
 */
export const Default = {
  args: {
    backToTop: {
      hide_back_to_top: false,
      min_page_height: 0,
      is_fixed: false,

      directionalLink: {
        id: "",
        label: "Back to top",
        href: "#",
        target: "_self",
        class: "back-to-top up my-2 ms-auto",
      },
    },
  },
};
