import { createFocusTrap } from "../../../js/utils.js";
import { breakpoints } from "../../../js/constants.js";

const getIsMobile = () => window.innerWidth < breakpoints.lg;

export function initializeNavbar() {
  const navbar = document.getElementById("main-nav");
  const overlay = document.getElementById("overlay");
  const burgerBtn = document.getElementById("burgerBtn");
  const burgerCloseBtn = document.getElementById("burgerCloseBtn");
  let wasMobile = getIsMobile();

  /** @type {HTMLElement[]} */
  let inertTargets = [];

  // Focus trap instances (created on-demand)
  let mobileFocusTrap = null;

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
            e.preventDefault();
            toggle.click();
          }
        });
      }

      // There are two separate toggle elements for desktop and mobile. Bootstrap only keeps one registered for these events,
      // which is the mobile button, hidden on desktop. Therefore, we need to handle any `a.dropdown-toggle` updates manually. The event is caught on the
      // mobile toggle, so traverse back up find the desktop toggle.
      toggle.addEventListener("hidden.bs.dropdown", (e) => {
        const _toggle = parentItem.querySelector(
          'a[data-bs-toggle="dropdown"]',
        );
        _toggle?.classList.remove("show");
        if (
          dropdown?.contains(document.activeElement) &&
          !(getIsMobile() || navbar.classList.contains("vertical"))
        ) {
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

  const resetNavbarState = (isMobile) => {
    const dropdownToggles = navbar?.querySelectorAll(
      "a.dropdown-toggle, a.no-dropdown-toggle",
    );

    if (isMobile) {
      // disable navlinks as toggles
      dropdownToggles?.forEach((toggle) => {
        // Skip toggle items with hasNoLink class
        if (toggle.classList.contains("hasNoLink")) {
          return;
        }
        toggle.classList.replace("dropdown-toggle", "no-dropdown-toggle");
        toggle.removeAttribute("data-bs-toggle");
      });

      // Expand any dropdowns set to expand on mobile
      navbar
        ?.querySelectorAll('[data-is-expanded-on-mobile="true"]')
        .forEach((item) => {
          item
            .querySelectorAll(".dropdown-toggle, .dropdown-menu")
            .forEach((item) => {
              item.classList.add("show");
            });
        });
    } else {
      // reenable navlinks as toggle
      dropdownToggles?.forEach((toggle) => {
        toggle.classList.replace("no-dropdown-toggle", "dropdown-toggle");
        toggle.setAttribute("data-bs-toggle", "dropdown");
      });

      // Collapse any dropdowns set to expand on mobile
      navbar
        ?.querySelectorAll('[data-is-expanded-on-mobile="true"]')
        .forEach((item) => {
          item
            .querySelectorAll(".dropdown-toggle, .dropdown-menu")
            .forEach((item) => {
              item.classList.remove("show");
            });
        });

      // close the navbar
      closeNavbar();
    }
  };

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

  window.addEventListener("resize", () => {
    const isMobile = getIsMobile();
    if (wasMobile !== isMobile) {
      wasMobile = isMobile;
      resetNavbarState(isMobile);
    }
  });

  resetNavbarState(wasMobile);
}
