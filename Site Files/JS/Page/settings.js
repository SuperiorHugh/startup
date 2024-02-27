import {updateBackground} from './user_handler.js'



const visibleemojis = document.getElementById('visible-emojis');
const darkmode = document.getElementById('dark-mode');
const autosleep = document.getElementById('auto-sleep');
const mutegame = document.getElementById('mute-game');
const mastervolue = document.getElementById('master-volume');
const emojivolume = document.getElementById('emoji-volume');
const bobblehead = document.getElementById('bobble-head');


let mute = document.getElementById('mute-game');
let volumeSliders = document.getElementsByClassName("volume-range-input");
let sliders = document.getElementsByClassName("range-input");
let sliderColor = "#FFB3B3";

darkmode.oninput = function(event){
    const storedUser = JSON.parse(localStorage.getItem('currentuser'));

    if(storedUser){
        storedUser.darkmode = darkmode.checked;
        localStorage.setItem(storedUser.email_val, JSON.stringify(storedUser));
        localStorage.setItem('currentuser', JSON.stringify(storedUser));

        updateBackground();
        alert('updated')
    } else {
        darkmode.checked = false;
        alert('log in or sign up to change settings!');
    }
}



/*-- volume sliders configuration --*/

mute.oninput = function() {
    if(mute.checked){
        sliderColor = "#FFEEE4";
        updateVolSliders();
    } else {
        sliderColor = "#FFB3B3";
        updateVolSliders();
    }
}

for(let slider of volumeSliders){
    //initiallize the slider colors
    var x = slider.value;
    var color = 'linear-gradient(to right, ' + sliderColor + ' ' + x + '%, #FFEEE4 ' + x + '%)';//#ffb3b3, #ffd2b8
    slider.style.background = color;

    //update colors
    slider.oninput = function(){
        var x = slider.value;
        var color = 'linear-gradient(to right, ' + sliderColor + ' ' + x + '%, #FFEEE4 ' + x + '%)';//#ffb3b3, #ffd2b8
        slider.style.background = color;
    }
}

for(let slider of sliders){
    //initiallize the slider colors
    var x = slider.value;
    var color = 'linear-gradient(to right, #FFB3B3 ' + x + '%, #FFEEE4 ' + x + '%)';//#ffb3b3, #ffd2b8
    slider.style.background = color;

    //update colors
    slider.oninput = function(){
        var x = slider.value;
        var color = 'linear-gradient(to right, #FFB3B3 ' + x + '%, #FFEEE4 ' + x + '%)';//#ffb3b3, #ffd2b8
        slider.style.background = color;
    }
}

function updateVolSliders(){
    for(let slider of volumeSliders){
        var x = slider.value;
        var color = 'linear-gradient(to right, ' + sliderColor + ' ' + x + '%, #FFEEE4 ' + x + '%)';//#ffb3b3, #ffd2b8
        slider.style.background = color;

        slider.style.setProperty('--sliderColor', sliderColor)
    }
}