const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");
const box = 16;
const columns = 32;

const snake = [
  {
    x: 8 * box,
    y: 8 * box,
  },
];
let direction = "right";
let food = {
  x: Math.floor(Math.random() * (columns - 1) + 1) * box,
  y: Math.floor(Math.random() * (columns - 1) + 1) * box,
};

function criarBG() {
  const size = box * columns;
  context.fillStyle = "pink";
  context.fillRect(0, 0, size, size);
}

function criarCobrinha() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "purple";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function desenharComida() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function update(event) {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {
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
      alert("Game Over");
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
    food.x = Math.floor(Math.random() * (columns - 1) + 1) * box;
    food.y = Math.floor(Math.random() * (columns - 1) + 1) * box;
  }

  const newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

const jogo = setInterval(iniciarJogo, 60);

// document.getElementsByTagName("body")[0].addEventListener("click", () => {
//   const previous = snake[snake.length - 1];
//   snake.push({
//     x: previous.x,
//     y: previous.y + box,
//   });
//   criarCobrinha();
// });
