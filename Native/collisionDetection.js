export function detectionCollision(ball, gameObject){
    let bottomOfBall = ball.position.y + ball.radius;
    let topOfBall = ball.position.y - ball.radius;
    let rightOfBall = ball.position.x + ball.radius;
    let leftOfBall = ball.position.x - ball.radius;

    if(bottomOfBall > gameObject.position.y
    && topOfBall < gameObject.position.y + gameObject.height
    && rightOfBall > gameObject.position.x
    && leftOfBall < gameObject.position.x + gameObject.width){
        return true;
    }
    else return false;
}