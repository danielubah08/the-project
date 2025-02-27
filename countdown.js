function updateCountdown() {
    const now = new Date();

    // Check if a stored target date exists in localStorage
    let targetDate = localStorage.getItem("targetDate");

    if (!targetDate) {
        // Set the target date to March 6th of the current or next year
        targetDate = new Date(now.getFullYear(), 2, 6, 0, 0, 0).getTime();

        // If March 6th has already passed, set it for the next year
        if (now.getTime() > targetDate) {
            targetDate = new Date(now.getFullYear() + 1, 2, 6, 0, 0, 0).getTime();
        }

        // Save the target date in localStorage
        localStorage.setItem("targetDate", targetDate);
    } else {
        // Convert string back to number
        targetDate = parseInt(targetDate);
    }

    // Function to update the countdown display
    function updateDisplay() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance >= 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").textContent = days;
            document.getElementById("hours").textContent = hours;
            document.getElementById("minutes").textContent = minutes;
            document.getElementById("seconds").textContent = seconds;
        } else {
            clearInterval(timer); // Stop countdown when it reaches zero
            document.getElementById("days").textContent = "0";
            document.getElementById("hours").textContent = "0";
            document.getElementById("minutes").textContent = "0";
            document.getElementById("seconds").textContent = "0";

            // Remove stored target date so it resets for the next year
            localStorage.removeItem("targetDate");
        }
    }

    // Update the display **immediately** when the page loads
    updateDisplay();

    // Start the interval to update every second
    const timer = setInterval(updateDisplay, 1000);
}

updateCountdown();
