export function initDateInput() {
  const dateContainers = document.querySelectorAll(".date-container");

  console.log(`Found ${dateContainers?.length || 0} datecontainers`);

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
    const previousValue = input.dataset.previousValue || "";
    // enforce the validation attributes
    if (
      input.value &&
      input.value !== "" &&
      parseInt(input.value) !== 0 &&
      !RegExp(input.pattern).test(input.value)
    ) {
      // out of range - reset to previous value
      input.value = previousValue;
    } else {
      // all good - update previousValue with current value
      input.dataset.previousValue = input.value = input.value.trim();
    }
  };

  /**
   * @param {FocusEvent} e
   * @returns void
   */
  const focusOutHandler = (e) => {
    // Because format is dd/mm/yyyy technically want to add leading zeroes to single digits
    // verify the event target is what we expect
    if (e.target.tagName !== "INPUT" && e.target.type !== "text") {
      return;
    }

    /** @type {HTMLInputElement} */
    const input = e.target;

    const raw = (input.value || "").trim();
    if (!raw || parseInt(raw) === 0) {
      input.dataset.previousValue = input.value = "";
      return;
    }

    // Determine target digit count from minLength
    const digitTarget = input.minLength;

    // Only pad positive integer values
    if (digitTarget && raw.length < digitTarget) {
      console.log("yep");
      // update previousValue dataset so validation/inputHandler keeps in sync
      input.dataset.previousValue = input.value = raw.padStart(
        digitTarget,
        "0",
      );
    }
    return;
  };

  dateContainers.forEach((dateContainer) => {
    dateContainer.addEventListener("input", inputHandler);
    dateContainer.addEventListener("focusout", focusOutHandler);
  });
}
