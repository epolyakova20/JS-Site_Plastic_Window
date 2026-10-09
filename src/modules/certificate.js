
export default function initCertificate() {
    const certificateLinks = document.querySelectorAll(
        '.sertificate-document'
    );

    if (!certificateLinks.length) {
        return;
    }

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'certificate-modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'certificate-modal';

    const modalImage = document.createElement('img');
    modalImage.className = 'certificate-modal__image';
    modalImage.alt = 'Увеличенный сертификат';

    const closeButton = document.createElement('button');
    closeButton.className = 'certificate-modal__close';
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Закрыть сертификат');
    closeButton.textContent = '×';

    modal.append(closeButton, modalImage);
    modalOverlay.append(modal);
    document.body.append(modalOverlay);

    function openModal(event) {
        event.preventDefault();

        const link = event.currentTarget;
        const image = link.querySelector('img');

        modalImage.src = link.href;
        modalImage.alt = image?.alt || 'Увеличенный сертификат';

        modalOverlay.classList.add('certificate-modal-overlay--opened');
        document.body.classList.add('certificate-modal-open');
    }

    function closeModal() {
        modalOverlay.classList.remove(
            'certificate-modal-overlay--opened'
        );
        document.body.classList.remove('certificate-modal-open');
        modalImage.removeAttribute('src');
    }

    certificateLinks.forEach((link) => {
        link.addEventListener('click', openModal);
    });

    closeButton.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (
            event.key === 'Escape' &&
            modalOverlay.classList.contains(
                'certificate-modal-overlay--opened'
            )
        ) {
            closeModal();
        }
    });
}