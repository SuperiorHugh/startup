import {updateBackground} from './user_handler.js'

let volumeSliders = document.getElementsByClassName("volume-range-input");
let sliders = document.getElementsByClassName("range-input");

let mainColor = getComputedStyle(document.body).getPropertyValue('--maincolor');
let unselectedColor = getComputedStyle(document.body).getPropertyValue('--unselectedcolor');

let sliderColor = mainColor;

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



    updateColors();
    updateVolSliders();
}


autosleep.oninput = function(event){
    var x = autosleep.value;
    autosleep.style.background = 'linear-gradient(to right, ' + mainColor + ' ' + x + '%, ' + unselectedColor + ' ' + x + '%)';

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
    mastervolume.style.background = 'linear-gradient(to right, ' + sliderColor + ' ' + x + '%, ' + unselectedColor + ' ' + x + '%)';

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
    emojivolume.style.background = 'linear-gradient(to right, ' + sliderColor + ' ' + x + '%, ' + unselectedColor + ' ' + x + '%)';

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

function updateColors(){
    mainColor = getComputedStyle(document.body).getPropertyValue('--maincolor');
    unselectedColor = getComputedStyle(document.body).getPropertyValue('--unselectedcolor');

    for(let slider of volumeSliders){
        var x = slider.value;
        var color = 'linear-gradient(to right, ' + sliderColor + ' ' + x + '%, ' + unselectedColor + ' ' + x + '%)';
        slider.style.background = color;
    }
    
    for(let slider of sliders){
        var x = slider.value;
        var color = 'linear-gradient(to right, ' + mainColor + ' ' + x + '%, ' + unselectedColor + ' ' + x + '%)';
        slider.style.background = color;
    }
}

function updateVolSliders(){
    if(mutegame.checked){
        sliderColor = unselectedColor;
    } else {
        sliderColor = mainColor;
    }

    for(let slider of volumeSliders){
        var x = slider.value;
        var color = 'linear-gradient(to right, ' + sliderColor + ' ' + x + '%, ' + unselectedColor + ' ' + x + '%)';
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

updateColors();