import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import Bricks from "./bricks.js";

import {buildLevel, level1, level2} from "./level.js";

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4,
}

export default class Game{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gameObjects = [];
        this.gameState = GAMESTATE.MENU;
        this.lives = 3;
        this.bricks = [];

        this.levels = [level1, level2];
        this.currentLevel = 0;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        
        new InputHandler(this, this.paddle);
    }
    
    start(){

        if(this.gameState !== GAMESTATE.MENU && this.GAMESTATE !== GAMESTATE.NEWLEVEL) return;

        this.gameState = GAMESTATE.RUNNING;
        this.ball.reset();
        this.bricks = buildLevel(this, this.levels[this.currentLevel]);

        this.gameObjects = [this.paddle, this.ball];
    }

    update(deltaTime){

        if(this.lives === 0) this.gameState = GAMESTATE.GAMEOVER;

        if(this.gameState === GAMESTATE.PAUSED || this.gameState === GAMESTATE.MENU || this.gameState === GAMESTATE.GAMEOVER) return;

        if(this.bricks.length === 0){
            this.currentLevel++;
            this.gameState = GAMESTATE.NEWLEVEL;
            this.start();
        }

        [...this.gameObjects, ... this.bricks].forEach(objects => objects.update(deltaTime));

        //delete Brick if ball collision with brick
        this.bricks = this.bricks.filter(brick => !brick.markedFordeletion);
    }
    draw(ctx){
        [...this.gameObjects, ... this.bricks].forEach(objects => objects.draw(ctx));

        if(this.gameState === GAMESTATE.MENU){
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press ALT to start", this.gameWidth/2, this.gameHeight/2);
        }

        if(this.gameState === GAMESTATE.PAUSED){
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,.8)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACE to start", this.gameWidth/2, this.gameHeight/2);
        }

        if(this.gameState === GAMESTATE.GAMEOVER){
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth/2, this.gameHeight/2);
        }
    }

    togglePaused(){
        if(this.gameState == GAMESTATE.PAUSED){
            this.gameState = GAMESTATE.RUNNING;
        }
        else this.gameState = GAMESTATE.PAUSED;
    }
}