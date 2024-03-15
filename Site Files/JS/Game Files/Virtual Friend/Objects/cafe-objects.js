
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
    }

    tick(){

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
            player.sitting = true;
            player.x = this.x;
            player.y = this.y + (this.orientation === 'back' ? -0.01 : 0.01);
            console.log('now interacting!')
        } else {
            this.interacting = false;
            player.sitting = false;
            console.log('exit interaction')
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