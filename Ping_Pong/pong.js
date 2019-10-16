const canvas = document.getElementById("pong");
const conText = canvas.getContext("2d");

let hit = new Audio();
let wall = new Audio();
let comScore = new Audio();
let userScore = new Audio();

hit.src = "./sounds/hit.mp3";
wall.src = "./sounds/wall.mp3";
comScore.src = "./sounds/comScore.mp3";
userScore.src = "./sounds/userScore.mp3";

const user = {
    x: 0,
    y: (canvas.height/2 - 100)/2,
    color: "yellow",
    width: 10,
    height: 100,
    score: 0
}

const com = {
    x: canvas.width - 10,
    y: (canvas.height/2 - 100)/2,
    color: "blue",
    width: 10,
    height: 100,
    score: 0
}

const net = {
    x: canvas.width/2 - 1,
    y: 0,
    width: 2,
    height: 10,
    color: "white"
}

const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    speed: 7,
    velocityX: 5, // velocity = speed + direction;
    velocityY: 5,
    color: "white",
    radius: 10
}

function drawRect(x, y, width, height, color){
    conText.fillStyle = color;
    conText.fillRect(x, y, width, height);
}

function drawCircle(x, y, r, color){
    conText.fillStyle = color.toLowerCase();
    conText.beginPath();
    conText.arc(x, y, r, 0, Math.PI*2, true);
    conText.closePath();
    conText.fill();
}

function drawNet(){
    let space = 15;
    for(let index = 0; index <= canvas.height; index += space){
        drawRect(net.x, net.y + index, net.width, net.height, net.color);
    }
}

function drawText(x, y, color, text){
    conText.fillStyle = color.toLowerCase();
    conText.font = "30px fantasy";
    conText.fillText(text, x, y);
}

function render(){
    drawRect(0,0, canvas.width, canvas.height, "black"); //Draw background for game
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);
    drawNet();
    drawText(canvas.width/4, canvas.height/5, user.color, user.score);
    drawText(canvas.width*3/4, canvas.height/5, com.color, com.score);
}

function update(){
    let scoreWin = 5;
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
        ball.velocityY = -ball.velocityY;
    }

    if(ball.x - ball.radius < 0){
        com.score++;
        comScore.play();
        resetBall();
    } else if(ball.x + ball.radius > canvas.width){
        user.score++;
        userScore.play();
        resetBall();
    }

    let computerLever = 0.07;
    
    com.y += (ball.y - (com.y + com.height/2)) * computerLever;

    let player = (ball.x + ball.radius < canvas.width/2)? user : com;
    
    if(collision(ball, player)){
        hit.play();
        let collidePoint = (ball.y - (player.y + player.height/2));
        collidePoint = collidePoint / (player.height/2);
    
        let angleRad = collidePoint * (Math.PI / 4);
    
        let direction = (ball.x + ball.radius < canvas.width/2)? 1 : -1;
    
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);

        ball.color = player.color;
    
        ball.speed += 0.1;
    }
}

function resetBall(){
    wall.play();
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 7;
    ball.velocityX = -ball.velocityX;
}

function collision(b, p){
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return b.right > p.left && b.top < p.bottom && b.left < p.right && b.bottom > p.top;
}

function game(){
    render();
    update();
}

canvas.addEventListener("mousemove", movePaddle);

function movePaddle(evt){
    let rect = canvas.getBoundingClientRect();

    user.y = evt.y - rect.top - user.height/2;
}

const framePersecond = 50; // Times

let interval = setInterval(game, 1000/framePersecond); // Call game(); 50 times every 1000ms = 1sec