import { isElementVisible } from "../../../js/utils";

/**
 * initHeader() controls tabbing into / out of mobile search.
 * Adds a click outside handler for closing the search.
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

  /**
   * Display the search bar, focus the search input and attach document click and focusin listeners to intelligently close when user moves on.
   */
  const openSearch = () => {
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

    // These event listeners are in the order they fire in DOM.
    // Note that closeSearch() will remove listeners so is important to understand their order.
    document.addEventListener("mousedown", handleClickOrFocusOutsideSearch);
    searchInput.addEventListener("blur", handleSearchBlur);
    document.addEventListener("focusin", handleClickOrFocusOutsideSearch);
    searchDiv.addEventListener("keydown", handleSearchKeyDown);
  };

  /**
   * @param {FocusEvent} e
   */
  const handleSearchBlur = (e) => {
    if (!e.relatedTarget) {
      closeSearch(toggleSearchButton);
    }
  };

  /**
   * Collapse the search bar and remove listeners.
   * @param {HTMLElement} [focusElement] Optionally move focus to a specified element.
   */
  const closeSearch = (focusElement) => {
    searchDiv.classList.remove("is-open");
    searchDiv.classList.add("is-closed");

    // Change icon and text back to default
    toggleSearchButton.classList.remove("is-open");
    toggleSearchButton.classList.add("is-closed");
    toggleSearchButton.setAttribute("aria-expanded", false);
    toggleSearchButton.setAttribute("aria-label", "Open search");
    toggleSearchButton.textContent = "Search";

    document.removeEventListener("mousedown", handleClickOrFocusOutsideSearch);
    searchInput.removeEventListener("blur", handleSearchBlur);
    document.removeEventListener("focusin", handleClickOrFocusOutsideSearch);
    searchDiv.removeEventListener("keydown", handleSearchKeyDown);

    if (isElementVisible(focusElement)) focusElement?.focus();
  };

  /**
   * When Esc key is pressed, IF search is empty AND focus is not within suggestions, close search and refocus searchToggle
   * @param {KeyboardEvent} e
   */
  const handleSearchKeyDown = (e) => {
    if (
      e.key === "Escape" &&
      !searchInput?.value &&
      !searchDiv.querySelector(".suggestions")?.contains(e.target)
    ) {
      closeSearch(toggleSearchButton);
    }
  };

  /**
   * @param {FocusEvent | PointerEvent} e
   */
  const handleClickOrFocusOutsideSearch = (e) => {
    if (!searchDiv.contains(e.target) && toggleSearchButton !== e.target) {
      if (e.type === "mousedown") {
        closeSearch();
        return;
      }
      // focusin event, assume keyboard tabbing.
      if (e.type === "focusin") {
        const items = Array.from(
          searchDiv.querySelectorAll("input, button, a"),
        ).filter((item) => isElementVisible(item));

        if (
          // Tabbing backward from input - If the related target is input (first item) move back to search button.
          e.relatedTarget === items[0]
        ) {
          closeSearch(toggleSearchButton);
        } else if (
          // Tabbing forward out of menu - If the related target is the last of menu items, move focus to the menu button.
          e.relatedTarget === items[items.length - 1]
        ) {
          closeSearch(toggleMenuButton);
        }
      }
    }
  };

  /**
   * @param {PointerEvent} event
   * Closure within initHeader to share common variables
   */
  const handleToggleSearch = (event) => {
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

  toggleSearchButton?.addEventListener("click", handleToggleSearch);
}
