// choices.js – Reusable Stat-Based Choices for Scenes

import { scene2_SearchAndSalvage, handleScene2CorpseFail, handleScene2CorpseSuccess,
    handleScene2TerminalFail, handleScene2TerminalSuccess
 } from "./scenes.js";
import { log, logDivider } from "./ui.js";

export const initialChoices = [
  {
    label: "Force the door open",
    stat: "Strength",
    requirement: 3,
    success: () => {
        log("[Strength Check: Success]", 10, null, "check-success");
        log("You wedge your shoulder and *heave*. With a groan and a sheared bolt, the door relents.", 15, () => {
            logDivider();
            scene2_SearchAndSalvage();
        }, "narration");
    },
    fail: () => { 
        log("[Strength Check: Failed]", 10, null, "check-fail");
        log("You strain — metal groans — but it holds. Your shoulder aches.", 15, logDivider, "narrative");
    }
  },
  {
    label: "Bypass the lock with a tool",
    stat: "Tech",
    requirement: 3,
    success: () => {
        log("[Tech Check: Success]", 10, null, "check-success");
        log("You reroute the seal's power with a salvaged coil. Sparks. The lock hisses open.", 15, () => {
            logDivider();
            scene2_SearchAndSalvage();
        }, "narrative");
    },
    fail: () => {
        log("[Tech Check: Failed]", 10, null, "check-failed");
        log("The system shorts. A warning rune flashes red, then dies.", 15, logDivider, "narrative");
    },
  },
  {
    label: "Slip through a maintenance shaft",
    stat: "Agility",
    requirement: 3,
    success: () => {
        log("[Agility Check: Success]", 10, null, "check-success");
        log("You spot a loose grate and slither through. Dust and tight turns, but you’re in.", 15, () => {
            logDivider();
            scene2_SearchAndSalvage();
        }, "narrative");
    },
    fail: () => {
        log("[Agility Check: Failed]", 10, null, "check-failed");
        log("The shaft’s too narrow. You get stuck halfway and have to back out.", 15, logDivider, "narrative");
    }
  },
  {
    label: "Call for help using local codes",
    stat: "Fellowship",
    requirement: 3,
    success: () => {
        log("[Fellowship Check: Success]", 10, null, "check-success");
        log("A voice answers. Someone nearby opens the door. They don’t ask questions.", 10, () => {
            logDivider();
            scene2_SearchAndSalvage();
        }, "narrative");
    },
    fail: () => {
        log("[Fellowship Check: Failed]", 10, null, "check-failed")
        log("Only static. Then a click. Then silence again.", 10, logDivider, "narrative");
    }
  },
];

export const scene2Choices = [
  {
    label: "Search the corpse",
    stat: "Agility",
    requirement: 3,
    success: () => handleScene2CorpseSuccess(),
    fail: () => handleScene2CorpseFail()
  },
  {
    label: "Access the terminal",
    stat: "Tech",
    requirement: 3,
    success: () => handleScene2TerminalSuccess(),
    fail: () => handleScene2TerminalFail()
  }
];
