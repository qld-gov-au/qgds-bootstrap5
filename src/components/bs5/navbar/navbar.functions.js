import { createPopper } from '@popperjs/core';

/**
 * Initializes the dropdown popper and sets its offset to align with the first nav element.
 *
 * @memberof module:Dropdown
 * @param {Element} referenceElement - The reference element to align the popper with.
 * @param {Element} popperElement - The popper element which is the dropdown content.
 * @returns {Object} The instance of the popper.
 */
export function initializeDropdownPopper(referenceElement, popperElement) {
  // Cancel any default event handling that might interfere
  try {
    window.event?.preventDefault();
  } catch (error) {
    // You might want to handle this error or log it
    console.error('Error initializing dropdown popper:', error);
  }

  // Create the Popper.js instance
  const popperInstance = createPopper(referenceElement, popperElement, {
    placement: 'bottom-start', // Aligns the popper to the bottom-left of the reference element
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 0], // Aligned exactly to the left of the reference element
        },
      },
    ],
  });

  return popperInstance;
}

/**
 * Updates the popper's position.
 *
 * @memberof module:Dropdown
 * @param {Object} popperInstance - The instance of the popper to update.
 * @returns {void}
 */
export function updateDropdownPopperPosition(popperInstance) {
  // Stop event propagation
  try {
    window.event.cancelBubble = true;
    window.event.stopPropagation();
  } catch (error) {
    // You might want to handle this error or log it
    console.error('Error updating dropdown popper position:', error);
  }

  // Update the Popper.js instance
  popperInstance.update();
}

// Example usage:
// Assuming you have a reference to the first element in your nav and the dropdown element
const referenceElement = document.querySelector('.nav-class > li:first-child');
const popperElement = document.querySelector('.dropdown-class');
const dropdownPopper = initializeDropdownPopper(referenceElement, popperElement);

// Later on, if you need to update the position:
updateDropdownPopperPosition(dropdownPopper);
