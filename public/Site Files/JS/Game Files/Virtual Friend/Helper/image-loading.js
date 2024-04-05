const imagePaths = [
    '../../Pictures/Game/Entity/player.webp',

    '../../Pictures/Game/Emote/angry-emote.webp',
    '../../Pictures/Game/Emote/bruh-emote.webp',
    '../../Pictures/Game/Emote/happy-emote.webp',
    '../../Pictures/Game/Emote/laugh-emote.webp',
    '../../Pictures/Game/Emote/sad-emote.webp',
    '../../Pictures/Game/Emote/surprised-emote.webp',
    '../../Pictures/Game/Emote/joyful-emote.webp',
    '../../Pictures/Game/Emote/ching-chong-emote.webp',

    '../../Pictures/Game/Environment/shop-icon.webp',
    '../../Pictures/Game/UI/emotes.webp',

    '../../Pictures/Game/Environment/bar-table.webp',
    '../../Pictures/Game/Environment/chair-back.webp',
    '../../Pictures/Game/Environment/chair-front.webp',
    '../../Pictures/Game/Environment/chair-left.webp',
    '../../Pictures/Game/Environment/chair-right.webp',
    '../../Pictures/Game/Environment/table.webp',
    '../../Pictures/Game/Environment/tile-ground.webp',
    '../../Pictures/Game/Entity/bartender.webp',

    '../../Pictures/Game/Entity/player-sit-forward.webp',
    '../../Pictures/Game/Entity/player-sit-backward.webp',
    '../../Pictures/Game/Entity/player-sit-left.webp',
    '../../Pictures/Game/Entity/player-sit-right.webp',
    '../../Pictures/Game/Entity/player-sleep.webp',
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