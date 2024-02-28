import {Player} from "./Objects/player.js";
import {loadImages} from "./Helper/image-loading.js";
import {executePlayerKeyCode, endPlayerKeyCode} from "./Helper/input-handler.js";


let canvas;
let ctx;
const displayWidth = 600;
const displayheight = 500;
let imageLib;

window.onload = async function(){
    canvas = document.getElementById("screen");
    canvas.width = displayWidth;
    canvas.height = displayheight;
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    imageLib = await loadImages();
    
    gameLoop();
    document.addEventListener('keydown', inputStart);
    document.addEventListener('keyup', inputEnd);
}


let player = new Player(53, 53);

function inputStart(event){
    executePlayerKeyCode(player, event.code);
}
function inputEnd(event){
    endPlayerKeyCode(player, event.code);
}

let players = [
    player
];

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.drawSelf(ctx, imageLib);
    player.tick();
    requestAnimationFrame(gameLoop);
}