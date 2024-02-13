// ComponentExample.stories.js
import { Table } from "./Table.js";
import defaultdata from "./table.data.json";

export default {
  tags: ["autodocs"],
  title: "Components/Table",
  render: (args) => {
	
    //Storybook produces a comma delimited string when using the check control type (table-striped, table-bordered) etc. 
    //We can't use commas on our class="..." attribute, so we need to replace the commas with spaces.
    if( typeof(args.classes) === 'string' ) {
      args.classes = args.classes.replace(","," ").split(" ");
    } else if ( typeof(args.classes) === 'object' ) {
      args.classes = args.classes.join(" ");
    }

    return new Table(args).html;
  
  },

  //https://storybook.js.org/docs/api/arg-types
  argTypes: {
    classes: {
      name: "Classes",
      description: `Settable classes for the component`,
      control: {
        type: "check",
        labels: {
          "table-dark": "Dark",
          "table-striped": "Striped",
          "table-bordered": "Bordered",
          "table-borderless": "Borderless",
          "table-hover": "Hover",
          "table-sm": "Small",
        },
      },
      options: [
        "table-dark",
        "table-striped",
        "table-bordered",
        "table-borderless",
        "table-hover",
        "table-sm",
      ],
    },

    caption: {
      name: "Caption",
      description: `Table caption`,
      control: {
        type: "text",
      },
    },

    subcaption: {
      name: "Subcaption",
      description: `Table subcaption`,
      control: {
        type: "text",
      },
    },

  },

  parameters: {
    design: {
      name: "QGDS Figma Reference",
      type: "figma",
      url: "https://www.figma.com/file/qKsxl3ogIlBp7dafgxXuCA/QLD-GOV-DDS?type=design&node-id=23167-395552&mode=design&t=qoWXcELpZe1uqHs8-0",
    },
    docs: {
      controls: {
        exclude: ["headers", "rows", "footer"],
      },
    },
  },
};

// Default story for a Table
export const Default = {
  args: defaultdata,
};

// Default story for a Table
export const DarkTheme = {
  args: {
    ...defaultdata,
    ...{classes: "table-dark"},
  	},
}


// Default story for a Table
export const Striped = {
  args: { 
    ...defaultdata,
    ...{classes: "table-striped"},
  },
};


// Default story for a Table
export const Bordered = {
  args: { 
	  ...defaultdata,
	  ...{classes: "table-bordered"},
  },
};
  

// Default story for a Table
export const Borderless = {
  args: { 
	  ...defaultdata,
	  ...{classes: "table-borderless"},
  },
};


// Default story for a Table
export const WithHover = {
  args: { 
	  ...defaultdata,
	  ...{classes: "table-hover"},
  },
};
  
// Default story for a Table
export const Small = {
  args: { 
	  ...defaultdata,
	  ...{classes: "table-sm"},
  },
};
