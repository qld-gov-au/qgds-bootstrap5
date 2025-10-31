import { createFocusTrap } from "../../../js/utils.js";

export function initializeNavbar() {
  const navbarCollapse = document.getElementById("main-nav");
  const overlay = document.getElementById("overlay");
  const burgerBtn = document.getElementById("burgerBtn");
  const burgerCloseBtn = document.getElementById("burgerCloseBtn");
  const addHideTo = ["head", "main", "footer"];
  const hideTargets = addHideTo
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  // Helper to set aria-hidden
  const setAriaHidden = (hidden) => {
    hideTargets.forEach((el) => {
      if (hidden) {
        el.setAttribute("aria-hidden", "true");
      } else {
        el.removeAttribute("aria-hidden");
      }
    });
  };

  // Helper function to close navbar
  function closeNavbar() {
    if (navbarCollapse?.classList.contains("show")) {
      navbarCollapse.classList.remove("show");
      overlay?.classList.remove("show");
      document.body.style.overflow = "";
      setAriaHidden(false);

      // Deactivate focus trap
      if (focusTrap) {
        focusTrap.deactivate();
      }
    }
  }

  // Create focus trap for navbar
  let focusTrap = null;
  if (navbarCollapse) {
    focusTrap = createFocusTrap(navbarCollapse, {
      returnFocusElement: burgerBtn,
      onEscape: () => {
        closeNavbar();
      },
    });
  }

  // Close navbar when overlay is clicked
  overlay?.addEventListener("click", () => {
    closeNavbar();
  });

  const resetNavbarState = () => {
    const isMobile = window.innerWidth < 992;
    const dropdownToggles = document.querySelectorAll(
      ".navbar a.dropdown-toggle, .navbar a.no-dropdown-toggle",
    );

    // Toggle dropdown functionality based on screen size
    dropdownToggles.forEach((toggle) => {
      if (isMobile) {
        // Skip toggle items with hasNoLink class
        if (toggle.classList.contains("hasNoLink")) {
          return;
        }
        toggle.classList.replace("dropdown-toggle", "no-dropdown-toggle");
        toggle.removeAttribute("data-bs-toggle");
      } else {
        toggle.classList.replace("no-dropdown-toggle", "dropdown-toggle");
        toggle.setAttribute("data-bs-toggle", "dropdown");
      }
    });
  };

  window.addEventListener("resize", resetNavbarState);
  resetNavbarState();

  // Burger buttons - handle open
  navbarCollapse?.addEventListener("shown.bs.collapse", () => {
    // Check if navbar is opening
    setTimeout(() => {
      if (navbarCollapse?.classList.contains("show")) {
        setAriaHidden(true);

        // Activate focus trap when navbar opens (mobile only)
        const isMobile = window.innerWidth < 992;
        if (focusTrap && isMobile) {
          focusTrap.activate();
        }
      }
    }, 0);
  });

  // Close button
  burgerCloseBtn?.addEventListener("click", () => {
    closeNavbar();
  });
}
