# Vox Obscura – Stat System Design Notes

This document outlines the purpose and gameplay integration of core stats used in character creation and event resolution.

---

## 🎲 Stat Overview

| Stat        | Role in Gameplay |
|-------------|------------------|
| **Strength**    | Physical force, intimidation, melee success |
| **Willpower**   | Mental resilience, warp resistance, resisting corruption |
| **Fellowship**  | Dialogue, persuasion, disguise, commanding troops |
| **Tech**        | Hacking, Mechanicus interfaces, relic analysis |
| **Agility**     | Dodging, stealth, escaping traps/situations |

---

## 🧠 Stat Use Cases

### 1. Narrative Branching

Stats unlock alternate choices or increase success odds in events and encounters.

Example:
```js
{
  choice: "Wrench open the blast door",
  requires: { Strength: 3 },
  success: "You pry the door open with a grunt.",
  fail: "You strain, but it won't budge. The alarms keep shrieking."
}
