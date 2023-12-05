let playPause = document.querySelector("#play-pause-icon");
let startBtn = document.querySelector("#start");
let stopBtn = document.querySelector("#stop");
let lapBtn = document.querySelector("#lap");
let resetBtn = document.querySelector("#reset");
let display = document.querySelector(".display");
let hrDisplay = document.querySelector("#hr");
let minDisplay = document.querySelector("#min");
let secDisplay = document.querySelector("#sec");
let millisecDisplay = document.querySelector("#millisec");

let pause = true;
let millisec = 0;
let sec = 0;
let min = 0;
let hr = 0;
let interval = null; 

let body = document.querySelector("body");
body.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    stopwatch();
  }
  if (event.key === "l") {
    lap();
  }
  if (event.key === "r") {
    reset();
  }
});

startBtn.addEventListener("click", stopwatch);
lapBtn.addEventListener("click", lap);
resetBtn.addEventListener("click", reset);

function reset() {
  clearInterval(interval);
  pause = true;

  playPause.removeAttribute("class", "fa-solid fa-pause");
  playPause.setAttribute("class", "fa-solid fa-play");
  lapContainer.style.display = "none";

  millisec = 0;
  sec = 0;
  min = 0;
  hr = 0;

  updateDisplay();
  lapContainer.innerHTML = "";
}

function stopwatch() {

  pause = !pause;
  if (!pause) {
    if (interval !== null) {
      clearInterval(interval);
    }
    playPause.removeAttribute("class", "fa-solid fa-play");
    playPause.setAttribute("class", "fa-solid fa-pause");
    interval = setInterval(update, 10);
  } else {
    clearInterval(interval);
    playPause.removeAttribute("class", "fa-solid fa-pause");
    playPause.setAttribute("class", "fa-solid fa-play");
  }
}

function update() {
  millisec += 10;
  if (millisec == 1000) {
    sec++;
    millisec = 0;
  }
  if (sec == 60) {
    min++;
    sec = 0;
  }
  if (min == 60) {
    hr++;
    min = 0;
  }

  updateDisplay();
}

function updateDisplay() {
  if (millisec < 100) {
    if (millisec < 10) {
      millisecDisplay.textContent = "00" + millisec;
    } else {
      millisecDisplay.textContent = "0" + millisec;
    }
  } else {
    millisecDisplay.textContent = millisec;
  }
  secDisplay.textContent = formatTimeUnit(sec);
  minDisplay.textContent = formatTimeUnit(min);
  hrDisplay.textContent = formatTimeUnit(hr);
}

function formatTimeUnit(unit) {
  return unit < 10 ? "0" + unit : unit;
}

let lapContainer = document.querySelector(".lapContainer");

function lap() {
  lapContainer.style.display = "block";
  let lapDisplay = document.createElement("div");
  lapDisplay.setAttribute("class", "lap");
  lapContainer.appendChild(lapDisplay);
  lapContainer.insertBefore(lapDisplay, lapContainer.firstChild); // to insert the newly appended element to the top of the container
  lapDisplay.innerText = display.innerText;
}
