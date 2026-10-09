/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/calculator.js"
/*!***********************************!*\
  !*** ./src/modules/calculator.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initCalculator)
/* harmony export */ });

function initCalculator() {
    const typeSelect = document.querySelector('#calc-type');
    const materialSelect = document.querySelector('#calc-type-material');
    const areaInput = document.querySelector('#calc-input');
    const totalInput = document.querySelector('#calc-total');

    if (!typeSelect || !materialSelect || !areaInput || !totalInput) {
        return;
    }

    function calculateTotal() {
        const typeValue = Number(typeSelect.value);
        const materialValue = Number(materialSelect.value);
        const areaValue = Number(areaInput.value);

        const isTypeSelected =
            typeSelect.value !== '' &&
            Number.isFinite(typeValue) &&
            typeValue > 0;

        const isMaterialSelected =
            materialSelect.value !== '' &&
            Number.isFinite(materialValue) &&
            materialValue > 0;

        const isAreaValid =
            areaInput.value.trim() !== '' &&
            Number.isFinite(areaValue) &&
            areaValue > 0;

        if (!isTypeSelected || !isMaterialSelected || !isAreaValid) {
            totalInput.value = '';
            return;
        }

        const total = areaValue * typeValue * materialValue;

        totalInput.value = String(Number(total.toFixed(2)));
    }

    areaInput.addEventListener('input', () => {
        areaInput.value = areaInput.value.replace(/\D/g, '');
        calculateTotal();
    });

    typeSelect.addEventListener('change', calculateTotal);
    materialSelect.addEventListener('change', calculateTotal);

    
    document.addEventListener('submit', (event) => {
        const isTypeSelected =
            typeSelect.value !== '' &&
            Number(typeSelect.value) > 0;

        const isMaterialSelected =
            materialSelect.value !== '' &&
            Number(materialSelect.value) > 0;

        const isAreaValid =
            areaInput.value.trim() !== '' &&
            Number(areaInput.value) > 0;

        if (!isTypeSelected || !isMaterialSelected || !isAreaValid) {
            event.preventDefault();

            if (!isTypeSelected) {
                typeSelect.setCustomValidity(
                    'Выберите тип балкона или лоджии.'
                );
                typeSelect.reportValidity();
                typeSelect.setCustomValidity('');
            } else if (!isMaterialSelected) {
                materialSelect.setCustomValidity(
                    'Выберите тип остекления.'
                );
                materialSelect.reportValidity();
                materialSelect.setCustomValidity('');
            } else {
                areaInput.setCustomValidity(
                    'Введите площадь балкона цифрами.'
                );
                areaInput.reportValidity();
                areaInput.setCustomValidity('');
            }

            return;
        }

        calculateTotal();
    }, true);

    calculateTotal();
}


/***/ },

/***/ "./src/modules/certificate.js"
/*!************************************!*\
  !*** ./src/modules/certificate.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initCertificate)
/* harmony export */ });

function initCertificate() {
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

/***/ },

/***/ "./src/modules/forms.js"
/*!******************************!*\
  !*** ./src/modules/forms.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initForms)
/* harmony export */ });
function initForms() {
    const forms = document.querySelectorAll(
        'form[name="action-form"], form[name="action-form2"]'
    );

    if (!forms.length) {
        return;
    }

    forms.forEach((form) => {
        const nameInput = form.querySelector('input[name="fio"]');
        const phoneInput = form.querySelector('input[name="phone"]');

        if (!nameInput || !phoneInput) {
            return;
        }

        nameInput.addEventListener('input', () => {
            nameInput.value = nameInput.value.replace(
                /[^a-zA-Zа-яА-ЯёЁ\s]/g,
                ''
            );
        });

        phoneInput.addEventListener('input', () => {
            let value = phoneInput.value;

            value = value.replace(/[^\d+]/g, '');

            if (value.includes('+')) {
                value = `+${value.replace(/\+/g, '')}`;
            }

            const digits = value.replace(/\D/g, '');

            phoneInput.value = value.startsWith('+')
                ? `+${digits.slice(0, 16)}`
                : digits.slice(0, 16);
        });

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = nameInput.value.trim();
            const phone = phoneInput.value.trim();

            const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
            const phonePattern = /^\+?\d{1,16}$/;

            if (!name || !phone) {
                showFormError(form, 'Заполните все поля.');
                return;
            }

            if (!namePattern.test(name)) {
                showFormError(
                    form,
                    'Имя может содержать только русские и латинские буквы.'
                );
                return;
            }

            if (!phonePattern.test(phone)) {
                showFormError(
                    form,
                    'Телефон должен содержать знак + и не более 16 цифр.'
                );
                return;
            }


            const formData = {
                fio: name,
                phone: phone,
                page: form.querySelector('input[name="page"]')?.value || ''
            };

            const calculatorTotal = document.querySelector('#calc-total');

            if (calculatorTotal) {
                formData['calc-total'] = calculatorTotal.value;
            }

            const subjectInput = form.querySelector(
                'input[name="subject"]'
            );

            if (subjectInput) {
                formData.subject = subjectInput.value;
            }

            try {
                const response = await fetch(
                    'https://jsonplaceholder.typicode.com/posts',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    }
                );

                if (!response.ok) {
                    throw new Error('Request failed');
                }

                showFormSuccess(
                    form,
                    'Заявка успешно отправлена!'
                );

                form.reset();
            } catch {
                showFormError(
                    form,
                    'Не удалось отправить заявку. Попробуйте ещё раз.'
                );
            }
        });
    });
}

function showFormError(form, message) {
    let messageElement = form.querySelector('.form-message');

    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'form-message';
        form.append(messageElement);
    }

    messageElement.textContent = message;
    messageElement.classList.remove('form-message--success');
    messageElement.classList.add('form-message--error');
}

function showFormSuccess(form, message) {
    let messageElement = form.querySelector('.form-message');

    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'form-message';
        form.append(messageElement);
    }

    messageElement.textContent = message;
    messageElement.classList.remove('form-message--error');
    messageElement.classList.add('form-message--success');
}

/***/ },

/***/ "./src/modules/modal.js"
/*!******************************!*\
  !*** ./src/modules/modal.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initModal)
/* harmony export */ });
function initModal() {
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

/***/ },

/***/ "./src/modules/servicesSlider.js"
/*!***************************************!*\
  !*** ./src/modules/servicesSlider.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initServicesSlider)
/* harmony export */ });

function initServicesSlider() {
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

/***/ },

/***/ "./src/modules/slider.js"
/*!*******************************!*\
  !*** ./src/modules/slider.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initSlider)
/* harmony export */ });
function initSlider() {
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

/***/ },

/***/ "./src/modules/smoothScroll.js"
/*!*************************************!*\
  !*** ./src/modules/smoothScroll.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initSmoothScroll)
/* harmony export */ });
function initSmoothScroll() {
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

/***/ },

/***/ "./src/modules/timer.js"
/*!******************************!*\
  !*** ./src/modules/timer.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initTimer)
/* harmony export */ });
function initTimer() {
    const countdowns = document.querySelectorAll('.countdown');

    if (!countdowns.length) {
        return;
    }

    countdowns.forEach((countdown) => {
        if (countdown.dataset.timerInitialized === 'true') {
            return;
        }

        countdown.dataset.timerInitialized = 'true';

        const daysElement = countdown.querySelector('.count_1 span');
        const hoursElement = countdown.querySelector('.count_2 span');
        const minutesElement = countdown.querySelector('.count_3 span');
        const secondsElement = countdown.querySelector('.count_4 span');

        if (
            !daysElement ||
            !hoursElement ||
            !minutesElement ||
            !secondsElement
        ) {
            return;
        }

        const days = Number(countdown.dataset.days);

        if (!Number.isFinite(days) || days < 0) {
            return;
        }

        let remainingTime = days * 24 * 60 * 60;

        function formatTime(value) {
            return String(value).padStart(2, '0');
        }

        function updateCountdown() {
            const currentDays = Math.floor(
                remainingTime / (24 * 60 * 60)
            );

            const currentHours = Math.floor(
                (remainingTime % (24 * 60 * 60)) / (60 * 60)
            );

            const currentMinutes = Math.floor(
                (remainingTime % (60 * 60)) / 60
            );

            const currentSeconds = remainingTime % 60;

            daysElement.textContent = formatTime(currentDays);
            hoursElement.textContent = formatTime(currentHours);
            minutesElement.textContent = formatTime(currentMinutes);
            secondsElement.textContent = formatTime(currentSeconds);
        }

        updateCountdown();

        const timer = setInterval(() => {
            if (remainingTime <= 0) {
                clearInterval(timer);
                return;
            }

            remainingTime -= 1;
            updateCountdown();
        }, 1000);
    });
}

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modal */ "./src/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/slider */ "./src/modules/slider.js");
/* harmony import */ var _modules_servicesSlider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/servicesSlider */ "./src/modules/servicesSlider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/timer */ "./src/modules/timer.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./src/modules/forms.js");
/* harmony import */ var _modules_certificate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/certificate */ "./src/modules/certificate.js");
/* harmony import */ var _modules_smoothScroll__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/smoothScroll */ "./src/modules/smoothScroll.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/calculator */ "./src/modules/calculator.js");










(0,_modules_modal__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_modules_slider__WEBPACK_IMPORTED_MODULE_1__["default"])();
(0,_modules_servicesSlider__WEBPACK_IMPORTED_MODULE_2__["default"])();
(0,_modules_timer__WEBPACK_IMPORTED_MODULE_3__["default"])();
(0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])();
(0,_modules_certificate__WEBPACK_IMPORTED_MODULE_5__["default"])();
(0,_modules_smoothScroll__WEBPACK_IMPORTED_MODULE_6__["default"])();
(0,_modules_calculator__WEBPACK_IMPORTED_MODULE_7__["default"])();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map