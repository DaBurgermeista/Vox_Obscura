let currentStats = {
  Strength: 0,
  Willpower: 0,
  Fellowship: 0,
  Tech: 0,
  Agility: 0
};

let remainingPoints = 10;

const backgrounds = {
    "Hive Scum": {
        description: "Born in the underhive, where survival is an art and loyalty is paid in blood.",
        bonuses: { Agility: 1, Strength: 1}
    },
    "Acolyte": {
        description: "Trained to serce the Inquisition, schooled in suspicion and survival.",
        bonuses: { Willpower: 1, Fellowship: 1}
    },
    "Archivist": {
        description: "Raised in data-vaults and cogitators, versed in forgotten truths.",
        bonuses: { Tech: 2}
    }
};

function updateNamePreview() {
    const name = document.getElementById('charName').value;
    document.getElementById("name-preview").innerText = name ? `→ Your name: ${name}` : "";
}

function goToBackground() {
  const name = document.getElementById("charName").value.trim();
  if (!name) return alert("Enter a name.");
  document.getElementById("step-name").classList.add("hidden");
  document.getElementById("step-background").classList.remove("hidden");
}

function selectBackground(bg) {
  localStorage.setItem("background", bg);
  const { description, bonuses } = backgrounds[bg];

  // Preview text
  let bonusText = Object.entries(bonuses)
    .map(([stat, value]) => `${stat} +${value}`)
    .join(", ");
    
  document.getElementById("bg-preview").innerHTML = `
    <strong>${bg}</strong><br>
    <em>${description}</em><br>
    <span>Bonuses: ${bonusText}</span>
  `;
  
  // highlight selected button
  const buttons = document.querySelectorAll(".options button");
  buttons.forEach(btn => btn.classList.remove("selected"));
  event.target.classList.add("selected");

  // Store bonuses for use later
  localStorage.setItem("backgroundBonuses", JSON.stringify(bonuses));
}

function goToStats() {
  document.getElementById("step-background").classList.add("hidden");
  document.getElementById("step-stats").classList.remove("hidden");

  const bonusStats = JSON.parse(localStorage.getItem("backgroundBonuses") || "{}");

  for (let stat in bonusStats) {
    currentStats[stat] += bonusStats[stat] || 0;
  }

  renderStats();
}


function renderStats() {
  const container = document.getElementById("stats-container");
  container.innerHTML = "";
  for (let stat in currentStats) {
    const block = document.createElement("div");
    block.innerHTML = `
      <span>${stat}: ${currentStats[stat]}</span>
      <button onclick="adjustStat('${stat}', 1)">+</button>
      <button onclick="adjustStat('${stat}', -1)">−</button>
    `;
    container.appendChild(block);
  }
}

function adjustStat(stat, change) {
  if (change === 1 && remainingPoints === 0) return;
  if (change === -1 && currentStats[stat] === 0) return;

  currentStats[stat] += change;
  remainingPoints -= change;
  renderStats();
  document.getElementById("remaining-points").innerText = `Points left: ${remainingPoints}`;
}

function finalizeCharacter() {
  const name = document.getElementById("charName").value.trim();
  if (remainingPoints > 0) return alert("Spend all your stat points.");
  localStorage.setItem("name", name);
  localStorage.setItem("stats", JSON.stringify(currentStats));
  window.location.href = "game.html"; // or wherever the first scene is
}
