/**
 *
 * Check whether an element is able to receive focus
 * @param {HTMLElement} element The HTML Element to check
 * @returns {boolean} true if element is able to receive focus, or false if not
 */
const isFocusable = (element) => {
  if (!element || typeof element !== "object" || element.nodeType !== 1)
    return false;
  // Disabled or aria-hidden elements are not focusable
  if (
    element.hasAttribute("disabled") ||
    element.getAttribute("aria-hidden") === "true"
  )
    return false;
  // Elements with tabindex (any value) are focusable
  if (element.hasAttribute("tabindex")) return true;
  // Contenteditable elements are focusable
  if (
    element.hasAttribute("contenteditable") &&
    element.getAttribute("contenteditable") !== "false"
  )
    return true;
  // Native focusable elements
  const focusableTags = [
    "A",
    "INPUT",
    "BUTTON",
    "SELECT",
    "TEXTAREA",
    "IFRAME",
    "OBJECT",
    "DETAILS",
  ];
  if (focusableTags.includes(element.tagName)) {
    if (element.tagName === "A") {
      return !!element.getAttribute("href");
    }
    if (["INPUT", "BUTTON", "SELECT", "TEXTAREA"].includes(element.tagName)) {
      return !element.disabled;
    }
    return true;
  }
  return false;
};

/**
 * Checks whether target elements in a list of skip links are valid - ie they can receive focus.
 * @returns {void}
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
      return;
    }
    // check if target is focusable
    if (!isFocusable(target)) {
      console.error(
        `A skip link with label "${item.textContent}" is targeting a non-focusable element with id "${targetId}". Make sure the element is natively focusable, or assign a tab index of -1.`,
      );
    }
  });
}
