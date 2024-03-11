const form = document.querySelector('form');
const emailForm = document.getElementById('email');
const usernameForm = document.getElementById('username');
const passwordForm = document.getElementById('password');

form.addEventListener('submit', function (event){
    event.preventDefault();

    const email = emailForm.value;
    const username = usernameForm.value;
    const password = passwordForm.value;

    const userData = {
        //credentials
        email, 
        username, 
        password,

        //settings
        visibleemojis: false,
        darkmode: false,
        autosleep: 0,
        mutegame: false,
        mastervolue: 100,
        emojivolume: 100,
        bobblehead: false,

        //data
        emotesused: 0,
    };

    const existingUser = JSON.parse(localStorage.getItem(email));
    
    if(existingUser){
        alert("there is already an account with that email!");
    } else {
        alert("welcome to the Virtual Friend Network, " + username + "!");
        localStorage.setItem(email, JSON.stringify(userData));
        localStorage.setItem('currentuser', JSON.stringify(userData));
        window.location.href = form.action;
    }
})