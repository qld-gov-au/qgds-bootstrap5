export function backToTop() {
  // Get the Back To Top object:
  // The offset is the number of pixels after which the button is displayed
  // The dynamic attribute is used to determine if the buttons CSS uses Relitive or Fixed positioning

  let mybutton = document.getElementById("backToTop");
  let btnIsDynamic = mybutton.getAttribute("data-dynamic");
    
  mybutton.addEventListener("click", goToTop);

  if (btnIsDynamic == "true") {
    mybutton.classList.remove("show");
    window.onscroll = function() {scrollFunction()};
  }

  function scrollFunction() {
    if (btnIsDynamic == "true") { 
      let offset = mybutton.getAttribute("data-offset");
      if (document.body.scrollTop > offset || document.documentElement.scrollTop > offset) {
        mybutton.classList.add("show");
        mybutton.setAttribute("aria-hidden", false);
      } else {
        mybutton.classList.remove("show");
        mybutton.setAttribute("aria-hidden", true);
      }
    }
  }

  function goToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    event.preventDefault();
  }
}
