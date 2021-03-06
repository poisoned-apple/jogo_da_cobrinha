var paused = false;
var playing = false;
let canvas = document.getElementById("campo");
let context = canvas.getContext("2d");
let box = 28;
let snake = [];
snake[0] = {
    x: 7 * box,
    y: 7 * box
} 

var score = 0;
var hp = 3;
const heart = '<i class="far fa-heart"></i>';
const broken_heart = '<i class="fas fa-heart-broken"></i>';
const dead = '<i class="fas fa-dizzy"></i>'

let direction = "right";
let food = {
    x: Math.floor(Math.random() * 13 + 1) * box,
    y: Math.floor(Math.random() * 13 + 1) * box
}

let life = {
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
    context.fillRect(food.x, food.y, box, box);
}

function drawLife(){
    context.fillStyle = "indigo";
    context.fillRect(life.x, life.y, box, box);
}

function drawEnemy(){
    context.fillStyle = "black";
    context.fillRect(enemy.x, enemy.y, box, box);
}

document.addEventListener("keydown", update);

window.addEventListener("keydown", function (p) {
    var key = p.keyCode;
    if (key === 80)
    {
        togglePause();
    }
    });

window.addEventListener('keydown', function (s) {
        var key = s.keyCode;
        if ((key === 83) && (playing == false))
        {
            start(document.getElementById("start"));
        }
        });

window.addEventListener('keydown', function (r) {
            var key = r.keyCode;
            if (key === 82)
            {
                restart();
            }
            });

function update(event) {

    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";

}

function iniciarJogo() {
    
    if (!paused) {

    for (let i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert("Game Over. Snako bit its own tail.");
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

    if (score != 0 && score % 10 == 0) drawLife();

    if ((score != 0 && score % 10 == 0) && (life.x * box) == (snakeX * box) && (life.y * box) == (snakeY * box)) {
        score++;
        document.getElementById("score").innerHTML = ("score:" + '<span class="pnts">' + score + '</span>');
        if (hp == 1) {
            document.getElementById("hp").innerHTML = ("HP: " + heart + heart);
            hp = 2;
        } else if (hp == 2) {
            document.getElementById("hp").innerHTML = ("HP: " + heart + heart + heart);
            hp = 3;
        }
    }

    if ((food.x * box) != (snakeX * box) || (food.y * box) != (snakeY * box)) { 
        snake.pop(); 
    } else {
    food.x = Math.floor(Math.random() * 13 + 1) * box;
    food.y = Math.floor(Math.random() * 13 + 1) * box;
    score++;
    document.getElementById("score").innerHTML = ("score:" + '<span class="pnts">' + score + '</span>');
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
            
    if (hp == 3) {
        document.getElementById("hp").innerHTML = ("HP: " + heart + heart);
        hp = 2;
    } else if (hp == 2) {
        document.getElementById("hp").innerHTML = ("HP: " + broken_heart);
        hp = 1;
    } else if (hp == 1) {
        hp = 0;
        document.getElementById("hp").innerHTML = ("dead " + dead);
        clearInterval(jogo);
            alert("Game Over. Snako is now a heartless worm.");
    }

    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
    
    }
}

criarBG();

var jogo = 0;

function start(element) {
    element.disabled = true;
    element.style.opacity='0.25';
    element.innerHTML = "playing";
    drawFood();
    jogo = setInterval(iniciarJogo, 100);
    playing = true;
}    

var speed = 0;

function slower() {
    
    if (playing == true) {

    clearInterval(jogo);
    speed = 0;
    document.getElementById("faster").disabled = false;
    jogo = setInterval(iniciarJogo, 100);

    }

}

function faster(element) {
    
    if (playing == true) {

    speed++;

    if (speed <= 4) {
        jogo = setInterval(iniciarJogo, 100);

    } else {
        element.disabled = true;
        element.style.opacity='0.25';
        document.getElementById("slower").disabled = false;
    }

    }
}

function restart() {

    if (playing == true) {

     clearInterval(jogo);
     speed = 0;
     criarBG();
     snake.length = 1;
     score = 0;
     document.getElementById("score").innerHTML = ("score:" + '<span class="pnts">' + score + '</span>');
     hp = 3;
     document.getElementById("hp").innerHTML = ("HP: " + heart + heart + heart);
     food.x = Math.floor(Math.random() * 13 + 1) * box,
     food.y = Math.floor(Math.random() * 13 + 1) * box,
     enemy.x = Math.floor(Math.random() * 13 + 1) * box,
     enemy.y = Math.floor(Math.random() * 13 + 1) * box
     jogo = setInterval(iniciarJogo, 100);
     document.getElementById("pause").innerHTML = ("pause (p)");
     paused = false;
     document.getElementById("start").innerHTML = ("playing");
    }

}


function togglePause()
{
    if ((playing == true) && (!paused))
    {
        paused = true;
        document.getElementById("pause").innerHTML = ("unpause (p)");
        document.getElementById("start").innerHTML = ("paused");
    } else if (paused)
    {
       paused= false;
       document.getElementById("pause").innerHTML = ("pause (p)");
       document.getElementById("start").innerHTML = ("playing");
    }

}