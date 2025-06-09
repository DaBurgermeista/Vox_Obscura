// locations.js – Location Definitions

export const locations = {
  corridor: {
    id: "corridor",
    name: "Damaged Corridor",
    description: [
      "Emergency lighting flickers overhead.",
      "A mangled corpse lies under a collapsed support beam.",
      "A damaged terminal sparks intermittently nearby."
    ],
    choices: ["searchCorpse", "accessTerminal"]
  },

  lockedLab: {
    id: "lockedLab",
    name: "Sealed Laboratory",
    description: [
      "Thick blast doors block the entrance to the lab.",
      "A rune-locked panel glows faintly beside it."
    ],
    choices: ["attemptOverride"]
  }
};
