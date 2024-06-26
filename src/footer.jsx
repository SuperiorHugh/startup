/*-- imports --*/

import React from 'react';

//footer: the footer of the website, consisting of github link and youtube link
export default function Footer() {
    return (
        <footer>
            <hr />
            <span><a href="https://github.com/SuperiorHugh/startup"><img id="github-img" width="48" src="/img/icon/github-icon.png" alt="github link"/></a></span>
            <span><a href="https://www.youtube.com/watch?v=xvFZjo5PgG0"><img id="youtube-img" width="48" src="/img/icon/youtube-icon.png" alt="youtube link"/></a></span>
        </footer>
    );
}