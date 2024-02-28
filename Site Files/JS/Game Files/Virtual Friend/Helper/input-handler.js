/*-- input handling --*/

//begin input
export function executePlayerKeyCode(player, keyCode){
    if(keyCode == 'KeyW'){
        player.moveUp = 1;
    } else if(keyCode == 'KeyA'){
        player.moveLeft = 1;
    } else if(keyCode == 'KeyS'){
        player.moveDown = 1;
    } else if(keyCode == 'KeyD'){
        player.moveRight = 1;
    }
}

//end input
export function endPlayerKeyCode(player, keyCode){
    if(keyCode == 'KeyW'){
        player.moveUp = 0;
    } else if(keyCode == 'KeyA'){
        player.moveLeft = 0;
    } else if(keyCode == 'KeyS'){
        player.moveDown = 0;
    } else if(keyCode == 'KeyD'){
        player.moveRight = 0;
    }
}
