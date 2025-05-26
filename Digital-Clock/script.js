let is24Hour = true;

function updateClock() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");
  const periodElement = document.getElementById("period");

  if (is24Hour) {
    let hours24 = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");
    periodElement.textContent = "";

    hoursElement.textContent = hours24;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
  } else {
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    hoursElement.textContent = hours.toString().padStart(2, "0");
    minutesElement.textContent = minutes.toString().padStart(2, "0");
    secondsElement.textContent = seconds.toString().padStart(2, "0");
    periodElement.textContent = period;
  }

  // Dynamic theme based on time of day
  const container = document.querySelector(".container");
  if (hours >= 6 && hours < 18) {
    container.style.background = "linear-gradient(135deg, #87ceeb, #f8b500)";
  } else {
    container.style.background = "linear-gradient(135deg, #2c3e50, #4ca1af)";
  }
}

function toggleFormat() {
  is24Hour = !is24Hour;
  const button = document.querySelector("button");
  button.textContent = is24Hour
    ? "Switch to 12-Hour Format"
    : "Switch to 24-Hour Format";
}

document.querySelector("button").addEventListener("click", toggleFormat);

setInterval(updateClock, 1000);
updateClock(); // Initial call to set the clock immediately
