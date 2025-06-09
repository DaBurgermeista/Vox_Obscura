
let logQueue =[];
let isTyping = false;

const initialChoices = [
  {
    label: "Force the door open",
    stat: "Strength",
    requirement: 3,
    success: "You wedge your shoulder and *heave*. With a groan and a sheared bolt, the door relents.",
    fail: "You strain — metal groans — but it holds. Your shoulder aches."
  },
  {
    label: "Bypass the lock with a tool",
    stat: "Tech",
    requirement: 3,
    success: "You reroute the seal's power with a salvaged coil. Sparks. The lock hisses open.",
    fail: "The system shorts. A warning rune flashes red, then dies."
  },
  {
    label: "Slip through a maintenance shaft",
    stat: "Agility",
    requirement: 3,
    success: "You spot a loose grate and slither through. Dust and tight turns, but you’re in.",
    fail: "The shaft’s too narrow. You get stuck halfway and have to back out."
  },
  {
    label: "Call for help using local codes",
    stat: "Fellowship",
    requirement: 3,
    success: "A voice answers. Someone nearby opens the door. They don’t ask questions.",
    fail: "Only static. Then a click. Then silence again."
  }
];

window.onload = function () {
  document.getElementById("current-location").innerText = "Spire Theta-19 - Black Zone";

  const stats = JSON.parse(localStorage.getItem("stats")) || {};
  const name = localStorage.getItem("name") || "Unnamed Operative";

  const statsList = document.getElementById("stats-list");
  for (let stat in stats) {
    const li = document.createElement("li");
    li.textContent = `${stat}: ${stats[stat]}`;
    statsList.appendChild(li);
  }

  log(`Operative ${name}, status unknown. Beginning log...`);
  startOpeningScene();
};

const TYPING_ENABLED = true;

function log(message, delay = 15, callback = null, styleClass = "narration") {
  logQueue.push({ message, delay, callback, styleClass });
  if (!isTyping) processLogQueue();
}


function processLogQueue() {
  if (logQueue.length === 0) {
    isTyping = false;
    return;
  }

  isTyping = true;
  const { message, delay, callback, styleClass } = logQueue.shift();
  const logOutput = document.getElementById("log-output");
  const paragraph = document.createElement("div");
  paragraph.className = `log-entry ${styleClass}`;
  logOutput.appendChild(paragraph);

  let i = 0;
  function typeChar() {
    if (i < message.length) {
      paragraph.innerHTML += message[i] === '\n' ? '<br>' : message[i];
      i++;
      setTimeout(typeChar, delay);
    } else {
      logOutput.scrollTop = logOutput.scrollHeight;
      setTimeout(() => {
        if (callback) callback();
        processLogQueue();
      }, 250);
    }
  }

  typeChar();
}


function startOpeningScene() {
  log(`You awaken to dim emergency lighting and the distant groan of metal stress. A hiss of recirculated air stings your lungs with ozone and rust.`, 15, null, "narration");

  log(`The last thing you remember: a pulsing vox signal, garbled and fractured — then the auto-seal slamming down across Spire Theta-19.`, 15, null, "narration");

  log(`[SYSTEM] Auto-seal engaged. Perimeter isolation active.`, 10, null, "system");

  log(`Now you're sealed inside. No signal gets in. No signal gets out.`, 15, null, "narration");

  log(`You hear something else.`, 15, null, "narration");

  log(`>> Static on the wall-vox: “...inward... inward... inbound...?”`, 12, null, "dialogue");

  log(`[SYSTEM] Vox loop repeating. Pattern corrupted.`, 10, null, "system");

  log(`> The vox speaks inward.`, 15, () => {
    logDivider();
    presentInitialChoices();
  }, "narration");
}


function presentInitialChoices() {
  log(`The bulkhead is sealed. The vox is useless.`, 15, null, "narration");
  log(`You need to move — but how?`, 15, null, "narration");
  log(`What do you do?`, 15, () => {
    logDivider();
    presentStatChoices(initialChoices);
  }, "narration");
}


function presentStatChoices(choices) {
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
          log(`[${choice.stat} Check: ${statValue >= choice.requirement ? "Success" : "Fail"}]`, 10, () => {
            log(statValue >= choice.requirement ? choice.success : choice.fail, 15, logDivider, statValue >= choice.requirement ? "check-success" : "check-fail");
          }, statValue >= choice.requirement ? "check-success" : "check-fail");
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
}


function logDivider() {
  const logOutput = document.getElementById("log-output");
  const divider = document.createElement("div");
  divider.className = "log-divider";
  logOutput.appendChild(divider);
  logOutput.scrollTop = logOutput.scrollHeight;
}
