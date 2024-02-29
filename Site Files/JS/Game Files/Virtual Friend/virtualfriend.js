/*-- imports --*/

import {Player} from "./Objects/player.js";
import {loadImages} from "./Helper/image-loading.js";
import {executePlayerKeyCode, endPlayerKeyCode, mouseMoevementEvent, mouseDownEvent, mouseUpEvent} from "./Helper/input-handler.js";
import { EmoteButton } from "./UI/emote-button.js";


/*-- display loading and image preloading --*/

let canvas;
let ctx;
const displayWidth = 600;
const displayHeight = 500;
let imageLib;
let mousePos = {x: 0, y: 0};

let eb;
let ui = []


const inputStart = (event) => executePlayerKeyCode(player, event.code);
const inputEnd = (event) => endPlayerKeyCode(player, event.code);
const mouseMove = (event) => mouseMoevementEvent(canvas, mousePos, event);
const mouseDown = (event) => mouseDownEvent(canvas, mousePos, ui, event);
const mouseUp = (event) => mouseUpEvent(canvas, mousePos, ui, event);

window.onload = async function(){
    canvas = document.getElementById("screen");
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    imageLib = await loadImages();
    
    eb = new EmoteButton(canvas); ui.push(eb);


    document.addEventListener('keydown', inputStart);
    document.addEventListener('keyup', inputEnd);
    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('mouseup', mouseUp);
    gameLoop();
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

    //draw player
    player.tick();
    player.draw(ctx, imageLib);
    requestAnimationFrame(gameLoop);

    //draw ui
    
    eb.tick(mousePos);
    eb.draw(ctx);
}