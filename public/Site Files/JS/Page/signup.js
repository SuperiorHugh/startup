const form = document.querySelector('form');
const emailForm = document.getElementById('email');
const usernameForm = document.getElementById('username');
const passwordForm = document.getElementById('password');

form.addEventListener('submit', async function (event){
    event.preventDefault();

    const email = emailForm.value;
    const username = usernameForm.value;
    const password = passwordForm.value;
    
    const userRequest = await fetch(`/api/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, username, password}),
    });
    const userData = await userRequest.json();
    console.log(userData.allowed)
    if(!userData.allowed){//TODO make sure to get data from db for future reference
        alert("there is already an account with that email!");
    } else {
        alert("welcome to the Virtual Friend Network, " + username + "!");
        localStorage.setItem('currentuser', JSON.stringify(userData.player));
        window.location.href = form.action;
    }
})