function detectCharacter() {
    const characterInput = document.getElementById("characterInput");
    const result = document.getElementById("result");
    const history = document.getElementById("history");

    const character = characterInput.value;

    if (!character) {
        result.innerText = "Please enter a character.";
        return;
    }

    let characterType;

    if (isASCII(character)) {
        characterType = "an ASCII character";
    } else {
        characterType = "a Unicode character";
    }

    if (isDigit(character)) {
        characterType += " and a digit";
    } else if (isAlphabet(character)) {
        characterType += " and an alphabet";
    } else if (isWhitespace(character)) {
        characterType += " and a whitespace character";
    } else {
        characterType += " and a special character";
    }

    const resultText = `The entered character is ${characterType}.`;
    result.innerText = resultText;

    const historyItem = document.createElement("li");
    historyItem.textContent = `${character}: ${resultText}`;
    history.appendChild(historyItem);
}

function isASCII(character) {
    return character.charCodeAt(0) <= 127;
}

function isDigit(character) {
    return /\d/.test(character);
}

function isAlphabet(character) {
    return /[a-zA-Z]/.test(character);
}

function isWhitespace(character) {
    return /\s/.test(character);
}

function clearInput() {
    document.getElementById("characterInput").value = "";
    document.getElementById("result").innerText = "This is the Result";
}

function copyResult() {
    const result = document.getElementById("result").innerText;
    navigator.clipboard.writeText(result).then(() => {
        alert("Result copied to clipboard!");
    });
}
