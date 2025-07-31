/**
   * Return the result of some value after a given event has fired on the specified element.
   *
   * @param {HTMLElement} element The element which listens for the event
   * @param {string} eventName The name of the event
   * @param {function} callBack a callback which returns the value you want. Receives the event object 
   * @returns Promise
   * @example const isOpen = await waitForEventOn(collapse, "hidden.bs.collapse", (e) => {
      return Array.from(e.target.classList).includes("show");
    });
   */

export function waitForEventOn(element, eventName, callback) {
  return new Promise((resolve) => {
    element.addEventListener(
      eventName,
      (e) => {
        resolve(callback(e));
      },
      { once: true },
    );
  });
}

/**
 * Wait for a specified number of milliseconds
 *
 * @param {number} ms The number of milliseconds to wait (defaults to 10ms)
 * @returns Promise
 * @example await waitFor(100); // Wait for 100ms
 */
export function waitFor(ms = 10) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Check if an element is visible using the checkVisibility API with fallback
 * for testing environments that don't support it
 *
 * @param {HTMLElement} element The element to check visibility for
 * @returns {boolean} True if the element is visible, false otherwise
 * @example expect(isElementVisible(suggestions)).toBe(true);
 */
export function isElementVisible(element) {
  // Use native checkVisibility if available (modern browsers)
  if (typeof element.checkVisibility === 'function') {
    return element.checkVisibility();
  }
  
  // Fallback for testing environments (JSDOM) or older browsers
  if (!element || !element.isConnected) {
    return false;
  }
  
  // In testing environments like JSDOM, checking the inline style is more reliable
  // than computed styles for elements that are dynamically shown/hidden
  const inlineDisplay = element.style.display;
  
  // Check inline style first (most reliable in JSDOM)
  if (inlineDisplay === 'none') {
    return false;
  }
  
  // If inline style is explicitly set to block or other visible value, consider it visible
  if (inlineDisplay === 'block' || inlineDisplay === 'inline' || inlineDisplay === 'inline-block') {
    return true;
  }
  
  // Fallback to computed style check
  try {
    const style = window.getComputedStyle(element);
    
    if (style.display === 'none' || 
        style.visibility === 'hidden' || 
        style.opacity === '0') {
      return false;
    }
    
    return true;
  } catch (e) {
    // If getComputedStyle fails, fall back to basic checks
    return inlineDisplay !== 'none';
  }
}
