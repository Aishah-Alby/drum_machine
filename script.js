const display = document.getElementById("display");
const padGrid = document.querySelector(".pad-grid");
const powerToggle = document.getElementById("power-toggle");
const bankToggle = document.getElementById("bank-toggle");

let power = false;
let bank = 0;

// Two sound banks
const banks = [
  [
    {
      key: "Q",
      id: "Heater-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    },
    {
      key: "W",
      id: "Heater-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    },
    {
      key: "E",
      id: "Heater-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    },
    {
      key: "A",
      id: "Heater-4",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    },
    {
      key: "S",
      id: "Clap",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    },
    {
      key: "D",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    {
      key: "Z",
      id: "Kick-n'-Hat",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    },
    {
      key: "X",
      id: "Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    },
    {
      key: "C",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    },
  ],
  [
    {
      key: "Q",
      id: "Chord-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
    },
    {
      key: "W",
      id: "Chord-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
    },
    {
      key: "E",
      id: "Chord-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
    },
    {
      key: "A",
      id: "Shaker",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
    },
    {
      key: "S",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
    },
    {
      key: "D",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
    },
    {
      key: "Z",
      id: "Punchy-Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
    },
    {
      key: "X",
      id: "Side-Stick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
    },
    {
      key: "C",
      id: "Snare",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
    },
  ],
];

function loadPads() {
  padGrid.innerHTML = "";
  banks[bank].forEach((pad) => {
    const padDiv = document.createElement("div");
    padDiv.classList.add("drum-pad");
    padDiv.setAttribute("data-key", pad.key);
    padDiv.setAttribute("id", pad.id);
    padDiv.innerHTML = `${pad.key}
      <audio class="clip" id="${pad.key}" src="${pad.url}"></audio>`;
    padGrid.appendChild(padDiv);
  });

  if (power) {
    document.querySelectorAll(".drum-pad").forEach((pad) => {
      pad.addEventListener("click", () =>
        playSound(pad.getAttribute("data-key"))
      );
    });
  }
}

function playSound(key) {
  if (!power) return;
  const audio = document.getElementById(key.toUpperCase());
  const pad = document.querySelector(
    `.drum-pad[data-key="${key.toUpperCase()}"]`
  );
  if (!audio || !pad) return;

  audio.currentTime = 0;
  audio.play();

  display.textContent = pad.id;
  pad.classList.add("active");
  setTimeout(() => pad.classList.remove("active"), 100);
}

document.addEventListener("keydown", (e) => {
  if (power) playSound(e.key);
});

powerToggle.addEventListener("change", (e) => {
  power = e.target.checked;
  display.textContent = power ? `Power ON — Bank ${bank + 1}` : "Power OFF";
  bankToggle.disabled = !power;
  loadPads();
});

bankToggle.addEventListener("change", (e) => {
  bank = e.target.checked ? 1 : 0;
  display.textContent = `Bank ${bank + 1}`;
  loadPads();
});

// Initial load
loadPads();
