// Banner.stories.js
import { Banner } from './Banner.js';
import defaultdata from './banner.data.json';

//Breadcrumbs
import { Breadcrumbs } from '../breadcrumbs/Breadcrumbs.js';
import breadcrumbdata from '../breadcrumbs/breadcrumbs.data.json';


export default {
  tags: ['autodocs'],
  title: 'Components/Banner (Navigation)',
  render: (args) => new Banner(args).html,
  argTypes: {
    variantClass: {
      name: "Variant Class",
      description: `Settable backgrounds for the banner component`,
      control: {
        type: "radio",
        labels: {
          "light": "Light",
          "alt": "Light Alternative",
          "dark": "Dark",
          "dark-alt": "Dark Alternative",
          "alt with-pattern": "Light Alternative (with pattern)",
          "dark with-pattern": "Dark (with pattern)",
          "dark-alt": "Dark Alternative",
        },
      },
      options: [
        "light",
        "alt",
        "dark",
        "dark-alt",
        "alt with-pattern",
        "dark with-pattern",
      ],
    },
    image: {
      table: {
        disable: true,
      },
    },
    breadcrumbs: {
      table: {
        disable: true,
      },
    },
    ctabuttons: {
      table: {
        disable: true,
      },
    },
  },

  parameters: {
    docs: {
      controls: {
        exclude: ['image', 'breadcrumbs'],
        hideNoControlsWarning: true,

      },
    },
  },
};

/**
 * Default banner with breadcrumbs
 */
const breadcrumbs = new Breadcrumbs(breadcrumbdata['default']);

export const Default = {
  args: {
    ...defaultdata,
    content: "",
    image: false,
    ctabuttons: false,
    breadcrumbs: breadcrumbs.html,
  },
};


/**
 * Banner with lead content
 */
export const WithLeadContent = {
  args: { 
    ...defaultdata,
    image: false,
    ctabuttons: false,
    breadcrumbs: breadcrumbs.html,
  },
}

/**
 * Banner with background pattern
 */
export const WithPattern = {
  args: { 
    ...defaultdata,
    title: "A long page title that wraps onto another line",
    variantClass: "dark with-pattern",
    image: false,
    ctabuttons: false,
    breadcrumbs: breadcrumbs.html,
  },
}

/**
 * Banner with background pattern (alternative)
 */
export const WithPatternAlt = {
  args: { 
    ...defaultdata,
    title: "A long page title that wraps onto another line",
    variantClass: "alt with-pattern",
    image: false,
    ctabuttons: false,
    breadcrumbs: breadcrumbs.html,
  },
}

/**
 * Banner with feature image
 */
export const WithFeatureImage = {
  args: { 
    ...defaultdata,
    ctabuttons: false,
    breadcrumbs: breadcrumbs.html,
  },
}

/**
 * Banner with feature image (angled)
 */
export const WithFeatureImageAngle = {
  args: { 
    ...defaultdata,
    ctabuttons: false,
    image: {
      ...defaultdata.image,
      classes: "banner-image--angle",
    },
    breadcrumbs: breadcrumbs.html,
  },
}

/**
 * Banner with call to action
 */
export const WithCallToAction = {
  args: { 
    ...defaultdata,
    breadcrumbs: breadcrumbs.html,
  },
}




