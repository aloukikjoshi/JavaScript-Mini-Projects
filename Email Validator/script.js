function validateEmail() {
    const emailInput = document.getElementById("emailInput").value;
    const result = document.getElementById("result");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(emailInput)) {
        result.textContent = "Valid email address!";
        result.style.color = "green";
    } else {
        result.textContent = "Invalid email address!";
        result.style.color = "red";
    }
}
