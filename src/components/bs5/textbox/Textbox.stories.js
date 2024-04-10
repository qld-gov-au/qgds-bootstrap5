// ComponentExample.stories.js
import { Textbox } from "./Textbox.js";
import defaultdata from "./textbox.data.json";

export default {
  tags: ["autodocs"],
  title: "Components/Textbox",
  render: (args) => {
    
    //Storybook produces a comma delimited string when using the check control type (table-striped, table-bordered) etc. 
    //We can't use commas on our class="..." attribute, so we need to replace the commas with spaces.

    if( typeof(args.customClass) === 'string' ) {
      args.customClass = args.customClass.replaceAll(","," ");
    } else if ( typeof(args.customClass) === 'object' ) {
      args.customClass = args.customClass.join(" ");
    }
  
    return new Textbox(args).html;
  
  },

  //https://storybook.js.org/docs/api/arg-types
  argTypes: {
    customClass: {
      name: "Classes",
      description: 'Settable classes for the component',
      control: {
        type: "check",
        labels: {
          "form-style-filled": "Filled"
        },
      },
      options: [
        "form-style-filled"
      ],
    },
    states: {
      name: "States",
      description: `Valid/Invalid states`,
      control: {
        type: "radio",
        labels: {
          "default": "Default",
          "qld-input-success": "Success",
          "qld-input-error": "Error"
        },
      },
      options: [
        "default",
        "qld-input-success",
        "qld-input-error"
      ],
    },
  },
};

/**
 * Default textbox
 */
export const Default = {
  args: defaultdata
};

/**
 * Dark themed textbox
 */
export const Dark = {
  args: { 
	  ...defaultdata,
	  ...{isDisabled: false},
  },
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
 * Filled style textbox
 */
export const Filled = {
  args: { 
	  ...defaultdata,
	  ...{customClass: "form-style-filled"},
  },
};


/**
 * Disabled textbox
 */
export const Disabled = {
  args: { 
	  ...defaultdata,
	  ...{isDisabled: true},
  },
};

/**
 * Valid textbox
 */
export const Valid = {
  args: {
	  ...defaultdata,
    ...{states: "qld-input-success"}
  },
};

/**
 * Invalid textbox
 */
export const Invalid = {
  args: {
	  ...defaultdata,
    ...{states: "qld-input-error"}
  },
};
