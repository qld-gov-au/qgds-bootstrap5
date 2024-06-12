/**
 * Initialise the Breadcrumb component.
 * Shorten long breadcrumbs when required.
 *
 * @memberof module:Breadcrumb
 *
 * @returns {void} Returns early when breadcrumb does not exist or its length is within set maxLength. 
 */
export function initBreadcrumb() {
  // Set the standard breadcrumb length.
  const maxLength = 4;

  // Get the breadcrumb DOM element.
  const breadcrumb = document.querySelector('.breadcrumb');
  if (!breadcrumb) {
    return;
  }
  const breadcrumbList = breadcrumb.querySelectorAll('.breadcrumb-item');

  // Return when breadcrumb does not exist.
  if (!breadcrumbList || !breadcrumbList.length) {
    return;
  }
  // Shorten breadcrumb.
  breadcrumbShorten(breadcrumbList, maxLength);
}

/**
 * Shorten long breadcrumb lists
 *
 * @memberof module:Breadcrumb
 *
 * @param  {Element} breadcrumbList - Breadcrumb DOM element.
 * @param  {number} maxLength - Standard maximum length for breadcrumb.
 * @returns {void} Returns early when breadcrumb does not exist or its length is within set maxLength.
 */
export function breadcrumbShorten(breadcrumbList, maxLength = 4) {
  // No shortening is required when breadcrumb does not exist or its length is within the maximum range.
  if (!breadcrumbList || breadcrumbList.length <= maxLength) {
    return;
  }

  breadcrumbList.forEach((crumb, index) => {
    if (index > 1 && index < breadcrumbList.length - 2) {
      crumb.classList.add('shortened')
      crumb.querySelector('a').setAttribute('tabindex',-1)
    }

    if (index === 1) {
      let expandCrumb = document.createElement('li'),
        expandButton = document.createElement('a')

      expandCrumb.classList.add('breadcrumb-item','breadcrumb-toggle')

      expandButton.setAttribute('href', 'javascript:void(0)')
      expandButton.setAttribute('aria-label', 'Expand the breadcrumbs')
      expandButton.textContent = '[...]'
      expandButton.addEventListener('click', breadcrumbExpand)

      expandCrumb.appendChild(expandButton)
      crumb.after(expandCrumb)
    }
  })
}

/**
 * Expand shortened breadcrumb lists
 *
 * @memberof module:Breadcrumb
 *
 * @param  {Event} event - The event that triggered this function.
 * @returns {void} Returns early when the breadcrumb does not exist or is empty.
 */
export function breadcrumbExpand(event) {
  const breadcrumb = event.target.closest('.breadcrumb');
  if (!breadcrumb) {
    console.log('breadcrumbExpand: Breadcrumb does not exist.');
    return;
  }
  const breadcrumbList = breadcrumb.querySelectorAll('.breadcrumb-item');

  if (!breadcrumbList || !breadcrumbList.length) {
    console.log('breadcrumbExpand: Breadcrumb does not exist or is empty.');
    return;
  }
  
  breadcrumbList[0].parentElement.classList.add('expanded')

  breadcrumbList.forEach((crumb, index) => {
    if (index > 1 && index < breadcrumbList.length - 2) {
      crumb.classList.remove('shortened')
      crumb.querySelector('a').setAttribute('tabindex', 0)
    }
  })
}