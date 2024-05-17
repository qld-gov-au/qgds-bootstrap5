import { createPopper } from '@popperjs/core';
import { defaultSuggestions } from './_search.json';

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

      // Change icon and text back to default
      toggleIcon.setAttribute('href', 'assets/img/svg-icons.svg#qld__icon__search');
      toggleText.textContent = 'Search';
    } else {
      searchDiv.classList.remove('qld__header__site-search--closed');
      searchDiv.classList.add('qld__header__site-search--open');

      // Change icon and text to active state
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
 * @param {boolean} isDefault - Whether to show default suggestions or not.
 * @returns {void}
 */
export function showSuggestions(value = '', isDefault = false) {
  const suggestions = document.getElementById('suggestions');
  const searchInput = document.getElementById('search-input');

  if (!suggestions || !searchInput) {
    console.error("Required elements not found.");
    return;
  }

  const loadedSuggestions = defaultSuggestions;

  if (isDefault) {
    suggestions.innerHTML = `
      <div class="suggestions-category my-4">
        <strong>Popular Services</strong>
        <ul>${loadedSuggestions.popular_services.map(item => `<li onclick="selectSuggestion('${item.title}')"><a href="${item.href}">${item.title}</a></li>`).join('')}</ul>
      </div>
      <div class="suggestions-category">
        <strong>Categories</strong>
        <ul>${loadedSuggestions.categories.map(item => `<li onclick="selectSuggestion('${item.title}')"><a href="${item.href}">${item.title}</a></li>`).join('')}</ul>
      </div>
      ${loadedSuggestions.options.view_more ? `<div class="suggestions-category mt-4"><a href="${loadedSuggestions.options.href}">${loadedSuggestions.options.label}</a></div>` : ''}
    `;
    suggestions.classList.add('show');
    createPopper(searchInput, suggestions, {
      placement: 'bottom-start',
    });
    suggestions.style.display = 'block';
    return;
  }

  if (value.length === 0) {
    suggestions.innerHTML = '';
    suggestions.style.display = 'none';
    return;
  }

  const allSuggestions = [...loadedSuggestions.popular_services, ...loadedSuggestions.categories];
  const filteredSuggestions = allSuggestions.filter(item => item.title.toLowerCase().includes(value.toLowerCase()));

  if (filteredSuggestions.length === 0) {
    suggestions.innerHTML = '';
    suggestions.style.display = 'none';
    return;
  }

  suggestions.innerHTML = `
    <div class="suggestions-category">
      <h4>Suggestions</h4>
      <ul>${filteredSuggestions.map(item => `<li onclick="selectSuggestion('${item.title}')"><a href="${item.href}">${item.title}</a></li>`).join('')}</ul>
    </div>
  `;
  suggestions.classList.add('show');

  // Initialize Popper.js to manage the dropdown position
  createPopper(searchInput, suggestions, {
    placement: 'bottom-start',
  });
  suggestions.style.display = 'block';
}

/**
 * Sets the selected suggestion into the input field.
 *
 * @param {string} value - The selected suggestion.
 * @returns {void}
 */
export function selectSuggestion(value) {
  const searchInput = document.getElementById('search-input');
  const suggestions = document.getElementById('suggestions');

  if (searchInput && suggestions) {
    searchInput.value = value;
    suggestions.style.display = 'none';
  }
}

// Ensure the input exists before adding event listeners
const searchInput = document.getElementById('search-input');
if (searchInput) {
  searchInput.addEventListener('keyup', function() {
    showSuggestions(this.value);
  });

  searchInput.addEventListener('focus', function() {
    showSuggestions('', true);
  });

  searchInput.addEventListener('click', function() {
    if (this.value === '') {
      showSuggestions('', true);
    }
  });

  // Close suggestions when clicking outside
  document.addEventListener('click', function(event) {
    if (!searchInput.contains(event.target) && !document.getElementById('suggestions').contains(event.target)) {
      document.getElementById('suggestions').style.display = 'none';
    }
  });
}
