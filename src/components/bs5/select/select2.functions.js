// Making select2 fields accessible by screen readers
export function handleScreenReaderAccessibility () {
    var selects = document.getElementsByClassName("select2-search__field");
    const arr = Array.from(selects);
    arr.forEach(function(item) {
        item.addEventListener("keyup", focus);
        item.addEventListener("keydown", focus);
        item.addEventListener("focus", focus);
        item.setAttribute("role", "combobox");
        item.setAttribute("tabindex", "0");
    });
    function focus(event) {
        var keyCode = event.keyCode;
        if (keyCode === 38 || keyCode === 40) {
            document.getElementsByClassName("select2-results__option--highlighted")[0].focus();
        }
        if (document.getElementsByClassName("select2-results__options").length > 0) {
            var items = document.getElementsByClassName("select2-results__option");
            const itemsArray = Array.from(items);
            itemsArray.forEach(function(item) {
                item.setAttribute("tabindex", "-1");
            });
        }
        var choices = document.getElementsByClassName("select2-selection__choice");
        const choicesArray = Array.from(choices);
        choicesArray.forEach(function(item) {
            item.setAttribute("tabindex", "-1");
        });
    }
}
