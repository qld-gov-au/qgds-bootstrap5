import { createFocusTrap } from "../../../js/utils.js";
import { breakpoints } from "../../../js/constants.js";
import { getFocusableElements } from "../../../js/utils.js";

const getIsMobile = () => window.innerWidth < breakpoints.lg;

export function initializeNavbar() {
  const navbar = document.getElementById("main-nav");
  const overlay = document.getElementById("overlay");
  const burgerBtn = document.getElementById("burgerBtn");
  const burgerCloseBtn = document.getElementById("burgerCloseBtn");

  /** @type {HTMLElement[]} */
  let inertTargets = [];

  // Focus trap instances (created on-demand)
  let mobileFocusTrap = null;
  const dropdownFocusTraps = new Map();

  function closeNavbar() {
    // Do not call static method bootstrap.Collapse.getInstance(navbar).hide()
    // because storybook has a problem with referencing global bootstrap object in production build.
    // Instead simulate the close button click - same thing.
    // Do not put side effects of closing menu here (eg clearing menu focus trap), instead use "hidden.bs.collapse" or "hide.bs.collapse" event handlers declared below.
    // Need to check if menu is actually set to show, otherwise click will open instead.
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

      // Add spacebar click for <a> tags, <buttons> already have this.
      if (toggle?.tagName === "A") {
        toggle.addEventListener("keydown", (/** @type KeyboardEvent*/ e) => {
          if (e.key === " ") {
            toggle.click();
          }
        });
      }

      // For keyboard users, if the menu has been opened, move focus to the first item within.
      // Do not create a focus trap.
      toggle.addEventListener("click", (/** @type {PointerEvent} */ e) => {
        // e.detail is the number of mouse clicks, so keyboard click === 0;
        // See https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
        const shouldMoveFocusToMenuItem =
          !getIsMobile() && // not mobile
          !navbar.classList.includes("vertical") && // not vertical configuration
          e.detail === 0 && // only kayboard triggered
          Array.from(e.target.classList).includes("show"); // and only if menu has been opened

        if (shouldMoveFocusToMenuItem) {
          const dropdownItems = getFocusableElements(dropdown);
          if (dropdownItems) dropdownItems[0].focus();
        }
      });

      // There are two separate toggle elements for desktop and mobile. Bootstrap only keeps one registered for these events,
      // which is the mobile button, hidden on desktop. Therefore, we need to handle any `a.dropdown-toggle` updates manually. The event is caught on the
      // mobile toggle, so traverse back up find the desktop toggle.
      toggle.addEventListener("hidden.bs.dropdown", (e) => {
        const _toggle = parentItem.querySelector(
          'a[data-bs-toggle="dropdown"]',
        );
        _toggle?.classList.remove("show");
        if (dropdown?.contains(document.activeElement && !getIsMobile())) {
          _toggle?.focus();
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
    const isMobile = getIsMobile();
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
    inertTargets.forEach((target) => {
      target.inert = false;
    });
    // Deactivate and destroy mobile focus trap
    if (mobileFocusTrap) {
      mobileFocusTrap.deactivate();
      mobileFocusTrap = null;
    }
  });

  //  All associated side effects of navbar opening belong here.
  navbar?.addEventListener("shown.bs.collapse", () => {
    if (getIsMobile) {
      // Check if navbar is opening
      setTimeout(() => {
        if (navbar?.classList.contains("show")) {
          // set all siblings to inert
          inertTargets = Array.from(navbar.parentElement.children).filter(
            (child) => child !== navbar,
          );
          inertTargets.forEach((target) => {
            target.inert = true;
          });

          const trap = createMobileFocusTrap();
          trap.activate();
        }
      }, 0);
    }
  });
}
