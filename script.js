const timeElement =
  document.getElementById("time");

const startButton =
  document.getElementById("startButton");

const lapButton =
  document.getElementById("lapButton");

const resetButton =
  document.getElementById("resetButton");

const lapList =
  document.getElementById("lapList");

let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let animationId = null;
let lapCount = 0;

function formatTime(milliseconds) {
  const totalCentiseconds =
    Math.floor(milliseconds / 10);

  const centiseconds =
    totalCentiseconds % 100;

  const totalSeconds =
    Math.floor(totalCentiseconds / 100);

  const seconds =
    totalSeconds % 60;

  const minutes =
    Math.floor(totalSeconds / 60);

  const formattedMinutes =
    String(minutes).padStart(2, "0");

  const formattedSeconds =
    String(seconds).padStart(2, "0");

  const formattedCentiseconds =
    String(centiseconds).padStart(2, "0");

  return (
    formattedMinutes +
    ":" +
    formattedSeconds +
    "." +
    formattedCentiseconds
  );
}

function updateTime() {
  const currentTime =
    performance.now();

  const currentElapsedTime =
    currentTime -
    startTime +
    elapsedTime;

  timeElement.textContent =
    formatTime(currentElapsedTime);

  if (isRunning) {
    animationId =
      requestAnimationFrame(updateTime);
  }
}

function startStopwatch() {
  if (isRunning === false) {
    isRunning = true;

    startTime =
      performance.now();

    startButton.textContent =
      "一時停止";

    lapButton.disabled =
      false;

    animationId =
      requestAnimationFrame(updateTime);

  } else {
    isRunning = false;

    elapsedTime +=
      performance.now() -
      startTime;

    startButton.textContent =
      "再開";

    lapButton.disabled =
      true;

    cancelAnimationFrame(
      animationId
    );
  }
}

function addLap() {
  if (isRunning === false) {
    return;
  }

  lapCount++;

  const currentElapsedTime =
    performance.now() -
    startTime +
    elapsedTime;

  const emptyMessage =
    document.querySelector(
      ".empty-message"
    );

  if (emptyMessage) {
    emptyMessage.remove();
  }

  const lapItem =
    document.createElement("li");

  const lapNumber =
    document.createElement("span");

  const lapTime =
    document.createElement("strong");

  lapNumber.textContent =
    "ラップ " + lapCount;

  lapTime.textContent =
    formatTime(currentElapsedTime);

  lapItem.appendChild(
    lapNumber
  );

  lapItem.appendChild(
    lapTime
  );

  lapList.prepend(
    lapItem
  );
}

function resetStopwatch() {
  isRunning = false;
  startTime = 0;
  elapsedTime = 0;
  lapCount = 0;

  cancelAnimationFrame(
    animationId
  );

  timeElement.textContent =
    "00:00.00";

  startButton.textContent =
    "スタート";

  lapButton.disabled =
    true;

  lapList.innerHTML = `
    <li class="empty-message">
      ラップ記録はありません
    </li>
  `;
}

startButton.addEventListener(
  "click",
  startStopwatch
);

lapButton.addEventListener(
  "click",
  addLap
);

resetButton.addEventListener(
  "click",
  resetStopwatch
);
