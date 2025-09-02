export function initializeNavbar() {
  const navbarCollapse = document.getElementById('main-nav');
  const overlay = document.getElementById('overlay');
  const burgerBtn = document.getElementById('burgerBtn');
  const burgerCloseBtn = document.getElementById('burgerCloseBtn');
  const addHideTo = ['head', 'main', 'footer'];
  const hideTargets = addHideTo.map(id => document.getElementById(id)).filter(Boolean);

  // Close navbar when overlay is clicked
  overlay?.addEventListener('click', () => {
    if (navbarCollapse?.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
    
  const resetNavbarState = () => {
    const isMobile = window.innerWidth <= 992;
    const dropdownToggles = document.querySelectorAll('.navbar a.dropdown-toggle, .navbar a.no-dropdown-toggle');        
        
    // Toggle dropdown functionality based on screen size
    dropdownToggles.forEach(toggle => {
      if (isMobile) {
        toggle.classList.replace('dropdown-toggle', 'no-dropdown-toggle');
        toggle.removeAttribute('data-bs-toggle');
      } else {
        toggle.classList.replace('no-dropdown-toggle', 'dropdown-toggle');
        toggle.setAttribute('data-bs-toggle', 'dropdown');
      }
    });
  };
  
  window.addEventListener('resize', resetNavbarState);
  resetNavbarState();

  // Helper to set aria-hidden
  const setAriaHidden = (hidden) => {
    hideTargets.forEach(el => {
      if (hidden) {
        el.setAttribute('aria-hidden', 'true');
      } else {
        el.removeAttribute('aria-hidden');
      }
    });
  };

  // Burger buttons
  [burgerBtn, burgerCloseBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        setAriaHidden(true);
      });
    }
  });
}
