/*-- imports --*/
import {executePlayerKeyCode, endPlayerKeyCode, checkVerticalCollision, move, checkHorizontalCollision} from './movement-input-handler.js'
import {Platform, DamagePlatform, WarningPlatform, PlatformGenerator} from './Game Files/platform-generation.js'
import {clamp, lerp} from './Game Files/helper-functions.js'

/*-- initiallize game settings --*/
let screen;
let ctx;
const screenWidth = 600;
const screenHeight = 500;


/*-- initiallize game environment --*/
//player class
class Player {
    constructor(x, y, width, height, color, up, left, down, right){
        this.color = color;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xVel = 0;
        this.yVel = 0;
        this.jumpPow = -12;
        this.acceleration = 0.8;
        this.maxSpeed = 7;
        this.gravity = 0.5;
        this.requestJump = false;
        this.movingTowards = move.NONE;
        this.up = up;
        this.left = left;
        this.down = down;
        this.right = right;
    }
}
//create players
const player1 = new Player(32, 32, 32, 32, "rgb(250 210 210)", "KeyW", "KeyA", "KeyS", "KeyD");
const player2 = new Player(128, 32, 32, 32, "rgb(210 210 250)", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight");
const players = [player1, player2];


//create platforms
const platformArray = [
    new Platform(-64, screenHeight * (8 / 9), screenWidth + 128, screenHeight * (1 / 9), 0),
    new Platform(100, 190, 100, 50, 1000),
    new Platform(50, 300, 200, 50, 1000),
    //new DamagePlatform(50, 300, 200, 50, 100, 500),
]
const warningArray = [
    //new WarningPlatform(400, 300, 200, 50, 200, 1000, 400),
]
const platgen = new PlatformGenerator(warningArray);


/*-- load game --*/
window.onload = function(){
    screen = document.getElementById("screen");
    screen.width = screenWidth;
    screen.height = screenHeight;
    ctx = screen.getContext("2d");
    
    gameLoop();
    document.addEventListener("keydown", inputStart);
    document.addEventListener("keyup", inputEnd);
}


/*-- input handling --*/
function inputStart(event){
    console.log(event.code)
    for(let i = 0; i < players.length; i++){
        executePlayerKeyCode(players[i], platformArray, event.code);
    }
    
}
function inputEnd(event){
    for(let i = 0; i < players.length; i++){
        endPlayerKeyCode(players[i], platformArray, event.code);
    }
}


/*-- game loop --*/
function gameLoop(){
    //clear canvas
    ctx.clearRect(0, 0, screenWidth, screenHeight)

    //player physics
    for(let i = 0; i < players.length; i++){
        players[i].yVel += players[i].gravity;
        if (players[i].movingTowards == move.LEFT){
            players[i].xVel = clamp(players[i].xVel - players[i].acceleration, -players[i].maxSpeed, players[i].maxSpeed);
        } else if (players[i].movingTowards == move.RIGHT){
            players[i].xVel = clamp(players[i].xVel + players[i].acceleration, -players[i].maxSpeed, players[i].maxSpeed);
        } else if (players[i].movingTowards == move.NONE){
            players[i].xVel = lerp(players[i].xVel, 0, 0.3);
        }

        //jump code
        let grounded = checkVerticalCollision(players[i], platformArray, 1);
        if(players[i].requestJump && grounded){
            players[i].yVel = players[i].jumpPow;
        }

        //collision code
        //vertical
        let playerVerticalCollision = checkVerticalCollision(players[i], platformArray, players[i].yVel);
        let playerHorizontalCollision = checkHorizontalCollision(players[i], platformArray, players[i].xVel);
        if(playerVerticalCollision == null){
            //no collision with platform
            players[i].y += players[i].yVel;
        } else if(players[i].yVel > 0){
            //collision with platform going down
            players[i].y = playerVerticalCollision.y - players[i].height;
            players[i].yVel = -Math.floor(players[i].yVel/3);
        } else if(players[i].yVel < 0){
            //collision with platform going up
            players[i].y = playerVerticalCollision.y + playerVerticalCollision.height;
            players[i].yVel = -Math.floor(players[i].yVel/3);
        }
        //horizontal
        if(playerHorizontalCollision == null){
            //no collision with platform
            players[i].x += players[i].xVel;
        } else if(players[i].xVel > 0){
            //collision with platform going right
            players[i].x = playerHorizontalCollision.x - players[i].width;
            players[i].xVel = 0;
        } else if(players[i].xVel < 0){
            //collision with platform going left
            players[i].x = playerHorizontalCollision.x + playerHorizontalCollision.width;
            players[i].xVel = 0;
        }
        
        //map loop code
        if(players[i].x < -players[i].width){
            players[i].x = screenWidth;
        } else if(players[i].x > screenWidth + players[i].width){
            players[i].x = -players[i].width;
        }
    }
    
    //tick platform generator
    platgen.tick();

    //update and draw platforms
    for(let i = 0; i < platformArray.length; i++){
        

        //draw normal platforms:
        if(platformArray[i] instanceof Platform){
            ctx.fillStyle = "rgba(210, 210, 210, " + 
                                      ((platformArray[i].trueTime == 0) ? 1 : (platformArray[i].time / platformArray[i].trueTime)) + ")";
            ctx.fillRect(platformArray[i].x, 
                        platformArray[i].y, 
                        platformArray[i].width, 
                        platformArray[i].height);
        }
        //draw damage platforms:
        else if(platformArray[i] instanceof DamagePlatform){
            ctx.fillStyle = "rgba(210, 210, 210, 1)";
            ctx.fillRect(platformArray[i].x, 
                platformArray[i].y, 
                platformArray[i].width, 
                platformArray[i].height);
            ctx.fillStyle = "rgba(255, 255, 255, " + (platformArray[i].time / platformArray[i].trueTime)/2 + ")";
            ctx.fillRect(platformArray[i].x, 
                platformArray[i].y, 
                platformArray[i].width, 
                platformArray[i].height);


            
            ctx.fillStyle = "rgba(250, 150, 150, "+ (platformArray[i].time / platformArray[i].trueTime) + ")";
            ctx.fillRect(
                platformArray[i].x + (( platformArray[i].width / 2) * (1 - (platformArray[i].time / platformArray[i].trueTime))),
                platformArray[i].y,
                platformArray[i].width * (platformArray[i].time / platformArray[i].trueTime),
                platformArray[i].height,
            )


        }

        if(platformArray[i].delete){
            platformArray.splice(i, 1);
            continue;
        }
        platformArray[i].tick(platformArray);
    }

    //update and draw warnings
    for(let i = 0; i < warningArray.length; i++){
        warningArray[i].tick(platformArray);
        

        ctx.fillStyle = "rgba(250, 150, 150, " + (1 - (warningArray[i].time / warningArray[i].trueTime)) +")";
        ctx.fillRect(warningArray[i].x, 
                    warningArray[i].y, 
                    warningArray[i].width, 
                    warningArray[i].height);
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillRect(
            warningArray[i].x,
            warningArray[i].y + (( warningArray[i].height / 2) * (1 - (warningArray[i].time / warningArray[i].trueTime))),
            warningArray[i].width,
            warningArray[i].height * (warningArray[i].time / warningArray[i].trueTime),
        )
        
        if(warningArray[i].delete){
            warningArray.splice(i, 1);
            continue;
        }
    }

    //draw players
    for(let i = 0; i < players.length; i++){
        ctx.fillStyle = players[i].color;
        ctx.fillRect(players[i].x, players[i].y, 32, 32);
    }

    //next frame
    requestAnimationFrame(gameLoop);
}