/**
 * Callout component
 * Common js module to support DXP Component Service.
 */
module.exports = async function (input, info) {
  return `
  <div class="callout">
      ${input.title ? `
        <h3 class="callout-title">${input.title}</h3>
        ` 
        : ''}
      <div class="callout-text">${input.content}</div>
  </div>
  `;
};