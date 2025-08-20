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
    if (index > 0 && index < breadcrumbList.length - 2) {
      crumb.querySelector("a").setAttribute("tabindex", 0);
      newList.appendChild(crumb);
    }

    if (index === 0) {
      let expandCrumb = document.createElement("li"),
        expandButton = document.createElement("button");

      expandCrumb.classList.add("breadcrumb-item", "breadcrumb-toggle");
      //expandButton.setAttribute("href", "javascript:void(0)");
      expandButton.setAttribute("aria-label", "Expand the breadcrumbs");
      expandButton.classList.add("breadcrumb-toggle-link");
      expandButton.addEventListener("click", breadcrumbExpand);

      expandCrumb.appendChild(expandButton);
      crumb.after(expandCrumb);
    }

    if (index === breadcrumbList.length - 1) {
      const expandCrumb = document.querySelector(".breadcrumb-toggle");
      if (expandCrumb) {
        const wrapperDiv = document.createElement("div");
        wrapperDiv.classList.add("breadcrumb-wrapper");
        wrapperDiv.appendChild(newList);
        expandCrumb.append(wrapperDiv);
        wrapperDiv.addEventListener("focusout", (event) => {
          // Check if the element receiving focus is outside the dropdown container
          if (
            !event.relatedTarget ||
            !wrapperDiv.contains(event.relatedTarget)
          ) {
            console.log(
              "breadcrumbExpand: Focusout event on wrapperDiv to close expanded breadcrumb.",
            );
            wrapperDiv.parentElement.classList.remove("expanded");
          }
        });
      }
    }
  });
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
  const breadcrumb = event.target.closest(".breadcrumb");
  if (!breadcrumb) {
    console.log("breadcrumbExpand: Breadcrumb does not exist.");
    return;
  }
  const breadcrumbList = breadcrumb.querySelectorAll(".breadcrumb-item");

  if (!breadcrumbList || !breadcrumbList.length) {
    console.log("breadcrumbExpand: Breadcrumb does not exist or is empty.");
    return;
  }

  event.target.parentElement.classList.toggle("expanded");
  const expandButton = document.querySelector(".breadcrumb-toggle-link");
  expandButton && document.addEventListener("click", collapseMenu);
}
/**
 * event listener for document click event used to collapse menu on clicking elsewhere
 * and also remove the event listener to prevent multiple listeners from being attached
 * @memberof module:Breadcrumb
 *
 * @param  {Event} event - The event that triggered this function.
 */
function collapseMenu(event) {
  event.stopPropagation();
  event.preventDefault();
  console.log(
    "breadcrumbExpand: Click event on document to close expanded breadcrumb.",
  );
  const expandButton = document.querySelector(".breadcrumb-toggle-link");
  const expandMenu = document.querySelector(".breadcrumb-wrapper");
  if (
    !expandMenu.contains(event.target) &&
    !expandButton.contains(event.target)
  ) {
    expandMenu.parentElement.classList.remove("expanded");
    document.removeEventListener("click", collapseMenu);
  }
}
