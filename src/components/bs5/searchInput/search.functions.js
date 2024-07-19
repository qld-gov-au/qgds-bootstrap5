import { createPopper } from '@popperjs/core';

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
 * @param {HTMLFormElement} form - The form element.
 * @returns {void}
 */
export function selectSuggestion(value, form) {
  const searchInput = form.querySelector('.qld-search-input input');
  const suggestions = form.querySelector('.suggestions');

  if (searchInput && suggestions) {
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
      tiers: tiers,
    });

    const searchUrl = `${actionUrl}?${params.toString()}`;

    // Manually set the window location to the constructed URL
    window.location.href = searchUrl;
  }
}

/**
 * Shows/hides suggestions based on the user's input.
 *
 * @param {string} value - The current input value.
 * @param {boolean} isDefault - Whether to show default suggestions or not.
 * @param {HTMLFormElement} form - The form element.
 * @returns {void}
 **/
export async function showSuggestions(value = '', isDefault = false, form) {
  const searchInput = form.querySelector('.qld-search-input input');
  const suggestions = form.querySelector('.suggestions');
  const defaultSuggestionsContainer = form.querySelector('.default-suggestions');
  const dynamicSuggestionsContainer = form.querySelector('.dynamic-suggestions');

  if (!suggestions || !searchInput) {
    console.error("Required elements not found.");
    return;
  }

  // Hide/show default suggestions
  if (isDefault) {
    defaultSuggestionsContainer.style.display = 'block';
    dynamicSuggestionsContainer.innerHTML = '';
    dynamicSuggestionsContainer.style.display = 'none';
    createPopper(searchInput, suggestions, {
      placement: 'bottom-start',
    });
    suggestions.style.display = 'block';
    return;
  }

  defaultSuggestionsContainer.style.display = 'none';

  // Fetch dynamic suggestions if available
  const suggestUrl = searchInput.getAttribute('data-suggestions');
  if (suggestUrl) {
    const collection = searchInput.getAttribute('data-collection') || 'qgov~sp-search';
    const profile = searchInput.getAttribute('data-profile') || 'qld';
    const fetchedSuggestions = await fetchData(`${suggestUrl}?collection=${collection}&profile=${profile}&fmt=json&alpha=0.5&partial_query=${encodeURIComponent(value)}`, 'suggestions');

    if (fetchedSuggestions.length > 0) {
      dynamicSuggestionsContainer.innerHTML = `
        <div class="suggestions-category mt-2">
          <strong class="suggestions-category-label">Suggestions</strong>
          <ul class="mt-2">${fetchedSuggestions.slice(0, 4).map(item => {
    const highlightedText = item.replace(new RegExp(`(${value})`, 'gi'), '<strong>$1</strong>');
    return `<li><a href="#">${highlightedText}</a></li>`;
  }).join('')}</ul>
        </div>`;
      dynamicSuggestionsContainer.style.display = 'block';
      createPopper(searchInput, suggestions, {
        placement: 'bottom-start',
      });
      suggestions.style.display = 'block';

      // Attach click event listeners to each suggestion item
      form.querySelectorAll('.suggestions li').forEach((item) => {
        item.addEventListener('click', () => selectSuggestion(item.innerText, form));
      });
    } else {
      dynamicSuggestionsContainer.innerHTML = '';
      dynamicSuggestionsContainer.style.display = 'none';
      suggestions.style.display = 'none';
    }
  }

  const resultsUrl = searchInput.getAttribute('data-results-url');
  if (resultsUrl) {
    const collection = searchInput.getAttribute('data-collection') || 'qgov~sp-search';
    const profile = searchInput.getAttribute('data-profile') || 'qld';
    const fetchedServices = await fetchData(`${resultsUrl}?collection=${collection}&profile=${profile}&smeta_sfinder_sand=yes&query=${encodeURIComponent(value)}`, 'services');

    if (fetchedServices.response.resultPacket && fetchedServices.response.resultPacket.results.length > 0) {
      dynamicSuggestionsContainer.innerHTML += `
        <div class="suggestions-category feature pt-2">
          <strong class="suggestions-category-label">Services</strong>
          <ul class="mt-2">${fetchedServices.response.resultPacket.results.slice(0, 4).map(item => `<li><a href="${item.liveUrl}">${item.title}</a></li>`).join('')}</ul>
        </div>`;
      dynamicSuggestionsContainer.style.display = 'block';
      createPopper(searchInput, suggestions, {
        placement: 'bottom-start',
      });
      suggestions.style.display = 'block';

      // Attach click event listeners to each suggestion item
      form.querySelectorAll('.suggestions li').forEach((item) => {
        item.addEventListener('click', () => selectSuggestion(item.innerText, form));
      });
    }
  }
}


/**
 * Submits the search form with proper parameters.
 *
 * @param {string} query - The search query.
 * @param {HTMLFormElement} form - The form element.
 * @returns {void}
 */
export function submitSearchForm(query = '', form) {
  const searchInput = form.querySelector('.qld-search-input input');

  const collection = searchInput.getAttribute('data-collection') || 'qgov~sp-search';
  const profile = searchInput.getAttribute('data-profile') || 'qld';
  const numRanks = searchInput.getAttribute('data-numranks') || '10';
  const tiers = searchInput.getAttribute('data-tiers') || 'off';

  const params = new URLSearchParams({
    query: query.trim(),
    collection: collection,
    profile: profile,
    num_ranks: numRanks,
    tiers: tiers,
  });

  const searchUrl = `${form.getAttribute('action')}?${params.toString()}`;
  window.location.href = searchUrl;
}

// Attach the function to the window object to make it globally accessible
window.selectSuggestion = (value, form) => selectSuggestion(value, form);
