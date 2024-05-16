import { createPopper } from '@popperjs/core';

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
  const toggleButton = event.currentTarget;
  const toggleIcon = toggleButton.querySelector('svg use');
  const toggleText = toggleButton.querySelector('.qld__main-nav__toggle-text');

  // Check current class and swap
  if (searchDiv) {
    if (searchDiv.classList.contains('qld__header__site-search--open')) {
      searchDiv.classList.remove('qld__header__site-search--open');
      searchDiv.classList.add('qld__header__site-search--closed');

      // TO DO: Review - Change icon and text back to default/no root reference to file?
      toggleIcon.setAttribute('href', 'assets/img/svg-icons.svg#qld__icon__search');
      toggleText.textContent = 'Search';

    } else {
      searchDiv.classList.remove('qld__header__site-search--closed');
      searchDiv.classList.add('qld__header__site-search--open');

      // TO DO: Change icon and text to active state/no root reference to file?
      toggleIcon.setAttribute('href', 'assets/img/svg-icons.svg#qld__icon__close'); 
      toggleText.textContent = 'Close';
    }

    // Optional: Update the aria-expanded attribute for accessibility
    const isExpanded = searchDiv.classList.contains('qld__header__site-search--open');
    event.currentTarget.setAttribute('aria-expanded', isExpanded);
  }
}

/**
 * Shows suggestions based on the user's input.
 *
 * @param {string} value - The current input value.
 * @returns {void}
 */
export function showSuggestions(value) {
  const suggestions = document.getElementById('suggestions');
  const searchInput = document.getElementById('search-input');

  if (value.length === 0) {
      suggestions.innerHTML = '';
      suggestions.style.display = 'none';
      return;
  }

  // Loaded suggestions in JSON - replace this with your own objects
  const loadedSuggestions = ['Apple', 'Banana', 'Cherry', 'Date', 'Date', 'Date', 'Date', 'Date', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew'];
  const filteredSuggestions = loadedSuggestions.filter(item => item.toLowerCase().includes(value.toLowerCase()));

  if (filteredSuggestions.length === 0) {
      suggestions.innerHTML = '';
      suggestions.style.display = 'none';
      return;
  }

  suggestions.innerHTML = filteredSuggestions.map(item => `<li onclick="selectSuggestion('${item}')"><a href="#">${item}</a></li>`).join('');
  suggestions.style.display = 'block';

  // Initialize Popper.js to manage the dropdown position
  createPopper(searchInput, suggestions, {
      placement: 'bottom-start',
  });
}

/**
* Sets the selected suggestion into the input field.
*
* @param {string} value - The selected suggestion.
* @returns {void}
*/
export function selectSuggestion(value) {
  document.getElementById('search-input').value = value;
  document.getElementById('suggestions').style.display = 'none';
}

/** 
// Event listener for the search input 
document.getElementById('search-input').addEventListener('keyup', function() {
  showSuggestions(this.value);
});
*/