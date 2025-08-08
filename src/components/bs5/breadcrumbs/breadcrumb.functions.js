/**
 * Initialise the Breadcrumb component.
 * Collapse long breadcrumbs when required.
 *
 * @memberof module:Breadcrumb
 *
 * @returns {void} Returns early when breadcrumb does not exist or its length is within set maxLength.
 */
export function initBreadcrumb() {
  // Set the standard breadcrumb length.
  const maxLength = 4;

  // Get the breadcrumb DOM element.
  const breadcrumb = document.querySelector(".breadcrumb");
  if (!breadcrumb) {
    return;
  }
  const breadcrumbList = breadcrumb.querySelectorAll(".breadcrumb-item");

  // Return when breadcrumb does not exist.
  if (!breadcrumbList || !breadcrumbList.length) {
    return;
  }
  // Collapse breadcrumb.
  breadcrumbCollapse(breadcrumbList, maxLength);
}

/**
 * Collapse long breadcrumb lists
 *
 * @memberof module:Breadcrumb
 *
 * @param  {Element} breadcrumbList - Breadcrumb DOM element.
 * @param  {number} maxLength - Standard maximum length for breadcrumb.
 * @returns {void} Returns early when breadcrumb does not exist or its length is within set maxLength.
 */
export function breadcrumbCollapse(breadcrumbList, maxLength = 4) {
  // No shortening is required when breadcrumb does not exist or its length is within the maximum range.
  if (!breadcrumbList || breadcrumbList.length <= maxLength) {
    return;
  }

  const newList = document.createElement("ol");
  newList.classList.add("breadcrumb-vertical");

  breadcrumbList.forEach((crumb, index) => {
    if (index > 1 && index < breadcrumbList.length - 2) {
      crumb.querySelector("a").setAttribute("tabindex", 0);
      newList.appendChild(crumb);
    }

    if (index === 1) {
      let expandCrumb = document.createElement("li"),
        expandButton = document.createElement("a");

      expandCrumb.classList.add("breadcrumb-item", "breadcrumb-toggle");
      expandButton.setAttribute("href", "javascript:void(0)");
      expandButton.setAttribute("aria-label", "Expand the breadcrumbs");

      expandButton.addEventListener("click", breadcrumbToggle);
      //document.addEventListener("click", breadcrumbToggle);
      expandCrumb.appendChild(expandButton);
      crumb.after(expandCrumb);
    }

    if (index === breadcrumbList.length - 1) {
      const expandCrumb = document.querySelector(".breadcrumb-toggle");
      if (expandCrumb) {
        expandCrumb.append(newList);
      }
    }
  });
}

/**
 * Expand collapsed breadcrumb lists
 *
 * @memberof module:Breadcrumb
 *
 * @param  {Event} event - The event that triggered this function.
 * @returns {void} Returns early when the breadcrumb does not exist or is empty.
 */
export function breadcrumbToggle(event) {
  const breadcrumb = event.target.closest(".breadcrumb");
  if (breadcrumb.classList.contains("expanded")) {
    breadcrumb.classList.remove("expanded");
  } else {
    breadcrumb.classList.add("expanded");
  }
}
