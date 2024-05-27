function calculateMaturityAmount() {
    // Get input values from the form elements
    const principal = parseFloat(document.getElementById('principal').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const tenure = parseFloat(document.getElementById('tenure').value);
    const compoundingFrequency = parseInt(document.getElementById('compounding').value);
    const currency = document.getElementById('currency').value;

    // Reset error messages
    document.getElementById('principalError').innerText = '';
    document.getElementById('interestRateError').innerText = '';
    document.getElementById('tenureError').innerText = '';

    // Check if input values are valid
    let valid = true;
    if (isNaN(principal) || principal <= 0) {
        document.getElementById('principalError').innerText = "Please enter a valid positive number for Principal Amount.";
        valid = false;
    }
    if (isNaN(interestRate) || interestRate <= 0) {
        document.getElementById('interestRateError').innerText = "Please enter a valid positive number for Interest Rate.";
        valid = false;
    }
    if (isNaN(tenure) || tenure <= 0) {
        document.getElementById('tenureError').innerText = "Please enter a valid positive number for Tenure.";
        valid = false;
    }

    if (!valid) return;

    // Perform the compound interest calculation
    const n = compoundingFrequency;
    const maturityAmount = principal * Math.pow((1 + (interestRate / (n * 100))), (n * tenure));
    const interestEarned = maturityAmount - principal;

    // Display the result
    document.getElementById('result').innerText = `Maturity Amount: ${currency} ${maturityAmount.toFixed(2)}`;
    document.getElementById('breakdown').innerText = `Total Interest Earned: ${currency} ${interestEarned.toFixed(2)}`;
}

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Attach the event listeners
document.getElementById('calculateBtn').addEventListener('click', calculateMaturityAmount);
document.getElementById('themeToggle').addEventListener('click', toggleTheme);
