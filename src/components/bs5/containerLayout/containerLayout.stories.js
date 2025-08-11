import Handlebars from "handlebars";
import template from "./containerLayout.hbs?raw";

//Mockup Data for each component
import masterbrand_variant from "../header/header.variant.masterBrand.data.json";
import menu_state from "../navbar/navbar.variant.menuState.data.json";
import globalAlertData from "../globalAlert/globalAlert.data.json";
import tableData from "../table/table.data.json";
import inpageNavData from "../inpagenav/inpagenav.data.json";
import breadcrumbsData from "../breadcrumbs/breadcrumbs.data.json";
import sidenavData from "../sidenav/sidenav.data.json";
import backToTopData from "../backToTop/backToTop.data.json";
import footerData from "../footer/footer.data.json";

// Disable feedback form in footer
footerData.feedbackFormDisabled = true;

const defaultData = {
  title: "Page Title",
  backToTop: backToTopData,
  header: masterbrand_variant,
  navbar: menu_state,
  table: tableData,
  breadcrumbsData: breadcrumbsData.default,
  sidenavData: sidenavData,
  inpageNavData: inpageNavData,
  globalAlert: globalAlertData.warning,
  footer: footerData,

  //Add optional wrapper classes on template (direct child of body)
  wrapperClasses: "",

  // .debug-container, .debug-row, .debug-col
  // available in storybook control
  debugClasses: [],
};

export default {
  title: "6. Templates/Container Widths",
  render: (args) => {
    return new Handlebars.compile(template)(args);
  },
  args: defaultData,
  argTypes: {
    // Disable all controls by default
    cdn: { table: { disable: true } },
    title: { table: { disable: true } },
    backToTop: { table: { disable: true } },
    header: { table: { disable: true } },
    navbar: { table: { disable: true } },
    table: { table: { disable: true } },
    breadcrumbsData: { table: { disable: true } },
    sidenavData: { table: { disable: true } },
    inpageNavData: { table: { disable: true } },
    globalAlert: { table: { disable: true } },
    footer: { table: { disable: true } },
    // Enable only the wrapper classes debugger flag
    wrapperClasses: "",
    debugClasses: {
      control: { type: "check" }, // <-- use "check" for checkbox list
      options: ["debug-container", "debug-row", "debug-col"],
      name: "Debug Grid",
      description: "Visualise the grid",
    },
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      controls: {},
    },
    chromatic: { disableSnapshot: true },
  },
};

/**
 * Default story
 *
 */
export const Default = {
  args: {},
};
