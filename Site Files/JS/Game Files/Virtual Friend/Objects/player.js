import {lerp} from ".././Helper/helper-functions.js";

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

        this.speed = 2;
        this.animationTime = 0;

        this.name = name;
    }

    tick(){
        if(!(this.moveRight - this.moveLeft) && !(this.moveDown - this.moveUp)){
            this.animationTime = 0;
            this.z = lerp(this.z, 0, 0.2);
            this.width = lerp(this.width, 64, 0.2);
            this.height = lerp(this.height, 64, 0.2);
        } else {
            this.animationTime++;
            const animSpd = 7;
            const jumpHeight = 16;
            this.z = Math.abs(Math.sin(this.animationTime / animSpd)) * jumpHeight;
            this.width = 48 + Math.abs(Math.sin(this.animationTime / animSpd)) * 16;
            this.height = 48 + Math.abs(Math.cos(this.animationTime / animSpd)) * 16;
        }

        this.x += (this.moveRight - this.moveLeft) * this.speed;
        this.y += (this.moveDown - this.moveUp) * this.speed;
        
    }

    drawSelf(ctx, imageLib){
        ctx.fillStyle = "rgba(0, 0, 0, " + (0.2 + (0.1 * ((16 - this.z) / 16))) + ")";
        ctx.beginPath();
        ctx.ellipse(this.x + 32, this.y + 64, 32 - (this.z / 1.5), 12 - (this.z / 2), 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        ctx.drawImage(imageLib.player, this.x + 32 - (this.width/2), this.y - this.z, this.width, this.height);
        ctx.font = "20px 'Trebuchet MS'";
        ctx.fillStyle = document.body.style.getPropertyValue('--altcolor');

        // Write text on the canvas
        console.log(this.name.length)
        ctx.fillText(this.name, this.x + 32 - (ctx.measureText(this.name).width/2), this.y - 32 - (this.z/2));
    }
}