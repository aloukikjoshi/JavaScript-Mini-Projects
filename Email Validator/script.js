function validateEmail() {
    const emailInput = document.getElementById("emailInput").value;
    const result = document.getElementById("result");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(emailInput)) {
        result.textContent = "Valid email address!";
        result.style.color = "green";
    } else {

        result.textContent = "Invalid email address!";
        result.style.color = "red";
    }
}
