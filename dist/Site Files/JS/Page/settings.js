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

/*-- set settings to show player data --*/

let storedUser = JSON.parse(localStorage.getItem('currentuser'));
if(storedUser){
    let emailSU = storedUser.email;
    let passwordSU = storedUser.password;
    const response = await fetch('/api/users/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({emailSU, passwordSU}),
    });
    if(response.allowed){
        storedUser = response.player;
        localStorage.setItem('currentuser', response.player);
    }
    

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

visibleemojis.oninput = function(event){
    const storedUser = JSON.parse(localStorage.getItem('currentuser'));
    if(storedUser.username != 'GUEST'){
        storedUser.visibleemojis = visibleemojis.checked;
        updateSetting('visibleemojis', visibleemojis.checked);
        localStorage.setItem(storedUser.email, JSON.stringify(storedUser));
        localStorage.setItem('currentuser', JSON.stringify(storedUser));
    } else {
        visibleemojis.checked = false;
        alert('log in or sign up to change settings!');
    }
}

darkmode.oninput = function(event){
    const storedUser = JSON.parse(localStorage.getItem('currentuser'));
    if(storedUser.username != 'GUEST'){
        storedUser.darkmode = darkmode.checked;
        updateSetting('darkmode', darkmode.checked);
        localStorage.setItem(storedUser.email, JSON.stringify(storedUser));
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
    if(storedUser.username != 'GUEST'){
        storedUser.autosleep = x;
        localStorage.setItem(storedUser.email, JSON.stringify(storedUser));
        localStorage.setItem('currentuser', JSON.stringify(storedUser));
    } else {
        autosleep.value = 0;
        alert('log in or sign up to change settings!');
    }
}
sliderRelease(autosleep, 'autosleep');

mutegame.oninput = function(event){
    const storedUser = JSON.parse(localStorage.getItem('currentuser'));
    if(storedUser.username != 'GUEST'){
        storedUser.mutegame = mutegame.checked;
        updateSetting('mutegame', mutegame.checked);
        localStorage.setItem(storedUser.email, JSON.stringify(storedUser));
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
    if(storedUser.username != 'GUEST'){
        storedUser.mastervolume = x;
        localStorage.setItem(storedUser.email, JSON.stringify(storedUser));
        localStorage.setItem('currentuser', JSON.stringify(storedUser));
    } else {
        mastervolume.value = 0;
        alert('log in or sign up to change settings!');
    }
}
sliderRelease(mastervolume, 'mastervolume');


emojivolume.oninput = function(event){
    var x = emojivolume.value;
    emojivolume.style.background = 'linear-gradient(to right, ' + sliderColor + ' ' + x + '%, ' + unselectedColor + ' ' + x + '%)';

    const storedUser = JSON.parse(localStorage.getItem('currentuser'));
    if(storedUser.username != 'GUEST'){
        storedUser.emojivolume = x;
        localStorage.setItem(storedUser.email, JSON.stringify(storedUser));
        localStorage.setItem('currentuser', JSON.stringify(storedUser));
    } else {
        emojivolume.value = 0;
        alert('log in or sign up to change settings!');
    }
}
sliderRelease(emojivolume, 'emojivolume');


bobblehead.oninput = function(event){
    const storedUser = JSON.parse(localStorage.getItem('currentuser'));

    if(storedUser.username != 'GUEST'){
        storedUser.bobblehead = bobblehead.checked;
        updateSetting('bobblehead', bobblehead.checked);
        localStorage.setItem(storedUser.email, JSON.stringify(storedUser));
        localStorage.setItem('currentuser', JSON.stringify(storedUser));
    } else {
        bobblehead.checked = false;
        alert('log in or sign up to change settings!');
    }
}

/*-- function for sending post requests to server --*/

async function updateSetting(setting, newval){
    const storedUser = JSON.parse(localStorage.getItem('currentuser'));
    await fetch('/api/users/update-setting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: storedUser.email,
            password: storedUser.password,
            setting: setting,
            newval: newval,
        })
    })
}

function sliderRelease(slider, setting){
    slider.addEventListener('mouseup', () => {updateSetting(setting, slider.value)});
    slider.addEventListener('touchend', () => {updateSetting(setting, slider.value)});
}

/** slider configuration **/

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

