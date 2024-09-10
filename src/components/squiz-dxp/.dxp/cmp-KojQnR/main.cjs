module.exports = async function (input, info) {
  var output = `<div class="col${input.feature ? '-md-12 col-lg-12' : ''}">
                <div class="card card-${input.variantClass} ${input.variantClass} ${input.iconPosition} card-${input.action}-action 
                ${input.arrow ? 'card-arrow' : ''} ${input.equalHeight ? 'h-100' : ''} ${input.feature ? 'card-feature card-feature-' + input.featureImagePosition : ''} 
                ${input.video ? 'card-video' : ''}">`;

  if (input.image) {
    output += `<div class="card-img ratio ratio-16x9">
  <div class="${input.feature ? 'card-img-' + featureImagePosition : 'card-img-top'}"
  style="--card-image:url(${input.image})" alt="${input.imageAlt}"></div>`;
    if (input.video) {
      output += `<div class="video-overlay">
                  <div class="video-nav">
                    <div class="video-watch"><span class="icon"></span><span>Watch</span></div>
    `;
      if (input.videoDuration) {
        output += `<div title="Video duration" class="video-duration"><span class="icon"></span><span>${input.videoDuration}</span></div>
    `;
      }
      output += `</div>
                </div>
    `;
    }
    output += `</div>`;
  }

  if (input.iconClasses) {
    output += `<div class="card-icon ${input.iconPosition} ${input.iconClasses}"></div>`;
  }
  if (input.feature) {
    output += `<div class="card-inner">`;
  }

  output += `<div class="card-body">`;
  if (input.date) {
    output += `<div class="card-date">${input.date}</div>`;
  }
  output += `<h3 class="card-title">`;
  if (input.link) {
    output += `<a href="${input.link}"`;
    if (input.action === 'single') {
      output += `class="stretched-link"`;
    }
    output += `>${input.title}</a>`;
  } else {
    output += input.title;
  }
  output += `</h3>`;

  if (input.description) {
    output += `<div class="card-text">${input.description}</div>`;
  }

  if (input.arrow) {
    output += `<div class="card-icon icon-arrow"></div>`;
  }
  output += `</div>`; // card-body

  if (input.footer) {
    output += `<div class="card-footer">${input.footer}</div>`;
  }

  if (input.feature) {
    output += `</div>`;
  }
  output += `</div></div>`;
  return output;
};
