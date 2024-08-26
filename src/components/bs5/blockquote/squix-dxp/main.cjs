/**
 * Accordion component
 * Common js module to support DXP Component Service.
 */
module.exports = async function (input, info) {
    /* Loading asset files for Live Preview on dev-ui.
    * Currently Live Preview does not load staticFiles defined on manifest.json
    * This is a workaround until Squiz fix the issue.
    */
    let headerStaticFiles = [];
    let footerStaticFiles = [];
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

    return `
    ${headerStaticFiles.join(' ')}
    <figure class="blockquote ${input.classes}">
        <blockquote cite="${input.citeUrl}">
            ${input.content}
        </blockquote>

        <figcaption class="quote-source">
            ${input.citeText}
        </figcaption>

    </figure>
    ${footerStaticFiles.join(' ')}
    `;
};