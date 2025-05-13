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
      description: 'Type variant for the tab system',
      control: "select",
      options: ["default", "light", "alt", "dark", "dark-alt"],
    },
    tab_variant: {
      description: 'The previous sibling variant value is used to set the tab system colour scheme in the tab section component.',
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
 * Tabs
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
    unique_id: "234566",
    variant: "default",
  }
};

/**
 * Tabs - Container Light
 */
export const ContainerLight = {
  args: {
    ...defaultdata,
    type: "container",
    unique_id: "345678",
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
    unique_id: "456789",
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
    unique_id: "567890",
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
    unique_id: "123456",
    variant: "dark-alt",
  }
};