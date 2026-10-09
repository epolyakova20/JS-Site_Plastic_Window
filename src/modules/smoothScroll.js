export default function initSmoothScroll() {
    const scrollButton = document.querySelector('.smooth-scroll');

    if (!scrollButton) {
        return;
    }

    const firstSection = document.querySelector('main > section, #header, header');

    if (!firstSection) {
        return;
    }

    function updateButtonVisibility() {
        const sectionBottom = firstSection.getBoundingClientRect().bottom;
        const isFirstSectionPassed = sectionBottom <= 0;

        scrollButton.classList.toggle(
            'smooth-scroll--visible',
            isFirstSectionPassed
        );
    }

    scrollButton.addEventListener('click', (event) => {
        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', updateButtonVisibility, {
        passive: true
    });

    window.addEventListener('resize', updateButtonVisibility);

    updateButtonVisibility();
}