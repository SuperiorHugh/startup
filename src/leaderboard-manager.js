//loads leaderboard stats
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

//creates new stat for the leaderboard, and posts onto the site
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