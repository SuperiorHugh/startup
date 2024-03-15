/*-- imports --*/

import {Player} from "./Objects/player.js";
import {loadImages} from "./Helper/image-loading.js";
import {executePlayerKeyCode, endPlayerKeyCode, mouseMoevementEvent, mouseDownEvent, mouseUpEvent} from "./Helper/input-handler.js";
import {EmoteButton} from "./UI/emote-button.js";
import {EmoteSlotButton} from "./UI/emote-slot-button.js";
import {EmoteAmount} from "./UI/emote-amount.js";
import {Chair, Table, BarTable, TileGround, Bartender} from "./Objects/cafe-objects.js";
import {InteractOrb} from "./UI/interact-orb.js";
import {lerp} from "./Helper/helper-functions.js";


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
let iorb;   //interact orb
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
    iorb = new InteractOrb(128, 128); ui.push(iorb);
    ui.sort((a, b) => a.z - b.z);

    ea = new EmoteAmount(32, 32); gui.push(ea);


    document.addEventListener('keydown', inputStart);
    document.addEventListener('keyup', inputEnd);
    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('mouseup', mouseUp);
    gameLoop();
}


/*-- create player --*/

let player = new Player(displayWidth/2 - 58/2, displayHeight/2 - 58/2, document.getElementById('username-visual').innerText, ui, gui);

/*-- create environment --*/

let chair1 = new Chair(256, 256, 'right');
let chair2 = new Chair(416, 256, 'back');
let chair3 = new Chair(530, 190, 'right');
let chair4 = new Chair(140, 185, 'front');
let chair5 = new Chair(30, 256, 'left');
let table = new Table(displayWidth * (1/6), 256);
let table2 = new Table(displayWidth * (5/6) - 132, 196);
let bartable = new BarTable(displayWidth/2 - 224/2, 128);
let bartender = new Bartender(displayWidth/2 - 58/2, 76);

/*-- create background --*/

let background = new TileGround(displayWidth/2 - 436/2, displayHeight/2 - 312/2);

//allows for future multiplayer support

let environment = [
    player,
    chair1,
    chair2,
    chair3,
    chair4,
    chair5,
    table,
    table2,
    bartable,
    bartender,
];

/*-- game loop --*/

function gameLoop() {
    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.fillStyle = document.body.style.getPropertyValue('--buttoncolor')
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    //draw environment (players, objs, etc.)
    environment.sort((a, b) => a.y - b.y);//draw in correct order
    background.tick();
    background.draw(ctx, imageLib);
    environment.forEach((item, i) => {
        item.tick(environment);
        item.draw(ctx, imageLib);
    });

    //draw ui
    ui.forEach((element) => {
        element.tick(mousePos); 
        element.draw(ctx, imageLib)
    });
    //draw gui
    gui.forEach((element) => {
        element.tick(mousePos); 
        element.draw(ctx, imageLib)
    });

    e(environment);
    requestAnimationFrame(gameLoop);
}

//player in range of usable env

function e(environment){
    let interactables = []
    environment.forEach((val, i) => {
        if(val.interactable){
            let dist = Math.sqrt(Math.pow(player.x - val.x, 2) + Math.pow(player.y - val.y, 2));
            if(dist < 80)
                interactables.push([val, dist]);
        }
    })
    let nearestInteractable;
    for(const i of interactables)
        if(!nearestInteractable || i[1] < nearestInteractable[1])
            nearestInteractable = i;
    console.log(iorb.radius)
    if(nearestInteractable && iorb.radius > 0){
        iorb.x = lerp(iorb.x, nearestInteractable[0].x + nearestInteractable[0].width/2, 0.1);
        iorb.y = lerp(iorb.y, nearestInteractable[0].y + nearestInteractable[0].height/2, 0.1);
        iorb.subject = nearestInteractable[0];
    } else if (nearestInteractable && iorb.radius == 0){
        iorb.x = nearestInteractable[0].x + nearestInteractable[0].width/2;
        iorb.y = nearestInteractable[0].y + nearestInteractable[0].height/2;
        iorb.subject = nearestInteractable[0];
    } else {
        iorb.subject = null;
    }
}