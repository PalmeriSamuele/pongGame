
import { nbAlea, doesCollide } from "./functions.js";

// recup des batonss / sticks
let player1 = document.getElementById('stick1');

let player2 = document.getElementById('stick2');
let id_animation;
// ball 
let ball = document.getElementById('ball');
let ball_rect = ball.getBoundingClientRect();

let boxWidth = document.getElementById('game_box').clientWidth;
let boxHeight = document.getElementById('game_box').clientHeight;
let bodyLeft = document.getElementById('game_box').offsetLeft;
let bodyTop = document.getElementById('game_box').offsetTop;

let score1,score2;
export function trowTheBall() {
    let leftPos = ball_rect.x, topPos = ball_rect.y, minVit = 5,maxVit = 5;
    let  x_dir = nbAlea(-10,10), y_dir = nbAlea(-10,10);   // lancer initiale dans n'importe quel direction
    function animate() {
        

        let maxWidth = boxWidth-ball_rect.width, maxHeight = boxHeight-ball_rect.height;
        // BORDURE DROITE
        if (leftPos >= maxWidth) {
            score2 = parseInt(document.getElementById('point_player_1').textContent);
            score2+=1;
            document.getElementById('point_player_1').textContent = score2;
            x_dir = nbAlea(-maxVit,-minVit);
        }
        if ( topPos >= maxHeight) {
    
            y_dir = nbAlea(-maxVit,-minVit);
        }
        // BORDURE GAUCHE
        if (leftPos <= 0) {
            score1 = parseInt(document.getElementById('point_player_2').textContent);
            score1+=1;
            document.getElementById('point_player_2').textContent = score1;
            x_dir = nbAlea(minVit,maxVit);
        }
        if (topPos <=  0) {

            y_dir = nbAlea(minVit,maxVit);
        }
        if (doesCollide(player1,ball) == true){
          
            x_dir = nbAlea(minVit,maxVit);
        }
        if (doesCollide(player2,ball) == true){
           
            x_dir = nbAlea(-maxVit,-minVit);
        }
        leftPos += x_dir;
        topPos += y_dir;
        ball.style.left = `${leftPos}px`;
        ball.style.top = `${topPos}px`;
        id_animation= requestAnimationFrame(animate);
    }
    
    id_animation = requestAnimationFrame(animate);
    

}