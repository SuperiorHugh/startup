const imagePaths = [
    '../../Pictures/Game/Entity/player.webp',

    '../../Pictures/Game/Emote/angry-emote.webp',
    '../../Pictures/Game/Emote/bruh-emote.webp',
    '../../Pictures/Game/Emote/happy-emote.webp',
    '../../Pictures/Game/Emote/laugh-emote.webp',
    '../../Pictures/Game/Emote/sad-emote.webp',
];
const imageMapping = {
    0: 'player',
    1: 'angry-emote',
    2: 'bruh-emote',
    3: 'happy-emote',
    4: 'laugh-emote',
    5: 'sad-emote',
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