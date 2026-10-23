import { debounce } from "../../../js/utils";

export function initAllSearch() {
  // store initialised as data attribute - storybook fires DOMContentLoaded for each story on a page.
  const searchComponents = document.querySelectorAll(
    ".qld-search-input:not([data-initialised])",
  );
  searchComponents.forEach((component) => {
    initSearch(component);
    component.dataset.initialised = true;
  });
}

/**
 * @param {HTMLElement} component Should be element with class ".qld-search-input"
 */
function initSearch(component) {
  /** @type  HTMLInputElement | null */
  const inputElement = component.querySelector("input.form-control");

  if (!inputElement) return;

  /** @type HTMLElement | null */
  const suggestionsElement = component.querySelector(".suggestions");

  /** @type HTMLFormElement | null | undefined */
  const formElement = inputElement.form;

  /** @type HTMLButtonElement | null */
  const buttonElement = component.querySelector("button.js-search-button");

  /** @type Record<string, string> */
  const searchParams = Object.fromEntries(
    Array.from(component.querySelectorAll("input[type='hidden']"), (el) => [
      el.name,
      el.value,
    ]),
  );

  const searchDelay = inputElement?.dataset.searchDelay
    ? Number.parseInt(inputElement?.dataset.searchDelay)
    : 300;

  /**
   * Fire a custom "qld-search" event which includes the searchParams in the event.detail
   * This is triggered by search button click, debounced input event, autocomplete click.
   */
  const search = () => {
    inputElement.dispatchEvent(
      new CustomEvent("qld-search", {
        bubbles: true,
        cancelable: true,
        detail: {
          query: inputElement.value,
          ...searchParams,
        },
      }),
    );
  };

  const debouncedSearch = debounce(search, searchDelay);

  /**
   * Esc key should first of all clear the input if it has value, then if value is empty should collapse the suggestions dropdown.
   * Enter key should trigger search if the target is the input itself.
   * @param {KeyboardEvent} e
   */
  const handleKeydown = (e) => {
    if (e.key === "Escape") {
      if (e.target === inputElement) {
        if (inputElement.value) {
          e.preventDefault();
          e.stopPropagation();

          inputElement.value = "";
          // Because we cleared the value programatically, manually dispatch input event to update suggestions.
          inputElement.dispatchEvent(new InputEvent("input"));
        } else {
          suggestionsElement?.classList.remove("show");
        }
      } else if (suggestionsElement?.contains(e.target)) {
        inputElement?.focus();
        suggestionsElement?.classList.remove("show");
      }
    } else if (!formElement && e.target === inputElement && e.key === "Enter") {
      // If wrapped in a form, the submit button is already automatically triggered on enter press.
      buttonElement.click();
    }
  };

  /**
   * Show the suggestions dropdown (if suggestions exist) when the search recieves focus
   * @param {FocusEvent} e
   */
  const handleFocusIn = (e) => {
    // If the input itself receives focus, show the suggestions
    if (e.target === inputElement) {
      suggestionsElement?.classList.add("show");
    }
  };

  /**
   * @param {FocusEvent} e
   */
  const handleFocusOut = (e) => {
    // If the element to be focused is not within this component, hide suggestions.
    if (!component?.contains(e.relatedTarget)) {
      suggestionsElement?.classList.remove("show");
    }
  };

  /**
   * Ensure the suggestions is triggered when input updated.
   * @param {InputEvent} e
   */
  const handleInput = (e) => {
    suggestionsElement?.classList.add("show");

    debouncedSearch();
  };

  /**
   * When autocomplete suggestion is clicked, update the input value and hit search
   * @param {MouseEvent} e
   */
  const handleSuggestionsClick = (e) => {
    const item = e.target.closest(".suggestions-item");
    if (item?.matches(".is-autocomplete")) {
      e.preventDefault();
      inputElement.value = item.textContent.replace(/\s+/g, " ").trim();
      buttonElement.click();
    }
  };

  /**
   * Fire a search event when button is clicked
   * @param {MouseEvent} e
   */
  const handleButtonClick = (e) => {
    search();
  };

  component.addEventListener("focusin", handleFocusIn);
  component.addEventListener("keydown", handleKeydown);
  component.addEventListener("focusout", handleFocusOut);
  inputElement.addEventListener("input", handleInput);

  // Set up click handler on suggestions element to listen for autocomplete selection
  suggestionsElement?.addEventListener("click", handleSuggestionsClick);

  // Button click should trigger the custom search event
  buttonElement?.addEventListener("click", handleButtonClick);

  // The following must only be scoped to form elements with ".site-search" class.
  // This due to legacy reasons, as removing the class allowed a custom submit handler.
  if (formElement?.classList.contains("site-search")) {
    inputElement.addEventListener("qld-search", (e) => {
      showSuggestions(e.detail.query.trim());
    });
  }

  /**
   * Shows/hides suggestions based on the user's input.
   *
   * @param {string} value - The current input value.
   * @returns {void}
   **/
  async function showSuggestions(value = "") {
    // This is still specific to funnelback - will be updated.

    if (!suggestionsElement || !inputElement) {
      return;
    }

    const defaultSuggestionsContainer = suggestionsElement.querySelector(
      ".default-suggestions",
    );
    const dynamicSuggestionsContainer = suggestionsElement.querySelector(
      ".dynamic-suggestions",
    );

    // Hide/show default suggestions, and return early
    if (value === "") {
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

    // Fetch dynamic suggestions if available
    if (dynamicSuggestionsContainer) {
      const suggestUrl = inputElement?.dataset.suggestions;
      const resultsUrl = inputElement?.dataset.resultsUrl;
      const collection = searchParams?.collection || "ssqld~sp-search";
      const profile = searchParams?.profile || "qld";

      if (suggestUrl) {
        // Fetch data from suggestions API
        const fetchedAutocompleteSuggestions = await fetchData(
          `${suggestUrl}?collection=${collection}&profile=${profile}&fmt=json&alpha=0.5&partial_query=${encodeURIComponent(value)}`,
          "suggestions",
        );

        // Render a suggestions list
        if (fetchedAutocompleteSuggestions.length > 0) {
          dynamicSuggestionsContainer.innerHTML = `
        <div class="suggestions-group is-autocomplete">
          <ul>${fetchedAutocompleteSuggestions
            .slice(0, 4) // only display the first 4 items
            .map((item) => {
              const highlightedText = item.replace(
                new RegExp(`(${value})`, "gi"),
                "<strong>$1</strong>",
              );
              return `<li><a class="suggestions-item is-autocomplete" tabindex="0" href="#"><span>${highlightedText}</span></a></li>`; // <span> is required to ensure all text remains a single flex item and does not introduce spacing and wrapping bugs.
            })
            .join("")}</ul>
        </div>`;

          dynamicSuggestionsContainer.classList.remove("d-none");
        } else {
          dynamicSuggestionsContainer.innerHTML = "";
          dynamicSuggestionsContainer.classList.add("d-none");
        }
      }

      if (resultsUrl) {
        // Fetch related services from services API
        const fetchedServices = await fetchData(
          `${resultsUrl}?collection=${collection}&profile=${profile}&query=${encodeURIComponent(value)}`,
          "services",
        );

        if (
          fetchedServices.response.resultPacket &&
          fetchedServices.response.resultPacket.results.length > 0
        ) {
          const viewMoreUrl =
            dynamicSuggestionsContainer.getAttribute("data-view-more");

          // Build the services HTML safely
          const escapeHtmlAttr = (str) =>
            String(str)
              .replace(/&/g, "&amp;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#39;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");

          const servicesItems = fetchedServices.response.resultPacket.results
            .slice(0, 4)
            .map(
              (item) =>
                `<li><a class="suggestions-item" tabindex="0" href="${item.liveUrl}">${item.title}</a></li>`,
            )
            .join("");

          const viewMoreItem = viewMoreUrl
            ? `<li><a tabindex="0" href="${escapeHtmlAttr(viewMoreUrl)}" class="suggestions-item is-view-more">View more</a></li>`
            : "";

          dynamicSuggestionsContainer.innerHTML += `
        <div class="suggestions-group">
          <strong class="d-block suggestions-group-label">Related services</strong>
          <ul>${servicesItems}${viewMoreItem}</ul>
        </div>`;

          dynamicSuggestionsContainer.classList.remove("d-none");
        }
      }
    }
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
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    return {};
  }
}
