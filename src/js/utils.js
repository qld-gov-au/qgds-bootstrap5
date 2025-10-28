/**
 * All native focusable tag names.
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

/**
 * Get all focusable elements within a container
 * @param {HTMLElement} container The container element to search within
 * @returns {HTMLElement[]} Array of focusable elements
 */
export function getFocusableElements(container) {
  if (!container) return [];

  const allElements = container.querySelectorAll("*");
  return Array.from(allElements).filter((el) => isFocusable(el));
}

/**
 * Create a focus trap for accessibility
 * Traps keyboard focus within a container element (e.g., modal, navbar, menu)
 * @param {HTMLElement} container The container element to trap focus within
 * @param {Object} options Configuration options
 * @param {HTMLElement} options.returnFocusElement Element to return focus to when deactivated
 * @param {Function} options.onEscape Callback function when Escape key is pressed
 * @returns {Object} Focus trap controller with activate, deactivate, and update methods
 */
export function createFocusTrap(container, options = {}) {
  if (!container) {
    throw new Error("Container element is required for focus trap");
  }

  const { returnFocusElement, onEscape } = options;
  let isActive = false;
  let focusableElements = [];
  let previousActiveElement = null;

  /**
   * Update the list of focusable elements
   */
  function updateFocusableElements() {
    focusableElements = getFocusableElements(container);
  }

  /**
   * Handle Tab key navigation within the trap
   */
  function handleTabKey(event) {
    if (!isActive || focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    // Shift + Tab (backward)
    if (event.shiftKey) {
      if (activeElement === firstElement || !container.contains(activeElement)) {
        event.preventDefault();
        lastElement.focus();
      }
    }
    // Tab (forward)
    else {
      if (activeElement === lastElement || !container.contains(activeElement)) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  /**
   * Handle Escape key to close/deactivate
   */
  function handleEscapeKey(event) {
    if (!isActive) return;

    if (event.key === "Escape" || event.key === "Esc") {
      event.preventDefault();
      if (typeof onEscape === "function") {
        onEscape();
      }
    }
  }

  /**
   * Handle all keyboard events
   */
  function handleKeyDown(event) {
    if (event.key === "Tab") {
      handleTabKey(event);
    } else if (event.key === "Escape" || event.key === "Esc") {
      handleEscapeKey(event);
    }
  }

  /**
   * Activate the focus trap
   */
  function activate() {
    if (isActive) return;

    // Store the currently focused element to return focus later
    previousActiveElement = document.activeElement;

    // Update focusable elements
    updateFocusableElements();

    // Add keyboard event listener
    document.addEventListener("keydown", handleKeyDown);

    // Focus the first focusable element
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    isActive = true;
  }

  /**
   * Deactivate the focus trap
   */
  function deactivate() {
    if (!isActive) return;

    // Remove keyboard event listener
    document.removeEventListener("keydown", handleKeyDown);

    // Return focus to the element that had focus before activation
    const elementToFocus = returnFocusElement || previousActiveElement;
    if (elementToFocus && typeof elementToFocus.focus === "function") {
      elementToFocus.focus();
    }

    isActive = false;
    previousActiveElement = null;
  }

  return {
    activate,
    deactivate,
    update: updateFocusableElements,
    isActive: () => isActive,
  };
}
