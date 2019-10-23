import {detectionCollision} from "./collisionDetection.js";
export default class Bricks{
    constructor(game, position){
        this.width = 35;
        this.height = 20;
        this.position = position;
        this.game = game;

        this.markedFordeletion = false;
    }

    update(){
        if(detectionCollision(this.game.ball, this)){
           this.game.ball.speed.y = -this.game.ball.speed.y;
           this.markedFordeletion = true;
        }
    }

    draw(ctx){
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}