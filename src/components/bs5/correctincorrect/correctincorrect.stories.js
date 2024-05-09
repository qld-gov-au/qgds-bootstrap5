// FormcheckCheckbox.stories.js
import { CorrectIncorrect } from './CorrectIncorrect.js';

import { Table } from '../table/Table.js';

export default {
  tags: ['autodocs'],
  title: 'Components/CorrectIncorrect',
  render: (args) => {
    return `${new CorrectIncorrect(args).html}`
  },
};

// export const Default = {
// };

export const ShortForm = {
  render: () => {
    return `<span class="qg-correct">
        Does not currently exist <a href='#'>www.qld.gov.au/CycloneXena</a>
      </span>
      <span class="qg-incorrect">
        <p>Is an already existing page <a href='#'>www.qld.gov.au/recreation</a></p>
      </span>`
  },
}

export const LongForm = {
  render: () => {
    return `
    <div class="qg-correct">
      <p><a href='#'>www.qld.gov.au/e10ok</a> contains only letters and numbers</p>
      <p><a href='#'>www.qld.gov.au/CrossRiverRail</a> uses camel case to improve readability (Note: The actual link is not case sensitive and there may be instances where the URL is displayed in lowercase.)</p> <p><a href='#'>www.qld.gov.au/starting-a-cafe</a> is clear as the letter 'a' in the middle may be overlooked or confused as a single word</p>
    </div>
    <div class="qg-incorrect">
      <p><a href='#'>www.qld.gov.au/$200rebate</a> contains a dollar sign</p>
      <p><a href='#'>www.qld.gov.au/local parks</a> contains a space</p>
      <p><a href='#'>www.qld.gov.au/under_scores</a> contains an underscore</p>
      <p><a href='#'>www.qld.gov.au/water-ways-and-the-environment</a> excessively uses hyphens, which may make the URL less memorable</p>
    </div>`
  },
}


export const TableByColumnsForCorrectAndIncorrect = {
  args: {
    "customClass": "",
    "variantClass": "qg-correct-incorrect",
    "headers": ["Header", "Header"],
    "rows": [
      { "cells": ["Cell", "Cell"] },
      { "cells": ["Cell", "Cell"] },
      { "cells": ["Cell", "Cell"] },
      { "cells": ["Cell", "Cell"] },
      { "cells": ["Cell", "Cell"] },
      { "cells": ["Cell", "Cell"] }
    ],
  }
  ,
  render: (args) => {
    return `${new Table(args).html}`
  },
}
export const TableByColumnsForIncorrectAndCorrect = {
  args: {
    "customClass": "",
    "variantClass": "qg-incorrect-correct",
    "headers": ["Header", "Header"],
    "rows": [
      { "cells": ["Cell", "Cell"] },
      { "cells": ["Cell", "Cell"] },
      { "cells": ["Cell", "Cell"] },
      { "cells": ["Cell", "Cell"] },
      { "cells": ["Cell", "Cell"] },
      { "cells": ["Cell", "Cell"] }
    ],
  }
  ,
  render: (args) => {
    return `${new Table(args).html}`
  },
}

export const TableByCell = {
  render: () => {
    return `
      <div class="table-responsive qld-table ">
        <table class="table ">
            <thead>
                <tr>
                    <th scope="col">Header</th>
                    <th scope="col">Header</th>
                </tr>
            </thead>
            <tbody>
                <tr class="">
                    <td class="qg-correct">Lorem ipsum dolor sit amet </td>
                    <td class="qg-incorrect">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi culpa dignissimos. </td>
                </tr>
                <tr class="">
                    <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi culpa dignissimos. </td>
                    <td>Lorem ipsum dolor sit amet </td>
                </tr>
                <tr class="">
                    <td>Cell</td>
                    <td class="qg-incorrect">Cell</td>
                </tr>
                <tr class="">
                  <td class="qg-correct">Cell</td>
                    <td>Cell</td>
                </tr>
            </tbody>
        </table>
      </div>`
  },
}