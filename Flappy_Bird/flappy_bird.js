var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

let score = 0;

var bg = new Image();
var bird = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSorth = new Image();
var game_over = new Image();

var fly_sound = new Audio();
var score_sound = new Audio();

fly_sound.src = "sounds/fly.mp3";
score_sound.src = "sounds/score.mp3";

game_over.src = "images/game_over.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
bird.src = "images/bird.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSorth.src = "images/pipeSouth.png";

var gap = 80;
var constant = pipeNorth.height + gap;

var bX = 10;
var bY = 150;

var gravity = 1.5;

//canvas.addEventListener("mousemove", moveUp);

document.addEventListener("keydown", moveUp);

function moveUp(){
    //let rect = canvas.getBoundingClientRect();
    //bY = evt.y - rect.top - bird.height/2;
    bY -= 30;
    fly_sound.play();
}

function clear(){

}
var pipe = [];
pipe[0] = {
    x: canvas.width,
    y: 0
}

function draw(){
    id = requestAnimationFrame(draw);
    
    ctx.drawImage(bg, 0, 0);
    for(let index = 0; index < pipe.length; index++){
        ctx.drawImage(pipeNorth, pipe[index].x, pipe[index].y);
        ctx.drawImage(pipeSorth, pipe[index].x, pipe[index].y + constant);

        pipe[index].x--;

        if(pipe[index].x == 125){
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        if(bX + bird.width >= pipe[index].x && bX+bird.width <= pipe[index].x + pipeNorth.width && (bY <= pipe[index].y + pipeNorth.height || bY + bird.height >= pipe[index].y + constant) || bY + bird.height >= canvas.height - fg.height){
            
            cancelAnimationFrame(id);
            ctx.drawImage(game_over, 0 , canvas.height/2 - game_over.height, game_over.width - 30, game_over.height);
        }

        if(pipe[index].x + pipeNorth.width == bX){
            score_sound.play();
            score++;
        }
        
        ctx.font = "20px fantasy";
        ctx.fillText("Score : " + score, 10,20);
    }
    ctx.drawImage(fg, 0, canvas.height - fg.height);
    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    
}
window.onload = function(){
    draw();
}