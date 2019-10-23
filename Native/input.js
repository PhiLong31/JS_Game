import Game from "./game.js";

export default class InputHandler{
    constructor(game, paddle){
        document.addEventListener("keydown", (evt) =>{
            switch(evt.keyCode){
                case 37:{
                    paddle.moveLeft();
                    break;
                }
                case 39:{
                    paddle.moveRight();
                    break;
                }

                case 32:{
                    game.togglePaused();
                    break;
                }

                case 18:{
                    game.start();
                    break;
                }
            }
        })

        document.addEventListener("keyup", (evt) =>{
            switch(evt.keyCode){
                case 37:{
                    if(paddle.speed < 0) paddle.stop();
                    break;
                }
                case 39:{
                    if(paddle.speed > 0) paddle.stop();
                    break;
                }
            }
        })
    }
}