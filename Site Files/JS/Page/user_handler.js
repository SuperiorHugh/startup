const nonloggedin = document.getElementById('non-logged-in');
const loggedin = document.getElementById('logged-in');
const usernameVisual = document.getElementById('username-visual');
const loginPageButton = document.getElementById('login-page-button');

nonloggedin.style.setProperty('display', 'block');
loggedin.style.setProperty('display', 'none');

export function setUserVisual(){
    const storedUser = JSON.parse(localStorage.getItem('currentuser'));

    if(storedUser){
        nonloggedin.style.setProperty('display', 'none');
        loggedin.style.setProperty('display', 'block');

        usernameVisual.innerText = storedUser.username_val;
        loginPageButton.innerText = 'Switch Account';
    } else {
        nonloggedin.style.setProperty('display', 'block');
        loggedin.style.setProperty('display', 'none');
    }
}

setUserVisual();