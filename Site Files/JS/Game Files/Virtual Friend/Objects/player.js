/*-- imports --*/

import {lerp, getRandomElementFromArray} from ".././Helper/helper-functions.js";


//player class
export class Player {
    constructor (x, y, name){
        this.x = x;
        this.y = y;
        this.z = 0;
        this.width = 64;
        this.height = 64;

        this.moveUp = 0;
        this.moveDown = 0;
        this.moveLeft = 0;
        this.moveRight = 0;

        this.jumpHeight = 32;
        this.speed = 2;
        this.animationTime = 0;

        this.name = name;
        this.emoteSpeed = 100;
        this.emoteTimer = 0;
        this.emotePos = 0;
        this.emoji = '';
    }

    //tick player (runs per frame)
    tick(){
        if(!(this.moveRight - this.moveLeft) && !(this.moveDown - this.moveUp)){
            this.animationTime = 0;
            this.z = lerp(this.z, 0, 0.2);
            this.width = lerp(this.width, 64, 0.2);
            this.height = lerp(this.height, 64, 0.2);
        } else {
            this.animationTime++;
            const animSpd = 7;
            this.z = Math.abs(Math.sin(this.animationTime / animSpd)) * this.jumpHeight;
            this.width = 48 + Math.abs(Math.sin(this.animationTime / animSpd)) * 16;
            this.height = 48 + Math.abs(Math.cos(this.animationTime / animSpd)) * 16;
        }

        this.x += (this.moveRight - this.moveLeft) * this.speed;
        this.y += (this.moveDown - this.moveUp) * this.speed;
        

        if(this.emoteTimer > 0){
            this.emoteTimer--;
            this.emotePos = lerp(this.emotePos, 0, 0.2);
        } else {
            this.emoji = '';
        }
    }

    //draw self onto given canvas
    draw(ctx, imageLib){
        ctx.fillStyle = "rgba(0, 0, 0, " + (0.2 + (0.1 * ((this.jumpHeight - this.z) / this.jumpHeight))) + ")";
        ctx.beginPath();
        ctx.ellipse(this.x + 32, this.y + 64, 24 + 8*(1-(this.z / this.jumpHeight)), 8 + 6*(1-(this.z / this.jumpHeight)), 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        ctx.drawImage(imageLib.player, this.x + 32 - (this.width/2), this.y - this.z, this.width, this.height);
        ctx.font = "20px 'Trebuchet MS'";
        ctx.fillStyle = document.body.style.getPropertyValue('--maincolor');

        ctx.fillText(this.name, this.x + 32 - (ctx.measureText(this.name).width/2), this.y - 32 - (this.z/2));
        
        if(this.emoteTimer > 0){
            ctx.globalAlpha = this.emoteTimer / this.emoteSpeed;
            ctx.drawImage(imageLib[this.emoji + '-emote'], this.x, this.y - this.z/2 - 128+this.emotePos*32, 64, 64 + this.emotePos * 64);
            ctx.globalAlpha = 1;
        }
    }

    //emote event
    emote(){
        console.log('emoted!');
        this.emoteTimer = this.emoteSpeed;
        this.emotePos = 1;
        this.emoji = getRandomElementFromArray(['happy', 'angry', 'bruh', 'laugh', 'sad']);
    }
}