import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Footer from './footer.jsx';
import Header from './header.jsx';


//body components
import Login from './login.jsx';
import SignUp from './signup.jsx';

import Settings from './settings.jsx';
import LeaderBoard from './leaderboard';


export default function App () {
    return (
        <BrowserRouter>
            
            <Header />
            <nav className="horizontal-list">
                <NavLink className="nav-link" to="login">Login</NavLink>
                <NavLink className="nav-link" to="sign-up">Sign Up</NavLink>
                <NavLink className="nav-link" to="play">Play</NavLink>
                <NavLink className="nav-link" to="settings">Settings</NavLink>
                <NavLink className="nav-link" to="leaderboard">Leaderboard</NavLink>
            </nav>

            <Routes>
                <Route path='login' element={<Login />} />
                <Route path='sign-up' element={<SignUp />} />
                <Route path='play' element={<>play page</>} />
                <Route path='settings' element={<Settings />} />
                <Route path='leaderboard' element={<LeaderBoard />} />

                <Route path='*' element={<h1>will be play page</h1>} />
            </Routes>

            <Footer />
            
        </BrowserRouter>
    );
};