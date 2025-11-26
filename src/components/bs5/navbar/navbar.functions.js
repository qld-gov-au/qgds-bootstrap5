import { createFocusTrap } from "../../../js/utils.js";
import { breakpoints } from "../../../js/constants.js";
import { getFocusableElements } from "../../../js/utils.js";

const isMobile = () => window.innerWidth < breakpoints.lg;

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
    // Do not call static method bootstrap.Collapse.getInstance(navbar).hide()
    // because storybook has a problem with referencing global bootstrap object in production build.
    // Instead simulate the close button click - same thing.
    // Do not put side effects of closing menu here (eg clearing menu focus trap), instead use "hidden.bs.collapse" or "hide.bs.collapse" event handlers declared below.
    // Need to check if menu is actually set to show, otherwise cick will open instead.
    if (navbar?.classList.contains("show")) {
      burgerCloseBtn?.click();
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

  // Setup dropdown event listeners.
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

      // Listen for click event. If using keyboard, and the menu has been opened, move focus to the first item within.
      // Do not create a focus trap.
      toggle.addEventListener("click", (e /** @type {PointerEvent} */) => {
        // e.detail is the number of mouse clicks, so keyboard click === 0;
        // See https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
        const shouldMoveFocusToMenuItem =
          e.detail === 0 && Array.from(e.target.classList).includes("show");

        if (shouldMoveFocusToMenuItem) {
          const dropdownItems = getFocusableElements(dropdown);
          if (dropdownItems) dropdownItems[0].focus();
        }
      });

      toggle.addEventListener("shown.bs.dropdown", (e) => {
        // console.log("shown", e.target.classList);
      });

      toggle.addEventListener("show.bs.dropdown", (e) => {
        // console.log("show", e.target.classList);
      });

      // There are two separate toggle elements for desktop and mobile. Bootstrap only keeps one registered for these events,
      // which is the mobile button, hidden on desktop. Therefore, we need to handle desktop reset manually. The event is caught on the
      // mobile toggle, so traverse back up find the desktop toggle.
      toggle.addEventListener("hidden.bs.dropdown", (e) => {
        if (dropdown?.contains(document.activeElement)) {
          if (!isMobile()) {
            const _toggle = parentItem.querySelector(
              'a[data-bs-toggle="dropdown"]',
            );
            _toggle?.classList.remove("show");
            _toggle?.focus();
          }
        }
      });

      toggle.addEventListener("hide.bs.dropdown", (e) => {
        // console.log("hide", e);
        // const dropdownTrap = dropdownFocusTraps.get(dropdown);
        // if (dropdownTrap && dropdownTrap.isActive) {
        //   dropdownTrap.deactivate();
        // }
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
    const dropdownToggles = navbar?.querySelectorAll(
      "a.dropdown-toggle, a.no-dropdown-toggle",
    );

    // Toggle dropdown functionality based on screen size
    dropdownToggles?.forEach((toggle) => {
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
    console.log("shown");
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
