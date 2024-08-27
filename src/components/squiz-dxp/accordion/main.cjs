/**
 * Accordion component
 * Common js module to support DXP Component Service.
 */
module.exports = async function (input, info) {

    const items = input.accordionItems.map(item => 
        `<div class="accordion-item">
            <h2 class="accordion-header" id="heading-${item.id}">
                <button class="accordion-button ${!item.expanded ? 'collapsed' : '' }" type="button" 
                        data-bs-toggle="collapse" data-bs-target="#collapse-${item.id}" 
                        aria-expanded="${item.expanded}" aria-controls="collapse-${item.id}">
                    ${item.title}
                </button>
            </h2>

            <div id="collapse-${item.id}" class="accordion-collapse collapse ${item.expanded? 'show': ''}" 
                aria-labelledby="heading-${item.id}">
                <div class="accordion-body">
                    ${item.content}
                </div>
            </div>
        </div>`
    ).join('');

    return `
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
    `;
};

