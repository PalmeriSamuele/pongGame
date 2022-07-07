// recup des batonss / sticks
import { trowTheBall } from "./modules/ball.js";

let left_side = document.getElementById('left_side');
let player1 = document.getElementById('stick1');

let player1_rect = player1.getBoundingClientRect();


left_side.addEventListener("mousemove",moveStick);


document.getElementById('play_btn').addEventListener('click',trowTheBall);

function moveStick(e){
    player1.style.top = e.clientY - player1_rect.height*1.8 +'px';
}