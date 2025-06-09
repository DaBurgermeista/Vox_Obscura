// choices.js – Interaction Definitions

import { log, logDivider } from './ui.js';
import { addToInventory } from './player.js';
import { worldState } from './world.js';

export const choices = {
  searchCorpse: {
    label: "Search the corpse",
    stat: "Agility",
    requirement: 3,
    success: () => {
      if (!worldState.flags.corpseSearched) {
        worldState.flags.corpseSearched = true;
        addToInventory("Vox-Key Fragment");
        log("You retrieve a Vox-Key Fragment from the body.", 15, logDivider);
      } else {
        log("You've already looted this corpse.", 15, logDivider);
      }
    },
    fail: () => {
      log("You pull back, scraped by twisted metal.", 15, logDivider);
      worldState.trauma += 1;
    }
  },

  accessTerminal: {
    label: "Access the terminal",
    stat: "Tech",
    requirement: 3,
    success: () => {
      if (!worldState.flags.terminalAccessed) {
        worldState.flags.terminalAccessed = true;
        log(">> [LOG #022-B: 'Purge protocol... not authorized...']", 12, logDivider, "dialogue");
      } else {
        log("The terminal screen is dark. Burned out.", 15, logDivider);
      }
    },
    fail: () => {
      log("A short burst of static. Then silence.", 15, logDivider);
    }
  },

  attemptOverride: {
    label: "Override the blast door",
    stat: "Tech",
    requirement: 4,
    success: () => {
      log("You reroute the lock’s power circuit. The blast door hisses open.", 15, logDivider);
      worldState.flags.labOpened = true;
    },
    fail: () => {
      log("The circuit sparks violently — the panel goes dead.", 15, logDivider);
    }
  }
};

export function presentStatChoices(choices) {
  const container = document.createElement("div");
  container.className = "choice-block";

  const stats = JSON.parse(localStorage.getItem("stats")) || {};

  choices.forEach(choice => {
    const statValue = stats[choice.stat] || 0;
    const meetsRequirement = statValue >= choice.requirement;

    const button = document.createElement("button");
    button.innerText = `${choice.label} [${choice.stat} ${choice.requirement}]`;

    if (meetsRequirement) {
      button.onclick = () => {
        container.remove();
        log(`> ${choice.label}`, 10, () => {
          choice.success();
        }, "system");
      };
    } else {
      button.disabled = true;
      button.title = `Requires ${choice.stat} ${choice.requirement}`;
      button.classList.add("disabled");
    }

    container.appendChild(button);
  });

  document.getElementById("log-panel").appendChild(container);
  logDivider();
}
