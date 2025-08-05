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
