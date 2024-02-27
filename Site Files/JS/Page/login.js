/*
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('Email');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = nameInput.value;
        const email = emailInput.value;

        const newUser = { name, email };
        localStorage.setItem('user', JSON.stringify(newUser));

        const existingUser = JSON.parse(localStorage.getItem(email));

        if (existingUser) {
            alert(`Welcome back, ${existingUser.name}!`);
        } else {
            alert(`Welcome, ${name}! You've been signed up.`);
        }

        window.location.href = 'mainscreen.html';
    });
});

*/


// mine



const form = document.querySelector('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', function (event){
    event.preventDefault();

    const email_val = email.value;
    const password_val = password.value;

    const user_data = {email_val, password_val};

    const existing_user = JSON.parse(localStorage.getItem(email));
    
    if(existing_user){
        alert("welcome back, " + existing_user[1] + "!");
        window.location.href = form.action;
    } else {
        alert('please create a new account!');
        window.location.href = '/Site Files/HTML/signup.html';
    }
})
