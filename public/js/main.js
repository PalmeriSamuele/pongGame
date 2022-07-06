// recup des batonss / sticks
let player1 = document.getElementById('stick1');
let player1_rect = player1.getBoundingClientRect();
let player2 = document.getElementById('stick2');
let player2_rect = player2.getBoundingClientRect();
// ball 
let ball = document.getElementById('ball');
let ball_rect = ball.getBoundingClientRect();

console.log(player1_rect);
console.log(player2_rect);
console.log(ball_rect);
// hit box for the ball 
let boxWidth = document.getElementById('game').clientWidth;
let boxHeight = document.getElementById('game').clientHeight;

let left_side = document.getElementById('left_side');

left_side.addEventListener("mousemove",moveStick)

function keyDownMove(){

}
function moveStick(e){
    player1.style.top = e.clientY + window.pageYOffset+'px';
}

function nbAlea(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}


let score1,score2;
function trowTheBall() {
    let leftPos = ball_rect.x, topPos = ball_rect.y;
    let  x_dir = nbAlea(0,10), y_dir = nbAlea(0,10);
    function animate() {
        

        let maxWidth = boxWidth-ball_rect.width,maxHeight = boxHeight-ball_rect.height, maxVit = 10;
        // BORDURE DROITE
        if (leftPos >= maxWidth) {
            score2 = parseInt(document.getElementById('point_player_1').textContent);
            score2+=1;
            document.getElementById('point_player_1').textContent = score2;
            x_dir = nbAlea(-maxVit,-1);
        }
        if ( topPos >= maxHeight) {
    
            y_dir = nbAlea(-maxVit,-1);
        }
        // BORDURE GAUCHE
        if (leftPos <= 0) {
            score1 = parseInt(document.getElementById('point_player_2').textContent);
            score1+=1;
            document.getElementById('point_player_2').textContent = score1;
            x_dir = nbAlea(1,maxVit);
        }
        if (topPos <=  0) {

            y_dir = nbAlea(1,maxVit);
        }
        if (doesCollide(player1,ball) == true){
            console.log('ouihuuuu');
            x_dir = nbAlea(1,maxVit);
        }
        if (doesCollide(player2,ball) == true){
            console.log('ouihuuuu');
            x_dir = nbAlea(-maxVit,-1);
        }
        leftPos += x_dir;
        topPos += y_dir;
        ball.style.left = `${leftPos}px`;
        ball.style.top = `${topPos}px`;
        id_animation= requestAnimationFrame(animate);
    }
    
    id_animation = requestAnimationFrame(animate);
    

}

document.getElementById('play_btn').addEventListener('click',trowTheBall);


function doesCollide(a,b){
    let player = a.getBoundingClientRect();
    let ball = b.getBoundingClientRect();
    return !(
        ((player.y + player.height) < (ball.y)) ||
        (player.y > (ball.y + ball.height)) ||
        ((player.x + player.width) < ball.x) ||
        (player.x > (ball.x + ball.width))
    );

}