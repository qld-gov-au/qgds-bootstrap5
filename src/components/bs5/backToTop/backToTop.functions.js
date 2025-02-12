export function backToTop() {
  let backToTop = document.getElementById("backToTop");
  let minHightValue = backToTop.dataset.minPageHeight;
  let minScreenHight = parseInt(window.innerHeight * minHightValue);
  let backToTopPos = backToTop.getBoundingClientRect().top;
  
  if (backToTopPos <= minScreenHight) {
    backToTop.classList.add('hide');
  } else {
    backToTop.classList.remove('hide');
    backToTop.addEventListener("click", function(){
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      event.preventDefault();
    });
  }  
  
}