import {Player} from "./Objects/player.js";
import {loadImages} from "./Helper/image-loading.js";


let canvas;
let ctx;
const displayWidth = 600;
const displayheight = 500;
let myimages;
window.onload = async function(){
    canvas = document.getElementById("screen");
    canvas.width = displayWidth;
    canvas.height = displayheight;
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    myimages = await loadImages();

    gameLoop();
}

let me = new Player(53, 53);

function gameLoop() {

    ctx.drawImage(myimages.player, me.x, me.y, me.width, me.height);
    requestAnimationFrame(gameLoop);
}