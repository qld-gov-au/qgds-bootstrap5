// @ts-check
import { debounce } from "../../../js/utils";

/**
 * @typedef {Object} Suggestion
 * @property {string} label
 * @property {string} href
 */

/**
 * @typedef {Object} SuggestionGroup
 * @property {string} [label]
 * @property {Suggestion[]} items
 * @property {{label?: string, href: string}} [link]
 */

/**
 * export @typedef {SuggestionGroup[] | SuggestionGroup | Suggestion[]} Suggestions
 */

/**
 * @typedef {string[]} AutocompleteSuggestions
 */

/**
 * @typedef {{ query: string, [key: string]: string }} QLDSearchDetail
 */

/**
 * @typedef {CustomEvent<QLDSearchDetail>} QLDSearchEvent
 * @property {"qld-search"} type
 * @property {HTMLElement} target
 */

/**
 * Find all .qld-search-input and initialise them, attaching behaviour and events.
 */
export function initAllSearch() {
  // store initialised as data attribute - storybook fires DOMContentLoaded for each story on a page.
  const searchComponents = /** @type NodeListOf<HTMLElement> */ (
    document.querySelectorAll(".qld-search-input:not([data-initialised])")
  );
  searchComponents.forEach((component) => {
    initSearch(component);
    component.dataset.initialised = "true";
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
  const buttonElement = component.querySelector(".js-search-button");
  const searchParams = Object.fromEntries(
    Array.from(component.querySelectorAll("input[type='hidden']"), (el) => [
      el.name,
      el.value,
    ]),
  );
  const configuredSearchDelay = inputElement?.dataset.searchDelay;
  const searchDelay =
    configuredSearchDelay === undefined ||
    configuredSearchDelay === null ||
    configuredSearchDelay === ""
      ? 300
      : Number.parseInt(configuredSearchDelay);

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

  /** @type HTMLButtonElement | null */
  const buttonElement = component.querySelector("button.js-search-button");

  /** @type Record<string, string> */
  const searchParams = Object.fromEntries(
    Array.from(
      /** @type NodeListOf<HTMLInputElement>*/ (
        component.querySelectorAll("input[type='hidden']")
      ),
      (el) => [el.name, el.value],
    ),
  );

  const searchDelay = component.dataset.searchDelay
    ? Number.parseInt(component.dataset.searchDelay)
    : 300;

  /**
   * Store the initialSuggestions in order to restore them later.
   * @type Suggestions
   * */
  let initialSuggestions;
  try {
    initialSuggestions = JSON.parse(component.dataset.suggestions || "[]");
  } catch {
    initialSuggestions = [];
  }

  const observer = new MutationObserver((mutationsList, _observer) => {
    // Watch for changes to autocomplete and suggestions data attributes

    for (const mutation of mutationsList) {
      if (mutation.type === "attributes") {
        if (mutation.attributeName === "data-suggestions") {
          updateSuggestions();
        } else if (mutation.attributeName === "data-autocomplete") {
          updateAutocomplete();
        }
      }
    }
  });

  observer.observe(component, {
    childList: false,
    attributes: true,
    attributeFilter: ["data-suggestions", "data-autocomplete"],
    subtree: false,
  });

  /**
   *
   * Fire a custom "qld-search" event which includes the searchParams in the event.detail
   * This is triggered by search button click, debounced input event, autocomplete click.
   */
  const search = () => {
    const value = inputElement.value.trim();
    if (value === "") {
      if (initialSuggestions) {
        component.dataset.suggestions = JSON.stringify(initialSuggestions);
      }
      component.dataset.autocomplete = "[]";
    }

    const event = new CustomEvent("qld-search", {
      bubbles: true,
      cancelable: true,
      detail: {
        query: value,
        ...searchParams,
      },
    });

    // Will be false if preventDefault()ed.
    const shouldContinue = component.dispatchEvent(event);

    if (
      shouldContinue &&
      value &&
      component.dataset.useDefaultSearchHandler === "true"
    ) {
      handleDefaultSearch(event);
    }
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
      } else if (
        e.target instanceof Node &&
        suggestionsElement?.contains(e.target)
      ) {
        inputElement?.focus();
        suggestionsElement?.classList.remove("show");
      }
    } else if (!formElement && e.target === inputElement && e.key === "Enter") {
      // If wrapped in a form, the submit button is already automatically triggered on enter press.
      buttonElement?.click();
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
    if (
      !(e.relatedTarget instanceof Node) ||
      (e.relatedTarget instanceof Node && !component?.contains(e.relatedTarget))
    ) {
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
    const item = /** @type HTMLElement */ (e.target).closest(
      ".suggestions-item",
    );
    if (item?.matches(".is-autocomplete")) {
      e.preventDefault();
      inputElement.value = item.textContent.replace(/\s+/g, " ").trim();
      buttonElement?.click();
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

  /**
   * Render autocomplete results into the suggestions block
   */
  const updateAutocomplete = () => {
    /** @type AutocompleteSuggestions */
    let data;
    try {
      data = JSON.parse(component.dataset.autocomplete || "[]");
    } catch {
      data = [];
    }
    const suggestionsInnerEl =
      suggestionsElement?.querySelector(".suggestions-inner");
    if (!suggestionsInnerEl) return;

    let autocompleteGroupEl = suggestionsInnerEl.querySelector(
      ".suggestions-group.is-autocomplete",
    );

    if (!data || !Array.isArray(data) || data.length === 0) {
      autocompleteGroupEl?.remove();
      return;
    } else {
      autocompleteGroupEl =
        autocompleteGroupEl ||
        Object.assign(document.createElement("div"), {
          className: "suggestions-group is-autocomplete",
        });
      autocompleteGroupEl.innerHTML = renderAutocomplete(
        data,
        inputElement.value,
      );
      if (!autocompleteGroupEl.isConnected)
        suggestionsInnerEl.prepend(autocompleteGroupEl);
    }
  };

  /**
   * Render the suggestions data into the suggestions block
   */
  const updateSuggestions = (isInitial = false) => {
    const data = isInitial
      ? initialSuggestions
      : JSON.parse(component.dataset.suggestions || "[]");
    const suggestionsInnerEl =
      suggestionsElement?.querySelector(".suggestions-inner");
    if (!suggestionsInnerEl) return;

    let suggestionsGroupEls = suggestionsInnerEl.querySelectorAll(
      ".suggestions-group:not(.is-autocomplete)",
    );

    suggestionsGroupEls.forEach((el) => el.remove());

    if (!data || (Array.isArray(data) && data.length === 0)) return;

    // insertAdjacentHTML keeps the autocomplete block in the DOM.
    suggestionsInnerEl.insertAdjacentHTML("beforeend", renderSuggestions(data));
  };

  if (initialSuggestions) updateSuggestions(true);
}

/**
 * Fetches data from the provided URL.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<Object>} - A promise that resolves to the fetched data.
 */
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${url}: `, error);
    return {};
  }
}

/**
 * @param {AutocompleteSuggestions} autocomplete
 * @returns {string}
 */
const renderAutocomplete = (autocomplete, value = "") => {
  if (!autocomplete || !Array.isArray(autocomplete)) return "";
  return `
  <ul>${autocomplete
    .slice(0, 4) // only display the first 4 items
    .map((item) => {
      const highlightedText = item.replace(
        new RegExp(`(${value})`, "gi"),
        "<strong>$1</strong>",
      );
      return `<li><a class="suggestions-item is-autocomplete" tabindex="0" href="#"><span>${highlightedText}</span></a></li>`; // <span> is required to ensure all text remains a single flex item and does not introduce spacing and wrapping bugs.
    })
    .join("")}</ul>`;
};

/**
 * @param {Suggestions} suggestions
 * @returns {string}
 */
const renderSuggestions = (suggestions) => {
  if (!suggestions) return "";

  const entries = Array.isArray(suggestions) ? suggestions : [suggestions];
  if (entries.length === 0) return "";

  // Build the services HTML safely
  const escapeHtmlAttr = (/** @type string */ str) =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  /** @param {Suggestion } item */
  const renderItem = (item) =>
    `<li><a class="suggestions-item" tabindex="0" href="${escapeHtmlAttr(item.href)}"><span>${item.label}</span></a></li>`;

  /** @param {SuggestionGroup} group */
  const renderGroup = (group) => `
    <div class="suggestions-group">
      ${group.label ? `<strong class="suggestions-group-label d-block">${group.label}</strong>` : ""}
      <ul>
        ${group.items.map(renderItem).join("")}
        ${group.link ? `<li><a tabindex="0" href="${escapeHtmlAttr(group.link.href)}" class="suggestions-item is-view-more">${group.link.label || "View more"}</a></li>` : ""}
      </ul>
    </div>`;

  /** @param {Suggestion[]} items */
  const renderItems = (items) =>
    `<div class="suggestions-group"><ul>${items.map(renderItem).join("")}</ul></div>`;

  /** @param {SuggestionGroup | Suggestion} entry */
  const isSuggestionGroup = (entry) =>
    typeof entry === "object" && entry !== null && "items" in entry;

  if (entries.length === 0) return "";

  if (isSuggestionGroup(entries[0])) {
    // entries is an array of SuggestionGroup
    return entries
      .map((group) => renderGroup(/**@type SuggestionGroup */ (group)))
      .join("");
  } else {
    // entries is an array of Suggestion
    return renderItems(/**@type Suggestion[] */ (entries));
  }
};

/**
 * A funnelback specific qld-search event handler. Listen out for the search event, perform some action then update "dataset.suggestions" or "dataset.autocomplete". The component will react to the update accordingly.
 * @param {QLDSearchEvent} e
 */
async function handleDefaultSearch(e) {
  // The `qld-search` event is still fired even when the value is cleared.
  // The component will automatically fall back to initialSuggestions state and clear autocomplete list.
  // In this case there is nothing to do.
  if (e.detail.query === "") {
    return;
  } else {
    const searchComponent = /** @type HTMLElement */ (e.target);
    if (!searchComponent) return;
    // autocompleteEndpoint and searchResultsEndpoint are provided as configurable dataset props on the component.
    // There is no requirement to use them at all, any custom handler may simply use hard coded urls instead.
    const autocompleteEndpoint = searchComponent.dataset.autocompleteEndpoint;
    const resultsEndpoint = searchComponent.dataset.searchResultsEndpoint;

    // Use .then chaining rather than await so both requests can run concurrently and update asyncronously.
    if (autocompleteEndpoint) {
      fetchData(
        `${autocompleteEndpoint}&partial_query=${encodeURIComponent(e.detail.query)}`,
      ).then((data) => {
        // update the autocomplete list
        if (Array.isArray(data)) {
          searchComponent.dataset.autocomplete = JSON.stringify(data);
        }
      });
    }

    if (resultsEndpoint) {
      // Fetch related services from services API
      fetchData(
        `${resultsEndpoint}&query=${encodeURIComponent(e.detail.query)}`,
      ).then((/** @type any*/ results) => {
        const items = results.response?.resultPacket?.results;

        if (items && items.length > 0) {
          // view more url should be the form endpoint plus searchParams
          let viewMoreUrl;
          if (e.target instanceof HTMLFormElement) {
            viewMoreUrl = new URL(e.target.action, window.location.href);
            const searchParams = new URLSearchParams(viewMoreUrl.searchParams); // in case the existing action href has params
            new FormData(e.target).forEach((value, key) => {
              searchParams.append(
                key,
                typeof value === "string" ? value : value.name,
              );
            }); // add the form search params

            viewMoreUrl.search = searchParams.toString();
          }

          // Build your suggestions object
          const suggestions = {
            label: "Related services",
            link: {
              label: "View more",
              href: viewMoreUrl,
            },
            items: items.slice(0, 4).map((/** @type any */ item) => ({
              label: item.title,
              href: item.liveUrl,
            })),
          };
          searchComponent.dataset.suggestions = JSON.stringify(suggestions);
        } else searchComponent.dataset.suggestions = "";
      });
    }
  }
}
