/**
 * All focusable tag names.
 */
export const focusableTags = [
  "A",
  "INPUT",
  "BUTTON",
  "SELECT",
  "TEXTAREA",
  "IFRAME",
  "OBJECT",
  "DETAILS",
];

/**
 *
 * Check whether an element is able to receive focus.
 * Note items with tabindex="-1" are focusable via hash links and javascript - include extra logic if you need to filter these out.
 * @param {HTMLElement} element The HTML Element to check
 * @returns {boolean} true if element is able to receive focus, or false if not
 */
export function isFocusable(element) {
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
}
