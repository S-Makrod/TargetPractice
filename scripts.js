let width = 0;
let height = 0;

let target;
let button;
let gameArea;

let targetMovedAt;
let scoreInput;
let avgReactionInput;
let bestReactionInput;
let currentReactionInput;
let history = [];

let audio;

const nickImgs = [
  "assets/pictures/NCMeme1.png",
  "assets/pictures/NCMeme2.png",
  "assets/pictures/NCMeme3.png",
  "assets/pictures/NCNationalTreasure.png",
];
const nickAudio = [
  "assets/sounds/HOWD_IT_GET_BURNED.mp3",
  "assets/sounds/IM_GON_SAVE_THE_DAY.mp3",
  "assets/sounds/PISSED_BLOOD.mp3",
  "assets/sounds/PUT_THE_BUNNY_BACK_IN_BOX.mp3",
  "assets/sounds/rocky_insides.mp3",
];

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
  const x = Math.floor(Math.random() * (width - 150) + 150);
  const y = Math.floor(Math.random() * (height - 150) + 150);

  target.style.left = `${x}px`;
  target.style.top = `${y}px`;

  targetMovedAt = new Date();
}

function targetOnClick() {
  target.src = nickImgs[Math.floor(Math.random() * 4)];

  let localScore = 100;

  const localReaction = new Date() - targetMovedAt;

  history.push(Number(localReaction));

  if (localReaction < 1000) {
    localScore += Math.floor(100 - localReaction / 10);
  }

  scoreInput.value = Number(scoreInput.value) + localScore;
  const average = cumulative(0, history.length - 1) / history.length / 1000;
  avgReactionInput.value = Math.round(average * 1000) / 1000 + "s";
  bestReactionInput.value = Math.min(...history) / 1000 + "s";
  currentReactionInput.value = localReaction / 1000 + "s";

  if (audio) audio.pause();
  audio = new Audio(nickAudio[Math.floor(Math.random() * 5)]);
  audio.volume = 1;
  audio.play();

  moveTarget();
}

function startGame() {
  hide(button);
  display(target);

  width = document.getElementById("game-area").offsetWidth - 150;
  height = document.getElementById("game-area").offsetHeight - 150;

  const backgroundMusic = new Audio("assets/sounds/pedro-song.mp3");

  backgroundMusic.volume = 0.15;
  backgroundMusic.loop = true;
  backgroundMusic.play();

  moveTarget();
}

window.onload = () => {
  target = document.getElementById("target");
  button = document.getElementById("start-button");
  gameArea = document.getElementById("game-area");
  scoreInput = document.getElementById("score-input");
  avgReactionInput = document.getElementById("avg-reaction");
  bestReactionInput = document.getElementById("best-reaction");
  currentReactionInput = document.getElementById("current-reaction");

  target.onclick = targetOnClick;

  gameArea.onclick = () => {
    const shotAudio = new Audio(
      "assets/sounds/m4a1_single-kibblesbob-8540445.mp3"
    );

    shotAudio.volume = 0.3;
    shotAudio.play();
  };
};
