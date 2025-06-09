// ui.js – Log Display, Typing Queue, Dividers, and Inventory Rendering

let logQueue = [];
let isTyping = false;

export function log(message, delay = 15, callback = null, styleClass = "narration") {
  logQueue.push({ message, delay, callback, styleClass });
  if (!isTyping) processLogQueue();
}

function processLogQueue() {
  if (logQueue.length === 0) {
    isTyping = false;
    return;
  }

  isTyping = true;
  const { message, delay, callback, styleClass } = logQueue.shift();
  const logOutput = document.getElementById("log-output");
  const paragraph = document.createElement("div");
  paragraph.className = `log-entry ${styleClass}`;
  logOutput.appendChild(paragraph);

  let i = 0;
  function typeChar() {
    if (i < message.length) {
      paragraph.innerHTML += message[i] === '\n' ? '<br>' : message[i];
      i++;
      setTimeout(typeChar, delay);
    } else {
      logOutput.scrollTop = logOutput.scrollHeight;
      setTimeout(() => {
        if (callback) callback();
        processLogQueue();
      }, 250);
    }
  }

  typeChar();
}

export function logDivider() {
  const logOutput = document.getElementById("log-output");
  const divider = document.createElement("div");
  divider.className = "log-divider";
  logOutput.appendChild(divider);
  logOutput.scrollTop = logOutput.scrollHeight;
}

export function renderInventory() {
  const inventoryPanel = document.getElementById("inventory-panel");
  const inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  inventoryPanel.innerHTML = "";

  inventory.forEach(item => {
    const div = document.createElement("div");
    div.className = "inventory-item";
    div.innerText = item;
    inventoryPanel.appendChild(div);
  });
}