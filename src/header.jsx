import React, { useEffect } from 'react';
import { setUserVisual, updateBackground } from './user_handler';


export default function Header() {
    useEffect(() => {
        setUserVisual();
        updateBackground();
    }, []);

    return (
        <header>
            <h1 id="game-title">Virtual Friend</h1>
            <h3 id="non-logged-in">You are currently not logged in</h3>
            <h3 id="logged-in">Logged in as: <span id="username-visual">Joebiden131</span></h3>
        </header>
    );
}