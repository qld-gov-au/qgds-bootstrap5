import { PageLayout } from "./pageLayout.js";
import { FullWidthLandingPage } from "./FullWidthLandingPage.js";
import { ContentPageWithSideNavigation } from "./ContentPageWithSideNavigation.js";
import { ContentPageWithForm } from "./ContentPageWithForm.js";
//Data
import masterbrand_variant from "../header/header.variant.masterBrand.data.json";
import menu_state from "../navbar/navbar.variant.menuState.data.json";
import globalAlertData from "../globalAlert/globalAlert.data.json";
import tableData from "../table/table.data.json";
import footerData from "../footer/footer.data.json";
import contentFooterData from "../contentFooter/contentFooter.data.json";
import bannerData from "../banner/banner.data.json";
import cardData from "../card/card.data.json";
import linkColumnsData from "../linkColumns/linkColumns.data.json";
import promotionalPanelData from "../promotionalPanel/promotionalPanel.data.json";
import sidenavData from "../sidenav/sidenav.data.json";
import inpagenavData from "../inpagenav/inpagenav.data.json";
import breadcrumbsData from "../breadcrumbs/breadcrumbs.data.json";
import imageData from "../image/image.data.json";
import videoData from "../video/video.data.json";
import textboxData from "../textbox/textbox.data.json";
import textareaData from "../textarea/textarea.data.json";
import searchData from "../searchInput/searchInput.data.json";
import selectData from "../select/select.data.json";
import buttonData from "../button/button.data.json";
import checkboxData from "../formcheck/stories/checkbox/checkbox.data.json";
import radioData from "../formcheck/stories/radio/radio.data.json";
import { SearchInput } from "../searchInput/SearchInput.js";

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
  footer: footerData,
  contentFooter: contentFooterData,
  sidenav: sidenavData,
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
export const FullWidthLanding = {
  render: (args) => {
    return new FullWidthLandingPage(args).html;
  },
  args: {
    ...defaultData,
    title: "Full Width Landing Page",
    banner: {
      ...bannerData,
      title: "Welcome to Queensland Government",
      abstract: "Your gateway to government services and information.",
    },
    cardGrid: {
      cards: [
        {
          ...cardData.singleAction,
          title: "Services",
          description: "Access government services online",
          link: "#services",
        },
        {
          ...cardData.singleAction,
          title: "Information",
          description: "Find important information and resources",
          link: "#information",
        },
        {
          ...cardData.singleAction,
          title: "Support",
          description: "Get help when you need it",
          link: "#support",
        },
      ],
    },
    linkColumns: linkColumnsData,
    promotionalPanel: promotionalPanelData,
  },
};

/**
 * Content Page with Side Navigation
 */
export const ContentPageWithSideNav = {
  render: (args) => {
    return new ContentPageWithSideNavigation(args).html;
  },
  args: {
    ...defaultData,
    title: "Content Page with Side Navigation",
    banner: {
      ...bannerData,
      title: "Vehicle Registration",
      abstract:
        "Everything you need to know about registering your vehicle in Queensland.",
      breadcrumbs: breadcrumbsData.default,
    },
    sidenav: sidenavData,
    inpagenav: inpagenavData,
    image: imageData,
    video: videoData.youtube,
  },
};

/**
 * Content Page with Form
 */
export const ContentPageWithFormExample = {
  render: (args) => {
    return new ContentPageWithForm(args).html;
  },
  args: {
    ...defaultData,
    title: "Contact Us Form",
    banner: {
      ...bannerData,
      title: "Contact Us",
      abstract: "Get in touch with us using the form below.",
      breadcrumbs: breadcrumbsData.default,
    },
    content: `
      <h1>Contact Form</h1>
      <p>Please fill out the form below and we'll get back to you as soon as possible.</p>
    `,
    form: {
      fields: [
        {
          ...textboxData,
          type: "textbox",
          label: "First Name",
          id: "firstName",
          required: true,
        },
        {
          ...textboxData,
          type: "textbox",
          label: "Last Name",
          id: "lastName",
          required: true,
        },
        {
          ...textboxData,
          type: "textbox",
          label: "Email",
          id: "email",
          inputType: "email",
          required: true,
        },
        {
          ...selectData,
          type: "select",
          label: "Enquiry Type",
          id: "enquiryType",
        },
        {
          ...textareaData,
          type: "textarea",
          label: "Message",
          id: "message",
          required: true,
        },
        {
          ...checkboxData,
          type: "checkbox",
          questionLabel: "Services Required",
          listitems: [
            {
              type: "checkbox",
              id: "service1",
              name: "services",
              label: "Website Development",
              value: "website",
              isDisabled: false,
            },
            {
              type: "checkbox",
              id: "service2",
              name: "services",
              label: "Mobile App Development",
              value: "mobile",
              isDisabled: false,
            },
            {
              type: "checkbox",
              id: "service3",
              name: "services",
              label: "Consulting",
              value: "consulting",
              isDisabled: false,
            },
          ],
        },
        {
          ...radioData,
          type: "radio",
          questionLabel: "Preferred Contact Method",
          listitems: [
            {
              type: "radio",
              id: "contact1",
              name: "contactMethod",
              label: "Email",
              value: "email",
              isDisabled: false,
            },
            {
              type: "radio",
              id: "contact2",
              name: "contactMethod",
              label: "Phone",
              value: "phone",
              isDisabled: false,
            },
            {
              type: "radio",
              id: "contact3",
              name: "contactMethod",
              label: "SMS",
              value: "sms",
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
