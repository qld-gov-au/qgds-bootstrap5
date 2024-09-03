module.exports = async function (input, info) {
  var output = `<div class="col${input.feature ? '-md-12 col-lg-12' : ''}">
                <div class="card card-${input.variantClass} ${input.variantClass} ${input.iconPosition} card-${input.action}-action 
                ${input.arrow ? 'card-arrow' : ''} ${input.equalHeight ? 'h-100' : ''} ${input.feature ? 'card-feature' : ''} 
                ${input.featureImagePosition ? 'card-feature-input.featureImagePosition' : ''} ${input.video ? 'card-video' : ''}">`;

  if (input.image) {
    output += `<div class="card-img ratio ratio-16x9">
  <div class="${input.feature ? "card-img-${featureImagePosition}" : "card-img-top"}"
  `;
  }
  return output;
};