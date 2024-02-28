export const imagePaths = [
    '../../Pictures/Game/Entity/player.webp',
];

export function loadImages(){
    return new Promise((resolve, reject) => {
        let loadedCount = 0;
        const loadedImages = [];

        imagePaths.forEach(function (path, index) {
            const image = new Image();
            image.src = path;
            image.onload = function () {
                loadedCount++;
                loadedImages[index] = image;

                if (loadedCount === imagePaths.length)
                    resolve(loadedImages);
            };

            image.onerror = function () {
                reject(new Error(`Failed to load image at path: ${path}`));
            };
        });
    });
}