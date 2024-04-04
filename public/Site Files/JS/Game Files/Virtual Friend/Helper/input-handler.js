import {EmoteSlotButton} from "../UI/emote-slot-button.js";
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
export function mouseDownEvent(canvas, mousePos, ui, player, imageLib, event){
    const hovered = [];
    ui.forEach(function(element){
        if(element.inBound(mousePos.x, mousePos.y)){
            hovered.push(element);
        }
    });
    
    let max;
    for(const i of hovered)
        if(!max || i.z > max.z)
            max = i;
    if(max)
        max.clickDown(mousePos.x, mousePos.y, ui, player, imageLib);   
}

//mouse released
export function mouseUpEvent(canvas, mousePos, ui, player, imageLib, event){
    const hovered = [];
    ui.forEach(function(element){
        if(element.inBound(mousePos.x, mousePos.y)){
            hovered.push(element);
        }
    })

    let max;
    for(const i of hovered)
        if(!max || i.z > max.z)
            max = i;
    if(max)
        max.clickUp(mousePos.x, mousePos.y, ui, player, imageLib);  
}

export async function emotePurchase(emote, cost, ea, ui, canvas, x, y){
    const storedUser = JSON.parse(localStorage.getItem('currentuser'));
    //args: email password emote cost
    let res = await fetch('/api/users/purchase-emote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: storedUser.email,
            password: storedUser.password,
            emote: emote,
            cost: cost,
        }),
    });
    let data = await res.json();
    if(data.allowed){
        storedUser.emotesused -= cost;

        console.log(storedUser.purchased);


        storedUser.purchased.push(emote);


        console.log(storedUser.purchased);
        localStorage.setItem('currentuser', JSON.stringify(storedUser));
        ea.emote(storedUser.emotesused);
        ui.push(new EmoteSlotButton(canvas, x, y, emote));
        console.log('allowed purchase')
        
        let buy1 = document.getElementById('buy1');
        let buy2 = document.getElementById('buy2');
        let buy3 = document.getElementById('buy3');

        storedUser.purchased.forEach((val, i) => {
            switch(val){
                case 'surprised': 
                    ui.push(new EmoteSlotButton(canvas, canvas.width*(3/10), canvas.height*(4/8), val)); 
                    buy1.children[0].innerHTML = 'SOLD OUT';
                    break;
                case 'joyful': ui.push(new EmoteSlotButton(canvas, canvas.width*(7/10), canvas.height*(4/8), val));
                    buy2.children[0].innerHTML = 'SOLD OUT';
                    break;
                case 'ching-chong': ui.push(new EmoteSlotButton(canvas, canvas.width*(5/10), canvas.height*(3/8), val));
                    buy3.children[0].innerHTML = 'SOLD OUT';
                    break;
            }
            console.log('added ' + val + '!')
        });
    } else {
        console.log('dislowed purchase')
    }
}