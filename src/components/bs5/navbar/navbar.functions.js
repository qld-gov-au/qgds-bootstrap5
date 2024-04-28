import { createPopper } from '@popperjs/core';

export function initializeDropdownPopper(referenceElement, popperElement) {
  const popperInstance = createPopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 5],
      },
    }, {
      name: 'preventOverflow',
      options: {
        boundariesElement: 'viewport'
      }
    }],
  });

  // Attach resize and scroll listeners
  window.addEventListener('resize', popperInstance.update);
  window.addEventListener('scroll', popperInstance.update);

  return popperInstance;
}

export function initializeNavbar() {
    const dropdownToggles = document.querySelectorAll('.navbar .dropdown-toggle');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (event) => {
        event.preventDefault();
        const parentUl = toggle.closest('ul.navbar-nav');
        const firstLi = parentUl.querySelector('.nav-item-home');
        const dropdownMenu = toggle.parentNode.querySelector('.dropdown-menu');
        initializeDropdownPopper(firstLi, dropdownMenu);
      });
    });
}
