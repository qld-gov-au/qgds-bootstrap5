// footer.stories.js
import { Footer, FooterForgov } from "./Footer.js";

import defaultdata from "./footer.data.json";


export default {
  tags: ["autodocs"],
  title: "!Core/Footer",
  render: (args) => new Footer(args).html,
  // parameters: {
  //   controls: {include: []},
  // },
  argTypes: {
    "feedbackForm.formAttr.data-formio-project-name": { //data-formio-project-name
      name: "Form.io Project, edit feedbackForm to change",
      description: `Footer Feedback project's for reference edit feedbackForm formAttr.data-formio-project-name to update`,
      control: {
        type: 'radio',
        labels:  {
          "dev-oldkihhcwbdtwye" : "TEST (dev-oldkihhcwbdtwye)",
          "staging-oldkihhcwbdtwye" : "STAGING (staging-oldkihhcwbdtwye)",
          "uat-oldkihhcwbdtwye" : "UAT (uat-oldkihhcwbdtwye)",
          "oldkihhcwbdtwye": "PROD (oldkihhcwbdtwye)",
        },
      },
      options: [
        "dev-oldkihhcwbdtwye",
        "uat-oldkihhcwbdtwye",
        "staging-oldkihhcwbdtwye",
        "oldkihhcwbdtwye",
      ],

    },
    sitename: {
      name: "Site Name",
      description: "Name of the site",
      control: {type: 'text'},
    },
    contactHasContactList: {
      name: "Contact Has Contact List",
      description: "Whether the contact list is enabled",
      control: {type: 'boolean'},
    },
    footerHasCrestDisabled: {
      name: "Footer Has Crest",
      description: "Whether the footer has a crest",
      control: {type: 'boolean'},
    },
    footerHasStateOfQldDisabled: {
      name: "Footer Has State of Qld",
      description: "Whether the footer shows State of Qld",
      control: {type: 'boolean'},
    },
    feedbackFormDisabled: {
      name: "Feedback Form Disabled",
      description: "Whether the feedback form is visible",
      control: {type: 'boolean'},
    },
    followlinksEnabled: {
      name: "Follow Links Enabled",
      description: "Whether the follow links are enabled",
      control: {type: 'boolean'},
    },
    copyrightHasYearFrom: {
      name: "Copyright Has Year From",
      description: "Whether the copyright section has a year from",
      control: {type: 'boolean'},
    },
    copyrightOrganisationName: {
      name: "Copyright Organisation Name",
      description: "Name of the copyright organisation",
      control: {type: 'text'},
    },
    contact: {
      name: "Contact",
      description: "Contact section details",
      control: {type: 'object'},
    },
    lookup: {
      name: "Lookup",
      description: "Lookup section details",
      control: {type: 'object'},
    },
    acknowledgements: {
      name: "Acknowledgements",
      description: "Acknowledgements section details",
      control: {type: 'array'},
    },
    copyright: {
      name: "Copyright",
      description: "Copyright section details",
      control: {type: 'object'},
    },
    footerlinks: {
      name: "Footer Links",
      description: "Footer links section details",
      control: {type: 'object'},
    },

    followlinks: {
      name: "Follow Links",
      description: "Follow links section details",
      control: {type: 'object'},
    },
  },
};

/**
 * Example footer
 */
export const Default = {
  args: defaultdata,
};

/**
 * Example footer doing handlebars defaults
 */
export const DefaultBlank = {
  args: {},
};

/**
 * Footer: White
 */
export const Dark = {
  args: {
    ...defaultdata,
    variantClass: "dark",
  },
  parameters: {
    controls: { include: [] },
  },
};

/**
 * Footer: Dark Alternative
 */
export const DarkAlt = {
  args: {
    ...defaultdata,
    variantClass: "dark-alt",
  },
  parameters: {
    controls: { include: [] },
  },
};

/**
 * Forgov footer
 */

export const Forgov = {
  args: {
    ...defaultdata,
    variantClass: "dark",
    sitename: "For government",
    footerHasCrest: false,
    feedbackFormEnabled: true,
    followlinksEnabled: false,
    contactHasContactList: false,
    copyrightHasYearFrom: true,
    footerHasStateOfQld: false,
    acknowledgements: [
      {
        title: "Cultural acknowledgement",
        content:
          "<p>We pay our respects to the Aboriginal and Torres Strait Islander ancestors of this land, their spirits and their legacy. The foundations laid by these ancestors—our First Nations peoples—give strength, inspiration and courage to current and future generations towards creating a better Queensland.</p>",
      },
    ],
  },
  render: (args) => new FooterForgov(args).html,
};
