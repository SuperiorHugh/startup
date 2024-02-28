let screen;
let ctx;
const width = 600;
const height = 500;

class Player {
    constructor (){

    }
}

window.onload = function(){
    screen = document.getElementById("screen");
    screen.width = screenWidth;
    screen.height = screenHeight;
    ctx = screen.getContext("2d");
    
    gameLoop();
    document.addEventListener("keydown", inputStart);
    document.addEventListener("keyup", inputEnd);
}

function gameLoop() {
    
    requestAnimationFrame(gameLoop);
}