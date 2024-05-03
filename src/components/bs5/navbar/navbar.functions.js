import { createPopper } from '@popperjs/core';

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
        boundariesElement: 'viewport',
      },
    }],
  });

  return popperInstance;
}

let activePoppers = [];

export function initializeNavbar() {
  const dropdownToggles = document.querySelectorAll('.navbar .dropdown-toggle');
  const navbarCollapse = document.getElementById('navbarSupportedContent');
  const overlay = document.getElementById('overlay');

  overlay.addEventListener('click', function() {
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

      // Check if a Popper instance should be activated or not
      const resizeHandler = () => {
        if (window.innerWidth > 992) {
          if (!dropdownMenu.dataset.popperActive) {
            let popperInstance = initializeDropdownPopper(firstLi, dropdownMenu);
            dropdownMenu.dataset.popperActive = 'true';
            activePoppers.push(popperInstance);
          }
        } else {
          if (dropdownMenu.dataset.popperActive) {
            activePoppers.forEach(popperInstance => popperInstance.destroy());
            activePoppers = []; // Clear out the array after destroying instances
            delete dropdownMenu.dataset.popperActive;
          }
        }
      };
        
      // Attach resize listener to update Popper on resize
      window.addEventListener('resize', resizeHandler);
      resizeHandler(); // Call handler immediately to apply correct setting on init
    });
  });
}
