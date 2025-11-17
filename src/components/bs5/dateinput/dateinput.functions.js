export function initDateInput() {
  const dateContainers = document.querySelectorAll(".date-container");

  /**
   * @param {InputEvent} e
   * @returns void
   */
  const inputHandler = (e) => {
    // verify the event target is what we expect.
    if (e.target.tagName !== "INPUT" && e.target.type !== "text") {
      return;
    }

    /**
     * @type HTMLInputElement
     */
    const input = e.target;
    const { value, min, max, pattern } = input;
    const previousValue = input.dataset.previousValue || "";
    // enforce the validation attributes
    if (max && parseInt(value) > parseInt(max)) {
      input.dataset.previousValue = input.value = max;
      return;
    }

    if (
      min &&
      parseInt(value) !== 0 && // Must allow typing leading zeroes
      value.length >= min.length &&
      parseInt(value) < parseInt(min)
    ) {
      input.dataset.previousValue = input.value = min;
      return;
    }

    if (
      value &&
      value !== "" &&
      parseInt(value) !== 0 &&
      !RegExp(pattern).test(value)
    ) {
      input.value = previousValue;
      return;
    }

    // all good - update previousValue with current value
    input.dataset.previousValue = input.value = input.value.trim();
  };

  /**
   * @param {FocusEvent} e
   * @returns void
   */
  const focusOutHandler = (e) => {
    // Because format is dd/mm/yyyy we want to add leading zeroes to single digits
    // verify the event target is what we expect
    if (e.target.tagName !== "INPUT" && e.target.type !== "text") {
      return;
    }

    /** @type {HTMLInputElement} */
    const input = e.target;
    const { min, max } = input;
    const minLength = input.minLength || 0;
    const value = (input.value || "").trim();

    if (!value || parseInt(value) === 0) {
      input.dataset.previousValue = input.value = "";
      return;
    }

    // If value is less than the min, bump up to min and add padding.
    if (min && parseInt(value) < min) {
      input.dataset.previousValue = input.value = min.padStart(minLength, "0");
      return;
    }

    // If value exceeds max, bring it down to max and add padding
    if (max && parseInt(value) > max) {
      input.dataset.previousValue = input.value = max.padStart(minLength, "0");
      return;
    }

    input.dataset.previousValue = input.value = value.padStart(minLength, "0");
  };

  dateContainers.forEach((dateContainer) => {
    dateContainer.addEventListener("input", inputHandler);
    dateContainer.addEventListener("focusout", focusOutHandler);
  });
}
