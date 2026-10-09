
export default function initServicesSlider() {
    const servicesSection = document.querySelector('#services');

    if (!servicesSection) {
        return;
    }

    const servicesRow = servicesSection.querySelector('.row');

    if (!servicesRow) {
        return;
    }

    let slider = servicesRow.querySelector('.services-slider');
    let track = servicesRow.querySelector('.services-wrap');

    if (!slider || !track) {
        const cards = Array.from(servicesRow.children).filter(
            (element) => element.querySelector('.service-block')
        );

        if (!cards.length) {
            return;
        }

        slider = document.createElement('div');
        slider.className = 'services-slider';

        track = document.createElement('div');
        track.className = 'services-wrap';

        servicesRow.insertBefore(slider, cards[0]);
        slider.append(track);

        cards.forEach((card) => {
            card.classList.add('services__item');
            track.append(card);
        });
    }

    const slides = Array.from(track.children);
    const nextButton = servicesRow.querySelector('.services__arrow--right');
    const prevButton = servicesRow.querySelector('.services__arrow--left');

    if (!slides.length || !nextButton || !prevButton) {
        return;
    }

    let currentSlide = 0;

    function getSlidesCount() {
        return window.innerWidth >= 576 ? 2 : 1;
    }

    function updateSlider() {
        const visibleSlides = getSlidesCount();
        const maxSlide = Math.max(0, slides.length - visibleSlides);

        currentSlide = Math.min(currentSlide, maxSlide);
        currentSlide = Math.max(currentSlide, 0);

        const slideWidth = 100 / slides.length;

        track.style.transform =
            `translateX(-${currentSlide * slideWidth}%)`;
    }

    nextButton.addEventListener('click', () => {
        const maxSlide = Math.max(0, slides.length - getSlidesCount());

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