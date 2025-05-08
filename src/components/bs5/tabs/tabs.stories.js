// ComponentExample.stories.js
import { Tabs } from "./tabs.js";
import defaultdata from "./tabs.data.json";

export default {
  tags: ["autodocs"],
  title: "3. Components/Tabs",
  render: (args) => {
    
    //Storybook produces a comma delimited string when using the check control type (table-striped, table-bordered) etc. 
    //We can't use commas on our class="..." attribute, so we need to replace the commas with spaces.
    if( typeof(args.variantClass) === 'string' ) {
      args.variantClass = args.variantClass.replaceAll(","," ");
    } else if ( typeof(args.variantClass) === 'object' ) {
      args.variantClass = args.variantClass.join(" ");
    }

    return new Tabs(args).html;
  
  },

  //https://storybook.js.org/docs/api/arg-types
  argTypes: {
    type: {
      description: 'Type of tab system',
      control: "select",
      options: ["container", "section"],
    },
    variant: {
      description: 'Type varient for the tab system',
      control: "select",
      options: ["default", "light", "alt", "dark", "dark-alt"],
    },
    tab_variant: {
      description: 'Type varient for the tab system top tabs when in section layout',
      control: "select",
      options: ["default", "light", "alt", "dark", "dark-alt"],
    },
    unique_id: {
      description: 'Each tab system must have a unique id',
      control: "text",
      defaultValue: "12345",
    },
  },

};

/**
 * 
 * For Tabs - Container
 */


export const Default = {
  args: defaultdata,
};

/**
 * Tabs - Container Default
 */
export const ContainerDefault = {
  args: {
    ...defaultdata,
    type: "container",
  }
};
/**
 * Tabs - Container Light
 */
export const ContainerLight = {
  args: {
    ...defaultdata,
    type: "container",
    variant: "light",
  }
};

/**
 * Tabs - Container Alt
 */
export const ContainerAlt = {
  args: {
    ...defaultdata,
    type: "container",
    variant: "alt",
  }
};

/**
 * Tabs - Container Dark
 */
export const ContainerDark = {
  args: {
    ...defaultdata,
    type: "container",
    variant: "dark",
  }
};

/**
 * Tabs - Container Dark-Alt
 */
export const ContainerDarkAlt = {
  args: {
    ...defaultdata,
    type: "container",
    variant: "dark-alt",
  }
};