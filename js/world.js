import { locations } from './locations.js';
import { choices } from './choices.js';
import { log, logDivider } from './ui.js';

export const worldState = {
  currentLocation: "corridor",
  flags: {},
  inventory: [],
  trauma: 0
};

export function enterLocation(id) {
  const location = locations[id];
  if (!location) return;

  worldState.currentLocation = id;

  logDivider();
  location.description.forEach(line => log(line, 15, null, "narration"));
  log("What do you do?", 15, () => {
    const choiceObjects = location.choices.map(id => choices[id]);
    presentStatChoices(choiceObjects); // reuse your existing UI logic
  });
}
