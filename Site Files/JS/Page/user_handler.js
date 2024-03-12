const nonloggedin = document.getElementById('non-logged-in');
const loggedin = document.getElementById('logged-in');
const usernameVisual = document.getElementById('username-visual');

nonloggedin.style.setProperty('display', 'block');
loggedin.style.setProperty('display', 'none');

export async function setUserVisual(){
    const storedUser = JSON.parse(localStorage.getItem('currentuser'));
    if(!storedUser)
        return;
    const userRequest = await fetch(`/api/users/player-exists`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: storedUser.email
        }),
    })
    const userData = await userRequest.json();

    if(userData.exists && storedUser && storedUser.accountver === 1){
        nonloggedin.style.setProperty('display', 'none');
        loggedin.style.setProperty('display', 'block');

        usernameVisual.innerText = storedUser.username;
    } else if (userData.exists && storedUser && storedUser.accountver != 1){
        nonloggedin.style.setProperty('display', 'block');
        loggedin.style.setProperty('display', 'none');
        usernameVisual.innerText = 'Guest';
        //TODO update account

    } else {
        localStorage.removeItem('currentuser');
    }
}

const defaultcolors = {
    'maincolor':          '#ffb3b3ff',
    'altcolor':           '#ffd2b8ff',
    'backgroundcolor':    '#ffffffff',
    'boxshadowcolor':     '#ffb3b366',
    'darkboxshadowcolor': '#ffb3b366',
    'hovercolor':         '#ffb3b3ff',
    'unselectedcolor':    '#ffeee4ff',
    'transparentcolor':   '#00000000',
    'textcolor':          '#0000004d',
    'buttoncolor':        '#ffe6e6ff',
    'buttonhovercolor':   '#fffafaff',
}

const darkmodecolors = {
    'maincolor':          '#90aaffff',
    'altcolor':           '#918fd7ff',
    'backgroundcolor':    '#202020ff',
    'boxshadowcolor':     '#7590ff66',
    'darkboxshadowcolor': '#7590ff66',
    'hovercolor':         '#7590ffff',
    'unselectedcolor':    '#c3d0ffff',
    'transparentcolor':   '#00000000',
    'textcolor':          '#ffffff4d',
    'buttoncolor':        '#7590ffff',
    'buttonhovercolor':   '#3b4f80ff',
}


export function updateBackground(){
    const storedUser = JSON.parse(localStorage.getItem('currentuser'));
    if(storedUser){
        document.body.style.setProperty('--maincolor', (storedUser.darkmode ? darkmodecolors['maincolor'] : defaultcolors['maincolor']));
        document.body.style.setProperty('--altcolor', (storedUser.darkmode ? darkmodecolors['altcolor'] : defaultcolors['altcolor']));
        document.body.style.setProperty('--backgroundcolor', (storedUser.darkmode ? darkmodecolors['backgroundcolor'] : defaultcolors['backgroundcolor']));
        document.body.style.setProperty('--boxshadowcolor', (storedUser.darkmode ? darkmodecolors['boxshadowcolor'] : defaultcolors['boxshadowcolor']));
        document.body.style.setProperty('--darkboxshadowcolor', (storedUser.darkmode ? darkmodecolors['darkboxshadowcolor'] : defaultcolors['darkboxshadowcolor']));
        document.body.style.setProperty('--hovercolor', (storedUser.darkmode ? darkmodecolors['hovercolor'] : defaultcolors['hovercolor']));
        document.body.style.setProperty('--unselectedcolor', (storedUser.darkmode ? darkmodecolors['unselectedcolor'] : defaultcolors['unselectedcolor']));
        document.body.style.setProperty('--transparentcolor', (storedUser.darkmode ? darkmodecolors['transparentcolor'] : defaultcolors['transparentcolor']));
        document.body.style.setProperty('--textcolor', (storedUser.darkmode ? darkmodecolors['textcolor'] : defaultcolors['textcolor']));
        document.body.style.setProperty('--buttoncolor', (storedUser.darkmode ? darkmodecolors['buttoncolor'] : defaultcolors['buttoncolor']));
        document.body.style.setProperty('--buttonhovercolor', (storedUser.darkmode ? darkmodecolors['buttonhovercolor'] : defaultcolors['buttonhovercolor']));
    } 
}

setUserVisual();
updateBackground();

