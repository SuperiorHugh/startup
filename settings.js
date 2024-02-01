let sliders = document.getElementsByClassName("range-input");

for(let slider of sliders){
    //initiallize the slider colors
    var x = slider.value;
    var color = 'linear-gradient(to right, #FFB3B3 ' + x + '%, #ffd2b860 ' + x + '%)';//#ffb3b3, #ffd2b8
    slider.style.background = color;

    //update colors
    slider.oninput = function(){
        var x = slider.value;
        var color = 'linear-gradient(to right, #FFB3B3 ' + x + '%, #ffd2b860 ' + x + '%)';//#ffb3b3, #ffd2b8
        slider.style.background = color;
    }   
    
}