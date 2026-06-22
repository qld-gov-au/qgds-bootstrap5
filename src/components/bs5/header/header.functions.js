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
  const searchDiv = document.getElementById("qld-header-search");
  const toggleButton = event.currentTarget;

  // Check current class and swap
  if (searchDiv) {
    if (searchDiv.classList.contains("is-open")) {
      searchDiv.classList.remove("is-open");
      searchDiv.classList.add("is-closed");

      // Change icon and text back to default
      toggleButton.classList.remove("is-open");
      toggleButton.classList.add("is-closed");
      toggleButton.setAttribute("aria-expanded", false);
      toggleButton.setAttribute("aria-label", "Open search");
      toggleButton.textContent = "Search";
    } else {
      searchDiv.classList.remove("is-closed");
      searchDiv.classList.add("is-open");

      // Change icon and text to active state
      toggleButton.classList.remove("is-closed");
      toggleButton.classList.add("is-open");
      toggleButton.setAttribute("aria-expanded", true);
      toggleButton.setAttribute("aria-label", "Close search");
      toggleButton.textContent = "Close";
    }
  }
}
