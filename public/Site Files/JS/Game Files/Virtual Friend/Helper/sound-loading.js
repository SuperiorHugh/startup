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
    const loadedSounds = {};
    const storedUser = JSON.parse(localStorage.getItem('currentuser'));
    soundPaths.forEach(function (path, index) {
        const sound = new Audio(path);

        sound.volume = parseInt(storedUser.mastervolume) / 100;
        if(soundMapping[index].includes('emote'))
            sound.volume *= parseInt(storedUser.emojivolume) / 100;
        if(storedUser.mutegame)
            sound.volume = 0;

        loadedSounds[soundMapping[index]] = sound;
    });
    return loadedSounds;
}