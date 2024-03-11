let leaderboard = document.getElementById("leaderboard");


const storedUser = JSON.parse(localStorage.getItem('currentuser'));
// if(storedUser){
//     createStat(storedUser);
//     createNDummyStats(100, 2);
// } else {
//     createNDummyStats(100, 1);
// }

let leaderboardArr = [];
async function loadLeaderboard(){
    let leaderboardArr = [];
    try {
        const response = await fetch('/api/leaderboard');
        leaderboardArr = await response.json();
    } catch {
        const localLeaderboard = localStorage.getItem('leaderboard');
        if(localLeaderboard){
            leaderboardArr = JSON.parse(localLeaderboard);
        }
    }
    
    leaderboardArr.forEach((item, i) => {
        createStat(item);
    });
}

loadLeaderboard()

function createNDummyStats(n, startRank) {
    createDummyStat(startRank);

    if (n > 1) {
        setTimeout(() => {
            createNDummyStats(n - 1, startRank + 1);
        }, 50);
    }
}

function createDummyStat(setRank){
    const leaderboardStat = document.createElement("tr");
    leaderboardStat.setAttribute("class", "leaderboard-stat");

    const rank = document.createElement("td");
    rank.setAttribute("class", "rank-td");
    const player = document.createElement("td");
    const emotesUsed = document.createElement("td");

    rank.innerHTML = setRank;
    player.innerHTML = "test name";
    emotesUsed.innerHTML = Math.floor(Math.random() * 200);
    
    if(setRank <= 3){
        rank.setAttribute("id", "top" + setRank);
    }

    leaderboardStat.appendChild(rank);
    leaderboardStat.appendChild(player);
    leaderboardStat.appendChild(emotesUsed);

    leaderboard.appendChild(leaderboardStat);
}

function createStat(userData){
    const leaderboardStat = document.createElement("tr");
    leaderboardStat.setAttribute("class", "leaderboard-stat");

    const rank = document.createElement("td");
    rank.setAttribute("class", "rank-td");
    const player = document.createElement("td");
    const emotesUsed = document.createElement("td");

    rank.innerHTML = 1;
    player.innerHTML = userData.username_val;
    emotesUsed.innerHTML = userData.emotesUsed;
    
    if(1 <= 3){//TODO
        rank.setAttribute("id", "top" + 1);
    }

    leaderboardStat.appendChild(rank);
    leaderboardStat.appendChild(player);
    leaderboardStat.appendChild(emotesUsed);

    leaderboard.appendChild(leaderboardStat);
}
/*
<td class="rank-td" id="top3">3</td>
<td>eggnoglord</td>
<td>1</td>
<td>3</td>
*/