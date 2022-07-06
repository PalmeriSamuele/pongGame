export function doesCollide(a,b){
    let player = a.getBoundingClientRect();
    let ball = b.getBoundingClientRect();
    return !(
        ((player.y + player.height) < (ball.y)) ||
        (player.y > (ball.y + ball.height)) ||
        ((player.x + player.width) < ball.x) ||
        (player.x > (ball.x + ball.width))
    );

}


export function nbAlea(min, max){
 return Math.floor(Math.random() * (max - min + 1)) + min;
}


