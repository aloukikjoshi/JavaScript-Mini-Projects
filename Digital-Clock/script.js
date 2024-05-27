function updateClock() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;

    // Dynamic theme based on time of day
    const container = document.querySelector('.container');
    if (hours >= 6 && hours < 18) {
        container.style.background = "linear-gradient(135deg, #87ceeb, #f8b500)";
    } else {
        container.style.background = "linear-gradient(135deg, #2c3e50, #4ca1af)";
    }
}

setInterval(updateClock, 1000);
updateClock();  // Initial call to set the clock immediately
