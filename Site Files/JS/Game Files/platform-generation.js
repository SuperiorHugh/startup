//platform class
export class Platform {
    constructor(x, y, width, height, time){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.delete = false;
        this.time = time;
        this.trueTime = time; 
        this.allowtick = time != 0;
    }

    tick(){
        if(!this.allowtick)
            return;

        this.time--;
        this.delete = this.time <= 0;

    }
    verticalDistToPlayer(player) {
        return this.y - player.y;
    }
    horizontalDistToPlayer(player){
        return this.x - player.x;
    }
}
export class DamagePlatform {
    constructor(x, y, width, height, time, pTime){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.time = time;//current p time
        this.pTime = pTime; //after destruction p time
        this.trueTime = time;
        this.delete = false;
    }
    
    tick(pa){
        this.time--;
        if(this.time <= 0){
            this.delete = true;
            pa.push(new Platform(this.x, this.y, this.width, this.height, this.pTime));
        }
    }
    verticalDistToPlayer(player) {
        return this.y - player.y;
    }
    horizontalDistToPlayer(player){
        return this.x - player.x;
    }
}

export class WarningPlatform {
    constructor(x, y, width, height, time, dTime, pTime){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.time = time;//current p time
        this.dTime = dTime;
        this.pTime = pTime; //after destruction p time
        this.trueTime = time;
        this.delete = false;
    }

    tick(pa){
        this.time--;
        if(this.time <= 0){
            this.delete = true;
            pa.push(new DamagePlatform(this.x, this.y, this.width, this.height, this.dTime, this.pTime));
        }
    }
}

export class PlatformGenerator {
    constructor(warningArray){
        this.warningArray = warningArray;
        this.tickCount = 0;
        this.level = 1;
        this.level1plats = [
            [
                [100, 190, 100, 50,     50, 100, 850],
                [50, 300, 200, 50,      50, 100, 850],
            ],
            [
                []
            ]
        ];
        this.level2plats = [];
        this.level3plats = [];
        //this.level4plats = []; TODO
        //this.level5plats = [];
    }

    tick(){
        this.tickCount++;
        
        console.log(this.tickCount);
        this.level = Math.ceil(this.tickCount/3050);
        if(this.tickCount % 1000 == 0){
            generatePlatforms();
        }
    }

    generatePlatforms(){
        switch(this.level){
            case 1:
                selection = level1plats[Math.floor(level1plats.length * Math.random())];
                for(plat of selection){
                    this.warningArray.push(new WarningPlatform(plat[0], plat[1], plat[2], plat[3], plat[4], plat[5], plat[6]))
                }
            break;

            case 2:
                selection = level2plats[Math.floor(level1plats.length * Math.random())];
                for(plat of selection){
                    this.warningArray.push(new WarningPlatform(plat[0], plat[1], plat[2], plat[3], plat[4], plat[5], plat[6]))
                }
            break;

            case 3:
                selection = level2plats[Math.floor(level1plats.length * Math.random())];
                for(plat of selection){
                    this.warningArray.push(new WarningPlatform(plat[0], plat[1], plat[2], plat[3], plat[4], plat[5], plat[6]))
                }
            break;
        }
    }
}