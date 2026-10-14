const scene = document.querySelector("#scene");
const bulbButton = document.querySelector("#bulbButton");
const toggleButton = document.querySelector("#toggleButton");
const toggleText = document.querySelector("#toggleText");
const toggleIcon = document.querySelector("#toggleIcon");
const sceneStatus = document.querySelector("#sceneStatus");
const powerIndicator = document.querySelector("#powerIndicator");
const brightness = document.querySelector("#brightness");
const brightnessValue = document.querySelector("#brightnessValue");
const currentBrightness = document.querySelector("#currentBrightness");
const currentColor = document.querySelector("#currentColor");
const clickCount = document.querySelector("#clickCount");
const colorChoices = document.querySelectorAll(".color-choice");

const colors = {
  "#b9c7ff": "BLUE",
  "#ffd18a": "WARM",
  "#9fffd1": "GREEN",
  "#ff9ed8": "PINK"
};

const state = {
  isOn: false,
  color: "#b9c7ff",
  brightness: 70,
  clicks: 0
};

function render() {
  document.documentElement.style.setProperty(
    "--light-color",
    state.color
  );

  document.documentElement.style.setProperty(
    "--brightness",
    state.brightness / 100
  );

  scene.classList.toggle("is-on", state.isOn);
  scene.classList.toggle("off", !state.isOn);

  bulbButton.setAttribute("aria-pressed", String(state.isOn));
  bulbButton.setAttribute(
    "aria-label",
    state.isOn ? "Apagar a lâmpada" : "Acender a lâmpada"
  );

  toggleText.textContent = state.isOn
    ? "Apagar a luz"
    : "Acender a luz";

  toggleIcon.textContent = state.isOn ? "☼" : "✦";
  sceneStatus.textContent = state.isOn
    ? "AMBIENTE ILUMINADO"
    : "AMBIENTE DESLIGADO";

  powerIndicator.textContent = state.isOn ? "ON" : "OFF";
  brightnessValue.textContent = `${state.brightness}%`;
  currentBrightness.textContent = `${state.brightness}%`;
  currentColor.textContent = colors[state.color] || "CUSTOM";
  clickCount.textContent = String(state.clicks).padStart(2, "0");

  colorChoices.forEach((button) => {
    const selected = button.dataset.color === state.color;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function toggleLight() {
  state.isOn = !state.isOn;
  state.clicks += 1;
  render();
}

bulbButton.addEventListener("click", toggleLight);
toggleButton.addEventListener("click", toggleLight);

colorChoices.forEach((button) => {
  button.addEventListener("click", () => {
    state.color = button.dataset.color;
    render();
  });
});

brightness.addEventListener("input", (event) => {
  state.brightness = Number(event.target.value);
  render();
});

render();
