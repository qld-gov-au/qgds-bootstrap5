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
  const searchIcon = toggleButton.querySelector("use.icon-search");
  const closeIcon = toggleButton.querySelector("use.icon-close");
  const toggleText = toggleButton.querySelector(
    ".qld-header-toggle-main-nav-text",
  );

  // Check current class and swap
  if (searchDiv) {
    if (searchDiv.classList.contains("is-open")) {
      searchDiv.classList.remove("is-open");
      searchDiv.classList.add("is-closed");

      // Change icon and text back to default
      searchIcon.style.display = "block";
      closeIcon.style.display = "none";
      toggleText.textContent = "Search";
    } else {
      searchDiv.classList.remove("is-closed");
      searchDiv.classList.add("is-open");

      // Change icon and text to active state
      searchIcon.style.display = "none";
      closeIcon.style.display = "block";
      toggleText.textContent = "Close";
    }

    // Optional: Update the aria-expanded attribute for accessibility
    const isExpanded = searchDiv.classList.contains("is-open");
    event.currentTarget.setAttribute("aria-expanded", isExpanded);
  }
}
