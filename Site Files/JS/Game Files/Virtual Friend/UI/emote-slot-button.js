/*-- imports --*/

import {lerp} from "../Helper/helper-functions.js";


/*-- emote slot ui button --*/

export class EmoteSlotButton {
    constructor(canvas, gotoX, gotoY, emoji){
        this.canvas = canvas;
        this.originX = canvas.width / 2;
        this.originY = canvas.height;
        this.z = 1;

        this.radius = 60;
        this.insideRadius = 40;

        this.x = this.originX;
        this.y = this.originY;
        this.gotoX = gotoX;
        this.gotoY = gotoY;
        
        this.gotoPercent = 0;
        this.active = false;
        this.emoji = emoji;
    }

    tick(mousePos){
        if(this.inBound(mousePos.x, mousePos.y)){
            this.radius = lerp(this.radius, 70, 0.2);
            this.insideRadius = lerp(this.insideRadius, 70, 0.2);
        } else {
            this.radius = lerp(this.radius, 60, 0.2);
            this.insideRadius = lerp(this.insideRadius, 40, 0.2);
        }
    }

    draw(ctx, imageLib){
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = document.body.style.getPropertyValue('--altcolor');;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.globalAlpha = 1;
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.insideRadius, this.insideRadius, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    inBound(x, y){
        return Math.sqrt( Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2) ) <= this.radius;
    }

    clickDown(x, y, ui, player){
        player.emote();
        const storedUser = JSON.parse(localStorage.getItem('currentuser'));
        if(storedUser){
            storedUser.emotesUsed++;
            console.log('emote slot button');
            localStorage.setItem(storedUser.email_val, JSON.stringify(storedUser));
            localStorage.setItem('currentuser', JSON.stringify(storedUser));
        }
    }

    clickUp(x, y, ui, player){
        
    }

    toggle(){
        if(!active){
            
        } else {
            
        }
        active = !active;
    }
}