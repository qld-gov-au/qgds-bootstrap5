module.exports = async function (input, info) {
  return `
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${input.modalID}">
  ${input.launchButtonLabel}
  </button>
  <p>You can also <a class="d-inline-block my-3" href="#" data-bs-toggle="modal" data-bs-target="${input.modalID}">open a model</a> with a standard link.


<!-- QGDS Modal -->
<div class="modal fade" id="${input.modalID}" tabindex="-1" aria-labelledby="${input.modalLabel}" aria-hidden="true">
  <div class="modal-dialog ${input.modalSize}">
    <div class="modal-content">

    //if statement
      ${input.header ? `
      <div class="modal-header">
        <h1 class="modal-title" id="${input.modalLabel}">${input.header.title}</h1>
        ${input.header.closeButton ? `
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        ` : ``}
      </div>
      `: ``}
      <div class="modal-body">
        ${input.content}
      </div>
    
    
  `
};
