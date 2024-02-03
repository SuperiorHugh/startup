/*-- imports --*/
import {executePlayerKeyCode, endPlayerKeyCode, checkVerticalCollision, move, checkHorizontalCollision} from './movement-input-handler.js'


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

//platform class
class Platform {
    constructor(x, y, width, height, time){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.delete = false;
        this.time = time;
        this.trueTime = time; 
        this.allowtick = time != 0;
    }

    tick(){
        if(!this.allowtick)
            return;

        this.time--;
        this.delete = this.time <= 0;

    }
    verticalDistToPlayer(player) {
        return this.y - player.y;
    }
    horizontalDistToPlayer(player){
        return this.x - player.x;
    }
}
class DamagePlatform {
    constructor(x, y, width, height, time, pTime){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.time = time;//current p time
        this.pTime = pTime; //after destruction p time
        this.trueTime = time;
        this.delete = false;
    }
    
    tick(pa){
        this.time--;
        if(this.time <= 0){
            this.delete = true;
            pa.push(new Platform(this.x, this.y, this.width, this.height, this.pTime));
        }
    }
    verticalDistToPlayer(player) {
        return this.y - player.y;
    }
    horizontalDistToPlayer(player){
        return this.x - player.x;
    }
}

class WarningPlatform {
    constructor(x, y, width, height, time, pTime, dTime){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.time = time;//current p time
        this.pTime = pTime;
        this.dTime = dTime; //after destruction p time
        this.trueTime = time;
        this.delete = false;
    }

    tick(pa){
        this.time--;
        if(this.time <= 0){
            this.delete = true;
            pa.push(new DamagePlatform(this.x, this.y, this.width, this.height, this.dTime, this.pTime));
        }
    }
}
//create platforms
const platformArray = [
    new Platform(-64, screenHeight * (8 / 9), screenWidth + 128, screenHeight * (1 / 9), 0),
    //new Platform(100, 190, 100, 50, "rgb(210 230 210)"),
    new DamagePlatform(50, 300, 200, 50, 100, 500),
]
const warningArray = [
    new WarningPlatform(400, 300, 200, 50, 200, 100, 100),
]


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


/*-- helper functions --*/
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
function clamp(value, min, max){
    return Math.min(Math.max(value, min), max);
}
function lerp(current, goto, amount) {
    return current + amount * (goto - current);
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
    
    //update and draw platforms
    for(let i = 0; i < platformArray.length; i++){
        platformArray[i].tick(platformArray);

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
            ctx.fillStyle = "rgba(250, 150, 150, "+ 
                                      (platformArray[i].time / platformArray[i].trueTime) + ")";
            ctx.fillRect(platformArray[i].x, 
                platformArray[i].y, 
                platformArray[i].width, 
                platformArray[i].height);
        }

        if(platformArray[i].delete){
            platformArray.splice(i, 1);
            continue;
        }
    }

    //update and draw warnings
    for(let i = 0; i < warningArray.length; i++){
        warningArray[i].tick(platformArray);
        

        ctx.fillStyle = "rgba(250, 150, 150, " + (1 - (warningArray[i].time / warningArray[i].trueTime)) +")";
        ctx.fillRect(warningArray[i].x, 
                    warningArray[i].y, 
                    warningArray[i].width, 
                    warningArray[i].height);
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.fillRect(
            warningArray[i].x + (( warningArray[i].width / 2) * (1 - (warningArray[i].time / warningArray[i].trueTime))),
            warningArray[i].y + (( warningArray[i].height / 2) * (1 - (warningArray[i].time / warningArray[i].trueTime))),
            warningArray[i].width * (warningArray[i].time / warningArray[i].trueTime),
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