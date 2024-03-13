/*-- imports --*/

import {Player} from "./Objects/player.js";
import {loadImages} from "./Helper/image-loading.js";
import {executePlayerKeyCode, endPlayerKeyCode, mouseMoevementEvent, mouseDownEvent, mouseUpEvent} from "./Helper/input-handler.js";
import {EmoteButton} from "./UI/emote-button.js";
import {EmoteSlotButton} from "./UI/emote-slot-button.js";
import {EmoteAmount} from "./UI/emote-amount.js";
import {Chair, Table, BarTable, TileGround, Bartender} from "./Objects/cafe-objects.js";


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
let ui = [];    //interactable

let ea;     //emote amount
let gui = [];   //pure graphical


const inputStart = (event) => executePlayerKeyCode(player, event.code);
const inputEnd = (event) => endPlayerKeyCode(player, event.code);
const mouseMove = (event) => mouseMoevementEvent(canvas, mousePos, event);
const mouseDown = (event) => mouseDownEvent(canvas, mousePos, ui, player, imageLib, event);
const mouseUp = (event) => mouseUpEvent(canvas, mousePos, ui, player, imageLib, event);

window.onload = async function(){
    canvas = document.getElementById("screen");
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    imageLib = await loadImages();
    
    eb = new EmoteButton(canvas); ui.push(eb);
    esb1 = new EmoteSlotButton(canvas, canvas.width*(1/10), canvas.height*(7/8), 'laugh'); ui.push(esb1);
    esb2 = new EmoteSlotButton(canvas, canvas.width*(3/10), canvas.height*(6/8), 'happy'); ui.push(esb2);
    esb3 = new EmoteSlotButton(canvas, canvas.width*(5/10), canvas.height*(5/8), 'bruh'); ui.push(esb3);
    esb4 = new EmoteSlotButton(canvas, canvas.width*(7/10), canvas.height*(6/8), 'sad'); ui.push(esb4);
    esb5 = new EmoteSlotButton(canvas, canvas.width*(9/10), canvas.height*(7/8), 'angry'); ui.push(esb5);
    ea = new EmoteAmount(32, 32); gui.push(ea);
    ui.sort((a, b) => a.z - b.z);


    document.addEventListener('keydown', inputStart);
    document.addEventListener('keyup', inputEnd);
    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('mouseup', mouseUp);
    gameLoop();
}


/*-- create player --*/

let player = new Player(53, 53, document.getElementById('username-visual').innerText, ui, gui);

/*-- create environment --*/

let chair1 = new Chair(256, 256, 'front');
let chair2 = new Chair(312, 256, 'back');
let chair3 = new Chair(312, 312, 'right');
let chair4 = new Chair(256, 312, 'left');
let table = new Table(128, 128);
let bartable = new BarTable(16, 256);
let bartender = new Bartender(16, 150);

/*-- create background --*/

let background = new TileGround(32, 32);

//allows for future multiplayer support

let environment = [
    player,
    chair1,
    chair2,
    chair3,
    chair4,
    table,
    bartable,
    bartender,
];

/*-- game loop --*/

function gameLoop() {
    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.fillStyle = document.body.style.getPropertyValue('--buttonhovercolor')
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    //draw environment (players, objs, etc.)
    environment.sort((a, b) => a.y - b.y);//draw in correct order
    background.tick();
    background.draw(ctx, imageLib);
    environment.forEach((item, i) => {
        item.tick();
        item.draw(ctx, imageLib);
    })
    requestAnimationFrame(gameLoop);

    //draw ui
    ui.forEach((element) => {
        element.tick(mousePos); 
        element.draw(ctx, imageLib)
    });

    gui.forEach((element) => {
        element.tick(mousePos); 
        element.draw(ctx, imageLib)
    });
}