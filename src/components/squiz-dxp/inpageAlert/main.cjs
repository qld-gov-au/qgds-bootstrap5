module.exports = async function (input, info) {
  function headingContent() {
    if (!input.heading) {
      return;
    }
    return `
          <div class="alert-heading" role="heading">${input.heading}</div>
      `;
  }
  return `
  <div class="alert ${input.variantClass}" role="alert">
      ${headingContent()}
      ${input.content}
  </div>`;
};
