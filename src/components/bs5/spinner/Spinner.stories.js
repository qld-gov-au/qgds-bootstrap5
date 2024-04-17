// ComponentExample.stories.js
import { Spinner } from "./Spinner.js";
import defaultdata from "./spinner.data.json";

export default {
  tags: ["autodocs"],
  title: "Components/Spinner",
  render: (args) => {
    
    //Storybook produces a comma delimited string when using the check control type (table-striped, table-bordered) etc. 
    //We can't use commas on our class="..." attribute, so we need to replace the commas with spaces.

    if( typeof(args.customClass) === 'string' ) {
      args.customClass = args.customClass.replaceAll(","," ");
    } else if ( typeof(args.customClass) === 'object' ) {
      args.customClass = args.customClass.join(" ");
    }
  
    return new Spinner(args).html;
  
  },
};

/**
 * Default Loading Spinner
 */
export const Default = {
  args: defaultdata
};

/**
 * Dark themed Loading Spinner
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
 * Stacked Loading Spinner
 */
export const Stacked = {
  args: { 
	  ...defaultdata,
	  ...{stacked: true},
  },
};

