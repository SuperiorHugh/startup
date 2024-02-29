const form = document.querySelector('form');
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');

form.addEventListener('submit', function (event){
    event.preventDefault();

    const email_val = email.value;
    const username_val = username.value;
    const password_val = password.value;

    const user_data = {
        //credentials
        email_val, username_val, password_val,

        //settings
        visibleemojis: false,
        darkmode: false,
        autosleep: 0,
        mutegame: false,
        mastervolue: 100,
        emojivolume: 100,
        bobblehead: false,

        //data
        emoteAmount: 0,
    };

    const existing_user = JSON.parse(localStorage.getItem(email_val));
    
    if(existing_user){
        alert("there is already an account with that email!");
    } else {
        alert("welcome to the Virtual Friend Network, " + username_val + "!");
        localStorage.setItem(email_val, JSON.stringify(user_data));
        localStorage.setItem('currentuser', JSON.stringify(user_data));
        window.location.href = form.action;
    }
})