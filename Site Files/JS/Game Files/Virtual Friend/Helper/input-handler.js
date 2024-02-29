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

//mouse move
export function mouseMoevementEvent(canvas, mousePos, event){
    const clientRect = canvas.getBoundingClientRect();

    const mouseX = (event.clientX - clientRect.left) * (canvas.width / clientRect.width);
    const mouseY = (event.clientY - clientRect.top) * (canvas.height / clientRect.height);

    mousePos.x = mouseX;
    mousePos.y = mouseY;
}

//mouse pressed
export function mouseDownEvent(canvas, mousePos, ui, player, event){
    ui.forEach(function(element){
        if(element.inBound(mousePos.x, mousePos.y)){
            element.clickDown(mousePos.x, mousePos.y, player);
        }
    })
}

//mouse released
export function mouseUpEvent(canvas, mousePos, ui, player, event){
    ui.forEach(function(element){
        if(element.inBound(mousePos.x, mousePos.y)){
            element.clickUp(mousePos.x, mousePos.y, player);
        }
    })
}