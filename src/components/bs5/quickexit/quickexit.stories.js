// ComponentExample.stories.js
import { Quickexit } from "./Quickexit.js";
import defaultdata from "./quickexit.data.json";

export default {
  tags: ["autodocs"],
  title: "Components/Quickexit",
  render: (args) => {
    
    //Storybook produces a comma delimited string when using the check control type (table-striped, table-bordered) etc. 
    //We can't use commas on our class="..." attribute, so we need to replace the commas with spaces.

    if( typeof(args.customClass) === 'string' ) {
      args.customClass = args.customClass.replaceAll(","," ");
    } else if ( typeof(args.customClass) === 'object' ) {
      args.customClass = args.customClass.join(" ");
    }
  
    return new Quickexit(args).html;
  
  },
};

/**
 * Default Loading Quickexit
 */
export const Default = {
  args: defaultdata,
};

/**
 * Dark themed Loading Quickexit
 */
export const Dark = {
  args: { 
	  ...defaultdata,
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


