
export default function initCalculator() {
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
