/*-- imports --*/

import { tpLerp } from "../helper/helper-functions.js";

//interact orb: will float near interactable objects within the players radius. clicking will activate the interactable
export class InteractOrb {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.z = 1;
        this.nearest;
        this.radius = 0;
        this.insideRadius = 0;

        this.subject = true;
        this.playerdist = 0;
    }

    tick(mousePos){
        if(!this.subject && this.playerdist < 50){
            this.radius = tpLerp(this.radius, 0, 0.2, 0.1);
            this.insideRadius = tpLerp(this.insideRadius, 0, 0.2, 0.1);
        } else if(this.inBound(mousePos.x, mousePos.y)){
            this.radius = tpLerp(this.radius, 22, 0.2, 0.1);
            this.insideRadius = tpLerp(this.insideRadius, 22, 0.2, 0.1);
        } else {
            this.radius = tpLerp(this.radius, 20, 0.2, 0.1);
            this.insideRadius = tpLerp(this.insideRadius, 12, 0.2, 0.1);
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

    clickDown(x, y, ui, player, imageLib){
        if(!this.subject)
            return;

        this.subject.interact(x, y, ui, player, imageLib);
    }

    clickUp(x, y, ui, player, imageLib){}
}