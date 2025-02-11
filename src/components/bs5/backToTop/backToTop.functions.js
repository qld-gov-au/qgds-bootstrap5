export function backToTop() {
  let backToTop = document.getElementById("backToTop");
  let minHightValue = backToTop.dataset.minPageHeight;
  let minScreenHight = parseInt(window.innerHeight * minHightValue);
  let backToTopPos = backToTop.getBoundingClientRect().top;

  let currentScreenHight = window.innerHeight;
  
  console.log(backToTopPos + ' <= ' + minScreenHight + ' currentScreenHight: ' + currentScreenHight);

  backToTop.addEventListener("click", goToTop);

  if (backToTopPos <= minScreenHight) {
    backToTop.classList.add('hide');
  } else {
    backToTop.classList.remove('hide');
  }  

  function goToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    event.preventDefault();
  }
}