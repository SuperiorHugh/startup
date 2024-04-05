import {lerp, getRandomElementFromArray} from ".././Helper/helper-functions.js";


export class Chair {
    constructor(x, y, orientation){
        this.x = x;
        this.y = y;

        this.width = 40;
        this.height = 68;

        this.collidable = false;
        this.interactable = true;
        this.orientation = orientation;
        this.interacting = false;
        this.interacter;
    }

    tick(){
        if(this.interacting && this.interacter.animationTime !== 0){
            this.interacting = false;
            this.interacter.sitting = false;
            this.interacter.sendSitting = true;
        }
    }

    draw(ctx, imageLib){
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.beginPath();
        ctx.ellipse(this.x + 20, this.y + 60, 24 , 12, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        ctx.drawImage(imageLib[`chair-${this.orientation}`], this.x, this.y, this.width, this.height);
    }

    interact(x, y, ui, player, imageLib){//TODO
        if(!this.interacting){
            this.interacting = true;
            this.interacter = player;
            player.sitting = true;
            player.sendSitting = true;
            player.orientation = this.orientation;
            player.x = this.x;
            player.y = this.y + (this.orientation === 'back' ? -0.01 : 0.01);
            player.socket.send(JSON.stringify({event: 'movement', email: player.email, x: player.x, y: player.y, moving: false}));
        } else {
            this.interacting = false;
            player.sitting = false;
            player.sendSitting = true;
        }
    }
}

export class Table {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 132;
        this.height = 84;
        this.collidable = true;
        this.interactable = false;

        this.lb = this.x;               //left bound
        this.rb = this.x + 132;         //right bound
        this.tb = this.y;               //top bound
        this.bb = this.y + 84 - 29;     //bottom bound
    }

    tick(){

    }

    draw(ctx, imageLib){
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.beginPath();
        ctx.ellipse(this.x + 66, this.y + 60, 70, 26, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        ctx.drawImage(imageLib[`table`], this.x, this.y, 132, 84);
    }
}

export class BarTable {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 224;
        this.height = 48;
        this.collidable = true;
        this.interactable = false;

        this.lb = this.x;       //left bound
        this.rb = this.x + 224; //right bound
        this.tb = this.y;       //top bound
        this.bb = this.y + 32;  //bottom bound
    }

    tick(){
    
    }

    draw(ctx, imageLib){
        ctx.drawImage(imageLib[`bar-table`], this.x, this.y, 224, 48);
    }
}

export class TileGround {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    tick(){
    }

    draw(ctx, imageLib){
        ctx.globalAlpha = 0.5;
        ctx.drawImage(imageLib[`tile-ground`], this.x, this.y, 436, 312);
        ctx.globalAlpha = 1;
    }
}

export class Bartender {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 56;
        this.height = 56;
        this.collidable = false;
        this.interactable = true;
        this.interacting = false;

        this.emojishopElement = document.getElementById('emojishop');
        this.buttons = Array.from(document.getElementsByClassName('buy-button'));
        this.emojishopElement.addEventListener('transitionend', this.transitionEnd.bind(this));
        this.time = 0;

        this.restPos = 200;
        this.interactPos = 100;
        this.restHeight = 0;
        this.interactHeight = 200;
    }

    tick(){
        if(this.interacting){
            this.emojishopElement.style.visibility = 'visible';
            this.emojishopElement.style.top = `${this.interactPos}px`;
            this.emojishopElement.style.height = `${this.interactHeight}px`;
            this.buttons.forEach((val, i) => {
                val.style.color = document.body.style.getPropertyValue('--maincolor');;
            });
        } else {
            this.emojishopElement.style.top = `${this.restPos}px`;
            this.emojishopElement.style.height = `${this.restHeight}px`;
            this.buttons.forEach((val, i) => {
                val.style.color = document.body.style.getPropertyValue('--transparentcolor');;
            });
        }
        
    }

    draw(ctx, imageLib){
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.beginPath();
        ctx.ellipse(this.x + 28, this.y + 56, 32, 14, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        ctx.drawImage(imageLib[`bartender`], this.x, this.y, 56, 56);
    }

    interact(x, y, ui, player, imageLib){//TODO
        if(!this.interacting){
            this.interacting = true;
        } else {
            this.interacting = false;
        }
    }

    transitionEnd(){
        if (!this.interacting) {
            this.emojishopElement.style.visibility = 'hidden';
        }
    }
}