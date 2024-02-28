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
    
    myimages = await loadImages();

    gameLoop();
}

function gameLoop() {
    
    ctx.drawImage(myimages[0], 32, 32)
    requestAnimationFrame(gameLoop);
}