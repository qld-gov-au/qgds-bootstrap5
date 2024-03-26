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
    toggleAllButton.classList.remove("accordion-toggle-btn--closed");
    toggleAllButton.classList.add("accordion-toggle-btn--open");
    toggleAllButton.textContent = "Close all";
    accordionButtons.forEach((button) => {
      if (button.matches(".collapsed")) button.click();
    });
  } else if (toggleAllButton.classList.contains("accordion-toggle-btn--open")) {
    toggleAllButton.classList.remove("accordion-toggle-btn--open");
    toggleAllButton.classList.add("accordion-toggle-btn--closed");
    toggleAllButton.textContent = "Open all";
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

  let accordionGroup = event.target.closest(".accordion-group"),
    toggleAllButton = accordionGroup.querySelector(".accordion-toggle-btn");

  if (
    toggleAllButton.classList.contains("accordion-toggle-btn--closed") &&
    accordionGroup.querySelectorAll(".accordion-button.collapsed").length == 0
  ) {
    toggleAllButton.classList.remove("accordion-toggle-btn--closed");
    toggleAllButton.classList.add("accordion-toggle-btn--open");
    toggleAllButton.textContent = "Close all";
  } else if (
    toggleAllButton.classList.contains("accordion-toggle-btn--open") &&
    accordionGroup.querySelectorAll(".accordion-button.collapsed").length > 0
  ) {
    toggleAllButton.classList.remove("accordion-toggle-btn--open");
    toggleAllButton.classList.add("accordion-toggle-btn--closed");
    toggleAllButton.textContent = "Open all";
  }
}

/**
 * Open and scroll to an accordion panel specified via URL hash.
 *
 * @memberof module:Accordion
 *
 * @param {Object} event - (optional) The event that triggered this function.
 * @returns {void}
 */
export function accordionHashLinks (event) {
  let urlHash = window.location.hash,
    urlHashId = urlHash.substring(1),
    cleanHash = filterSpecialChar(urlHash);

  if (cleanHash.length > 0) {
    let targetElement = document.querySelector(`#collapse-${urlHashId}`),
      targetPanelButton = false;

    // Stop default hash link behaviour if target matches current hash location.
    if (event &&
      ((event.type === 'hashchange' && event.newURL === event.oldURL) ||
      (event.type === 'click' && event.target.hash === urlHash))
    ) {
      event.preventDefault();
    }

    // ID matching
    if (targetElement && targetElement.closest('.accordion-item')) {
      targetPanelButton = targetElement.closest(".accordion-item").querySelector(".accordion-button");
    }
    // Title matching
    else {
      let accordionButtons = document.querySelectorAll(".accordion-button");

      if (event && event.type === 'click') {
        cleanHash = filterSpecialChar(event.target.hash);
      }

      targetPanelButton = Array.from(accordionButtons).find((button) => filterSpecialChar(button.innerText) === cleanHash);
    }

    if (targetPanelButton){
      if (targetPanelButton.matches(".collapsed")) targetPanelButton.click();

      window.scrollTo(0, targetPanelButton.getBoundingClientRect().top +
      document.documentElement.scrollTop);
    }
  }
}

/**
 * filterSpecialChar
 * @param {string} value - value to filter
 * @return {undefined}
 **/
function filterSpecialChar(value) {
  return decodeURI(value.toLowerCase().replace(/[^a-zA-Z0-9/]/g, ''));
}
