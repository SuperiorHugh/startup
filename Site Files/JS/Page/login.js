const form = document.querySelector('form');
const emailForm = document.getElementById('email');
const passwordForm = document.getElementById('password');

form.addEventListener('submit', function (event){
    event.preventDefault();

    const email = emailForm.value;
    const password = passwordForm.value;

    const existingUser = JSON.parse(localStorage.getItem(email));
    
    if(existingUser && existingUser.password == password){
        alert("welcome back, " + existingUser.username_val + "!");
        localStorage.setItem('currentuser', JSON.stringify(existingUser));
        window.location.href = form.action;
    } else {
        alert('unknown user or incorrect password, please try again!');
    }
})
