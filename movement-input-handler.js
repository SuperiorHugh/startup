/*-- initiallize enumerators --*/
export const move = {
    NONE: 0,
    LEFT: 1,
    RIGHT: 2,
};


/*-- collision checking functions --*/
//vertical collision
export function checkVerticalCollision(player, platformArray, yVel){
    const collidables = [];
    for(let i = 0; i < platformArray.length; i++){
        if ((platformArray[i].x < player.x + player.width && platformArray[i].x > player.x) ||
        (platformArray[i].x < player.x && platformArray[i].x + platformArray[i].width > player.x + player.width) ||
        (platformArray[i].x + platformArray[i].width > player.x && platformArray[i].x + platformArray[i].width < player.x + player.width)){
            if (yVel > 0 && (player.y + player.height + yVel > platformArray[i].y) && (player.y < platformArray[i].y)){
                collidables.push(platformArray[i])
            } else if (yVel < 0 && (player.y + yVel < platformArray[i].y + platformArray[i].height) && (player.y > platformArray[i].y)){
                collidables.push(platformArray[i])
            }
        }
    }
    
    let closestCollidable;
    let closestDist;
    for(let i = 0; i < collidables.length; i++){
        if ((closestCollidable == null) || (collidables[i].verticalDistToPlayer(player) < closestDist)){
            closestCollidable = collidables[i];
            closestDist = collidables[i].verticalDistToPlayer(player);
        }
    }
    return closestCollidable;
}
//horizontal collision
export function checkHorizontalCollision(player, platformArray, xVel){
    const collidables = [];
    for(let i = 0; i < platformArray.length; i++){
        if((player.y < platformArray[i].y && player.y + player.height > platformArray[i].y) ||
        (player.y > platformArray[i].y && player.y + player.height < platformArray[i].y + platformArray[i].height) ||
        (player.y < platformArray[i].y + platformArray[i].height && player.y + player.height > platformArray[i].y + platformArray[i].height)){
            if (xVel > 0 && (player.x + player.width + xVel > platformArray[i].x) && (player.x < platformArray[i].x)){
                collidables.push(platformArray[i])
                
            } else if (xVel < 0 && (player.x + xVel < platformArray[i].x + platformArray[i].width) && (player.x > platformArray[i].x)){
                collidables.push(platformArray[i])
                
            }
        }
    }

    let closestCollidable;
    let closestDist;
    for(let i = 0; i < collidables.length; i++){
        if ((closestCollidable == null) || (collidables[i].horizontalDistToPlayer(player) < closestDist)){
            closestCollidable = collidables[i];
            closestDist = collidables[i].horizontalDistToPlayer(player);
        }
    }
    return closestCollidable;
}


/*-- player keyCode executes --*/
//button pressed
export function executePlayerKeyCode(player, platformArray, keyCode){
    //jump keyCodes
    if(keyCode == player.up){
        if(player.gravity != 1.5){
            player.gravity = 0.4;
        }
        player.requestJump = true;
    } else if(keyCode == player.down){
        player.gravity = 1.5;
    }

    //move keyCodes
    if(keyCode == player.left){
        player.movingTowards = move.LEFT;
    } else if(keyCode == player.right){
        player.movingTowards = move.RIGHT;
    }
}
//button let go
export function endPlayerKeyCode(player, platformArray, keyCode){
    //jump keyCodes
    if(keyCode == player.up){
        if(player.gravity != 1.5){
            player.gravity = 0.8;
        }
        player.requestJump = false;
    } else if(keyCode == player.down){
        player.gravity = 0.8;
    }

    //move keyCodes
    if(player.movingTowards == move.LEFT && keyCode == player.left){
        player.movingTowards = move.NONE;
    } else if(player.movingTowards == move.RIGHT && keyCode == player.right){
        player.movingTowards = move.NONE;
    }
    //TODO
}




