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
  const body = document.body;

  // Add event listeners to each dropdown item
  if (dropdownItems) {
    dropdownItems.forEach(item => {
      item.addEventListener('click', function(event) {
        // Stop the event from propagating - Bootstrap default click closes
        event.stopPropagation();
      });
    });
  }

  // Overlay on mobile open
  if (overlay) {
    overlay.addEventListener('click', function () {
      // Check if the navbar is open
      if (navbarCollapse.classList.contains('show')) {
        // If open, close it
        navbarCollapse.classList.remove('show');
        overlay.classList.remove('show');
        body.style.overflow = ''; // Reset body positioning
      }
    });
  }

  if (navbarCollapse) {
    // Overlay show/hide events
    navbarCollapse.addEventListener('show.bs.collapse', function () {
      overlay.classList.add('show'); // Show the overlay
      body.style.overflow = 'hidden'; // Prevent background scroll
    });

    navbarCollapse.addEventListener('hide.bs.collapse', function () {
      overlay.classList.remove('show'); // Hide the overlay
      body.style.overflow = ''; // Reset body positioning
    });
  }

  if (dropdownToggles) {
    // Initialize Popper and toggle handling
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (event) => {
        event.preventDefault();
        const parentUl = toggle.closest('ul.navbar-nav');
        const firstLi = parentUl.querySelector('.nav-item-home');
        const dropdownMenu = toggle.parentNode.querySelector('.dropdown-menu');
        const siblingElement = toggle.closest('.nav-item').querySelector('.first-element');

        // Remove 'show' class from all dropdowns
        document.querySelectorAll('.navbar .dropdown-menu').forEach(menu => {
          if (menu !== dropdownMenu) {
            menu.classList.remove('show');
          }
        });

        // Remove 'show' class from all sibling elements
        document.querySelectorAll('.navbar .first-element').forEach(elem => {
          if (elem !== siblingElement) {
            elem.classList.remove('show');
          }
        });

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
              dropdownMenu.dataset.popperActive = 'true';
              activePoppers.push(popperInstance);
            } else {
              // If the Popper instance exists, update its position
              activePoppers.forEach(popperInstance => {
                popperInstance.update();
              });
            }
          } else {
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

  // Reset state on resize to mobile
  const resetNavbarState = () => {
    if (window.innerWidth <= 992) {
      // Remove 'show' class from all dropdowns and sibling elements
      document.querySelectorAll('.navbar .dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
      });
      document.querySelectorAll('.navbar .first-element').forEach(elem => {
        elem.classList.remove('show');
      });
      // Destroy all active Popper instances
      activePoppers.forEach(popperInstance => popperInstance.destroy());
      activePoppers = [];
      body.style.overflow = ''; // Reset body positioning
    }
  }

  // Attach resize listener to reset navbar state on resize to mobile
  window.addEventListener('resize', resetNavbarState);
  resetNavbarState(); // Call handler immediately to apply correct setting on init
}

// Initialize the navbar (see main.js)
// document.addEventListener('DOMContentLoaded', initializeNavbar);
