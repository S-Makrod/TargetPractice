let width = 0;
let height = 0;

let target;
let button;
let gameArea;

let targetMovedAt;
let scoreInput;
let avgReactionInput;
let bestReactionInput;
let history = [];

function hide(element) {
  element.classList.remove("display");
  element.classList.add("hide");
}

function display(element) {
  element.classList.remove("hide");
  element.classList.add("display");
}

function cumulative(accumulator, i) {
  accumulator += history[i];
  if (i == 0) return accumulator;
  return cumulative(accumulator, i - 1);
}

function moveTarget() {
  const x = Math.floor(Math.random() * (width - 50) + 50);
  const y = Math.floor(Math.random() * (height - 50) + 50);

  target.style.left = `${x}px`;
  target.style.top = `${y}px`;

  targetMovedAt = new Date();
}

function targetOnClick() {
  let localScore = 100;

  const localReaction = new Date() - targetMovedAt;

  history.push(Number(localReaction));

  if (localReaction < 1000) {
    localScore += Math.floor(100 - localReaction / 10);
  }

  scoreInput.value = Number(scoreInput.value) + localScore;
  const average = cumulative(0, history.length - 1) / history.length / 1000;
  avgReactionInput.value =
    Math.round(average * 1000) / 1000 + "s";
  bestReactionInput.value = Math.min(...history) / 1000 + "s";

  moveTarget();
}

function startGame() {
  hide(button);
  display(target);

  width = document.getElementById("game-area").offsetWidth - 50;
  height = document.getElementById("game-area").offsetHeight - 50;

  moveTarget();
}

window.onload = () => {
  target = document.getElementById("target");
  button = document.getElementById("start-button");
  gameArea = document.getElementById("game-area");
  scoreInput = document.getElementById("score-input");
  avgReactionInput = document.getElementById("avg-reaction");
  bestReactionInput = document.getElementById("best-reaction");

  target.onclick = targetOnClick;
};
