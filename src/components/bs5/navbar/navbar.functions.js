import { createPopper } from '@popperjs/core';

/**
 * Initializes a Popper.js instance for dropdown elements.
 *
 * @memberof module:Navbar
 * @param {HTMLElement} referenceElement - The DOM element used as the reference.
 * @param {HTMLElement} popperElement - The DOM element used as the popper.
 * @returns {Object} The Popper instance created.
 */
export function initializeDropdownPopper(referenceElement, popperElement) {
  const popperInstance = createPopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 5],
      },
    }, {
      name: 'preventOverflow',
      options: {
        boundary: 'viewport',
      },
    }],
  });

  return popperInstance;
}

let activePoppers = [];

/**
 * Initializes the navbar by setting up dropdown toggles and overlay interactions.
 *
 * @memberof module:Navbar
 * @returns {void}
 */
export function initializeNavbar() {
  const dropdownToggles = document.querySelectorAll('.navbar .dropdown-toggle');
  const navbarCollapse = document.getElementById('navbarSupportedContent');
  const dropdownItems = document.querySelectorAll('ul.dropdown-menu');
  const overlay = document.getElementById('overlay');

  // Add event listeners to each dropdown item
  dropdownItems.forEach(item => {
    item.addEventListener('click', function(event) {
      // Stop the event from propagating - Bootstrap default click closes
      event.stopPropagation();  
    });
  });

  // Overlay on mobile open
  overlay.addEventListener('click', function () {
    // Check if the navbar is open
    if (navbarCollapse.classList.contains('show')) {
      // If open, close it
      navbarCollapse.classList.remove('show');
      overlay.classList.remove('show');
    }
  });

  // Overlay show/hide events
  navbarCollapse.addEventListener('show.bs.collapse', function () {
    overlay.classList.add('show'); // Show the overlay
  });

  navbarCollapse.addEventListener('hide.bs.collapse', function () {
    overlay.classList.remove('show'); // Hide the overlay
  });

  // Initialize Popper and toggle handling
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      const parentUl = toggle.closest('ul.navbar-nav');
      const firstLi = parentUl.querySelector('.nav-item-home');
      const dropdownMenu = toggle.parentNode.querySelector('.dropdown-menu');
      const siblingElement = toggle.closest('.nav-item').querySelector('.first-element');

      // Toggle the 'show' class on the sibling element
      if (dropdownMenu.classList.contains('show')) {
        siblingElement.classList.add('show');
      } else {
        siblingElement.classList.remove('show');
      }
      
      // Check if a Popper instance should be activated or not
      const resizeHandler = () => {
        if (window.innerWidth > 992) {
          if (!dropdownMenu.dataset.popperActive) {
            let popperInstance = initializeDropdownPopper(firstLi, dropdownMenu);
            console.log(popperInstance);
            dropdownMenu.dataset.popperActive = 'true';
            activePoppers.push(popperInstance);
          } else {
            // If the Popper instance exists, update its position
            activePoppers.forEach(popperInstance => {
              popperInstance.update();
            });
          }
        } else {
          const dropdownMenu = toggle.closest('.nav-item').querySelector('.dropdown-menu');
          if (dropdownMenu.dataset.popperActive) {
            activePoppers.forEach(popperInstance => popperInstance.destroy());
            activePoppers = []; // Clear out the array after destroying instances
            delete dropdownMenu.dataset.popperActive;
          }
        }
      }

      // Attach resize listener to update Popper on resize
      window.addEventListener('resize', resizeHandler);
      resizeHandler(); // Call handler immediately to apply correct setting on init
    });
  });
}

// Initialize the navbar (see main.js)
// document.addEventListener('DOMContentLoaded', initializeNavbar);
