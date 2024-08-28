/**
 * Blockquote component
 * Common js module to support DXP Component Service.
 */
module.exports = async function (input, info) {
    return `
    <figure class="blockquote ${input.classes}">
        <blockquote cite="${input.citeUrl}">
            ${input.content}
        </blockquote>

        <figcaption class="quote-source">
            ${input.citeText}
        </figcaption>

    </figure>
    `;
};