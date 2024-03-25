
import {lerp, tpLerp} from ".././Helper/helper-functions.js";

export class EmoteAmount {

    constructor(x, y, player){
        this.x = x;
        this.y = y;
        this.player = player;
        this.time = 0;
        
        this.amt = 0;
        let storedUser = JSON.parse(localStorage.getItem('currentuser'));
        if(storedUser)
            this.amt = storedUser.emotesused;
        this.prevAmt = this.amt;
        
    }

    tick(mousePos){
        this.time = tpLerp(this.time, 0, 0.1, 0.001);
    }

    draw(ctx, imageLib){
        ctx.drawImage(imageLib['emotes'], this.x, this.y + (this.time * 10), 32, 32);

        ctx.save();
        ctx.beginPath();
        ctx.rect(this.x + 48, this.y, 256, 32);
        ctx.clip();
        
        ctx.font = "bold 30px 'Trebuchet MS'";
        //prev
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillText(`${this.prevAmt}`, this.x + 50 , this.y + 29 + ((1 + this.time) * 30));
        ctx.fillStyle = document.body.style.getPropertyValue('--altcolor');
        ctx.fillText(`${this.prevAmt}`, this.x + 48 , this.y + 27 + ((1 + this.time) * 30));
        //cur
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillText(`${this.amt}`, this.x + 50 , this.y + 29 + (this.time * 30));
        ctx.fillStyle = document.body.style.getPropertyValue('--altcolor');
        ctx.fillText(`${this.amt}`, this.x + 48 , this.y + 27 + (this.time * 30));

        ctx.fillStyle = 'white';
        
        ctx.restore();

        

    }

    emote(amt){
        this.time = -1;
        this.prevAmt = this.amt;
        this.amt = amt;
    }
}