/*-- imports --*/

import {Player} from "./Objects/player.js";
import {loadImages} from "./Helper/image-loading.js";
import {executePlayerKeyCode, endPlayerKeyCode, mouseMoevementEvent, mouseDownEvent, mouseUpEvent} from "./Helper/input-handler.js";
import {EmoteButton} from "./UI/emote-button.js";
import {EmoteSlotButton} from "./UI/emote-slot-button.js";


/*-- display loading and image preloading --*/

let canvas;
let ctx;
const displayWidth = 600;
const displayHeight = 500;
let imageLib;
let mousePos = {x: 0, y: 0};

let eb;     //emote button
let esb1;   //emote slot button 1
let esb2;   //emote slot button 2
let esb3;   //emote slot button 3
let esb4;   //emote slot button 4
let esb5;   //emote slot button 5
let ui = []


const inputStart = (event) => executePlayerKeyCode(player, event.code);
const inputEnd = (event) => endPlayerKeyCode(player, event.code);
const mouseMove = (event) => mouseMoevementEvent(canvas, mousePos, event);
const mouseDown = (event) => mouseDownEvent(canvas, mousePos, ui, player, event);
const mouseUp = (event) => mouseUpEvent(canvas, mousePos, ui, player, event);

window.onload = async function(){
    canvas = document.getElementById("screen");
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    imageLib = await loadImages();
    
    eb = new EmoteButton(canvas); ui.push(eb);
    esb1 = new EmoteSlotButton(canvas, 80, 80); ui.push(esb1);
    esb2 = new EmoteSlotButton(canvas, 80, 80); ui.push(esb2);
    esb3 = new EmoteSlotButton(canvas, 80, 80); ui.push(esb3);
    esb4 = new EmoteSlotButton(canvas, 80, 80); ui.push(esb4);
    esb5 = new EmoteSlotButton(canvas, 80, 80); ui.push(esb5);
    ui.sort((a, b) => a.z - b.z);


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
    
    ui.forEach((element) => {
        element.tick(mousePos); 
        element.draw(ctx, imageLib)
    });
}