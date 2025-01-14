export function backToTop() {
    // Get the Back To Top object:
    let mybutton = document.getElementById("backToTop");

    // When the user scrolls down 30px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
            mybutton.classList.add("show");
            mybutton.addEventListener("click", goToTop)
        } else {
            mybutton.classList.remove("show");
        }
    }

    function goToTop() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        event.preventDefault();
    }
}