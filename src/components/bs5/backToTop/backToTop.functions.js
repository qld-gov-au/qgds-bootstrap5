export function backToTop() {
  var backToTop = document.getElementsByClassName("back-to-top");
  
  if (backToTop) {
    let backToTop = document.querySelector(".back-to-top");

    let parentValue = backToTop.closest(".qld__widgets");
    let minHightValue = parentValue.getAttribute("data-min-page-height");
    let minScreenHight = parseInt(window.innerHeight * minHightValue);
    let backToTopPos = backToTop.getBoundingClientRect().top;

    if (backToTopPos <= minScreenHight) {
      backToTop.classList.add("hide");
    } else {
      backToTop.classList.remove("hide");
      backToTop.onclick = function () {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        event.preventDefault();
      }
    }
  }
}
