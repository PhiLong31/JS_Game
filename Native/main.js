import Game from "./game.js";

let cavnas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let lastTime = 0;
let game = new Game(GAME_WIDTH, GAME_HEIGHT);

function gameLoop(timestamp){

    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    game.draw(ctx);
    game.update(deltaTime);    

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
 