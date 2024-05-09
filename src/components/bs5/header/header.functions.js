/**
 * Toggles the class on a search div based on button click.
 *
 * @memberof module:Header
 *
 * @param {Event} event - The event that triggered this function.
 * @returns {void}
 */
export function toggleSearch(event) {

    // Prevent default action and stop event propagation
    try {
      event.preventDefault();
      event.stopPropagation();
    } catch (error) {
      console.error("Error in event handling:", error);
    }
  
    // Get the search div
    const searchDiv = document.getElementById('qld-header-search');
  
    // Toggle the class for the open state
    if (searchDiv) {
      searchDiv.classList.toggle('qld__header__site-search--open');
  
      // Optional: Update the aria-expanded attribute for accessibility
      const isExpanded = event.currentTarget.getAttribute('aria-expanded') === 'true';
      event.currentTarget.setAttribute('aria-expanded', !isExpanded);
    }
  }
  