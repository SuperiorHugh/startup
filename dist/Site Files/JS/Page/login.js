const form = document.querySelector('form');
const emailForm = document.getElementById('email');
const passwordForm = document.getElementById('password');

form.addEventListener('submit', async function (event){
    event.preventDefault();

    const email = emailForm.value;
    const password = passwordForm.value;

    const userRequest = await fetch(`/api/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    })
    const userData = await userRequest.json();

    if(userData.allowed){
        alert("welcome back, " + userData.player.username + "!");
        localStorage.setItem('currentuser', JSON.stringify(userData.player));
        window.location.href = form.action;
    } else {
        alert('unknown user or incorrect password, please try again!');
    }
})
