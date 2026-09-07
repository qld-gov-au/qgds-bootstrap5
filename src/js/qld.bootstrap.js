import {
  initAccordionToggleAll,
  initAccordionFindInPage,
  accordionHashLinks,
} from "./../components/bs5/accordion/accordion.functions";
import {
  videoEmbedPlay,
  videoTranscriptTitle,
} from "./../components/bs5/video/video.functions";
import { initializeNavbar } from "./../components/bs5/navbar/navbar.functions";
import { initBreadcrumb } from "./../components/bs5/breadcrumbs/breadcrumbs.functions";
import { initDateInput } from "../components/bs5/dateinput/dateinput.functions";
import { initQuickexit } from "./../components/bs5/quickexit/quickexit.functions";
//import { displayFeedbackForm } from "./../components/bs5/footer/footer.functions";
import { initHeader } from "./../components/bs5/header/header.functions";
import {
  showSuggestions,
  submitSearchForm,
} from "./../components/bs5/searchInput/search.functions";
import { backToTop } from "./../components/bs5/backToTop/backToTop.functions";
import { initTabsScroll } from "./../components/bs5/tabs/tabs.functions";
import { initGlobalAlerts } from "./../components/bs5/globalAlert/globalAlert.function";
import { validateSkipLinks } from "./../components/bs5/skiplinks/skipLinks.functions";
import { printPage } from "./utils";

window.addEventListener("DOMContentLoaded", () => {
  backToTop();

  initTabsScroll();

  initGlobalAlerts();

  // Header
  initHeader();

  // Navbar
  initializeNavbar();

  // Breadcrumb
  initBreadcrumb();

  // Quick exit
  initQuickexit();

  // Accordion
  initAccordionToggleAll();

  initAccordionFindInPage();

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

  let videoTranscripts = document.querySelectorAll(
    ".video .accordion .accordion-button",
  );

  videoTranscripts.forEach(function (transcript) {
    transcript.addEventListener("click", videoTranscriptTitle);
  });

  // Add btn page print functions
  printPage();

  // Date Input
  initDateInput();

  // Skip Links
  validateSkipLinks();
});
