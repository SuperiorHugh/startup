import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { setUserVisual, updateBackground } from './user_handler';


export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const changeEmail = (event) => {
        setEmail(event.target.value);
    };

    const changePassword = (event) => {
        setPassword(event.target.value);
    };

    const changeUsername = (event) => {
        setUsername(event.target.value);
    }

    const submitSignUp = async () => {
        const userRequest = await fetch(`/api/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, username, password}),
        });
        const userData = await userRequest.json();
        console.log(userData.allowed)
        if(userData.allowed){
            alert("welcome to the Virtual Friend Network, " + username + "!");
            localStorage.setItem('currentuser', JSON.stringify(userData.player));
            setUserVisual();
            updateBackground();
        } else {
            alert("there is already an account with that email!");
        }
    }

    return (
        <main>
            <div id="credentials-wrapper">
                <h2 id="login-title">Sign Up</h2>
                <ul id="credentials">
                    <div>
                        <li>
                            <input id="email" type="text" className="text-input" name="emailText" placeholder="Email" value={email} onChange={changeEmail} required />
                        </li>
                        <li>
                            <input id="username" type="text" className="text-input" name="usernameText" placeholder="Username" value={username} onChange={changeUsername} required />
                        </li>
                        <li>
                            <input id="password" type="password" className="text-input" name="passwordText" placeholder="Password" value={password} onChange={changePassword} required />
                        </li>
                    </div>
                </ul>
                <div>
                    <button id="login-button" type="submit" onClick={submitSignUp}>Submit</button>
                </div>

                
            </div>

            <div id="no-account-prompt">
            <p>Already have an account?</p>
            <NavLink to="../login">Log in Here</NavLink>
            </div>
        </main>
    );
}