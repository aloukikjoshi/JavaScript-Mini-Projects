# Quotes Quiz App

A fun and interactive **JavaScript quiz app** where users guess the missing word from famous quotes. The app automatically loads new questions, highlights correct and incorrect answers, and tracks your score.  

---

## 📌 Features

- Fetches random quotes from a public API ([DummyJSON Quotes API](https://dummyjson.com/quotes/random)).
- Replaces a random word in each quote with a blank (`____`) for the user to guess.
- Provides **four multiple-choice options** for each missing word.
- Highlights:
  - ✅ Correct answer in **green**.
  - ❌ Wrong answer in **red**, while the correct answer shows in green.
- Auto-advances to the next question after selecting an answer.
- Tracks **score** and **question count**.
- Displays final score after all questions are answered.
- Countdown timer for the entire quiz.
- Dark mode toggle that persists across sessions using `localStorage`.
- Fully responsive and easy-to-read interface.

---


## 🛠️ Technologies Used

- **HTML5** – Structure of the app.
- **CSS3** – Styling and responsive design.
- **JavaScript (ES6)** – Quiz logic, API integration, timer, and dark mode.
- **Public API** – Quotes fetched dynamically from [DummyJSON Quotes API](https://dummyjson.com/quotes/random).

---

## ⚡ How It Works

1. Click **Start Quiz** to begin.
2. A **random word** from a quote is replaced with `____`.
3. Four options are displayed (including the correct word).
4. User selects an answer:
   - Correct answer → button turns **green**.
   - Wrong answer → selected button turns **red**, correct button turns **green**.
5. After **0.5 seconds**, the next question loads automatically.
6. After **10 questions**, the final score is displayed.
7. The timer counts down from **50 seconds**, and the game ends automatically if time runs out.

---


## 📂 Project Structure

```sh
Quotes-Quiz/
│
├── backend/
│   ├── package-lock.json # Locks dependency versions for consistent builds.
│   ├── package.json      # Defines project dependencies and scripts (Node.js/npm).
│   └── server.js         # The main entry point for the server/backend logic (e.g., Express.js).
│
└── frontend/
    ├── index.html        # The main entry point for the client-side application structure.
    ├── script.js         # Contains the main JavaScript logic (e.g., API calls, DOM manipulation).
    └── style.css         # Defines the visual styling for the application.
```


---

---

## ⚙️ Installation and Setup

Follow these steps to get the entire application running, as everything is managed by the single `server.js` file.

### Prerequisites

You need **Node.js** and **npm (or yarn)** installed on your system.

### 1. Installation

1.  **Clone** the repository:
    ```
    git clone https://github.com/aloukikjoshi/JavaScript-Mini-Projects.git
    cd Quotes-Quiz
    ```

2.  **Navigate** into the `backend` directory where the dependencies are defined:
    ```bash
    cd backend
    ```

3.  **Install** the necessary Node.js dependencies (defined in `package.json`):
    ```bash
    npm install
    # OR
    yarn install
    ```

---

### 2. Running the Application

1.  **Start** the application by running the `server.js` file:
    ```bash
    node server.js
    # OR (If using a start script)
    npm start
    ```

2.  **Access** the application:
    The server will automatically serve the `index.html` file. Open your web browser and navigate to the specified server address:
    ```
    http://localhost:[YOUR_PORT]
    ```
    *(The default port is usually 3000, 8080, or 5000—check `server.js` if unsure.)*

---

## 🎨 Customization

You can easily modify various aspects of the quiz to suit your preferences:

* **Number of Questions:** Change the `TOTAL_QUESTIONS` variable in `script.js`.
* **Timer Duration:** Change the `TOTAL_TIME` variable in `script.js` (per question).
* **Option Words (Quote Source):** Currently, the app fetches quotes and options from the **dummyjson.com quotes API**. You can switch this to any other quote API that provides sufficient data (quote text, author, etc.).
* **Colors:** Customize the `.correct` and `.wrong` CSS classes in `style.css` for feedback colors.
* **Auto-Advance Speed:** Modify the timeout delay in the `handleSelect()` function in `script.js` for faster or slower automatic progression to the next question after an answer is selected.

---

## 🌙 Dark Mode

The app includes a dark mode feature:

* **Toggle:** Use the **Dark Mode** button to switch between dark and light themes.

---


---

## 📄 License

This project is open-source and available under the **MIT License**. Feel free to use, modify, and share!

---

## 👤 Author

* **Name:** Kruti Bagwe
* **GitHub:** `@krutibagwe`
  
````
