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
    return `
    <span class="qg-correct">
      <p>Lorem ipsum dolor sit amet, consectetur <a href='#'>adipiscing elit</a>.</p>
    </span>
    <span class="qg-incorrect">
      <p>Lorem ipsum dolor sit amet, consectetur <a href='#'>adipiscing elit</a>.</p>
    </span>`
  },
}

export const LongForm = {
  render: () => {
    return `
    <div class="qg-correct">
      <p>Lorem ipsum dolor sit amet, consectetur <a href='#'>adipiscing elit</a>.</p>
      <p>Lorem ipsum dolor sit amet, consectetur <a href='#'>adipiscing elit</a>. Fusce dictum efficitur egestas. </p>
      <p>Lorem ipsum dolor sit amet, consectetur <a href='#'>adipiscing elit</a>. Fusce dictum efficitur egestas. Aenean sed pretium mauris. </p>
      <p>Lorem ipsum dolor sit amet, consectetur <a href='#'>adipiscing elit</a>. Fusce dictum efficitur egestas. Aenean sed pretium mauris. Quisque euismod in nisl et consequat.</p>
    </div>
    <div class="qg-incorrect">
      <p>Lorem ipsum dolor sit amet, consectetur <a href='#'>adipiscing elit</a>.</p>
      <p>Lorem ipsum dolor sit amet, consectetur <a href='#'>adipiscing elit</a>. Fusce dictum efficitur egestas. </p>
      <p>Lorem ipsum dolor sit amet, consectetur <a href='#'>adipiscing elit</a>. Fusce dictum efficitur egestas. Aenean sed pretium mauris. </p>
      <p>Lorem ipsum dolor sit amet, consectetur <a href='#'>adipiscing elit</a>. Fusce dictum efficitur egestas. Aenean sed pretium mauris. Quisque euismod in nisl et consequat.</p>
    </div>`
  },
}


export const TableByColumnsForCorrectAndIncorrect = {
  args: {
    "customClass": "",
    "variantClass": "qg-correct-incorrect",
    "headers": ["This", "Not this"],
    "rows": [
      { "cells": ["Cell", "Sell"] },
      { "cells": ["Lorem ipsum dolor", "Lorem ipsum jolor"] },
      { "cells": ["Lorem ipsum dolor sit", "Lorem ipsum dolor cit"] },
      { "cells": ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amat"] },
      { "cells": ["Lorem ipsum dolor sit amet consectetur", "Lorem ipsum dolor sit amet nonsectetur"] },
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
    "headers": ["Not this", "This"],
    "rows": [
      { "cells": ["Sell","Cell"] },
      { "cells": ["Lorem ipsum jolor", "Lorem ipsum dolor"] },
      { "cells": ["Lorem ipsum dolor cit", "Lorem ipsum dolor sit"] },
      { "cells": ["Lorem ipsum dolor sit amat", "Lorem ipsum dolor sit amet"] },
      { "cells": ["Lorem ipsum dolor sit amet nonsectetur", "Lorem ipsum dolor sit amet consectetur"] },
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
                    <td class="qg-correct">Cell</td>
                </tr>
                <tr class="">
                  <td class="qg-incorrect">Cell</td>
                    <td>Cell</td>
                </tr>
            </tbody>
        </table>
      </div>`
  },
}
