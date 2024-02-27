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
    'maincolor':          '#90aaff',
    'altcolor':           '#918fd7',
    'backgroundcolor':    '#202020',
    'boxshadowcolor':     '#7590ff66',
    'darkboxshadowcolor': '#7590ff66',
    'hovercolor':         '#7590ff',
    'unselectedcolor':    '#c3d0ff',
    'transparentcolor':   '#00000000',
    'textcolor':          '#ffffff4d',
    'buttoncolor':        '#7590ff',
    'buttonhovercolor':   '#3b4f80',
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

