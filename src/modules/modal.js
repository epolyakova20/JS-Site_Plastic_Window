export default function initModal() {
    const overlay = document.querySelector('.overlay');

    const headerModal = document.querySelector('.header-modal');
    const headerModalClose = document.querySelector('.header-modal__close');

    const servicesModal = document.querySelector('.services-modal');
    const servicesModalClose = document.querySelector('.services-modal__close');

    const callbackButtons = document.querySelectorAll(
        '.fancyboxModal[href="#callback"], .fancyboxModal[href="#order"]'
    );

    const servicesButtons = document.querySelectorAll(
        '.fancyboxModal[href="#application"]'
    );

    if (!overlay) {
        return;
    }

    function openHeaderModal(event) {
        event.preventDefault();

        if (!headerModal) {
            return;
        }

        headerModal.classList.add('header-modal--opened');
        overlay.classList.add('overlay--opened');
    }

    function closeHeaderModal() {
        if (!headerModal) {
            return;
        }

        headerModal.classList.remove('header-modal--opened');
        overlay.classList.remove('overlay--opened');
    }

    function openServicesModal(event) {
        event.preventDefault();

        if (!servicesModal) {
            return;
        }

        const button = event.currentTarget;
        const subject = button.dataset.subject;
        const subjectInput = servicesModal.querySelector(
            'input[name="subject"]'
        );

        if (subjectInput && subject) {
            subjectInput.value = subject;
        }

        servicesModal.classList.add('services-modal--opened');
        overlay.classList.add('overlay--opened');
    }

    function closeServicesModal() {
        if (!servicesModal) {
            return;
        }

        servicesModal.classList.remove('services-modal--opened');
        overlay.classList.remove('overlay--opened');
    }

    callbackButtons.forEach((button) => {
        button.addEventListener('click', openHeaderModal);
    });

    servicesButtons.forEach((button) => {
        button.addEventListener('click', openServicesModal);
    });

    if (headerModalClose) {
        headerModalClose.addEventListener('click', closeHeaderModal);
    }

    if (servicesModalClose) {
        servicesModalClose.addEventListener('click', closeServicesModal);
    }
}