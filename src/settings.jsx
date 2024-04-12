/*-- imports --*/

import React, { useState, useEffect } from 'react';
import { updateBackground } from './user_handler.js';
import { updateSetting, updateColors } from './settings.js';

//settings: body component of settings page
export default function Settings() {
    const storedUser = JSON.parse(localStorage.getItem('currentuser'));
    const defaultVisibleEmojis =    (storedUser ? storedUser.visibleemojis : true);
    const defaultDarkMode =         (storedUser ? storedUser.darkmode : false);
    const defaultAutoSleepTimer =   (storedUser ? storedUser.autosleep : '100');
    const defaultMuteGame =         (storedUser ? storedUser.mutegame : false);
    const defaultMasterVolume =     (storedUser ? storedUser.mastervolume : '100');
    const defaultEmojiVolume =      (storedUser ? storedUser.emojivolume : '100');
    const defaultBobbleHead =       (storedUser ? storedUser.bobblehead : false);

    const [visibleEmojis, setVisibleEmojis] =   useState(defaultVisibleEmojis);
    const [darkMode, setDarkMode] =             useState(defaultDarkMode);
    const [autoSleepTimer, setAutoSleepTimer] = useState(defaultAutoSleepTimer);
    const [muteGame, setMuteGame] =             useState(defaultMuteGame);
    const [masterVolume, setMasterVolume] =     useState(defaultMasterVolume);
    const [emojiVolume, setEmojiVolume] =       useState(defaultEmojiVolume);
    const [bobbleHead, setBobbleHead] =         useState(defaultBobbleHead);

    const changeVisibleEmojis = () => {
        const storedUser = JSON.parse(localStorage.getItem('currentuser'));
        if(storedUser.username != 'GUEST'){
            let changeTo = !visibleEmojis;
            setVisibleEmojis(changeTo);
            storedUser.visibleemojis = changeTo;
            updateSetting('visibleemojis', changeTo);
            localStorage.setItem('currentuser', JSON.stringify(storedUser));
        } else {
            setVisibleEmojis(defaultVisibleEmojis);
            alert('log in or sign up to change settings!');
        }
    };

    const changeDarkMode = () => {
        const storedUser = JSON.parse(localStorage.getItem('currentuser'));
        if(storedUser.username != 'GUEST'){
            let changeTo = !darkMode;
            setDarkMode(changeTo);
            storedUser.darkmode = changeTo;
            updateSetting('darkmode', changeTo);
            localStorage.setItem('currentuser', JSON.stringify(storedUser));
            updateBackground();
            updateColors();
        } else {
            setDarkMode(defaultDarkMode);
            alert('log in or sign up to change settings!');
        }
    }

    const changeAutoSleepTimer = (event) => {
        const storedUser = JSON.parse(localStorage.getItem('currentuser'));
        if(storedUser.username != 'GUEST'){
            let changeTo = event.target.value;
            setAutoSleepTimer(changeTo);
            storedUser.autosleep = changeTo;
            localStorage.setItem('currentuser', JSON.stringify(storedUser));
            updateColors();
        } else {
            setAutoSleepTimer(defaultAutoSleepTimer);
            alert('log in or sign up to change settings!');
        }
    }
    const postAutoSleepTimer = () => {
        updateSetting('autosleep', autoSleepTimer);
    }

    const changeMuteGame = () => {
        const storedUser = JSON.parse(localStorage.getItem('currentuser'));
        if(storedUser.username != 'GUEST'){
            let changeTo = !muteGame;
            setMuteGame(changeTo);
            storedUser.mutegame = changeTo;
            updateSetting('mutegame', changeTo);
            localStorage.setItem('currentuser', JSON.stringify(storedUser));
            updateColors();
        } else {
            setMuteGame(defaultMuteGame);
            alert('log in or sign up to change settings!');
        }
    };

    const changeMasterVolume = (event) => {
        const storedUser = JSON.parse(localStorage.getItem('currentuser'));
        if(storedUser.username != 'GUEST'){
            let changeTo = event.target.value;
            setMasterVolume(changeTo);
            storedUser.mastervolume = changeTo;
            localStorage.setItem('currentuser', JSON.stringify(storedUser));
            updateColors();
        } else {
            setMasterVolume(defaultMasterVolume);
            alert('log in or sign up to change settings!');
        }
    }
    const postMasterVolume = () => {
        updateSetting('mastervolume', masterVolume);
    }

    const changeEmojiVolume = (event) => {
        const storedUser = JSON.parse(localStorage.getItem('currentuser'));
        if(storedUser.username != 'GUEST'){
            let changeTo = event.target.value;
            setEmojiVolume(changeTo);
            storedUser.emojivolume = changeTo;
            localStorage.setItem('currentuser', JSON.stringify(storedUser));
            updateColors();
        } else {
            setEmojiVolume(defaultEmojiVolume);
            alert('log in or sign up to change settings!');
        }
    }
    const postEmojiVolume = () => {
        updateSetting('emojivolume', emojiVolume);
    }

    const changeBobbleHead = () => {
        const storedUser = JSON.parse(localStorage.getItem('currentuser'));
        if(storedUser.username != 'GUEST'){
            let changeTo = !bobbleHead;
            setBobbleHead(changeTo);
            storedUser.bobblehead = changeTo;
            updateSetting('bobblehead', changeTo);
            localStorage.setItem('currentuser', JSON.stringify(storedUser));
        } else {
            setBobbleHead(defaultBobbleHead);
            alert('log in or sign up to change settings!');
        }
    };


    useEffect(() => {
        updateColors();
    }, []);

    return (
        <main>
        <div className="scroll-menu-wrapper">
            <div className="scroll-menu">
                <div className="setting-page" id="game-settings">
                    <h2>Game Settings</h2>
                    <ul>
                        <li>
                            <label>Visible Emojis</label>
                            <br />
                            <input type="checkbox" id="visible-emojis" className="checkbox-input" checked={visibleEmojis} onChange={changeVisibleEmojis} />
                        </li>
                        <li>
                            <label>Dark Mode</label>
                            <br />
                            <input type="checkbox" id="dark-mode" className="checkbox-input" checked={darkMode} onChange={changeDarkMode}/>
                        </li>
                        <li>
                            <label>Auto Sleep Timer</label>
                            <br />
                            <input type="range" id="auto-sleep" className="range-input" min="0" max="100" step="1" defaultValue={defaultAutoSleepTimer} onChange={changeAutoSleepTimer} onMouseUp={postAutoSleepTimer}/>
                        </li>
                    </ul>
                </div>
                <div className="setting-page" id="audio-settings">
                    <h2>Audio Settings</h2>
                    <ul>
                        <li>
                            <label>Mute Game</label>
                            <br />
                            <input type="checkbox" id="mute-game" className="checkbox-input" checked={muteGame} onChange={changeMuteGame}/>
                        </li>
                        <li>
                            <label>Master Volume</label>
                            <br />
                            <input type="range" id="master-volume" className="volume-range-input" min="0" max="100" step="1" defaultValue={defaultMasterVolume} onChange={changeMasterVolume} onMouseUp={postMasterVolume}/>
                        </li>
                        <li>
                            <label>Emoji Volume</label>
                            <br />
                            <input type="range" id="emoji-volume" className="volume-range-input" min="0" max="100" step="1" defaultValue={defaultEmojiVolume} onChange={changeEmojiVolume} onMouseUp={postEmojiVolume}/>
                        </li>
                    </ul>
                </div>
                <div className="setting-page" id="epic-settings">
                    <h2>Epic Settings</h2>
                    <ul>
                        <li>
                            <label>Bobble Head</label>
                            <br />
                            <input type="checkbox" id="bobble-head" className="checkbox-input" checked={bobbleHead} onChange={changeBobbleHead} />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </main>
    );
}