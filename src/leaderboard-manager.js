export async function loadLeaderboard(){
    const response = await fetch('/api/users/players', {
        method: "GET"
    });
    let leaderboardArr = await response.json();
    leaderboardArr.sort((a, b) => b.emotesused - a.emotesused);
    leaderboardArr.forEach((item, i) => {
        createStat(item, i + 1);
    });
}

function createStat(userData, userRank){
    let leaderboard = document.getElementById("leaderboard");
    const leaderboardStat = document.createElement("tr");
    leaderboardStat.setAttribute("class", "leaderboard-stat");

    const rank = document.createElement("td");
    rank.setAttribute("class", "rank-td");
    const player = document.createElement("td");
    const emotesUsed = document.createElement("td");

    rank.innerHTML = userRank;
    player.innerHTML = userData.username;
    emotesUsed.innerHTML = userData.emotesused;
    
    if(userRank <= 3){
        rank.setAttribute("id", "top" + userRank);
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