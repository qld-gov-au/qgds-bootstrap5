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
