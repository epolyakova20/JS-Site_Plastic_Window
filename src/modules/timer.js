export default function initTimer() {
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