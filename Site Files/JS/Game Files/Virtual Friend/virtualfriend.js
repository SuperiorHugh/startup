import {loadImages} from "./Helper/image-loading";

let canvas;
let ctx;
const displayWidth = 600;
const displayheight = 500;

window.onload = async function(){
    canvas = document.getElementById("screen");
    canvas.width = displayWidth;
    canvas.height = displayheight;
    ctx = canvas.getContext("2d");
    
    let myimages = await loadImages();

    gameLoop();
}

function gameLoop() {
    

    requestAnimationFrame(gameLoop);
}