/**
 * Shorten long breadcrumb lists
 *
 * @memberof module:Breadcrumb
 *
 * @param  {Object}  event - The event that triggered this function.
 * @returns {void}
 */
export function breadcrumbShorten () {
  let breadcrumbList = document.querySelector('.breadcrumb').querySelectorAll('.breadcrumb-item')

  if (breadcrumbList.length > 4) {
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
}

/**
 * Expand shortened breadcrumb lists
 *
 * @memberof module:Breadcrumb
 *
 * @param  {Object}  event - The event that triggered this function.
 * @returns {void}
 */
export function breadcrumbExpand () {
  let breadcrumbList = document.querySelector('.breadcrumb').querySelectorAll('.breadcrumb-item')

  breadcrumbList[0].parentElement.classList.add('expanded')

  breadcrumbList.forEach((crumb, index) => {
    if (index > 1 && index < breadcrumbList.length - 2) {
      crumb.classList.remove('shortened')
      crumb.querySelector('a').setAttribute('tabindex', 0)
    }
  })
}
