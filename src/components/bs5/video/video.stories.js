// video.stories.js
import { Video } from "./Video.js";
import defaultdata from "./video.data.json";
import metadata from "./metadata.json";

// include accordion for transcript
import { Accordion } from "../accordion/Accordion.js";

/**
 * Set default arguments for the Video component,
 * which is based on YouTube arguments.
 */
export default {
  tags: ["autodocs"],
  title: "3. Components/Video",
  args: defaultdata.youtube,
  render: (args) => {
    const transcriptAccordion = new Accordion({
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
    return new Video({ ...args, transcriptAccordion }).html;
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

    "urlParams.autoplay": {
      name: "Autoplay",
      control: {
        type: "boolean",
      },
    },

    "urlParams.controls": {
      name: "Video controls",
      control: {
        type: "boolean",
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
    coderefs: {
      metadata,
      partialname: "video", //{{> video }}
    },
    controls: {
      exclude: ["transcriptAccordion"],
    },
    backgrounds: { disable: false },
  },
  globals: { backgrounds: { value: "default" } },
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
  globals: { backgrounds: { value: "light" } },
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
  globals: { backgrounds: { value: "alt" } },
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
  globals: { backgrounds: { value: "dark" } },
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
  globals: { backgrounds: { value: "darkAlt" } },
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
