module.exports = async function (input, info) {

    function makeHeader() {
        if (!input.headers || !input.headers.length) {
            return;
        }

        return `
          <thead>
            <tr>
              ${input.headers.map(header => `<th scope="col">${header}</th>`).join('')}
            </tr>
          </thead>
        `;

    }

    function makeFooter() {
        if (!input.footer || !input.footer.length) {
            return '';
        }

        return `
        <tfoot>
          ${input.footer.map(row => `
            <tr class="">
              ${row.cells.map(cell => `<td>${cell}</td>`).join('')}
            </tr>
          `).join('')}
        </tfoot>
      `;
    }

    function makeBody() {
        if (!input.rows || !input.rows.length) {
            return '';
        }

        return `
        <tbody>
          ${input.rows.map(row => `
            <tr class="">
              ${row.cells.map(cell => `<td>${cell}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      `;
    }

    function makeCaption() {
        if (!input.caption) {
            return '';
        }

        return `
        <caption class="caption">
          ${input.caption}
          ${input.subcaption ? `<span class="sub-caption">${input.subcaption}</span>` : ''}
        </caption>
      `;
    }

    return `
      <div class="table-responsive qld-table ${input.customClass}">
        <table class="table ${input.variantClass}">
          
          ${makeCaption()}
          ${makeHeader()}
          ${makeBody()}
          ${makeFooter()}
  
          </table>
      </div>
    `;
};
