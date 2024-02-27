import {updateBackground} from './user_handler.js'

let volumeSliders = document.getElementsByClassName("volume-range-input");
let sliders = document.getElementsByClassName("range-input");
let sliderColor = "#FFB3B3";

/*-- set up inputs to update player data --*/

const visibleemojis = document.getElementById('visible-emojis');
const darkmode = document.getElementById('dark-mode');
const autosleep = document.getElementById('auto-sleep');
const mutegame = document.getElementById('mute-game');
const mastervolume = document.getElementById('master-volume');
const emojivolume = document.getElementById('emoji-volume');
const bobblehead = document.getElementById('bobble-head');

visibleemojis.oninput = function(event){
    const storedUser = JSON.parse(localStorage.getItem('currentuser'));

    if(storedUser){
        storedUser.visibleemojis = visibleemojis.checked;
        localStorage.setItem(storedUser.email_val, JSON.stringify(storedUser));
        localStorage.setItem('currentuser', JSON.stringify(storedUser));
    } else {
        visibleemojis.checked = false;
        alert('log in or sign up to change settings!');
    }
}

darkmode.oninput = function(event){
    const storedUser = JSON.parse(localStorage.getItem('currentuser'));

    if(storedUser){
        
        storedUser.darkmode = darkmode.checked;
        localStorage.setItem(storedUser.email_val, JSON.stringify(storedUser));
        localStorage.setItem('currentuser', JSON.stringify(storedUser));
        updateBackground();
    } else {
        darkmode.checked = false;
        alert('log in or sign up to change settings!');
    }
}


autosleep.oninput = function(event){
    var x = autosleep.value;
    autosleep.style.background = 'linear-gradient(to right, #FFB3B3 ' + x + '%, #FFEEE4 ' + x + '%)';

    const storedUser = JSON.parse(localStorage.getItem('currentuser'));
    if(storedUser){
        storedUser.autosleep = x;
        localStorage.setItem(storedUser.email_val, JSON.stringify(storedUser));
        localStorage.setItem('currentuser', JSON.stringify(storedUser));
    } else {
        x = 0;
        alert('log in or sign up to change settings!');
    }
}

mutegame.oninput = function(event){
    const storedUser = JSON.parse(localStorage.getItem('currentuser'));

    if(storedUser){
        storedUser.mutegame = mutegame.checked;
        localStorage.setItem(storedUser.email_val, JSON.stringify(storedUser));
        localStorage.setItem('currentuser', JSON.stringify(storedUser));

        updateVolSliders();
    } else {
        mutegame.checked = false;
        alert('log in or sign up to change settings!');
    }
}

mastervolume.oninput = function(event){
    var x = mastervolume.value;
    mastervolume.style.background = 'linear-gradient(to right, ' + sliderColor + ' ' + x + '%, #FFEEE4 ' + x + '%)';//#ffb3b3, #ffd2b8;

    const storedUser = JSON.parse(localStorage.getItem('currentuser'));
    if(storedUser){
        storedUser.mastervolume = x;
        localStorage.setItem(storedUser.email_val, JSON.stringify(storedUser));
        localStorage.setItem('currentuser', JSON.stringify(storedUser));
    } else {
        x = 0;
        alert('log in or sign up to change settings!');
    }
}

emojivolume.oninput = function(event){
    var x = emojivolume.value;
    emojivolume.style.background = 'linear-gradient(to right, ' + sliderColor + ' ' + x + '%, #FFEEE4 ' + x + '%)';//#ffb3b3, #ffd2b8;

    const storedUser = JSON.parse(localStorage.getItem('currentuser'));
    if(storedUser){
        storedUser.emojivolume = x;
        localStorage.setItem(storedUser.email_val, JSON.stringify(storedUser));
        localStorage.setItem('currentuser', JSON.stringify(storedUser));
    } else {
        x = 0;
        alert('log in or sign up to change settings!');
    }
}

bobblehead.oninput = function(event){
    const storedUser = JSON.parse(localStorage.getItem('currentuser'));

    if(storedUser){
        storedUser.bobblehead = bobblehead.checked;
        localStorage.setItem(storedUser.email_val, JSON.stringify(storedUser));
        localStorage.setItem('currentuser', JSON.stringify(storedUser));
    } else {
        bobblehead.checked = false;
        alert('log in or sign up to change settings!');
    }
}


/*-- set settings to player data --*/

function updateVolSliders(){
    if(mutegame.checked){
        sliderColor = "#FFEEE4";
    } else {
        sliderColor = "#FFB3B3";
    }

    for(let slider of volumeSliders){
        var x = slider.value;
        var color = 'linear-gradient(to right, ' + sliderColor + ' ' + x + '%, #FFEEE4 ' + x + '%)';//#ffb3b3, #ffd2b8
        slider.style.background = color;

        slider.style.setProperty('--sliderColor', sliderColor);
    }
}

let storedUser = JSON.parse(localStorage.getItem('currentuser'));
if(storedUser){
    visibleemojis.checked = storedUser.visibleemojis;
    darkmode.checked = storedUser.darkmode;
    autosleep.value = storedUser.autosleep;
    mutegame.checked = storedUser.mutegame;
    mastervolume.value = storedUser.mastervolume;
    emojivolume.value = storedUser.emojivolume;
    bobblehead.checked = storedUser.bobblehead;

    updateVolSliders();

    

}

for(let slider of volumeSliders){
    var x = slider.value;
    var color = 'linear-gradient(to right, ' + sliderColor + ' ' + x + '%, #FFEEE4 ' + x + '%)';//#ffb3b3, #ffd2b8
    slider.style.background = color;
}

for(let slider of sliders){
    var x = slider.value;
    var color = 'linear-gradient(to right, #FFB3B3 ' + x + '%, #FFEEE4 ' + x + '%)';//#ffb3b3, #ffd2b8
    slider.style.background = color;
}