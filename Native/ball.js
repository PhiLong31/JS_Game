import {detectionCollision} from "./collisionDetection.js";
export default class Ball{
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.radius = 7;
        this.game = game;
        this.reset();
    }

    reset(){
        this.position = {
            x: 10,
            y: 150
        }
        this.speed = {
            x: 3,
            y: 3
        }
    }

    draw(ctx){
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }

    update(deltaTime){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // Wall on left and right

        if(this.position.x - this.radius < 0 || this.position.x + this.radius > this.gameWidth ){
            this.speed.x = -this.speed.x;
        }

        // Wal on top and bottom
        if(this.position.y - this.radius < 0){
            this.speed.y = -this.speed.y;
        }

        if(this.position.y + this.radius > this.gameHeight){
            this.game.lives--;
            this.reset();
        }

        // collision with paddle

        if(detectionCollision(this, this.game.paddle)){
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.radius;
        }

    }   
}