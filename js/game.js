// game.js – Main Entry and Core Loop

import { startOpeningScene } from './scenes.js';
import { log } from './ui.js';
import { getStats, getPlayerName } from './player.js';

window.onload = function () {
  document.getElementById("current-location").innerText = "Spire Theta-19 - Black Zone";

  const stats = getStats();
  const name = getPlayerName();

  const statsList = document.getElementById("stats-list");
  for (let stat in stats) {
    const li = document.createElement("li");
    li.textContent = `${stat}: ${stats[stat]}`;
    statsList.appendChild(li);
  }

  log(`Operative ${name}, status unknown. Beginning log...`);
  startOpeningScene();
};
