// player.js – Player Stat and Inventory Management

export function getStats() {
  return JSON.parse(localStorage.getItem("stats")) || {};
}

export function getPlayerName() {
  return localStorage.getItem("name") || "Unnamed Operative";
}

export function addToInventory(itemName) {
  let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  inventory.push(itemName);
  localStorage.setItem("inventory", JSON.stringify(inventory));
}
