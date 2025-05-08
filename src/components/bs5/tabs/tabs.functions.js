export function initTabsScroll() {
    const tabObject = document.querySelectorAll('.qld-tabs');

    function updateTabs(tab) {
        const tabs = tab.querySelector('.nav-tabs');
        const scrollLeftBtn = tab.querySelector('.scroll-left');
        const scrollRightBtn = tab.querySelector('.scroll-right');
        const tabsAreaWidth = tabs.scrollWidth;

        if (tabs) {
            // Show or hide scroll buttons based on initial state
            const updateButtonVisibility = () => {
                if (tabs.scrollLeft === 0) {
                    scrollLeftBtn.classList.remove('show');
                } else {
                    scrollLeftBtn.classList.add('show');
                }

                if (tabs.scrollLeft + tabs.clientWidth >= tabsAreaWidth) {
                    scrollRightBtn.classList.remove('show');
                } else {
                    scrollRightBtn.classList.add('show');
                }
            };

            // Add scroll event listener to dynamically update button visibility
            tabs.addEventListener('scroll', updateButtonVisibility);

            // Initial visibility update
            updateButtonVisibility();

            // Scroll right button click event
            scrollRightBtn.addEventListener('click', () => {
                tabs.scrollBy({
                    top: 0,
                    left: 200,
                    behavior: 'smooth'
                });
            });

            // Scroll left button click event
            scrollLeftBtn.addEventListener('click', () => {
                tabs.scrollBy({
                    top: 0,
                    left: -200,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Initial setup for all tabs
    tabObject.forEach((tab) => {
        updateTabs(tab);
    });

    // Update tabs on window resize
    window.addEventListener('resize', () => {
        tabObject.forEach((tab) => {
            updateTabs(tab);
        });
    });
}