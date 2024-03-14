/*-- collision checking functions --*/

//vertical collision
export function checkVerticalCollision(player, environment, yVel){
    const collidables = [];
    for(let i = 0; i < environment.length; i++){
        if(!environment[i].collidable)
            continue;

        if ((environment[i].lb < player.rb && environment[i].lb > player.lb) ||
        (environment[i].lb < player.lb && environment[i].rb > player.rb) ||
        (environment[i].rb > player.lb && environment[i].rb < player.rb)){
            if (yVel > 0 && (player.bb + yVel > environment[i].tb) && (player.tb < environment[i].y)){
                collidables.push(environment[i])
            } else if (yVel < 0 && (player.tb + yVel < environment[i].bb) && (player.tb > environment[i].tb)){
                collidables.push(environment[i])
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
export function checkHorizontalCollision(player, environment, xVel){
    const collidables = [];
    for(let i = 0; i < environment.length; i++){
        if((player.tb < environment[i].tb && player.bb > environment[i].tb) ||
        (player.tb > environment[i].tb && player.bb < environment[i].bb) ||
        (player.tb < environment[i].bb && player.bb > environment[i].bb)){
            if (xVel > 0 && (player.rb + xVel > environment[i].lb) && (player.lb < environment[i].lb)){
                collidables.push(environment[i]);
            } else if (xVel < 0 && (player.lb + xVel < environment[i].rb) && (player.lb > environment[i].lb)){
                collidables.push(environment[i]);
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