/*-- imports --*/

import {lerp} from ".././Helper/helper-functions.js";


/*-- emote ui button --*/

export class EmoteButton {
    constructor(canvas){
        this.canvas = canvas;
        this.x = canvas.width / 2;
        this.y = canvas.height;

        this.radius = 80;
        this.insideRadius = 60;
    }

    tick(mousePos){
        if(this.inBound(mousePos.x, mousePos.y)){
            this.radius = lerp(this.radius, 100, 0.2);
            this.insideRadius = lerp(this.insideRadius, 90, 0.2);
        } else {
            this.radius = lerp(this.radius, 80, 0.2);
            this.insideRadius = lerp(this.insideRadius, 60, 0.2);
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

    clickDown(x, y){
        console.log('down!');

        const storedUser = JSON.parse(localStorage.getItem('currentuser'));
        if(storedUser){
            storedUser.emoteAmount++;
            console.log(storedUser.emoteAmount);
            localStorage.setItem(storedUser.email_val, JSON.stringify(storedUser));
            localStorage.setItem('currentuser', JSON.stringify(storedUser));
        }
    }

    clickUp(x, y){
        console.log('up!')
    }
}