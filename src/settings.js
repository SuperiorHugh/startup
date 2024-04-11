//post setting change to service endpoint
export async function updateSetting(setting, newval){
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

//update slider colors automatically
export function updateColors(){
    let volumeSliders = document.getElementsByClassName("volume-range-input");
    let sliders = document.getElementsByClassName("range-input");
    let mainColor = getComputedStyle(document.body).getPropertyValue('--maincolor');
    let unselectedColor = getComputedStyle(document.body).getPropertyValue('--unselectedcolor');
    let sliderColor = mainColor;
    mainColor = getComputedStyle(document.body).getPropertyValue('--maincolor');
    unselectedColor = getComputedStyle(document.body).getPropertyValue('--unselectedcolor');
    const mutegame = document.getElementById('mute-game');

    if(mutegame.checked){
        document.body.style.setProperty('--volumeslidercolor', unselectedColor);
    } else {
        document.body.style.setProperty('--volumeslidercolor', mainColor);
    }
    for(let slider of volumeSliders){
        var x = slider.value;
        var color = 'linear-gradient(to right, ' + (mutegame.checked ? unselectedColor : sliderColor) + ' ' + x + '%, ' + unselectedColor + ' ' + x + '%)';
        slider.style.background = color;
    }
    
    for(let slider of sliders){
        var x = slider.value;
        var color = 'linear-gradient(to right, ' + mainColor + ' ' + x + '%, ' + unselectedColor + ' ' + x + '%)';
        slider.style.background = color;
    }
}
