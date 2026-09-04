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
      expandButton.addEventListener("click", toggleClickHandler);

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
      }
    }
  });
}

/**
 * Expand shortened breadcrumb lists
 * Adds expanded class, sets tabindex on elements and adds required listeners.
 *
 * @param  {Element} dropdownElement - The element to which we add the "expanded" class. This is the element with class ".breadcrumb-toggle", parent of both .breadcrumb-toggle-link and .breadcrumb-collapse-wrapper
 * @returns {void} Returns early when the breadcrumb does not exist or is empty.
 */
function expandMenu(dropdownElement) {
  const items = dropdownElement.querySelectorAll(
    ".breadcrumb-collapse-wrapper li a",
  );

  dropdownElement.classList.add("expanded");
  resetTabIndex(0, items);
  items.item(0)?.focus();

  document.addEventListener("click", clickOrFocusOutsideHandler);
  document.addEventListener("focusin", clickOrFocusOutsideHandler);
  dropdownElement.addEventListener("keydown", keydownHandler);
}

/**
 * All functionality associated with collapsing the dropdown breadbrumbs menu.
 * Remove classes, resets tab index and removes associated listeners.
 *
 * @param  {Element} dropdownElement - The element to which we add the "expanded" class. This is the element with class ".breadcrumb-toggle", parent of both .breadcrumb-toggle-link and .breadcrumb-collapse-wrapper
 * @returns {void} Returns nothing.
 */
function collapseMenu(dropdownElement) {
  dropdownElement.classList.remove("expanded");
  resetTabIndex(
    -1,
    dropdownElement.querySelectorAll(".breadcrumb-collapse-wrapper li a"),
  );
  document.removeEventListener("click", clickOrFocusOutsideHandler);
  document.removeEventListener("focusin", clickOrFocusOutsideHandler);
  dropdownElement.removeEventListener("keydown", keydownHandler);
}

/**
 *
 * @param {PointerEvent} event triggered from the toggle button.
 * @returns {void}
 */
function toggleClickHandler(event) {
  // if the menu is open, close it. If the menu is closed, open it.
  const dropdownElement = event.target.closest(".breadcrumb-toggle");
  if (!dropdownElement) return;

  const isOpen = dropdownElement.classList.contains("expanded");

  if (isOpen) collapseMenu(dropdownElement);
  else expandMenu(dropdownElement);
}

/**
 *
 * @param {Event} event either a document "focusin" or "click" event.
 * @returns {void}
 */
function clickOrFocusOutsideHandler(event) {
  // If the click or focus in event did not come from the breadcrumb or its children, collapse the menu
  const dropdownElement = document.querySelector(".breadcrumb-toggle");
  if (!dropdownElement) return;

  if (!dropdownElement.contains(event.target)) {
    collapseMenu(dropdownElement);
  }
}

/**
 *
 * @param {KeyboardEvent} event
 * @returns {void}
 */
function keydownHandler(event) {
  if (event.key === "Escape") {
    collapseMenu(event.target);
  }
}

function resetTabIndex(tabindex, elements) {
  if (!elements) {
    elements = document.querySelectorAll(".breadcrumb-collapse-wrapper li a");
  }
  elements.forEach((crumb) => {
    crumb.setAttribute("tabindex", tabindex);
  });
}
