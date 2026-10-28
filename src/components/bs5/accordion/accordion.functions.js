/**
 * Sync the Toggle-All button's class, text and aria-expanded state.
 *
 * @param {HTMLElement} toggleButton - The Toggle-All button.
 * @param {boolean} allExpanded - Whether all panels are open.
 * @returns {void}
 */
function setToggleState(toggleButton, allExpanded) {
  toggleButton.setAttribute("aria-expanded", String(allExpanded));
  toggleButton.textContent = allExpanded ? "Close all" : "Open all";
  toggleButton.classList.toggle("accordion-toggle-btn--open", allExpanded);
  toggleButton.classList.toggle("accordion-toggle-btn--closed", !allExpanded);
}

/**
 * Toggle all accordion elements
 *
 * @memberof module:Accordion
 *
 * @param  {Object}  event - The event that triggered this function.
 * @returns {void}
 */
export function accordionToggleAll(event) {
  // stop event propagation
  try {
    window.event.cancelBubble = true;
    event.stopPropagation();
  } catch (error) {
    //error message
  }

  let toggleAllButton = event.target;
  // find the accordion wrapper
  let wrapper = toggleAllButton.closest(".accordion-group");
  // get all the accordion buttons
  let accordionButtons = wrapper.querySelectorAll(".accordion-button");

  // Check if opened or closed
  if (toggleAllButton.classList.contains("accordion-toggle-btn--closed")) {
    setToggleState(toggleAllButton, true);
    accordionButtons.forEach((button) => {
      if (button.matches(".collapsed")) button.click();
    });
  } else if (toggleAllButton.classList.contains("accordion-toggle-btn--open")) {
    setToggleState(toggleAllButton, false);
    accordionButtons.forEach((button) => {
      if (button.matches(":not(.collapsed)")) button.click();
    });
  }
}

/**
 * Updates toggle all button if all panels are open/closed individually.
 *
 * @memberof module:Accordion
 *
 * @param {Object} event - The event that triggered this function.
 * @returns {void}
 */
export function accordionToggleAllButtonState(event) {
  // stop event propagation
  try {
    window.event.cancelBubble = true;
    event.stopPropagation();
  } catch (error) {
    //error message
  }

  let accordionGroup = event.target.closest(".accordion-group");
  if (!accordionGroup) return;

  let toggleAllButton = accordionGroup.querySelector(".accordion-toggle-btn");
  if (!toggleAllButton) return;

  const allExpanded =
    accordionGroup.querySelectorAll(".accordion-button.collapsed").length === 0;
  setToggleState(toggleAllButton, allExpanded);
}

/**
 * Initialises accordion Toggle-All button and updates its state
 * whenever the accordion panel is opened/closed by other functions (e.g. by the browser's "Find in Page").
 *
 * @memberof module:Accordion
 * @returns {void}
 */
export function initAccordionToggleAll() {
  let accordionToggleButton = document.querySelectorAll(
    ".accordion-toggle-btn",
  );

  accordionToggleButton.forEach(function (toggleButton) {
    toggleButton.addEventListener("click", accordionToggleAll);

    let accordionCollapses = toggleButton
      .closest(".accordion-group")
      .querySelectorAll(".accordion-collapse");

    accordionCollapses.forEach(function (collapseEl) {
      collapseEl.addEventListener(
        "shown.bs.collapse",
        accordionToggleAllButtonState,
      );
      collapseEl.addEventListener(
        "hidden.bs.collapse",
        accordionToggleAllButtonState,
      );
    });
  });
}

/**
 * Open and scroll to an accordion panel specified via URL hash.
 *
 * @memberof module:Accordion
 *
 * @param {Object} event - (optional) The event that triggered this function.
 * @returns {void}
 */
export function accordionHashLinks(event) {
  let urlHash = window.location.hash,
    urlHashId = urlHash.substring(1),
    cleanHash = filterSpecialChar(urlHash);

  if (cleanHash.length > 0) {
    let targetElement = document.querySelector(`#collapse-${urlHashId}`),
      targetPanelButton = false;

    // Stop default hash link behaviour if target matches current hash location.
    if (
      event &&
      ((event.type === "hashchange" && event.newURL === event.oldURL) ||
        (event.type === "click" && event.target.hash === urlHash))
    ) {
      event.preventDefault();
    }

    // ID matching
    if (targetElement && targetElement.closest(".accordion-item")) {
      targetPanelButton = targetElement
        .closest(".accordion-item")
        .querySelector(".accordion-button");
    }
    // Title matching
    else {
      let accordionButtons = document.querySelectorAll(".accordion-button");

      if (event && event.type === "click") {
        cleanHash = filterSpecialChar(event.target.hash);
      }

      targetPanelButton = Array.from(accordionButtons).find(
        (button) => filterSpecialChar(button.innerText) === cleanHash,
      );
    }

    if (targetPanelButton) {
      if (targetPanelButton.matches(".collapsed")) targetPanelButton.click();

      window.scrollTo(
        0,
        targetPanelButton.getBoundingClientRect().top +
          document.documentElement.scrollTop,
      );
    }
  }
}

/**
 * filterSpecialChar
 * @param {string} value - value to filter
 * @return {undefined}
 **/
function filterSpecialChar(value) {
  return decodeURI(value.toLowerCase().replace(/[^a-zA-Z0-9/]/g, ""));
}

/**
 * Allow browser native "Find in Page" to search content inside collapsed accordions.
 * Uses the HTML hidden="until-found" attribute and the "beforematch" event
 * to automatically expand collapsed accordions when search text is found inside the accordion panels.
 *
 * @memberof module:Accordion
 * @returns {void}
 */
export function initAccordionFindInPage() {
  let accordions = document.querySelectorAll(".accordion-collapse");

  accordions.forEach((collapseEl) => {
    collapseEl.addEventListener("beforematch", () => {
      const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseEl);
      bsCollapse.show();
    });

    collapseEl.addEventListener("show.bs.collapse", () => {
      collapseEl.removeAttribute("hidden");
    });

    collapseEl.addEventListener("hidden.bs.collapse", (e) => {
      collapseEl.setAttribute("hidden", "until-found");
    });
  });
}
