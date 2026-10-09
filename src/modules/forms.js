export default function initForms() {
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