const form = document.querySelector('form');
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');

form.addEventListener('submit', function (event){
    event.preventDefault();

    const email_val = email.value;
    const username_val = username.value;
    const password_val = password.value;

    const user_data = {email_val, username_val, password_val};

    const existing_user = JSON.parse(localStorage.getItem(email));
    
    if(existing_user){
        alert("there is already an account with that email!");
    } else {
        alert("welcome to the Virtual Friend Network");
        window.location.href = form.action;
    }
})