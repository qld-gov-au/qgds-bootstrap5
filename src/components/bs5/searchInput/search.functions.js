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
      throw new Error("Network response was not ok");
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
export function selectDynamicSuggestion(value, form) {
  const searchInput = form.querySelector(".qld-search-input input");
  const suggestions = form.querySelector(".suggestions");

  if (searchInput && suggestions) {
    // Assign queryValue, and cleanup string before submission
    let queryValue = value.replace(/\s+/g, " ").trim();
    searchInput.value = queryValue;

    // Form action
    const actionUrl = form.getAttribute("action");

    //data-* attributes on search input field
    const atts = searchInput ? searchInput.dataset : null;

    // Construct the URL with proper parameters
    const params = new URLSearchParams({
      query: queryValue,
      collection: atts.collection || "qgov~sp-search",
      profile: atts.profile || "qld",
      num_ranks: atts.numRanks || "10",
      tiers: atts.tiers || "off",
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
export async function showSuggestions(value = "", isDefault = false, form) {
  const searchInput = form.querySelector(".qld-search-input input");
  const suggestions = form.querySelector(".suggestions");
  const defaultSuggestionsContainer = form.querySelector(
    ".default-suggestions",
  );
  const dynamicSuggestionsContainer = form.querySelector(
    ".dynamic-suggestions",
  );

  if (!suggestions || !searchInput) {
    return;
  }

  // Hide/show default suggestions, and return early
  if (isDefault) {
    if (defaultSuggestionsContainer) {
      defaultSuggestionsContainer.classList.remove("d-none");
    }
    if (dynamicSuggestionsContainer) {
      dynamicSuggestionsContainer.innerHTML = "";
      dynamicSuggestionsContainer.classList.add("d-none");
    }
    return;
  }

  // If input is empty, hide dynamic suggestions and return early
  if (dynamicSuggestionsContainer) {
    if (value.length === 0) {
      dynamicSuggestionsContainer.innerHTML = "";
      dynamicSuggestionsContainer.classList.add("d-none");
      return;
    }
  }

  // Script continues...dynamic suggestions is true and value.length > 0
  defaultSuggestionsContainer?.classList.add("d-none");

  //data-* attributes on search input field
  const atts = searchInput ? searchInput.dataset : null;

  // Fetch dynamic suggestions if available
  if (dynamicSuggestionsContainer) {
    const suggestUrl = atts.suggestions;

    if (suggestUrl) {
      const collection = atts.collection || "qgov~sp-search";
      const profile = atts.profile || "qld";

      //Fetch data from suggestions API
      const fetchedSuggestions = await fetchData(
        `${suggestUrl}?collection=${collection}&profile=${profile}&fmt=json&alpha=0.5&partial_query=${encodeURIComponent(value)}`,
        "suggestions",
      );

      //Rended a suggestions list
      if (fetchedSuggestions.length > 0) {
        dynamicSuggestionsContainer.innerHTML = `
        <div class="suggestions-category">
          <ul>${fetchedSuggestions
            .slice(0, 4)
            .map((item) => {
              const highlightedText = item.replace(
                new RegExp(`(${value})`, "gi"),
                "<strong>$1</strong>",
              );
              return `<li><a tabindex="0" href="#">${highlightedText}</a></li>`;
            })
            .join("")}</ul>
        </div>`;

        dynamicSuggestionsContainer.classList.remove("d-none");

        // Bind an event listener to suggestions container
        form
          .querySelector(".suggestions .dynamic-suggestions")
          .addEventListener("click", (event) => {
            let linkItem = event.target.closest("a");
            if (linkItem) {
              event.preventDefault();
              selectDynamicSuggestion(linkItem.textContent, form);
            }
          });
      } else {
        dynamicSuggestionsContainer.innerHTML = "";
        dynamicSuggestionsContainer.classList.add("d-none");
      }
    }

    const resultsUrl = atts.resultsUrl; //data-results-url;
    if (resultsUrl) {
      const collection = atts.collection || "qgov~sp-search";
      const profile = atts.profile || "qld";

      // Fetch related services from services API
      const fetchedServices = await fetchData(
        `${resultsUrl}?collection=${collection}&profile=${profile}&smeta_sfinder_sand=yes&query=${encodeURIComponent(value)}`,
        "services",
      );

      if (
        fetchedServices.response.resultPacket &&
        fetchedServices.response.resultPacket.results.length > 0
      ) {
        const viewMoreUrl =
          dynamicSuggestionsContainer.getAttribute("data-view-more");

        // Build the services HTML safely
        const servicesItems = fetchedServices.response.resultPacket.results
          .slice(0, 4)
          .map(
            (item) =>
              `<li><a tabindex="0" href="${item.liveUrl}">${item.title}</a></li>`,
          )
          .join("");

        const viewMoreItem = viewMoreUrl
          ? `<li><a tabindex="0" href="${viewMoreUrl}" class="view-more">View more</a></li>`
          : "";

        dynamicSuggestionsContainer.innerHTML += `
        <div class="suggestions-category feature">
          <strong class="suggestions-category-label d-block">Related services</strong>
          <ul>${servicesItems}${viewMoreItem}</ul>
        </div>`;

        dynamicSuggestionsContainer.classList.remove("d-none");

        // Attach click event listeners to each SERVICE item in list
        form
          .querySelector(".suggestions .dynamic-suggestions")
          .addEventListener("click", (event) => {
            let linkItem = event.target.closest("a");
            if (linkItem) {
              event.preventDefault();
              selectDynamicSuggestion(linkItem.textContent, form);
            }
          });
      }
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
export function submitSearchForm(query = "", form) {
  const searchInput = form.querySelector(".qld-search-input input");
  const atts = searchInput ? searchInput.dataset : null;

  const queryValue = query.trim().replace(/\s+/g, " ");

  const params = new URLSearchParams({
    query: queryValue,
    collection: atts.collection || "qgov~sp-search",
    profile: atts.profile || "qld",
    num_ranks: atts.numRanks || "10",
    tiers: atts.tiers || "off",
  });

  const searchUrl = `${form.getAttribute("action")}?${params.toString()}`;
  window.location.href = searchUrl;
}

// Attach the function to the window object to make it globally accessible
window.selectDynamicSuggestion = (value, form) =>
  selectDynamicSuggestion(value, form);
