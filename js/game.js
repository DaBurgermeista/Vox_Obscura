// game.js – Entry Point

import { startOpeningScene } from './scenes.js';
import { log } from './ui.js';
import { getStats, getName } from './player.js';

window.onload = function () {
  const name = getName();
  const stats = getStats();

  document.getElementById("current-location").innerText = "Spire Theta-19 - Black Zone";
  const statsList = document.getElementById("stats-list");

  for (let stat in stats) {
    const li = document.createElement("li");
    li.textContent = `${stat}: ${stats[stat]}`;
    statsList.appendChild(li);
  }

  log(`Operative ${name}, status unknown. Beginning log...`, 15, startOpeningScene);
};
