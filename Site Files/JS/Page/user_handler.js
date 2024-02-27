const nonloggedin = document.getElementById('non-logged-in');
const loggedin = document.getElementById('logged-in');
const usernameVisual = document.getElementById('username-visual');

nonloggedin.style.setProperty('display', 'block');
loggedin.style.setProperty('display', 'none');

export function setUserVisual(){
    const storedUser = JSON.parse(localStorage.getItem('currentuser'));

    if(storedUser){
        nonloggedin.style.setProperty('display', 'none');
        loggedin.style.setProperty('display', 'block');

        usernameVisual.innerText = storedUser.username_val;
    } else {
        nonloggedin.style.setProperty('display', 'block');
        loggedin.style.setProperty('display', 'none');
    }
}

export function updateBackground(){
    const storedUser = JSON.parse(localStorage.getItem('currentuser'));
    document.body.style.backgroundColor = (storedUser.darkmode ? 'rgb(34,34,34)' : 'white');
}

setUserVisual();
updateBackground();

