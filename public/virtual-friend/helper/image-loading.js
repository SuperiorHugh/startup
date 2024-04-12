const imagePaths = [
    '../../img/game/entity/player.webp',

    '../../img/game/emote/angry-emote.webp',
    '../../img/game/emote/bruh-emote.webp',
    '../../img/game/emote/happy-emote.webp',
    '../../img/game/emote/laugh-emote.webp',
    '../../img/game/emote/sad-emote.webp',
    '../../img/game/emote/surprised-emote.webp',
    '../../img/game/emote/joyful-emote.webp',
    '../../img/game/emote/ching-chong-emote.webp',

    '../../img/game/environment/shop-icon.webp',
    '../../img/game/ui/emotes.webp',

    '../../img/game/environment/bar-table.webp',
    '../../img/game/environment/chair-back.webp',
    '../../img/game/environment/chair-front.webp',
    '../../img/game/environment/chair-left.webp',
    '../../img/game/environment/chair-right.webp',
    '../../img/game/environment/table.webp',
    '../../img/game/environment/tile-ground.webp',
    '../../img/game/entity/bartender.webp',

    '../../img/game/entity/player-sit-forward.webp',
    '../../img/game/entity/player-sit-backward.webp',
    '../../img/game/entity/player-sit-left.webp',
    '../../img/game/entity/player-sit-right.webp',
    '../../img/game/entity/player-sleep.webp',

    '../../img/game/entity/bobblehead-player.webp',
    '../../img/game/entity/bobblehead-player-sleep.webp',

    '../../img/game/environment/rings-back.webp',
    '../../img/game/environment/rings-front.webp',
    '../../img/game/environment/trampoline.webp',
];
const imageMapping = {
    0: 'player',

    1: 'angry-emote',
    2: 'bruh-emote',
    3: 'happy-emote',
    4: 'laugh-emote',
    5: 'sad-emote',
    6: 'surprised-emote',
    7: 'joyful-emote',
    8: 'ching-chong-emote',

    9: 'shop-icon',
    10: 'emotes',

    11: 'bar-table',
    12: 'chair-back',
    13: 'chair-front',
    14: 'chair-left',
    15: 'chair-right',
    16: 'table',
    17: 'tile-ground',
    18: 'bartender',

    19: 'player-sit-forward',
    20: 'player-sit-backward',
    21: 'player-sit-left',
    22: 'player-sit-right',
    23: 'player-sleep',
    24: 'bobblehead-player',
    25: 'bobblehead-player-sleep',

    26: 'rings-back',
    27: 'rings-front',
    28: 'trampoline',
};


//load images asynchronously
export function loadImages(){
    return new Promise((resolve, reject) => {
        let loadedCount = 0;
        const loadedImages = {};

        imagePaths.forEach(function (path, index) {
            const image = new Image();
            image.src = path;
            image.onload = function () {
                loadedCount++;
                loadedImages[imageMapping[index]] = image;
                if (loadedCount === imagePaths.length)
                    resolve(loadedImages);
            };
            image.onerror = function () {
                reject(new Error(`Failed to load image at path: ${path}`));
            };
        });
    });
}