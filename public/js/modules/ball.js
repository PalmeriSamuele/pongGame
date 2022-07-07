
import { nbAlea, doesCollide } from "./functions.js";

// recup des batonss / sticks
let player1 = document.getElementById('stick1');

let player2 = document.getElementById('stick2');
let player2_rect = player2.getBoundingClientRect();
let id_animation;
// ball 
let ball = document.getElementById('ball');
let ball_rect = ball.getBoundingClientRect();

let boxWidth = document.getElementById('game_box').clientWidth;
let boxHeight = document.getElementById('game_box').clientHeight;
let bodyLeft = document.getElementById('game_box').offsetLeft;
let bodyTop = document.getElementById('game_box').offsetTop;

let score1,score2;

// lance la balle et gere la logique de jeu
export function trowTheBall() {
    console.log(ball_rect);
    let leftPos = ball_rect.left, topPos = ball_rect.bottom, minVit = 5,maxVit = 5;
    const pos_left = ball_rect.left, pos_top = ball_rect.top;
    const vit_const = 5;
    let y_dir = nbAlea(-maxVit,maxVit);   // lancer initiale dans n'importe quel direction
    let x_dir;
    switch(Math.round(Math.random())){
        case 0:
            x_dir = nbAlea(-minVit,-maxVit);
            break;
        case 1:
            x_dir = nbAlea(minVit,maxVit);
            break;
    }
    function animate() {
        moveStick2();    // on fait bouger l'adversaire
        let maxWidth = boxWidth-ball_rect.width, maxHeight = boxHeight-ball_rect.height;
        // BORDURE DROITE
        if ( leftPos>= maxWidth) {
            document.getElementById("sound_loser").play();   // on joue le son
            score1 = parseInt(document.getElementById('point_player_1').textContent);    // on augmente le score
            score1+=1;
            maxVit = vit_const;
            minVit = vit_const;
            document.getElementById('point_player_1').textContent = score1;
            x_dir = nbAlea(minVit,maxVit)     // on choisit des nouvelles directions
            y_dir = nbAlea(-maxVit,maxVit); 
            
            ball.style.left = `${pos_left}px`;    // on reset la ball
            ball.style.top = `${pos_top}px`;
            leftPos = pos_left;
            topPos = pos_top;
        }
        if ( topPos >= maxHeight) {
            document.getElementById("sound_ball").play();
            y_dir = nbAlea(-maxVit,-minVit);
        }
        // BORDURE GAUCHE
        if (leftPos <= 0) {
            document.getElementById("sound_loser").play();
            score2 = parseInt(document.getElementById('point_player_2').textContent);
            score2+=1;
            document.getElementById('point_player_2').textContent = score2;
            maxVit = vit_const;
            minVit = vit_const;
            
            x_dir = nbAlea(-minVit,-maxVit)
            y_dir = nbAlea(-maxVit,maxVit); 
            ball.style.left = `${pos_left}px`;
            ball.style.top = `${pos_top}px`;
            leftPos = pos_left;
            topPos = pos_top;
        }
        if (topPos <=  0) {
          
            document.getElementById("sound_ball").play();
            y_dir = nbAlea(minVit,maxVit);
        }
        if (doesCollide(player1,ball) == true){
            document.getElementById("sound_laser").play();
            maxVit*=1.2;
            minVit*=1.2;
            x_dir = nbAlea(minVit,maxVit);
        }
        if (doesCollide(player2,ball) == true){
            document.getElementById("sound_laser").play();
            maxVit*=1.2;
            minVit*=1.2;
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

function moveStick2(){
    // player2.style.top = _ball.top - player2_rect.height*1.8+'px';
    let maxHeight = boxHeight-player2_rect.height;

    let topPos = player2_rect.top, minVit = 1,maxVit =1;
    let y_dir = nbAlea(-maxVit,minVit);
    console.log(maxHeight);
    function animateStick(){
        console.log(topPos);
        console.log(ball_rect.top);
        if ( topPos >= maxHeight) {
       
            y_dir = -5;
            
        }
        if (topPos <=  0) {
              
            y_dir = 5;
        }
        topPos += y_dir;
        player2.style.top = `${topPos}px`;
        requestAnimationFrame(animateStick);
    }
    animateStick();

}


function reset(){
    ball.style.top = '50%';
    ball.style.left = '50%'
}