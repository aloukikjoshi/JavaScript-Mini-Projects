const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}\\|;':\",./<>?";

const lengthEl = document.getElementById("length");
const lowercaseEl = document.getElementById("lowercase");
const uppercaseEl = document.getElementById("uppercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const passwordEl = document.getElementById("password");
const strengthEl = document.getElementById("strength");
const themeToggleBtn = document.getElementById("themeToggle");

generateBtn.addEventListener("click", function () {
    const length = parseInt(lengthEl.value);
    let characters = "";
    let password = "";

    if (lowercaseEl.checked) characters += lowercaseLetters;
    if (uppercaseEl.checked) characters += uppercaseLetters;
    if (numbersEl.checked) characters += numbers;
    if (symbolsEl.checked) characters += symbols;

    if (characters === "") {
        alert("Please select at least one character set.");
        return;
    }

    // Ensure password contains at least one character from each selected set
    let requiredCharacters = "";
    if (lowercaseEl.checked) requiredCharacters += lowercaseLetters.charAt(Math.floor(Math.random() * lowercaseLetters.length));
    if (uppercaseEl.checked) requiredCharacters += uppercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length));
    if (numbersEl.checked) requiredCharacters += numbers.charAt(Math.floor(Math.random() * numbers.length));
    if (symbolsEl.checked) requiredCharacters += symbols.charAt(Math.floor(Math.random() * symbols.length));

    for (let i = requiredCharacters.length; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    password = requiredCharacters + password;
    password = shuffle(password);
    passwordEl.value = password;
    updateStrength(password);
});

copyBtn.addEventListener("click", function () {
    passwordEl.select();
    document.execCommand("copy");
    alert("Password copied to clipboard!");
});

function shuffle(string) {
    const array = string.split("");
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
}

function updateStrength(password) {
    const strength = getPasswordStrength(password);
    strengthEl.innerText = `Strength: ${strength}`;
}

function getPasswordStrength(password) {
    let strength = "Weak";
    if (password.length >= 8) strength = "Medium";
    if (password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        strength = "Strong";
    }
    return strength;
}

themeToggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});
