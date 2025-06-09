// scenes.js – Location-Based Narrative Refactor

import { log, logDivider } from './ui.js';
import { choices, presentStatChoices } from './choices.js';
import { locations } from './locations.js';
import { worldState } from './world.js';

export function startOpeningScene() {
  const openingLines = [
  { text: "You awaken to dim emergency lighting and the distant groan of metal stress. A hiss of recirculated air stings your lungs with ozone and rust." },
  { text: "The last thing you remember: a pulsing vox signal, garbled and fractured — then the auto-seal slamming down across Spire Theta-19." },
  { text: "[SYSTEM] Auto-seal engaged. Perimeter isolation active.", style: "system" },
  { text: "Now you're sealed inside. No signal gets in. No signal gets out." },
  { text: "You hear something else." },
  { text: ">> Static on the wall-vox: “...inward... inward... inbound...?”", style: "dialogue" },
  { text: "[SYSTEM] Vox loop repeating. Pattern corrupted.", style: "system" },
  { text: "> The vox speaks inward." }
];

openingLines.forEach(line => {
  if (typeof line === "string") {
    log(line); // default style (narration)
  } else {
    log(line.text, 15, null, line.style || "narration");
  }
});


  // After intro, load first location
  setTimeout(() => {
    enterLocation("corridor");
  }, 2000);
}

export function enterLocation(id) {
  const location = locations[id];
  if (!location) return;

  worldState.currentLocation = id;
  logDivider();

  location.description.forEach(line => log(line, 15, null, "narration"));

  log("What do you do?", 15, () => {
    const choiceObjects = location.choices.map(choiceId => choices[choiceId]);
    presentStatChoices(choiceObjects);
  });
}
