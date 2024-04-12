/*-- imports --*/

import React, { useEffect } from 'react';
import { loadLeaderboard } from './leaderboard-manager';

//leaderboard: body component of leaderboard page
export default function LeaderBoard() {

    useEffect(() => {
        fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            const randomdog = document.getElementById('randomdog');
            if(randomdog)
                randomdog.src = data.message;
        });

        fetch('https://random-word-api.herokuapp.com/word')
        .then(response => response.json())
        .then(data => {
            let stringified = String(data);
            const randomword = document.getElementById('randomword');
            if(randomword)
                randomword.innerText = stringified.replace(stringified[0], stringified[0].toUpperCase());
        });

        fetch('https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun?type=twopart')
        .then(response => response.json())
        .then(data => {
            const jokesetup = document.getElementById('jokesetup');
            const jokedelivery = document.getElementById('jokedelivery');
            
            if(jokesetup)
                jokesetup.innerText = "\"" + data.setup + "\"";
            if(jokedelivery)
                jokedelivery.innerText = data.delivery;
        });

        loadLeaderboard();
    }, []);

    return (
        <main>
            <div className="scroll-menu-wrapper">
                <div className="scroll-menu">
                    <table id="leaderboard">
                        <thead>
                            <tr id="leaderboard-header">
                                <th>Rank</th>
                                <th>Player</th>
                                <th>Emotes Used</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            
            <div id="random-apis">
                <h3>Say hi to my pet dog, <span id="randomword"></span>!</h3>
                <img id="randomdog" width="300" height="300" alt="random dog" />
        
                <p id="jokesetup"></p>
                <p id="jokedelivery"></p>
            </div>
        </main>
    );
}