import { createPopper } from '@popperjs/core';
import { defaultSuggestions } from './search.json';

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
  const form = document.querySelector('.site-search');
  const searchInput = form.querySelector('.qld-search-input input');
  const suggestions = form.querySelector('.suggestions');

  if (searchInput && suggestions && form) {
    searchInput.value = value.trim();
    suggestions.style.display = 'none';

    // Retrieve additional params
    const collection = searchInput.getAttribute('data-collection') || 'qgov~sp-search';
    const profile = searchInput.getAttribute('data-profile') || 'qld';
    const numRanks = searchInput.getAttribute('data-numranks') || '10';
    const tiers = searchInput.getAttribute('data-tiers') || 'off';

    // Form action
    const actionUrl = form.getAttribute('action');

    // Construct the URL with proper parameters
    const params = new URLSearchParams({
      query: value.trim(),
      collection: collection,
      profile: profile,
      num_ranks: numRanks,
      tiers: tiers
    });

    const searchUrl = `${actionUrl}?${params.toString()}`;

    // Manually set the window location to the constructed URL
    window.location.href = searchUrl;
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
  const form = document.querySelector('.site-search');
  const searchInput = form.querySelector('.qld-search-input input');
  const suggestions = form.querySelector('.suggestions');

  // Search input attributes
  const collection = searchInput.getAttribute('data-collection') || 'qgov~sp-search'; 
  const profile = searchInput.getAttribute('data-profile') || 'qld';
  const suggestUrl = searchInput.getAttribute('data-suggestions') || '10';
  const resultsUrl = searchInput.getAttribute('data-results-url') || 'off';

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
            const highlightedText = item.replace(new RegExp(`(${value})`, 'gi'), '<strong>$1</strong>');
            return `<li onclick="window.selectSuggestion('${item}')"><a href="#">${highlightedText}</a></li>`;
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
