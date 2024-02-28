/*-- emote ui button --*/

export class EmoteButton {
    constructor(canvas){
        this.canvas = canvas;
        this.x = canvas.width / 2;
        this.y = canvas.height;

        this.radius = 80;
    }

    draw(ctx, imageLib){
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }


}