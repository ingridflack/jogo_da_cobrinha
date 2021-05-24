const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");
const score = document.getElementById("score");
const status = document.getElementById("game-status");

const playAgainButton = document.getElementById("btn-play-again");
const pauseButton = document.getElementById("btn-pause");

playAgainButton.addEventListener("click", reset);
pauseButton.addEventListener("click", togglePause);

const box = 16;
const columns = 32;

const INITIAL_SNAKE = [{ x: 8 * box, y: 8 * box }];
const INITIAL_DIRECTION = "right";

let food;
let jogo;
let snake;
let direction;

let paused = false;

function reset() {
  if (jogo) clearInterval(jogo);

  setScore(0);
  hideStatus();
  generateFood();

  playAgainButton.classList.add("hidden");

  direction = INITIAL_DIRECTION;
  snake = [...INITIAL_SNAKE];
  jogo = setInterval(iniciarJogo, 60);
}

function togglePause() {
  if (!paused) {
    showStatus("Paused");
    pauseButton.textContent = "Resume";
  } else {
    hideStatus();
    pauseButton.textContent = "Pause";
  }

  paused = !paused;
}

function criarBG() {
  const size = box * columns;
  context.fillStyle = "#9ac503";
  context.fillRect(0, 0, size, size);
}

function criarCobrinha() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "black";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * (columns - 1) + 1) * box,
    y: Math.floor(Math.random() * (columns - 1) + 1) * box,
  };
}

function desenharComida() {
  context.fillStyle = "#c50303";
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function setScore(value) {
  score.textContent = value.toString().padStart(5, "0");
}

function addScore(amount) {
  const currentValue = Number(score.textContent);
  setScore(currentValue + amount);
}

function update(event) {
  if (event.keyCode == 80) togglePause();

  if (!paused) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
  }
}

function hideStatus() {
  status.classList.remove("show");
  status.textContent = "";
}

function showStatus(message) {
  status.classList.add("show");
  status.textContent = message;
}

function iniciarJogo() {
  if (paused) return;

  if (snake[0].x > (columns - 1) * box) snake[0].x = 0;
  if (snake[0].x < 0) snake[0].x = columns * box;
  if (snake[0].y > (columns - 1) * box) snake[0].y = 0;
  if (snake[0].y < 0) snake[0].y = columns * box;

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      console.log(snake);
      console.log(snake[0].x, snake[0].y);
      console.log(i, snake[i].x, snake[i].y);

      clearInterval(jogo);
      playAgainButton.classList.remove("hidden");
      showStatus("Game over");
    }
  }

  criarBG();
  criarCobrinha();
  desenharComida();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    generateFood();
    addScore(10);
  }

  const newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

reset();

// document.getElementsByTagName("body")[0].addEventListener("click", () => {
//   const previous = snake[snake.length - 1];
//   snake.push({
//     x: previous.x,
//     y: previous.y + box,
//   });
//   criarCobrinha();
// });
