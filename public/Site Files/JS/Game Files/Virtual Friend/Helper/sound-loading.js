const soundPaths = [
    '../../Sounds/jump.wav',
    '../../Sounds/angry.wav',
    '../../Sounds/bruh.wav',
    '../../Sounds/happy.wav',
    '../../Sounds/laugh.wav',
    '../../Sounds/sad.wav',
    '../../Sounds/surprised.wav',
    '../../Sounds/joyful.wav',
    '../../Sounds/ching-chong.wav',
];
const soundMapping = {
    0: 'jump',
    1: 'angry-emote',
    2: 'bruh-emote',
    3: 'happy-emote',
    4: 'laugh-emote',
    5: 'sad-emote',
    6: 'surprised-emote',
    7: 'joyful-emote',
    8: 'ching-chong-emote',
};


//load images asynchronously
export function loadSounds(){
    return new Promise((resolve, reject) => {
        let loadedCount = 0;
        const loadedSounds = {};

        soundPaths.forEach(function (path, index) {
            const sound = new Audio();
            sound.src = path;
            sound.onload = function () {
                loadedCount++;
                loadedSounds[soundMapping[index]] = sound;
                if (loadedCount === soundPaths.length)
                    resolve(loadedSounds);
            };
            sound.onerror = function () {
                reject(new Error(`Failed to load sound at path: ${path}`));
            };
        });
    });
}