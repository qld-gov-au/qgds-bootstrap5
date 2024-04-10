// ComponentExample.stories.js
import { Table } from "./Table.js";
import defaultdata from "./table.data.json";

export default {
  tags: ["autodocs"],
  title: "Components/Table",
  render: (args) => {
    
    //Storybook produces a comma delimited string when using the check control type (table-striped, table-bordered) etc. 
    //We can't use commas on our class="..." attribute, so we need to replace the commas with spaces.
    if( typeof(args.variantClass) === 'string' ) {
      args.variantClass = args.variantClass.replaceAll(","," ");
    } else if ( typeof(args.variantClass) === 'object' ) {
      args.variantClass = args.variantClass.join(" ");
    }

    return new Table(args).html;
  
  },

  //https://storybook.js.org/docs/api/arg-types
  argTypes: {
    variantClass: {
      name: "Classes",
      description: `Settable classes for the component`,
      control: {
        type: "check",
        labels: {
          "table-dark": "Dark",
          "table-striped": "Striped",
        },
      },
      options: [
        "table-dark",
        "table-striped",
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
    // design: {
    //   name: "QGDS Figma Reference",
    //   type: "figma",
    //   url: "https://www.figma.com/file/qKsxl3ogIlBp7dafgxXuCA/QLD-GOV-DDS?type=design&node-id=23167-395552&mode=design&t=qoWXcELpZe1uqHs8-0",
    // },
    docs: {
      controls: {
        exclude: ["headers", "rows", "footer"],
      },
    },
  },
};

/**
 * 
 * For data tables with a small amount of rows use the default table:
 *  - Align text columns and corresponding data cells to the left
 *  - When comparing numbers in a column, align data cells and column headers to the right
 *  - For data tables with more rows, use the striped alternative
 * 
 * Example full table including headers, rows and footer, caption and subcaption
 */
export const Default = {
  args: defaultdata,
};

/**
 * Table with striping (or banding)  <code>.table-striped</code>
 */

export const Striped = {
  args: { 
    ...defaultdata,
    ...{variantClass: "table-striped"},
  },
};
  

/**
 * Also known as: Quiet Table
 * 
 * When seeking to integrate and expand the information that accompanies a text, a borderless table can prove advantageous. It imparts a sense of continuity and cohesion, making the data feel more seamlessly integrated with the surrounding text.
 */

export const Borderless = {
  args: { 
	  ...defaultdata,
	  ...{customClass: "qld-table--borderless"},
  },
};


/**
 * Table with row hover <code>.table-hover</code>
 */
export const WithHover = {
  args: { 
	  ...defaultdata,
	  ...{variantClass: "table-hover"},
  },
};



/**
 * Alternate (Dark) table. <code>.table-dark</code>
 */
export const Dark = {
  args: {
    ...defaultdata,
    ...{variantClass: "table-dark"},
  	},
}


/**
 * Alternate (Dark) table. <code>.table-dark .table-hover</code>
 */
export const DarkWithHover = {
  args: {
    ...defaultdata,
    ...{ variantClass: ["table-dark","table-hover"] },
  	},
}


/**
 * Responsive table example <code>.table-responsive</code>
 */
export const Responsive = {
  decorators: [
    (Story) => {
      return `
        <div class="container-fluid"><div class="row">
        <div class="col-6">
        ${Story()}
        </div>
        </div></div>
      `;
    },
  ],
  args: {
    ...defaultdata,
    ...{ 
      "headers": [
        "Header", 
        "Header", 
        "Header", 
        "Header", 
        "Header", 
        "Header", 
        "Header", 
        "Header", 
        "Header",
        "Header",
        "Header",
        "Header",
      ],
      "rows": [
        { "cells": ["Cell", "Longer cell", "Cell", "Cell", "Longer cell", "Cell", "Cell", "Cell", "Cell", "Cell", "Longer Cell", "Cell"] },
        { "cells": ["Cell", "Longer cell", "Cell", "Cell", "Longer cell", "Cell", "Cell", "Cell", "Cell", "Cell", "Longer Cell", "Cell"] },
        { "cells": ["Cell", "Longer cell", "Cell", "Cell", "Longer cell", "Cell", "Cell", "Cell", "Cell", "Cell", "Longer Cell", "Cell"] },
        { "cells": ["Cell", "Longer cell", "Cell", "Cell", "Longer cell", "Cell", "Cell", "Cell", "Cell", "Cell", "Longer Cell", "Cell"] },
        { "cells": ["Cell", "Longer cell", "Cell", "Cell", "Longer cell", "Cell", "Cell", "Cell", "Cell", "Cell", "Longer Cell", "Cell"] },
        { "cells": ["Cell", "Longer cell", "Cell", "Cell", "Longer cell", "Cell", "Cell", "Cell", "Cell", "Cell", "Longer Cell", "Cell"] },
      ],
      "footer": [
        {
          "cells": [
            "Footer",
            "Footer",
            "Footer",
            "Footer",
            "Footer",
            "Footer",
            "Footer",
            "Footer",
            "Footer",
            "Footer",
            "Footer",
            "Footer",
          ]
        }
      ]
    },
    ...{ variantClass: ["table-striped","table-hover"] },
  	},
}