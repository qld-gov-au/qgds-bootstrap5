/**
 * Return the result of some value after a given event has fired on the specified element.
 * @param {HTMLElement} element The element which listens for the event
 * @param {string} eventName The name of the event
 * @param {function} callback a callback which returns the value you want. Receives the event object
 * @returns {Promise} A promise that resolves with the value returned by the callback
 * @example
 * const isOpen = await waitForEventOn(collapse, "hidden.bs.collapse", (e) => {
 *   return Array.from(e.target.classList).includes("show");
 * });
 */
export function waitForEventOn(element, eventName, callback) {
  return new Promise((resolve) => {
    element.addEventListener(
      eventName,
      (e) => {
        if (callback) {
          resolve(callback(e));
        } else {
          resolve();
        }
      },
      { once: true },
    );
  });
}
