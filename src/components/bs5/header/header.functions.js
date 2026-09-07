import { isElementVisible } from "../../../js/utils";

/**
 * initHeader() controls tabbing into / out of mobile search.
 * Adds a click outside handler for cosing the search.
 * Adds a page url as data attribute to header.
 * Includes logic for show search suggestions.
 */
export function initHeader() {
  /** @type {HTMLElement | null } */
  const headerElement = document.querySelector("header");

  /** @type {HTMLButtonElement | null } */
  const toggleSearchButton = document.getElementById(
    "qld-header-toggle-search-button",
  );

  /** @type {HTMLButtonElement | null} */
  const toggleMenuButton = document.getElementById("burgerBtn");

  /** @type {HTMLElement | null} */
  const searchDiv = document.getElementById("qld-header-search");

  /** @type {HTMLEement | null } */
  const searchInput = searchDiv?.querySelector(".qld-search-input input");

  const openSearch = () => {
    console.log("Open search");
    // reveal the search div
    searchDiv.classList.remove("is-closed");
    searchDiv.classList.add("is-open");

    // Change icon and text to active state
    toggleSearchButton.classList.remove("is-closed");
    toggleSearchButton.classList.add("is-open");
    toggleSearchButton.setAttribute("aria-expanded", true);
    toggleSearchButton.setAttribute("aria-label", "Close search");
    toggleSearchButton.textContent = "Close";

    // focus the search input
    searchInput?.focus();

    document.addEventListener("click", handleClickOrFocusOutsideSearch);
    document.addEventListener("focusin", handleClickOrFocusOutsideSearch);
  };

  const closeSearch = () => {
    console.log("Close search");
    searchDiv.classList.remove("is-open");
    searchDiv.classList.add("is-closed");

    // Change icon and text back to default
    toggleSearchButton.classList.remove("is-open");
    toggleSearchButton.classList.add("is-closed");
    toggleSearchButton.setAttribute("aria-expanded", false);
    toggleSearchButton.setAttribute("aria-label", "Open search");
    toggleSearchButton.textContent = "Search";

    document.removeEventListener("click", handleClickOrFocusOutsideSearch);
    document.removeEventListener("focusin", handleClickOrFocusOutsideSearch);
  };

  /**
   * @param {FocusEvent | PointerEvent} e
   */
  const handleClickOrFocusOutsideSearch = (e) => {
    if (!searchDiv.contains(e.target) && toggleSearchButton !== e.target) {
      closeSearch();

      // focusin event, assume keyboard tabbing.
      if (e.type === "focusin") {
        const items = searchDiv.querySelectorAll("input, button, a");

        if (
          // Tabbing forward out of menu - If the related target is the last of menu items, move focus to the menu button.
          e.relatedTarget === items.item(0) &&
          isElementVisible(toggleSearchButton)
        ) {
          toggleSearchButton?.focus();
        } else if (
          // Tabbing backward from input - If the related target is input (first item) move back to search button.
          e.relatedTarget === items.item(items.length - 1) &&
          isElementVisible(toggleMenuButton)
        ) {
          toggleMenuButton?.focus();
        }
      }
    }
  };

  /**
   * @param {PointerEvent} event
   * Closure within initHeader to share common variables
   */
  const handleToggleSearch = (event) => {
    console.log("Toggle");
    // Prevent default action and stop event propagation
    try {
      event.preventDefault();
      event.stopPropagation();
    } catch (error) {
      console.error("Error in event handling:", error);
    }

    if (searchDiv) {
      const searchIsOpen = searchDiv.classList.contains("is-open");

      if (searchIsOpen) {
        closeSearch();
      } else {
        openSearch();
      }
    }
  };

  if (headerElement) {
    // Get the current page URL without query string parameters
    const url = window.location.origin + window.location.pathname;
    // Set the data-page-url attribute on the <header> element
    headerElement.setAttribute("data-page-url", url);
  }

  // Header search
  toggleSearchButton?.addEventListener("click", handleToggleSearch);

  // Get all forms with the class 'site-search'
  let forms = document.querySelectorAll(".site-search");

  forms.forEach((form) => {
    // Get the search input within the current form
    const searchInput = form.querySelector(".qld-search-input input");

    if (searchInput) {
      let timeout;

      // Add keyup event listener to the search input
      searchInput.addEventListener("input", function (e) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          const value = e.target.value.trim();
          showSuggestions(value, value === "", form);
        }, 300);
      });

      // Attach event listener to form submit
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        const query = searchInput.value.trim();
        submitSearchForm(query, form);
      });
    }
  });
}
