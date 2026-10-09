export default function initSlider() {
    const slider = document.querySelector('.benefits-wrap');
    const slides = document.querySelectorAll('.benefits__item');
    const nextButton = document.querySelector('.benefits__arrow--right');
    const prevButton = document.querySelector('.benefits__arrow--left');

    if (!slider || !slides.length || !nextButton || !prevButton) {
        return;
    }

    let currentSlide = 0;

    function getSlidesCount() {
        return window.innerWidth >= 576 ? 3 : 1;
    }

    function updateSlider() {
        const slidesCount = getSlidesCount();
        const maxSlide = slides.length - slidesCount;

        if (currentSlide > maxSlide) {
            currentSlide = maxSlide;
        }

        if (currentSlide < 0) {
            currentSlide = 0;
        }

        const slideStep = 100 / slides.length;

        slider.style.transform = `translateX(-${currentSlide * slideStep}%)`;
    }

    nextButton.addEventListener('click', () => {
        const slidesCount = getSlidesCount();
        const maxSlide = slides.length - slidesCount;

        if (currentSlide < maxSlide) {
            currentSlide += 1;
            updateSlider();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide -= 1;
            updateSlider();
        }
    });

    window.addEventListener('resize', updateSlider);

    updateSlider();
}