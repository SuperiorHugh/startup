/*-- imports --*/

import {lerp} from "../Helper/helper-functions.js";
import {EmoteButton} from "./emote-button.js";


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
        this.clicked = false;
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
        if(this.active){
            this.x = lerp(this.x, this.gotoX, 0.1);
            this.y = lerp(this.y, this.gotoY, 0.1);
            this.gotoPercent = lerp(this.gotoPercent, 1, 0.1);
        } else {
            this.x = lerp(this.x, this.originX, 0.1);
            this.y = lerp(this.y, this.originY, 0.1);
            this.gotoPercent = lerp(this.gotoPercent, 0, 0.1);
        }
    }

    draw(ctx, imageLib){
        ctx.globalAlpha = 0.5 * this.gotoPercent;
        ctx.fillStyle = document.body.style.getPropertyValue('--altcolor');;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.globalAlpha = 1 * this.gotoPercent;
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.insideRadius, this.insideRadius, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.drawImage(imageLib[this.emoji + '-emote'], this.x - this.insideRadius * 0.75, this.y - this.insideRadius*0.75, this.insideRadius*1.5, this.insideRadius*1.5);
    }

    inBound(x, y){
        return Math.sqrt( Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2) ) <= this.radius;
    }

    clickDown(x, y, ui, player, imageLib){
        player.emote(this.emoji);
        const storedUser = JSON.parse(localStorage.getItem('currentuser'));
        if(storedUser){
            storedUser.emotesUsed++;
            localStorage.setItem(storedUser.email_val, JSON.stringify(storedUser));
            localStorage.setItem('currentuser', JSON.stringify(storedUser));
        }
        ui.forEach((element) => {
            if(element instanceof EmoteButton)
                element.clickDown(x, y, ui, player);
        });
        this.clicked = true;
    }

    clickUp(x, y, ui, player, imageLib){
        if(!this.clicked){
            player.emote(this.emoji);
            const storedUser = JSON.parse(localStorage.getItem('currentuser'));
            if(storedUser){
                storedUser.emotesUsed++;
                
                localStorage.setItem(storedUser.email_val, JSON.stringify(storedUser));
                localStorage.setItem('currentuser', JSON.stringify(storedUser));
            }
            ui.forEach((element) => {
                if(element instanceof EmoteButton)
                    element.clickDown(x, y, ui, player);
            });
        }
    }
}