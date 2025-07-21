document.getElementById("run-button").addEventListener("click", () => {
    const code = document.getElementById("code-input").value;
    const logDiv = document.getElementById("log");
    const vizDiv = document.getElementById("visualization");
  
    // Clear previous runs
    logDiv.innerHTML = "";
    vizDiv.innerHTML = "";
  
    // Override console.log to show logs
    const originalLog = console.log;
    console.log = (...args) => {
      const logItem = document.createElement("div");
      logItem.textContent = args.join(" ");
      logDiv.appendChild(logItem);
      logDiv.scrollTop = logDiv.scrollHeight;
      originalLog(...args);
    };
  
    // Simulate Promises Visualization
    const trackedPromises = [];
  
    function trackPromise(promise, id) {
      const box = document.createElement("div");
      box.className = "promise-box";
      box.textContent = `Promise ${id}: Pending`;
      vizDiv.appendChild(box);
  
      promise
        .then((res) => {
          box.classList.add("promise-fulfilled");
          box.textContent = `Promise ${id}: Fulfilled ✔`;
          return res;
        })
        .catch((err) => {
          box.classList.add("promise-rejected");
          box.textContent = `Promise ${id}: Rejected ✘`;
        });
    }
  
    // Inject custom tracking function
    window.visualize = (fn) => {
      let counter = 1;
      const customPromise = (...args) => {
        const p = new Promise(...args);
        trackPromise(p, counter++);
        return p;
      };
      fn(customPromise);
    };
  
    try {
      // Users will use "visualize" function
      eval(code);
    } catch (err) {
      const errLog = document.createElement("div");
      errLog.style.color = "red";
      errLog.textContent = `Error: ${err}`;
      logDiv.appendChild(errLog);
    }
  
    console.log = originalLog; // restore
  });
  