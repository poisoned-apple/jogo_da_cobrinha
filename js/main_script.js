let canvas = document.getElementById("campo");
let context = canvas.getContext("2d");
let box = 28;
let snake = [];
snake[0] = {
    x: 7 * box,
    y: 7 * box
} 

let direction = "right";
let food = {
    x: Math.floor(Math.random() * 13 + 1) * box,
    y: Math.floor(Math.random() * 13 + 1) * box
}

let enemy = {
    x: Math.floor(Math.random() * 13 + 1) * box,
    y: Math.floor(Math.random() * 13 + 1) * box
}

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 14 * box, 14 * box);    
}

function criarCobrinha(){
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box); 
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box)
}

function drawEnemy(){
    context.fillStyle = "black";
    context.fillRect(enemy.x, enemy.y, box, box)
}

document.addEventListener("keydown", update);

function update(event) {

    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";

}

function iniciarJogo() {
    
    for (let i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert("Fim de Jogo. Recarregue a página para jogar novamente.");
        }
    }

    if (snake[0].x > 13 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 14 * box;
    if (snake[0].y > 13 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 14 * box;  

    criarBG();
    criarCobrinha();
    drawFood();
    drawEnemy();

    let snakeX = snake[0].x; 
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if ((food.x * box) != (snakeX * box) || (food.y * box) != (snakeY * box)) { 
        snake.pop(); 
    }else {
    food.x = Math.floor(Math.random() * 13 + 1) * box,
    food.y = Math.floor(Math.random() * 13 + 1) * box
    }

    if ((enemy.x * box) == (food.x * box) && (enemy.y * box) == (food.y * box)) { 
    food.x = Math.floor(Math.random() * 13 + 1) * box,
    food.y = Math.floor(Math.random() * 13 + 1) * box,
    enemy.x = Math.floor(Math.random() * 13 + 1) * box,
    enemy.y = Math.floor(Math.random() * 13 + 1) * box
    }

    if ((enemy.x * box) == (snakeX * box) && (enemy.y * box) == (snakeY * box)) { 
        snake.pop();
    enemy.x = Math.floor(Math.random() * 13 + 1) * box,
    enemy.y = Math.floor(Math.random() * 13 + 1) * box
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}

criarBG();

var jogo = 0;

function pause(element) {
    element.disabled = false;

    if (element.innerHTML == "pause") {
        element.innerHTML = "unpause"; 
    } else {
        element.innerHTML = "pause"
    }
}


function start(element) {
    element.disabled = true;
    element.style.opacity='0.25';
    element.innerHTML = "playing";
    drawFood();
    jogo = setInterval(iniciarJogo, 100);
}    

var speed = 0;

function faster(element) {
    speed++;

    if(speed <= 5) {
        element.innerHTML = ("speed: " + speed + "x");
        drawFood();
        let jogo = setInterval(iniciarJogo, 100);
    } else {
        element.innerHTML = ("way too fast");
        element.disabled = true;
        element.style.opacity='0.25';
    }
}

function reload() {
    window.location.reload();
}

