# 🔍 JavaScript Promise Visualizer

A beginner-friendly visual tool to understand how JavaScript Promises work under the hood — complete with a clear timeline, live logs, and animations. Perfect for those new to asynchronous JS!

---

## 🧠 Why This Project?

Promises can be confusing for beginners — `.then`, `.catch`, microtasks vs macrotasks, resolution timing — it's a lot. This visualizer breaks all that down into **simple animations and logging**, helping learners _see_ what happens when a Promise is created, resolved, rejected, or chained.

---

## ✨ Features

- 🧪 Real-time execution logging of Promises
- 🎨 Timeline-style visual animation for `.then` and `.catch` chaining
- 🧵 Clear distinction between synchronous and asynchronous code
- 🔁 Reset & replay functionality to learn by doing
- 💡 Simple HTML, CSS, Javascript

---

## 🚀 How To Run

1️⃣ Clone this Repository
Open your terminal and run:

git clone <your-fork-link>
cd <repo-folder>

2️⃣ Open the Project in Your Browser
Since this project uses only HTML, CSS, and JavaScript (no backend, no frameworks), you can run it easily like this:

Steps:
Go to your project folder on your PC or Mac.

Find the index.html file.

Double-click index.html.

It will open in your default browser as a file:// URL.

That's it — the app is ready to use!

---

## ✏️ How to Use

1️⃣ Write Code
Inside the text area labeled "Write promise code here", write JavaScript code using the provided visualize() function.
Example Code:

visualize((Promise) => {
const p1 = Promise((resolve) => {
setTimeout(resolve, 2000);
});

    const p2 = Promise((_, reject) => {
        setTimeout(reject, 3000);
    });

});

2️⃣ Run Code
Click the Run button.

3️⃣ See the Output
✅ Visualization Section:
Boxes will show each Promise’s state:

Pending →

Fulfilled ✔

Rejected ✘

✅ Execution Log Section:
Any console.log() outputs from your code will appear here in real-time.

---

## 🧑‍💻 Tech Stack

HTML
CSS
Vanilla JavaScript
