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
  let maxLength = 5;

  // Get the breadcrumb DOM element.
  const breadcrumb = document.querySelector(".breadcrumb");

  if (!breadcrumb) {
    return;
  }
  const expandCrumb = breadcrumb.querySelector(".breadcrumb-toggle");
  if (expandCrumb) {
    // Breadcrumb has already been initialised.
    return;
  }
  const breadcrumbList = breadcrumb.querySelectorAll(".breadcrumb-item");

  // Return when breadcrumb does not exist.
  if (!breadcrumbList || !breadcrumbList.length) {
    return;
  }

  const breadcrumbParent = breadcrumb.parentElement;
  if (!breadcrumbParent) {
    return;
  }

  // Collapse breadcrumb when width of breadcrumb overflows the container.
  if (breadcrumb.clientWidth >= breadcrumbParent.clientWidth) {
    maxLength = 3;
  }
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
export function breadcrumbCollapse(breadcrumbList, maxLength = 5) {
  // No shortening is required when breadcrumb does not exist or its length is within the maximum range.
  if (!breadcrumbList || breadcrumbList.length <= maxLength) {
    return;
  }

  const newList = document.createElement("ol");
  newList.classList.add("breadcrumb-vertical");

  breadcrumbList.forEach((crumb, index) => {
    if (index > 0 && index < breadcrumbList.length - 2) {
      crumb.querySelector("a")?.setAttribute("tabindex", -1);
      newList.appendChild(crumb);
    }

    if (index === 0) {
      let expandCrumb = document.createElement("li"),
        expandButton = document.createElement("button");

      expandCrumb.classList.add("breadcrumb-item", "breadcrumb-toggle");
      expandButton.setAttribute("aria-label", "Expand the breadcrumbs");
      expandButton.type = "button";
      expandButton.classList.add("breadcrumb-toggle-link");
      expandButton.addEventListener("click", expandMenu);

      expandCrumb.appendChild(expandButton);
      crumb.after(expandCrumb);
    }

    if (index === breadcrumbList.length - 1) {
      const expandCrumb = document.querySelector(".breadcrumb-toggle");
      if (expandCrumb) {
        const wrapperDiv = document.createElement("div");
        wrapperDiv.classList.add("breadcrumb-collapse-wrapper");
        wrapperDiv.appendChild(newList);
        expandCrumb.append(wrapperDiv);
        expandCrumb.addEventListener("focusout", (event) => {
          // Check if the element receiving focus is outside the dropdown container
          if (
            !event.relatedTarget ||
            !expandCrumb.contains(event.relatedTarget)
          ) {
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
export function expandMenu(event) {
  const breadcrumb = event.target.closest(".breadcrumb");
  if (!breadcrumb) {
    console.log("expandMenu: Breadcrumb does not exist.");
    return;
  }
  const breadcrumbList = breadcrumb.querySelectorAll(".breadcrumb-item");

  if (!breadcrumbList || !breadcrumbList.length) {
    console.log("expandMenu: Breadcrumb does not exist or is empty.");
    return;
  }

  event.target.parentElement.classList.toggle("expanded");
  if (event.target.parentElement.classList.contains("expanded")) {
    // Focus the first focusable element inside
    const expandMenu = document.querySelector(".breadcrumb-collapse-wrapper");
    resetTabIndex(0);
    const firstItem = expandMenu.querySelector("a");
    if (firstItem) {
      firstItem.focus();
    }
  }
  const expandButton = document.querySelector(".breadcrumb-toggle-link");
  expandButton && document.addEventListener("click", collapseMenu);
}

/**
 * event listener for document click event used to collapse menu on clicking elsewhere
 * and also remove the event listener to prevent multiple listeners from being attached
 * @memberof module:Breadcrumb
 *
 * @param  {Event} event - The event that triggered this function.
 * @returns {void} Returns nothing.
 */

function collapseMenu(event) {
  event.stopPropagation();
  const expandButton = document.querySelector(".breadcrumb-toggle-link");
  const expandMenu = document.querySelector(".breadcrumb-collapse-wrapper");
  if (
    !expandMenu.contains(event.target) &&
    !expandButton.contains(event.target)
  ) {
    expandMenu.parentElement.classList.remove("expanded");
    document.removeEventListener("click", collapseMenu);
    resetTabIndex(-1);
  }
}

function resetTabIndex(tabindex) {
  const breadcrumbListExpanded = document.querySelectorAll(
    ".breadcrumb-collapse-wrapper li",
  );
  if (!breadcrumbListExpanded) {
    return;
  }
  breadcrumbListExpanded.forEach((crumb) => {
    crumb.querySelector("a")?.setAttribute("tabindex", tabindex);
  });
}
