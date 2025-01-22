export function backToTop() {

  let mybutton = document.getElementById("backToTop");
  mybutton.addEventListener("click", goToTop);

  function goToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    event.preventDefault();
  }
}
