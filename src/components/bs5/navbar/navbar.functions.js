import { createFocusTrap } from "../../../js/utils.js";
import { breakpoints } from "../../../js/constants.js";

export function initializeNavbar() {
  const navbar = document.getElementById("main-nav");
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

  // Focus trap instances (created on-demand)
  let mobileFocusTrap = null;
  const dropdownFocusTraps = new Map();

  function closeNavbar() {
    try {
      bootstrap.Collapse.getInstance(navbar)?.hide();
    } catch (e) {
      console.error(e);
    }
  }

  // Create mobile focus trap on-demand (when mobile menu opens)
  function createMobileFocusTrap() {
    if (!mobileFocusTrap && navbar) {
      mobileFocusTrap = createFocusTrap(navbar, {
        returnFocusElement: burgerBtn,
        onEscape: () => {
          closeNavbar();
        },
      });
    }
    return mobileFocusTrap;
  }

  // Create dropdown focus trap on-demand (when dropdown opens)
  function getOrCreateDropdownFocusTrap(dropdown, toggle) {
    if (!dropdownFocusTraps.has(dropdown)) {
      const dropdownTrap = createFocusTrap(dropdown, {
        returnFocusElement: toggle,
        onEscape: () => {
          // Close the dropdown using Bootstrap's API
          const bsDropdown = bootstrap.Dropdown.getInstance(toggle);
          if (bsDropdown) {
            bsDropdown.hide();
          }
        },
      });
      dropdownFocusTraps.set(dropdown, dropdownTrap);
    }
    return dropdownFocusTraps.get(dropdown);
  }

  // Setup dropdown event listeners
  function setupDropdownListeners() {
    // Find all dropdown toggles (elements with data-bs-toggle="dropdown")
    const dropdownToggles = navbar?.querySelectorAll(
      '[data-bs-toggle="dropdown"]',
    );

    dropdownToggles?.forEach((toggle) => {
      // Find the associated dropdown menu within the same parent container
      const parentItem =
        toggle.closest(".dropdown") || toggle.closest(".nav-item");
      if (!parentItem) return;

      const dropdown = parentItem.querySelector(".dropdown-menu");
      if (!dropdown) return;

      // Listen for dropdown show event (desktop only)
      toggle.addEventListener("shown.bs.dropdown", () => {
        const isMobile = window.innerWidth < breakpoints.lg;
        if (!isMobile) {
          // Create and activate focus trap on-demand
          const dropdownTrap = getOrCreateDropdownFocusTrap(dropdown, toggle);
          setTimeout(() => dropdownTrap.activate(), 0);
        }
      });

      // Listen for dropdown hide event
      toggle.addEventListener("hidden.bs.dropdown", () => {
        const dropdownTrap = dropdownFocusTraps.get(dropdown);
        if (dropdownTrap && dropdownTrap.isActive) {
          dropdownTrap.deactivate();
        }
      });
    });
  }

  // Setup dropdown listeners on load
  if (navbar) {
    setupDropdownListeners();
  }

  // Close navbar when overlay is clicked
  overlay?.addEventListener("click", () => {
    closeNavbar();
  });

  const resetNavbarState = () => {
    const isMobile = window.innerWidth < breakpoints.lg;
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

    if (!isMobile) {
      closeNavbar();
    }
  };

  window.addEventListener("resize", resetNavbarState);
  resetNavbarState();

  //All associated side effects of navbar collapse beginning belong here
  navbar?.addEventListener("hide.bs.collapse", () => {
    overlay?.classList.remove("show");
  });

  // All associated side effects of navbar collapse completion belong here.
  navbar?.addEventListener("hidden.bs.collapse", () => {
    setAriaHidden(false);

    // Deactivate and destroy mobile focus trap
    if (mobileFocusTrap) {
      mobileFocusTrap.deactivate();
      mobileFocusTrap = null;
    }
  });

  // Burger buttons - handle open (mobile only)
  navbar?.addEventListener("shown.bs.collapse", () => {
    // Check if navbar is opening
    setTimeout(() => {
      if (navbar?.classList.contains("show")) {
        setAriaHidden(true);

        // Create and activate focus trap when navbar opens (mobile only - whole navbar)
        const isMobile = window.innerWidth < breakpoints.lg;
        if (isMobile) {
          const trap = createMobileFocusTrap();
          trap.activate();
        }
      }
    }, 0);
  });
}
