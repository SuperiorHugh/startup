let mute = document.getElementById('mute-game');
let volumeSliders = document.getElementsByClassName("volume-range-input");
let sliders = document.getElementsByClassName("range-input");
let sliderColor = "#FFB3B3";
const darkmode = document.getElementById('darkmode');


darkmode.oninput() = function(){
    if(darkmode.checked){
        const storedUser = JSON.parse(localStorage.getItem('currentuser'));

        if(storedUser){
            nonloggedin.style.setProperty('display', 'none');
            loggedin.style.setProperty('display', 'block');

            usernameVisual.innerText = storedUser.username_val;
            loginPageButton.innerText = 'Switch Account';
        } else {
            alert('log in or sign up to change settings!');
        }
    }
}

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