const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");

// Function to fetch a random quote
async function fetchQuote() {
  try {
    // Display loading message
    quoteText.textContent = "Loading...";
    authorText.textContent = "";

    const response = await fetch("https://api.quotable.io/random");
    if (!response.ok) throw new Error("Failed to fetch the quote");

    const data = await response.json();
    quoteText.textContent = `"${data.content}"`;
    authorText.textContent = `- ${data.author || "Unknown"}`;
  } catch (error) {
    quoteText.textContent = "Oops! Unable to fetch a quote.";
    authorText.textContent = "";
    console.error(error);
  }
}

// Attach event listener to the button
newQuoteButton.addEventListener("click", fetchQuote);

// Fetch an initial quote on page load
fetchQuote();
