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

    // console.log(JSON.stringify(info));
    if (info?.set?.webPath === 'mock-set' && Array.isArray(info.manifest.functions)) {
        info.manifest.functions.forEach(func => {
            func.output?.staticFiles?.forEach(({location, file}) => {
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

    const items = input.accordionItems.map(item =>
        `<div class="accordion-item">
            <h2 class="accordion-header" id="heading-${item.id}">
                <button class="accordion-button ${!item.expanded ? 'collapsed' : ''}" type="button" 
                        data-bs-toggle="collapse" data-bs-target="#collapse-${item.id}" 
                        aria-expanded="${item.expanded}" aria-controls="collapse-${item.id}">
                    ${item.title}
                </button>
            </h2>

            <div id="collapse-${item.id}" class="accordion-collapse collapse ${item.expanded ? 'show' : ''}" 
                aria-labelledby="heading-${item.id}">
                <div class="accordion-body">
                    ${item.content}
                </div>
            </div>
        </div>`
    ).join('');

    return `
    ${headerStaticFiles.join(' ')}
    <div class="accordion-group">
        ${input.toggleAll ?
            `<div class="accordion-toggle">
                <button class="accordion-toggle-btn accordion-toggle-btn--closed" type="button">Open all</button>
            </div>`
            : ''}
        <div class="accordion" id="${input.groupId}">
            ${items}
        </div>
    </div>
    ${footerStaticFiles.join(' ')}
    `;
};

