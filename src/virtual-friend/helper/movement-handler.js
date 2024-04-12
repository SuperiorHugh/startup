/*-- collision checking functions --*/

//vertical collision
export function verticalCollision(player, environment, yVel) {
    const collidables = [];
    for (let i = 0; i < environment.length; i++) {
        if (!environment[i].collidable)
            continue;

        if ((player.rb > environment[i].lb && player.lb < environment[i].lb) ||
            (player.lb > environment[i].lb && player.rb < environment[i].rb) ||
            (player.lb < environment[i].rb && player.rb > environment[i].rb)) {
            
            // Check for collision on the vertical axis
            if (yVel > 0 && (player.bb + yVel >= environment[i].tb) && (player.tb <= environment[i].y)) {
                collidables.push(environment[i].tb - player.bb);
            } else if (yVel < 0 && (player.tb + yVel <= environment[i].bb) && (player.tb >= environment[i].tb)) {
                collidables.push(environment[i].bb - player.tb);
            }
        }
    }
    
    let closestDist;
    for (let i = 0; i < collidables.length; i++) {
        if (closestDist === undefined || Math.abs(collidables[i]) < Math.abs(closestDist)) {
            closestDist = collidables[i];
        }
    }
    return closestDist !== undefined ? closestDist + player.y : undefined;
}

//horizontal collision //TODO
export function horizontalCollision(player, environment, xVel) {
    const collidables = [];
    for (let i = 0; i < environment.length; i++) {
        if ((player.bb > environment[i].tb && player.tb < environment[i].tb) ||
            (player.tb > environment[i].tb && player.bb < environment[i].bb) ||
            (player.tb < environment[i].bb && player.bb > environment[i].bb)) {
            
            // Check for collision on the horizontal axis
            if (xVel > 0 && (player.rb + xVel >= environment[i].lb) && (player.lb <= environment[i].lb)) {
                collidables.push(environment[i].lb - player.rb);
            } else if (xVel < 0 && (player.lb + xVel <= environment[i].rb) && (player.lb >= environment[i].lb)) {
                collidables.push(environment[i].rb - player.lb);
            }
        }
    }

    let closestDist;
    for (let i = 0; i < collidables.length; i++) {
        if (closestDist === undefined || Math.abs(collidables[i]) < Math.abs(closestDist)) {
            closestDist = collidables[i];
        }
    }
    return closestDist !== undefined ? player.x + closestDist : undefined;
}