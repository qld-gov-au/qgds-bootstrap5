import {
  accordionToggleAll,
  accordionToggleAllButtonState,
  accordionHashLinks,
} from "./components/bs5/accordion/accordion.functions";
import { videoEmbedPlay, videoTranscriptTitle } from "./components/bs5/video/video.functions";
import { initializeNavbar } from './components/bs5/navbar/navbar.functions';
import { initBreadcrumb } from "./components/bs5/breadcrumbs/breadcrumb.functions";
import { positionQuickExit, initQuickexit } from './components/bs5/quickexit/quickexit.functions';
import { displayFeedbackForm } from "./components/bs5/footer/footer.functions";
import { toggleSearch } from './components/bs5/header/header.functions';
import { showSuggestions } from './components/bs5/searchInput/search.functions';

window.addEventListener('scroll', positionQuickExit, true);
window.addEventListener('resize', positionQuickExit, true);
window.addEventListener('click', initQuickexit, true);
window.addEventListener('keydown', initQuickexit, true);

window.addEventListener("DOMContentLoaded", () => {
  (() => {
    //Header search
    let headerSearchButton = document.querySelector('.qld__main-nav__toggle-search');

    if (headerSearchButton) {
      document.querySelector('.qld__main-nav__toggle-search').addEventListener('click', toggleSearch);
    }

    const form = document.querySelector('.site-search');
    const searchInput = form.querySelector('.qld-search-input input');

    if (searchInput) {
      let timeout;

      searchInput.addEventListener("keyup", function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          showSuggestions(this.value);
        }, 300);
      });

      searchInput.addEventListener("focus", function () {
        showSuggestions("", true);
      });

      searchInput.addEventListener("click", function () {
        if (this.value === "") {
          showSuggestions("", true);
        }
      });

      // Close suggestions when clicking outside
      document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && !document.querySelector('.suggestions').contains(event.target)) {
          document.querySelector('.suggestions').style.display = 'none';
        }
      });
    }

    //Header 
    // Get the <header> element
    var header = document.querySelector('header');
    if (header) {
      // Get the current page URL without query string parameters
      var url = window.location.origin + window.location.pathname;
      // Set the data-page-url attribute on the <header> element
      header.setAttribute('data-page-url', url);
    }
    
    // Navbar
    initializeNavbar();

    // Footer FormIO Action
    // Note: This is added here, as there is an issue with breadcrumbShorten() function.
    //       Will move this once that issue is fixed.
    const footerFormio = document.getElementById("qg-feedback-toggle");
    if (footerFormio) {
      document.getElementById("btn-footer-feedback").addEventListener("click", displayFeedbackForm);
    }

    // Breadcrumb
    initBreadcrumb();

    // Quick exit
    window.addEventListener("scroll", positionQuickExit, true);
    window.addEventListener("resize", positionQuickExit, true);
    window.addEventListener("click", initQuickexit, true);
    window.addEventListener("keydown", initQuickexit, true);
    initQuickexit();
    positionQuickExit();

    // Accordion
    let accordionToggleButton = document.querySelectorAll(".accordion-toggle-btn");

    accordionToggleButton.forEach(function (toggleButton) {
      toggleButton.addEventListener("click", accordionToggleAll);

      let accordionButtons = toggleButton.closest(".accordion-group").querySelectorAll(".accordion-button");

      accordionButtons.forEach(function (button) {
        button.addEventListener("click", accordionToggleAllButtonState);
      });
    });

    let inPageLinks = document.querySelectorAll('a[href^="#"]');

    accordionHashLinks();
    window.onhashchange = accordionHashLinks;
    inPageLinks.forEach(function (link) {
      link.addEventListener("click", accordionHashLinks);
    });

    // Video
    let videoThumbnails = document.querySelectorAll(".video-thumbnail");

    videoThumbnails.forEach(function (thumbnail) {
      thumbnail.addEventListener("click", videoEmbedPlay);
    });

    let videoTranscripts = document.querySelectorAll(".video .accordion .accordion-button");

    videoTranscripts.forEach(function (transcript) {
      transcript.addEventListener("click", videoTranscriptTitle);
    });
  })();
});
