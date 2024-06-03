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
  const searchDiv = document.getElementById('qld-search-input');
  const toggleButton = event.currentTarget;
  const searchIcon = toggleButton.querySelector('use.icon-search');
  const closeIcon = toggleButton.querySelector('use.icon-close');
  const toggleText = toggleButton.querySelector('.qld__main-nav__toggle-text');

  // Check current class and swap
  if (searchDiv) {
    if (searchDiv.classList.contains('qld__header__site-search--open')) {
      searchDiv.classList.remove('qld__header__site-search--open');
      searchDiv.classList.add('qld__header__site-search--closed');

      // Change icon and text back to default
      searchIcon.style.display = 'block';
      closeIcon.style.display = 'none';
      toggleText.textContent = 'Search';
    } else {
      searchDiv.classList.remove('qld__header__site-search--closed');
      searchDiv.classList.add('qld__header__site-search--open');

      // Change icon and text to active state
      searchIcon.style.display = 'none';
      closeIcon.style.display = 'block';
      toggleText.textContent = 'Close';
    }

    // Optional: Update the aria-expanded attribute for accessibility
    const isExpanded = searchDiv.classList.contains('qld__header__site-search--open');
    event.currentTarget.setAttribute('aria-expanded', isExpanded);
  }
}

/**
 * Fetches data from the provided URL.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {string} type - The type of data to fetch (suggestions or services).
 * @returns {Promise<Object>} - A promise that resolves to the fetched data.
 */
async function fetchData(url, type) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    return {};
  }
}

/**
 * Sets the selected suggestion into the input field and submits the form.
 *
 * @param {string} value - The selected suggestion.
 * @returns {void}
 */
export function selectSuggestion(value) {
  const form = document.getElementsByClassName('site-search');
  const suggestions = document.getElementById('suggestions');

  //Search input
  const searchInput = document.getElementsByClassName('qld-search-input');

  if (searchInput && suggestions && form) {
    searchInput.value = value;
    suggestions.style.display = 'none';
    form.submit();
  }
}

/**
 * Shows suggestions based on the user's input.
 *
 * @param {string} value - The current input value.
 * @param {boolean} isDefault - Whether to show default suggestions or not.
 * @returns {void}
 **/
export async function showSuggestions(value = '', isDefault = false) {
  //Search input
  const searchInput = document.getElementsByClassName('qld-search-input');
  const suggestions = document.getElementsByClassName('suggestions');
  
  //Search input attributes
  const collection = searchInput.getAttribute('data-collection');
  const profile = searchInput.getAttribute('data-profile');
  const suggestUrl = searchInput.getAttribute('data-suggestions');
  const resultsUrl = searchInput.getAttribute('data-results-url');

  if (!suggestions || !searchInput) {
    console.error("Required elements not found.");
    return;
  }

  // Clear previous suggestions and services
  suggestions.innerHTML = '';

  const loadedSuggestions = defaultSuggestions;

  if (isDefault) {
    suggestions.innerHTML = `
      <div class="suggestions-category mt-2">
        <strong>Popular services</strong>
        <ul class="mt-2">${loadedSuggestions.popular_services.slice(0, 4).map(item => `<li onclick="window.selectSuggestion('${item.title}')"><a href="${item.href}">${item.title}</a></li>`).join('')}</ul>
      </div>
      <hr>
      <div class="suggestions-category mt-2">
        <strong>Browse by category</strong>
        <ul class="mt-2">${loadedSuggestions.categories.slice(0, 4).map(item => `<li onclick="window.selectSuggestion('${item.title}')"><a href="${item.href}">${item.title}</a></li>`).join('')}</ul>
      </div>
      <!--${loadedSuggestions.options.view_more ? `<div class="suggestions-category mt-4 mb-4"><a href="${loadedSuggestions.options.href}">${loadedSuggestions.options.label}</a></div>-->` : ''}
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

  if (suggestUrl) {
    const fetchedSuggestions = await fetchData(`${suggestUrl}?collection=${collection}&profile=${profile}&fmt=json&alpha=0.5&partial_query=${encodeURIComponent(value)}`, 'suggestions');

    // Use the fetched suggestions to populate the suggestions dropdown
    if (fetchedSuggestions.length > 0) {
      suggestions.innerHTML = `
        <div class="suggestions-category mt-2">
          <strong>Suggestions</strong>
          <ul class="mt-2">${fetchedSuggestions.slice(0, 4).map(item => {
            if (!item.disp) return ''; // Check if item.disp is defined
            const highlightedText = item.disp.replace(new RegExp(`(${value})`, 'gi'), '<strong>$1</strong>');
            return `<li onclick="window.selectSuggestion('${item.disp}')"><a href="#">${highlightedText}</a></li>`;
          }).join('')}</ul>
        </div>
      `;
      suggestions.classList.add('show');

      // Initialize Popper.js to manage the dropdown position
      createPopper(searchInput, suggestions, {
        placement: 'bottom-start',
      });
      suggestions.style.display = 'block';
    } else {
      suggestions.innerHTML = '';
      suggestions.style.display = 'none';
    }
  }

  if (resultsUrl) {
    const fetchedServices = await fetchData(`${resultsUrl}?collection=${collection}&profile=${profile}&smeta_sfinder_sand=yes&query=${encodeURIComponent(value)}`, 'services');

    // Use the fetched services to populate the services dropdown
    if (fetchedServices.response.resultPacket && fetchedServices.response.resultPacket.results.length > 0) {
      suggestions.innerHTML += `
        <div class="suggestions-category feature pt-2">
          <strong>Services</strong>
          <ul class="mt-2">${fetchedServices.response.resultPacket.results.slice(0, 4).map(item => `<li class="pb-2" onclick="window.selectSuggestion('${item.title}')"><a href="${item.liveUrl}">${item.title}</a></li>`).join('')}</ul>
        </div>
      `;
      suggestions.classList.add('show');

      // Initialize Popper.js to manage the dropdown position
      createPopper(searchInput, suggestions, {
        placement: 'bottom-start',
      });
      suggestions.style.display = 'block';
    }
  }
}

// Attach the function to the window object to make it globally accessible
window.selectSuggestion = selectSuggestion;
