export function backToTop() {
  const backToTop = document.querySelector(".back-to-top");
  
  if (backToTop) {
    backToTop.onclick = function (event) {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      event.preventDefault();
    }
  }
}
