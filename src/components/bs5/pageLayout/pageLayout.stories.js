import { PageLayout } from "./pageLayout.js";
import { HomePage } from "./HomePage.js";
import { ContentPageWithSideNavigation } from "./ContentPageWithSideNavigation.js";
import { ContentPageWithForm } from "./ContentPageWithForm.js";
//Data
import masterbrand_variant from "../header/header.variant.masterBrand.data.json";
import menu_state from "../navbar/navbar.variant.menuState.data.json";
import globalAlertData from "../globalAlert/globalAlert.data.json";
import tableData from "../table/table.data.json";
import footerData from "../footer/footer.data.json";
import contentFooterData from "../contentFooter/contentFooter.data.json";
import callToActionData from "../callToAction/callToAction.data.json";
import bannerData from "../banner/banner.data.json";
import cardData from "../card/card.data.json";
import linkColumnsData from "../linkColumns/linkColumns.data.json";
import promotionalPanelData from "../promotionalPanel/promotionalPanel.data.json";
import inpagenavData from "../inpagenav/inpagenav.data.json";
import breadcrumbsData from "../breadcrumbs/breadcrumbs.data.json";
import imageData from "../image/image.data.json";
import videoData from "../video/video.data.json";
import textboxData from "../textbox/textbox.data.json";
import textareaData from "../textarea/textarea.data.json";
import searchData from "../searchInput/searchInput.data.json";
import selectData from "../select/select.data.json";
import buttonData from "../button/button.data.json";
import buttondata from "../button/button.data.json";
import accordionData from "../accordion/accordion.data.json";

import { SearchInput } from "../searchInput/SearchInput.js";

const sideNavData = {
  navtitle: "Template",
  navtitlelink: "#optionallink",
  navlist: [
    {
      link: "#https://www.qld.gov.au/transport/registration/register/heavy",
      label: "Home page",
      class: "",
    },
    {
      link: "#",
      label: "Content page (no bar)",
      class: "",
    },
    {
      link: "#",
      label: "Content page (basic bar)",
      class: "",
    },
    {
      link: "#",
      label: "Single page form",
      class: "",
    },
  ],
};

const defaultData = {
  cdn: ".", //for storybook it's ., for normal usage "PROD"
  title: "title goes here",
  header: {
    ...masterbrand_variant,
    searchInput: new SearchInput(searchData).html,
  },
  navbar: menu_state,
  table: tableData,
  globalAlert: globalAlertData.critical,
  footer: {
    ...footerData,
    variantClass: "dark",
  },
  contentFooter: contentFooterData,
  sidenav: sideNavData,
};

export default {
  title: "5. Templates/Page Layout",
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
 * Default page layout
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

/**
 * Full Width Landing Page
 */
export const Home = {
  render: (args) => {
    return new HomePage(args).html;
  },
  args: {
    ...defaultData,
    title: "Full Width Landing Page",
    banner: {
      ...bannerData,
      title: "Welcome to Queensland Government",
      abstract: "Your gateway to government services and information.",
      bannerType: "banner-advanced",
      backgroundType: "with-hero-image",
      "image.classes": "align-grid",
      callToAction: "buttons",
      buttons: [
        {
          ...buttondata,
          iconClass: false,
        },
        {
          ...buttondata,
          classes: ["btn-secondary"],
          variantClass: "btn-secondary",
        },
      ],
    },
    cardGrid: {
      cards: [
        {
          ...cardData.singleAction,
          title: "Services",
          description: "Access government services online",
          link: "#services",
          iconClasses: "qld-icon-design",
          iconPosition: "icon-top",
        },
        {
          ...cardData.singleAction,
          title: "Information",
          description: "Find important information and resources",
          link: "#information",
          iconClasses: "qld-icon-design",
          iconPosition: "icon-top",
        },
        {
          ...cardData.singleAction,
          title: "Support",
          description: "Get help when you need it",
          link: "#support",
          iconClasses: "qld-icon-design",
          iconPosition: "icon-top",
        },
      ],
    },
    cardGridBottom: {
      cards: [
        {
          ...cardData.singleAction,
          title: "Services",
          description: "Access government services online",
          link: "#services",
          image: "./assets/img/image-placeholder.png",
          imageAlt: "A grey placeholder image with an icon in the centre.",
        },
        {
          ...cardData.singleAction,
          title: "Information",
          description: "Find important information and resources",
          link: "#information",
          image: "./assets/img/image-placeholder.png",
          imageAlt: "A grey placeholder image with an icon in the centre.",
        },
        {
          ...cardData.singleAction,
          title: "Support",
          description: "Get help when you need it",
          link: "#support",
          image: "./assets/img/image-placeholder.png",
          imageAlt: "A grey placeholder image with an icon in the centre.",
        },
      ],
    },
    linkColumns: linkColumnsData,
    callToAction: callToActionData,
    promotionalPanel: {
      ...promotionalPanelData,
      variantClass: "dark",
    },
  },
};

const SideNavArgs = {
  ...defaultData,
  title: "Content Page with Side Navigation",
  accordionItems: accordionData,
  calloutdata: {
    title: "Call out heading",
    content:
      "Faucibus urna non suspendisse augue donec fermentum. Semper elementum dui odio sociis. Quis risus pellentesque consectetur risus senectus. Egestas lectus nec dui odio vitae sem. Convallis pulvinar arcu feugiat eget. Est convallis mattis mauris nisi suscipit.",
  },
  inpagenav: inpagenavData,
  image: imageData,
  video: videoData.youtube,
  callToAction: {
    ...callToActionData,
    label: "Call to action",
  },
};

/**
 * Content Page with Side Navigation
 */
export const ContentPageNoBanner = {
  render: (args) => {
    return new ContentPageWithSideNavigation(args).html;
  },
  args: {
    ...SideNavArgs,
    banner: {
      variantClass: "dark",
      bannerType: "no-banner",
      breadcrumbs: breadcrumbsData.default,
    },
    sidenav: {
      ...sideNavData,
      navlist: [
        sideNavData.navlist[0],
        {
          ...sideNavData.navlist[1],
          class: "active",
        },
        sideNavData.navlist[2],
        sideNavData.navlist[3],
      ],
    },
  },
};

/**
 * Content Page with Side Navigation
 */
export const ContentPageBasicBanner = {
  render: (args) => {
    return new ContentPageWithSideNavigation(args).html;
  },
  args: {
    ...SideNavArgs,
    banner: {
      ...bannerData,
      title: "Vehicle Registration",
      abstract:
        "Everything you need to know about registering your vehicle in Queensland.",
      breadcrumbs: breadcrumbsData.default,
    },
    sidenav: {
      ...sideNavData,
      navlist: [
        sideNavData.navlist[0],
        sideNavData.navlist[1],
        {
          ...sideNavData.navlist[2],
          class: "active",
        },
        sideNavData.navlist[3],
      ],
    },
  },
};

/**
 * Content Page with Form
 */
export const ContentPageWithSingleForm = {
  render: (args) => {
    return new ContentPageWithForm(args).html;
  },
  args: {
    ...defaultData,
    title: "Contact Us Form",
    inpageAlert: {
      variantClass: "alert-info",
      alertType: "",
      content:
        "<p>Response times are estimated at 15 working days. If you're looking for a quicker response, call 13 QGOV ( <a href='#'>13 74 68</a>).</p>",
    },
    banner: {
      ...bannerData,
      title: "Contact Us",
      abstract: "Get in touch with us using the form below.",
      breadcrumbs: breadcrumbsData.default,
    },
    sidenav: {
      ...sideNavData,
      navlist: [
        sideNavData.navlist[0],
        sideNavData.navlist[1],
        sideNavData.navlist[2],
        {
          ...sideNavData.navlist[3],
          class: "active",
        },
      ],
    },
    content: `
      <h1>Contact Form</h1>
      <p>Please fill out the form below and we'll get back to you as soon as possible.</p>
    `,
    form: {
      fields1: [
        {
          type: "radio",
          questionLabel: "Type of enquiry",
          listClasses: "field-required",
          listitems: [
            {
              type: "radio",
              id: "type1",
              name: "enquiry",
              label: "Complaint",
              value: "complaint",
              isDisabled: false,
            },
            {
              type: "radio",
              id: "type2",
              name: "enquiry",
              label: "Compliment",
              value: "compliment",
              isDisabled: false,
            },
          ],
        },
        {
          ...textboxData,
          type: "textbox",
          "label-text":
            "Please tell us in a few words what your enquiry relates to",
          label: "Please tell us in a few words what your enquiry relates to",
          "optional-text": "",
          placeholder: "",
          "hint-text":
            "This will help us determine the most appropriate person to respond",
          id: "firstName",
          required: true,
        },
        {
          ...textareaData,
          type: "textarea",
          "label-text": "Tell us what happened",
          label: "Tell us what happened",
          "optional-text": "",
          "hint-text":
            "Provide as much information as possible to help us better respond to your feedback. There is no character limit. Please don't include private information like credit card details or medical history.",
          rows: 4,
          cols: 50,
          maxlength: 500,
          minlength: 10,
          resize: true,
          id: "message",
          required: true,
        },
      ],
      fields2: [
        {
          ...textboxData,
          type: "textbox",
          "label-text": "Name",
          "optional-text": "",
          placeholder: "",
          "hint-text": "",
          id: "lastName",
          required: true,
        },
        {
          ...textboxData,
          type: "textbox",
          "label-text": "Email",
          "optional-text": "",
          placeholder: "",
          "hint-text": "",
          id: "email",
          inputType: "email",
          required: true,
        },
        {
          ...textboxData,
          type: "textbox",
          "label-text": "Phone",
          "optional-text": "",
          placeholder: "",
          "hint-text": "",
          id: "phone",
          inputType: "phone",
          required: true,
        },
        {
          ...selectData,
          type: "select",
          "label-text": "Enquiry Type",
          "optional-text": "",
          "hint-text": "",
          id: "enquiryType",
        },
        {
          type: "checkbox",
          questionLabel: "Privacy acknowledgement",
          listClasses: "field-required",
          listitems: [
            {
              type: "checkbox",
              id: "service1",
              name: "Privacy acknowledgement",
              label: "I have read and understood the privacy statement",
              value: "checked",
              isDisabled: false,
            },
          ],
        },
      ],
      buttons: [
        {
          ...buttonData,
          variantClass: "btn-primary",
          label: "Submit",
          type: "submit",
        },
        {
          ...buttonData,
          variantClass: "btn-secondary",
          label: "Reset",
          type: "reset",
        },
      ],
    },
  },
};
