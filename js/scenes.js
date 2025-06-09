// scenes.js – Scene Definitions and Logic

import { log, logDivider } from './ui.js';
import { addToInventory } from './player.js';
import { initialChoices, scene2Choices } from './choices.js';

let scene2Flags = { looted: false, terminal: false };

export function startOpeningScene() {
  log("You awaken to dim emergency lighting and the distant groan of metal stress. A hiss of recirculated air stings your lungs with ozone and rust.", 15);
  log("The last thing you remember: a pulsing vox signal, garbled and fractured — then the auto-seal slamming down across Spire Theta-19.", 15);
  log("[SYSTEM] Auto-seal engaged. Perimeter isolation active.", 10, null, "system");
  log("Now you're sealed inside. No signal gets in. No signal gets out.", 15);
  log("You hear something else.", 15);
  log(">> Static on the wall-vox: “...inward... inward... inbound...?”,", 12, null, "dialogue");
  log("[SYSTEM] Vox loop repeating. Pattern corrupted.", 10, null, "system");
  log("> The vox speaks inward.", 15, () => {
    logDivider();
    presentInitialChoices();
  });
}

function presentInitialChoices() {
  log("The bulkhead is sealed. The vox is useless.", 15);
  log("You need to move — but how?", 15);
  log("What do you do?", 15, () => {
    logDivider();
    presentStatChoices(initialChoices);
  });
}

export function scene2_SearchAndSalvage() {
  log("You emerge into a half-lit corridor. Emergency panels flicker overhead.", 15);
  log("To your left, a collapsed bulkhead has crushed part of the walkway — and someone beneath it.", 15);
  log("Ahead, a sparking data terminal buzzes quietly. The screen flickers with static, but still functions.", 15, () => {
    logDivider();
    presentScene2Choices();
  });
}

function presentScene2Choices() {
  presentStatChoices(scene2Choices);
}

function presentStatChoices(choices, onComplete = null) {
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
          if (onComplete) onComplete();
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

// === Scene 2 Result Functions ===

export function handleScene2CorpseSuccess() {
  scene2Flags.looted = true;
  log("[Agility Check: Success]", 10, null, "check-success");
  log("+ Obtained: Vox-Key Fragment", 10, () => {
    addToInventory("Vox-Key Fragment");
    logDivider();
    checkScene2Progress();
  }, "item");
}

export function handleScene2CorpseFail() {
  scene2Flags.looted = true;
  log("[Agility Check: Failed]", 10, null, "check-fail");
  log("You reach beneath the rubble... but a shifting metal shard scrapes your side.", 15, () => {
    log("You suffer 1 Trauma.", 10, () => {
      addToInventory("Vox-Key Fragment");
      log("+ Obtained: Vox-Key Fragment", 10, logDivider, "item");
      checkScene2Progress();
    }, "item");
  }, "narration");
}

export function handleScene2TerminalSuccess() {
  scene2Flags.terminal = true;
  log("[Tech Check: Success]", 10, null, "check-success");
  log("The terminal stutters online. A corrupted report begins playback...", 15, () => {
    log(">> [Log #022-B: 'Purge triggered internally... not protocol... must warn command...']", 12, logDivider, "dialogue");
    checkScene2Progress();
  }, "narration");
}

export function handleScene2TerminalFail() {
  scene2Flags.terminal = true;
  log("[Tech Check: Failed]", 10, null, "check-fail");
  log("The terminal overloads. Sparks fly. The screen dies.", 15, logDivider, "system");
  checkScene2Progress();
}

function checkScene2Progress() {
  if (scene2Flags.looted && scene2Flags.terminal) {
    setTimeout(() => {
      log("As you turn to move on, the vox crackles again — not from your unit, but from the walls.", 15);
      log(">> 'He hears us now. The spiral turns...'", 15, () => {
        logDivider();
        // TODO: Replace this with next scene hook
        log("[Next scene placeholder]", 10);
      }, "dialogue");
    }, 1000);
  }
}
