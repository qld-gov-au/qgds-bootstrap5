// video.stories.js
import { Video } from './Video.js';
import defaultdata from './video.data.json';

// include accordion for transcript
import { Accordion } from "../accordion/Accordion.js";

/** 
 * Set default arguments for the Video component,
 * which is based on YouTube arguments.
 */
export default {
  tags: ["autodocs"],
  title: "Components/Video",
  args: defaultdata.youtube,
  render: (args) => {
    const transcript = new Accordion({
      groupid: `video-transcript-${args.videoId}`,
      accordionItems: [
        {
          id: args.videoId,
          title: "Show transcript",
          expanded: false,
          content: args.transcriptContent,
        },
      ],
    }).html;
    return new Video({ ...args, transcript: transcript }).html;
  },

  argTypes: {
    source: {
      control: {
        type: "radio",
      },
      options: {
        Youtube: "youtube",
        Vimeo: "vimeo",
        Custom: "custom",
        NotProvided: "",
      },
    },
    videoSize: {
      control: {
        type: "radio",
      },
      options: {
        "Full width": "col-12",
        "Two thirds": "col-8",
        "Half page": "col-6",
      },
    },
    urlParams: {
      control: {
        type: "object",
      },
    },
  },

  /**
   * Additional parameters for the story.
   *
   * @type {Object}
   * @property {Object} design - Configuration for the design parameter.
   * @property {string} design.name - Name of the design parameter.
   * @property {string} design.type - Type of the design parameter.
   * @property {string} design.url - URL of the design parameter.
   */
  parameters: {
    // design: {
    //   name: "QGDS Figma Reference",
    //   type: "figma",
    //   url: "https://www.figma.com/file/qKsxl3ogIlBp7dafgxXuCA/QLD-GOV-DDS?type=design&node-id=24025-293663&mode=design&t=uf49yHsvyUfA39Lv-4",
    // },
    docs: {
      controls: {
        exclude: ["transcript"],
      },
    },
  },
};

/**
 * Default Video
 */
export const Default = {};

/**
 * Vimeo Video
 */
export const Vimeo = {
  args: defaultdata.vimeo,
};

/**
 * Custom video
*/
export const Custom = {
  args: defaultdata.custom,
};

/**
 * Light colour Video
 */
export const Light = {
  parameters: {
    backgrounds: {
      default: 'Light',
      values: [
        { name: 'Light', value: 'var(--qld-light-background)' },
      ],
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="light">
          ${Story()}
      </div>
      `;
    },
  ],
};

/**
 * Alternative Video
 */
export const Alternative = {
  parameters: {
    backgrounds: {
      default: 'Alternative',
      values: [
        { name: 'Alternative', value: 'var(--qld-light-grey-alt)' },
      ],
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="alt">
          ${Story()}
      </div>
      `;
    },
  ],
};

/**
 * Dark Video
 */
export const Dark = {
  parameters: {
    backgrounds: {
      default: 'Dark',
      values: [
        { name: 'Dark', value: 'var(--qld-brand-primary)' },
      ],
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="dark">
          ${Story()}
      </div>
      `;
    },
  ],
};

/**
 * Dark alternative Video
 */
export const DarkAlternative = {
  parameters: {
    backgrounds: {
      default: 'Dark alternative',
      values: [
        { name: 'Dark alternative', value: 'var(--qld-dark-blue)' },
      ],
    },
  },
  decorators: [
    (Story) => {
      return `
      <div class="dark-alt">
          ${Story()}
      </div>
      `;
    },
  ],
};
