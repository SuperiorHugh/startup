/*-- imports --*/

import {Player} from "./Objects/player.js";
import {loadImages} from "./Helper/image-loading.js";
import {executePlayerKeyCode, endPlayerKeyCode} from "./Helper/input-handler.js";


/*-- display loading and image preloading --*/

let canvas;
let ctx;
const displayWidth = 600;
const displayHeight = 500;
let imageLib;

const inputStart = (event) => executePlayerKeyCode(player, event.code);
const inputEnd = (event) => endPlayerKeyCode(player, event.code);

window.onload = async function(){
    canvas = document.getElementById("screen");
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    imageLib = await loadImages();
    
    gameLoop();
    document.addEventListener('keydown', inputStart);
    document.addEventListener('keyup', inputEnd);
}


/*-- create player --*/

let player = new Player(53, 53, document.getElementById('username-visual').innerText);

//allows for future multiplayer support
let players = [
    player
];


/*-- game loop --*/

function gameLoop() {
    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.fillStyle = document.body.style.getPropertyValue('--buttonhovercolor')
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    player.drawSelf(ctx, imageLib);
    player.tick();
    requestAnimationFrame(gameLoop);
}