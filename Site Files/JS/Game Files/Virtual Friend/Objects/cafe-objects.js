
export class Chair {
    constructor(x, y, orientation){
        this.x = x;
        this.y = y;
        this.orientation = orientation;

    }

    tick(){

    }

    draw(ctx, imageLib){
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.beginPath();
        ctx.ellipse(this.x + 20, this.y + 60, 24 , 12, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        ctx.drawImage(imageLib[`chair-${this.orientation}`], this.x, this.y, 40, 68);
    }
}

export class Table {
    constructor(x, y){
        this.x = x;
        this.y = y;
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
    }

    tick(){

    }

    draw(ctx, imageLib){
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.beginPath();
        ctx.ellipse(this.x + 28, this.y + 56, 32, 14, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        ctx.drawImage(imageLib[`bartender`], this.x, this.y, 56, 56);
    }
}