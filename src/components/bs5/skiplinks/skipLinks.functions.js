import { isFocusable } from "../../../js/utils";

/**
 * Checks whether target elements in a list of skip links are valid - ie they can receive focus.
 * @returns {boolean} Return true if skip links are valid, false if there is a problem.
 */
export function validateSkipLinks() {
  const skipLinks = document.querySelectorAll(".qld-skip-links__item");
  skipLinks.forEach((item) => {
    // check if target exists
    const href = item.getAttribute("href"); // getAttribute returns the value as authored, not resolved value as full URL.
    const targetId = href.replace(/^#/, "");
    const target = document.querySelector(href);
    if (!target) {
      console.error(
        `A skip link with label "${item.textContent}" is targeting a non-existent element with id "${targetId}".`,
      );
      return false;
    }
    return true;
  });
}
