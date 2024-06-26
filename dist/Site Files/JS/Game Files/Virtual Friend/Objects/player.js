/*-- imports --*/

import {lerp, getRandomElementFromArray} from ".././Helper/helper-functions.js";
import {horizontalCollision, verticalCollision} from "../Helper/movement-handler.js";

//player class
export class Player {
    constructor (x, y, name, ui, gui, socket, email, soundLib, bobblehead){
        this.x = x;
        this.y = y;
        this.z = 0;
        this.setWidth = (bobblehead ? 96 : 56);
        this.setHeight = (bobblehead ? 96 : 56);
        this.width = this.setWidth;
        this.height = this.setHeight;

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

        this.ui = ui;
        this.gui = gui;
        this.collidable = false;
        this.interactable = false;

        this.lb = this.x;
        this.rb = this.x + this.width;
        this.tb = this.y + (this.height / 2) - 1;
        this.bb = this.y + (this.height / 2) + 1;

        this.sitting = false;
        this.sendSitting = false;
        this.orientation = 'front';
        this.socket = socket;
        
        this.email = email;
        this.movementEnd = true;
        this.soundLib = soundLib;

        this.sleepTimer = 0;
        this.sleeping = false;
        this.bobblehead = bobblehead;
    }

    //tick player (runs per frame)
    tick(environment){//TODO
        this.lb = this.x;
        this.rb = this.x + 56;
        this.tb = this.y + (56 / 2) - 1;
        this.bb = this.y + (56 / 2) + 1;
        if(!(this.moveRight - this.moveLeft) && !(this.moveDown - this.moveUp)){
            this.animationTime = 0;
            this.sleepTimer++;
            this.z = lerp(this.z, 0, 0.2);
            this.width = lerp(this.width, this.setWidth, 0.2);
            this.height = lerp(this.height, this.setHeight, 0.2);
        } else {
            this.sleepTimer = 0;
            if(this.sleeping){
                this.sleeping = false;
                this.socket.send(JSON.stringify({event: 'sleep', email: this.email, sleeping: this.sleeping}));
            }
            
            if(this.z <= 2 && this.soundLib['jump'].paused){
                this.soundLib['jump'].play();
            } else if (this.z <= 2 && !this.soundLib['jump'].paused){
                this.soundLib['jump'].currentTime = 0;
            }

            this.animationTime++;
            const animSpd = 7;
            this.z = Math.floor(Math.abs(Math.sin(this.animationTime / animSpd)) * this.jumpHeight);
            this.width = (this.setWidth * (3 / 4)) + Math.abs(Math.sin(this.animationTime / animSpd)) * (this.setWidth * (1 / 4));
            this.height = (this.setHeight * (3 / 4)) + Math.abs(Math.cos(this.animationTime / animSpd)) * (this.setHeight * (1 / 4));
            if(this.animationTime == 66){
                this.animationTime = 0;
            }
            console.log(this.z)
        }

        let hc = horizontalCollision(this, environment, (this.moveRight - this.moveLeft) * this.speed);
        let vc = verticalCollision(this, environment, (this.moveDown - this.moveUp) * this.speed);
        if(hc) this.x = hc;
        if(vc) this.y = vc;
        if(!hc && ((this.moveRight - this.moveLeft) != 0 || (this.moveDown - this.moveUp) != 0)){
            this.x += (this.moveRight - this.moveLeft) * this.speed;
            this.movementEnd = false;
        }   
        if(!vc && ((this.moveRight - this.moveLeft) != 0 || (this.moveDown - this.moveUp) != 0)){
            this.y += (this.moveDown - this.moveUp) * this.speed;
            this.movementEnd = false;
        }

        if(((this.moveRight - this.moveLeft) != 0 || (this.moveDown - this.moveUp) != 0)){
            this.socket.send(JSON.stringify({event: 'movement', email: this.email, x: this.x, y: this.y, moving: true}));
        } else if(!this.movementEnd){
            this.movementEnd = true;
            this.socket.send(JSON.stringify({event: 'movement', email: this.email, x: this.x, y: this.y, moving: false}));
        }
        
        if(this.emoteTimer > 0){
            this.emoteTimer--;
            this.emotePos = lerp(this.emotePos, 0, 0.2);
        } else {
            this.emoji = '';
        }

        if(this.sendSitting){
            this.sendSitting = false;
            this.socket.send(JSON.stringify({event: 'sit', email: this.email, sitting: this.sitting, orientation: this.orientation}));
        }

        const storedUser = JSON.parse(localStorage.getItem('currentuser'));
        if(!this.sleeping && this.sleepTimer > storedUser.autosleep * 10){
            this.sleeping = true;
            this.socket.send(JSON.stringify({event: 'sleep', email: this.email, sleeping: this.sleeping}));
        }
    }

    //draw self onto given canvas
    draw(ctx, imageLib){
        let spriteXOff = 0;
        let spriteYOff = (this.bobblehead ? -20 : 0);//TODO
        if(!this.sitting){
            ctx.fillStyle = "rgba(0, 0, 0, " + (0.2 + (0.1 * ((this.jumpHeight - this.z) / this.jumpHeight))) + ")";
            ctx.beginPath();
            ctx.ellipse(this.x + 28, this.y + 56, 24 + 8*(1-(this.z / this.jumpHeight)), 8 + 6*(1-(this.z / this.jumpHeight)), 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();

            if(this.sleeping){
                if(this.bobblehead)
                    ctx.drawImage(imageLib['bobblehead-player-sleep'], this.x + 28 - (this.width/2), this.y - 40 - this.z, this.width, this.height);
                else
                    ctx.drawImage(imageLib['player-sleep'], this.x + 28 - (this.width/2), this.y - this.z, this.width, this.height);
                ctx.font = "20px 'Trebuchet MS'";
                ctx.fillStyle = '#CCCCCC';
                ctx.globalAlpha = Math.abs(Math.sin(this.sleepTimer/60));
                ctx.fillText('zzz', this.x + spriteXOff + 32 - (ctx.measureText('zzz').width/2), this.y + spriteYOff - 8 - (this.z/2));
                ctx.globalAlpha = 1;
            } else {
                if(this.bobblehead)
                    ctx.drawImage(imageLib['bobblehead-player'], this.x + 28 - (this.width/2), this.y - 40 - this.z, this.width, this.height);
                else
                    ctx.drawImage(imageLib['player'], this.x + 28 - (this.width/2), this.y - this.z, this.width, this.height);
            }
        } else {
            switch(this.orientation){
                case 'front':
                    spriteXOff = -12;
                    ctx.drawImage(imageLib['player-sit-forward'], this.x + 20 - (this.width/2), this.y-4 - this.z, this.width, this.height);
                    break;
                case 'back':
                    spriteXOff = -12;
                    ctx.drawImage(imageLib['player-sit-backward'], this.x + 20 - (this.width/2), this.y-4 - this.z, this.width, this.height);
                    break;
                case 'left':
                    spriteXOff = 0;
                    ctx.drawImage(imageLib['player-sit-left'], this.x + 32 - (this.width/2), this.y-12 - this.z, this.width, this.height);
                    break;
                case 'right':
                    spriteXOff = -20;
                    ctx.drawImage(imageLib['player-sit-right'], this.x + 8 - (this.width/2), this.y-12 - this.z, this.width, this.height);
                    break;
            }
        }
        
        ctx.font = "20px 'Trebuchet MS'";
        ctx.fillStyle = document.body.style.getPropertyValue('--maincolor');
        if(this.name.toLowerCase().includes('guest'))
            ctx.fillStyle = '#CCCCCC';
        ctx.fillText(this.name, this.x + spriteXOff + 32 - (ctx.measureText(this.name).width/2), this.y + spriteYOff - 32 - (this.z/2));
        
        const storedUser = JSON.parse(localStorage.getItem('currentuser'));
        if(this.emoteTimer > 0 && storedUser.visibleemojis){
            ctx.globalAlpha = this.emoteTimer / this.emoteSpeed;
            ctx.drawImage(imageLib[this.emoji + '-emote'], this.x + spriteXOff, this.y + spriteYOff - this.z/2 - 128+this.emotePos*32, 64, 64 + this.emotePos * 64);
            ctx.globalAlpha = 1;
        }

    }

    //emote event
    emote(emoji){
        if(this.sleeping){
            this.sleepTimer = 0;
            this.sleeping = false;
            this.socket.send(JSON.stringify({event: 'sleep', email: this.email, sleeping: this.sleeping}));
        }

        if(this.soundLib[emoji + '-emote'].paused){
            this.soundLib[emoji + '-emote'].play();
        } else {
            this.soundLib[emoji + '-emote'].currentTime = 0;
        }
        this.emoteTimer = this.emoteSpeed;
        this.emotePos = 1;
        this.emoji = emoji;
        this.socket.send(JSON.stringify({event:'emote', email: this.email, emoji: this.emoji}));

        const storedUser = JSON.parse(localStorage.getItem('currentuser'));
        if(storedUser && storedUser.username != 'GUEST'){
            this.gui[0].emote(storedUser.emotesused);
        } else {
            this.gui[0].emote(0);
        }
    }
}








export class SocketPlayer {
    constructor (x, y, name, email, soundLib, bobblehead){
        this.x = x;
        this.y = y;
        this.z = 0;
        this.setWidth = (bobblehead ? 96 : 56);
        this.setHeight = (bobblehead ? 96 : 56);
        this.width = this.setWidth;
        this.height = this.setHeight;

        this.jumpHeight = 32;
        this.animationTime = 0;

        this.name = name;
        this.emoteSpeed = 100;
        this.emoteTimer = 0;
        this.emotePos = 0;
        this.emoji = '';

        this.collidable = false;
        this.interactable = false;

        this.sitting = false;
        this.orientation = 'front';
        this.email = email;
        this.moving = false;
        this.soundLib = soundLib;

        this.sleepTimer = 0;
        this.sleeping = false;
        this.bobblehead = bobblehead;
    }

    //tick player (runs per frame)
    tick(environment){
        if(!this.moving){
            this.animationTime = 0;
            this.sleepTimer++;
            this.z = lerp(this.z, 0, 0.2);
            this.width = lerp(this.width, this.setWidth, 0.2);
            this.height = lerp(this.height, this.setHeight, 0.2);
        } else {
            this.sleepTimer = 0;
            this.sleeping = false;
            this.sitting = false;
            console.log(this.z)
            if(this.z < 0.1 && this.soundLib['socket-jump'].paused){
                
                this.soundLib['socket-jump'].play();
            } else if (this.z < 0.1 && !this.soundLib['socket-jump'].paused){
                this.soundLib['socket-jump'].currentTime = 0;
            }

            this.animationTime++;
            const animSpd = 7;
            this.z = Math.floor(Math.abs(Math.sin(this.animationTime / animSpd)) * this.jumpHeight);
            this.width = (this.setWidth * (3 / 4)) + Math.abs(Math.sin(this.animationTime / animSpd)) * (this.setWidth * (1 / 4));
            this.height = (this.setHeight * (3 / 4)) + Math.abs(Math.cos(this.animationTime / animSpd)) * (this.setHeight * (1 / 4));
        }

        if(this.emoteTimer > 0){
            this.emoteTimer--;
            this.emotePos = lerp(this.emotePos, 0, 0.2);
        } else {
            this.emoji = '';
        }
    }

    //draw self onto given canvas
    draw(ctx, imageLib){
        let spriteXOff = 0;
        let spriteYOff = (this.bobblehead ? -20 : 0);
        if(!this.sitting){
            ctx.fillStyle = "rgba(0, 0, 0, " + (0.2 + (0.1 * ((this.jumpHeight - this.z) / this.jumpHeight))) + ")";
            ctx.beginPath();
            ctx.ellipse(this.x + 28, this.y + 56, 24 + 8*(1-(this.z / this.jumpHeight)), 8 + 6*(1-(this.z / this.jumpHeight)), 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            
            if(this.sleeping){
                if(this.bobblehead)
                    ctx.drawImage(imageLib['bobblehead-player-sleep'], this.x + 28 - (this.width/2), this.y - 40 - this.z, this.width, this.height);
                else
                    ctx.drawImage(imageLib['player-sleep'], this.x + 28 - (this.width/2), this.y - this.z, this.width, this.height);
                ctx.font = "20px 'Trebuchet MS'";
                ctx.fillStyle = '#CCCCCC';
                ctx.globalAlpha = Math.abs(Math.sin(this.sleepTimer/60));
                ctx.fillText('zzz', this.x + spriteXOff + 32 - (ctx.measureText('zzz').width/2), this.y + spriteYOff - 8 - (this.z/2));
                ctx.globalAlpha = 1;
            } else {
                if(this.bobblehead)
                    ctx.drawImage(imageLib['bobblehead-player'], this.x + 28 - (this.width/2), this.y - 40 - this.z, this.width, this.height);
                else
                    ctx.drawImage(imageLib['player'], this.x + 28 - (this.width/2), this.y - this.z, this.width, this.height);
            }
        } else {
            switch(this.orientation){
                case 'front':
                    spriteXOff = -12;
                    ctx.drawImage(imageLib['player-sit-forward'], this.x + 20 - (this.width/2), this.y-4 - this.z, this.width, this.height);
                    break;
                case 'back':
                    spriteXOff = -12;
                    ctx.drawImage(imageLib['player-sit-backward'], this.x + 20 - (this.width/2), this.y-4 - this.z, this.width, this.height);
                    break;
                case 'left':
                    spriteXOff = 0;
                    ctx.drawImage(imageLib['player-sit-left'], this.x + 32 - (this.width/2), this.y-12 - this.z, this.width, this.height);
                    break;
                case 'right':
                    spriteXOff = -20;
                    ctx.drawImage(imageLib['player-sit-right'], this.x + 8 - (this.width/2), this.y-12 - this.z, this.width, this.height);
                    break;
            }
        }
        ctx.font = "20px 'Trebuchet MS'";
        ctx.fillStyle = document.body.style.getPropertyValue('--maincolor');

        if(this.name.toLowerCase() === 'guest')
            ctx.fillStyle = '#CCCCCC';
        ctx.fillText(this.name, this.x + spriteXOff + 32 - (ctx.measureText(this.name).width/2), this.y + spriteYOff - 32 - (this.z/2));
        
        const storedUser = JSON.parse(localStorage.getItem('currentuser'));
        if(this.emoteTimer > 0 && storedUser.visibleemojis){
            ctx.globalAlpha = this.emoteTimer / this.emoteSpeed;
            ctx.drawImage(imageLib[this.emoji + '-emote'], this.x + spriteXOff, this.y + spriteYOff - this.z/2 - 128+this.emotePos*32, 64, 64 + this.emotePos * 64);
            ctx.globalAlpha = 1;
        }

    }

    //emote event
    emote(emoji){

        if(this.soundLib[emoji + '-emote'].paused){
            this.soundLib[emoji + '-emote'].play();
        } else {
            this.soundLib[emoji + '-emote'].currentTime = 0;
        }
        
        this.emoteTimer = this.emoteSpeed;
        this.emotePos = 1;
        this.emoji = emoji;
    }
}