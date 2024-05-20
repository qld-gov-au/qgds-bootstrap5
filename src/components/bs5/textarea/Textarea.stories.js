// ComponentExample.stories.js
import { Textarea } from "./Textarea.js";
import defaultdata from "./textarea.data.json";

export default {
  tags: ["autodocs"],
  title: "Components/Textarea",
  render: (args) => {
    
    //Storybook produces a comma delimited string when using the check control type (table-striped, table-bordered) etc. 
    //We can't use commas on our class="..." attribute, so we need to replace the commas with spaces.

    if( typeof(args.customClass) === 'string' ) {
      args.customClass = args.customClass.replaceAll(","," ");
    } else if ( typeof(args.customClass) === 'object' ) {
      args.customClass = args.customClass.join(" ");
    }
  
    return new Textarea(args).html;
  
  },

  //https://storybook.js.org/docs/api/arg-types
  argTypes: {
    states: {
      name: "States",
      description: `Valid/Invalid states`,
      control: {
        type: "radio",
        labels: {
          "default": "Default",
          "qld-input-success": "Success",
          "qld-input-error": "Error",
        },
      },
      options: [
        "default",
        "qld-input-success",
        "qld-input-error",
      ],
    },
  },
};

/**
 * Default textarea
 */
export const Default = {
  args: defaultdata,
};

/**
 * Dark themed textarea
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
 * Filled style textarea
 */
export const Filled = {
  args: { 
	  ...defaultdata,
	  ...{customClass: "form-style-filled"},
  },
};


/**
 * Disabled textarea
 */
export const Disabled = {
  args: { 
	  ...defaultdata,
	  ...{isDisabled: true, isRequired: false},
  },
};

/**
 * Valid textbox
 */
export const Valid = {
  args: {
	  ...defaultdata,
    ...{customClass: "qld-input-success"},
  },
};

/**
 * Invalid textbox
 */
export const Invalid = {
  args: {
	  ...defaultdata,
    ...{customClass: "qld-input-error"},
  },
};
