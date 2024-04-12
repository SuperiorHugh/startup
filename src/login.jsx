/*-- imports --*/

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { setUserVisual, updateBackground } from './user_handler';

//login: body component of login page
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const changeEmail = (event) => {
        setEmail(event.target.value);
    };

    const changePassword = (event) => {
        setPassword(event.target.value);
    };

    const submitLogin = async () => {
        console.log('submission of email of ' + email + ' and password of ' + password);
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
            setUserVisual();
            updateBackground();
            window.location = '/play';
        } else {
            alert('unknown user or incorrect password, please try again!');
        }
    };

    return (
        <main>
            <div id="credentials-wrapper">
                <h2 id="login-title">Login</h2>
                <ul id="credentials">
                    <div>
                        <li>
                            <input id="email" type="text" className="text-input" name="emailText" placeholder="Email" value={email} onChange={changeEmail} required />
                        </li>
                        <li>
                            <input id="password" type="password" className="text-input" name="passwordText" placeholder="Password" value={password} onChange={changePassword} required />
                        </li>
                    </div>
                </ul>
                <div>
                    <button id="login-button" type="submit" onClick={submitLogin}>Submit</button>
                </div>
            </div>
            
            <div id="no-account-prompt">
                <p>Don't have an account?</p>
                <NavLink to="../sign-up">Sign Up Here</NavLink>
            </div>
        </main>
    )
}