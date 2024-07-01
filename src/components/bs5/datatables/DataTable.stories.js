import { DataTable } from "./datatable.js";
import defaultData from "../table/table.data.json";

export default {
  tags: ["autodocs"],
  title: "Components/DataTable",
  render: (args) => {
    if (typeof(args.variantClass) === 'string') {
      args.variantClass = args.variantClass.replaceAll(",", " ");
    } else if (typeof(args.variantClass) === 'object') {
      args.variantClass = args.variantClass.join(" ");
    }
    return new DataTable(args).html;
  },
  argTypes: {
    variantClass: {
      name: "Classes",
      description: "Settable classes for the component",
      control: {
        type: "check",
        labels: {
          "table-dark": "Dark",
          "table-striped": "Striped",
          "table-hover": "Hover"
        },
      },
      options: ["table-dark", "table-striped", "table-hover"],
    },
    caption: {
      name: "Caption",
      description: "Table caption",
      control: { type: "text" },
    },
    subcaption: {
      name: "Subcaption",
      description: "Table subcaption",
      control: { type: "text" },
    },
  },
  parameters: {
    docs: {
      controls: {
        exclude: ["headers", "rows", "footer"],
      },
    },
  },
};

export const Default = {
  args: defaultData,
};

export const Striped = {
  args: {
    ...defaultData,
    variantClass: "table-striped",
  },
};

export const WithHover = {
  args: {
    ...defaultData,
    variantClass: "table-hover",
  },
};

export const Dark = {
  args: {
    ...defaultData,
    variantClass: "table-dark",
  },
};

export const DarkWithHover = {
  args: {
    ...defaultData,
    variantClass: ["table-dark", "table-hover"],
  },
};

export const Responsive = {
  decorators: [
    (Story) => {
      return `
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              ${Story()}
            </div>
          </div>
        </div>
      `;
    },
  ],
  args: {
    ...defaultData,
    headers: [
      "ID", "Name", "Age", "Role", "Location", "Department", "Salary", "Hire Date", "Manager", "Status"
    ],
    rows: [
      { "rowClass": "", "cells": ["1", "John Doe", "28", "Developer", "Brisbane", "IT", "$80,000", "2020-01-15", "Jane Smith", "Active"] },
      { "rowClass": "", "cells": ["2", "Jane Smith", "32", "Designer", "Sydney", "Design", "$75,000", "2019-07-22", "Mike Brown", "Active"] },
      { "rowClass": "", "cells": ["3", "Mike Brown", "45", "Manager", "Melbourne", "Management", "$120,000", "2015-03-10", "Emily White", "Active"] },
      { "rowClass": "", "cells": ["4", "Emily White", "30", "Analyst", "Perth", "Finance", "$90,000", "2018-11-05", "John Doe", "Inactive"] }
    ],
    footer: [
      {
        "rowClass": "",
        "cells": ["", "", "Total", "", "", "", "$365,000", "", "", ""]
      }
    ],
    variantClass: ["table-striped", "table-hover"],
  },
};
