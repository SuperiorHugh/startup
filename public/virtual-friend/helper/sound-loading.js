/*-- sound loading function --*/

//paths of all sounds
const soundPaths = [
    '../../snd/jump.wav',//current player jump
    '../../snd/angry.wav',
    '../../snd/bruh.wav',
    '../../snd/happy.wav',
    '../../snd/laugh.wav',
    '../../snd/sad.wav',
    '../../snd/surprised.wav',
    '../../snd/joyful.wav',
    '../../snd/ching-chong.wav',
    '../../snd/jump.wav',//socketplayer jump
];

//used for mapping sounds to custom name
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
    9: 'socket-jump',
};


//load sounds asynchronously
export function loadSounds(){
    const loadedSounds = {};
    const storedUser = JSON.parse(localStorage.getItem('currentuser'));
    soundPaths.forEach(function (path, index) {
        const sound = new Audio(path);
        if(!storedUser.username.toLowerCase().includes('guest')){
            sound.volume = parseInt(storedUser.mastervolume) / 100;
            if(soundMapping[index].includes('emote'))
                sound.volume *= parseInt(storedUser.emojivolume) / 100;
            
            if(storedUser.mutegame)
                sound.volume = 0;
            
        } else
            sound.volume = 1;
        if(soundMapping[index].includes('socket'))
            sound.volume *= 0.3;

        loadedSounds[soundMapping[index]] = sound;
    });
    return loadedSounds;
}