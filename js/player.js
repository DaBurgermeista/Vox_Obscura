// player.js – Player Data Handling

export function getStats() {
  return JSON.parse(localStorage.getItem("stats")) || {};
}

export function getName() {
  return localStorage.getItem("name") || "Unnamed Operative";
}

export function addToInventory(itemName) {
  let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  inventory.push(itemName);
  localStorage.setItem("inventory", JSON.stringify(inventory));
  renderInventory();
}

export function renderInventory() {
  const inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  const container = document.getElementById("inventory-list");
  if (!container) return;

  container.innerHTML = "";
  inventory.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    container.appendChild(li);
  });
}
