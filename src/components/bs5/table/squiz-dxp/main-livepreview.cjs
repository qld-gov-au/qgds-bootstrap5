/**
 * Table component
 * Live Preview version
 */
module.exports = async function (input, info) {
    /* Loading asset files for Live Preview on dev-ui.
    * Currently Live Preview does not load staticFiles defined on manifest.json
    * This is a workaround until Squiz fix the issue.
    */
    let headerStaticFiles = [];
    let footerStaticFiles = [];

    // console.log(JSON.stringify(info));
    if (info?.set?.webPath === 'mock-set' && Array.isArray(info.manifest.functions)) {
        info.manifest.functions.forEach(func => {
            func.output?.staticFiles?.forEach(({ location, file }) => {
                if (file?.filepath) {
                    let fileTag = '';
                    if (file.type === 'css') {
                        fileTag = `<link rel="stylesheet" href="${file.filepath}">`;
                    } else if (file.type === 'js') {
                        fileTag = `<script type="text/javascript" src="${file.filepath}"></script>`;
                    }

                    if (location === 'footer') {
                        footerStaticFiles.push(fileTag);
                    } else if (location === 'header') {
                        headerStaticFiles.push(fileTag);
                    }
                }
            });
        });
    }
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
    ${headerStaticFiles.join(' ')}
        <div class="table-responsive qld-table ${input.customClass}">
            <table class="table ${input.variantClass}">
                ${makeCaption()}
                ${makeHeader()}
                ${makeBody()}
                ${makeFooter()}
            </table>
        </div>
    ${footerStaticFiles.join(' ')}
    `;
};