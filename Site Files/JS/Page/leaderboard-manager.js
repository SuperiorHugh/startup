let leaderboard = document.getElementById("leaderboard");

function createNDummyStats(n, startRank) {
    createDummyStat(startRank);

    if (n > 1) {
        setTimeout(() => {
            createNDummyStats(n - 1, startRank + 1);
        }, 50);
    }
}

createNDummyStats(100, 1); // easily refactorable to take in server info, but just for css example creates dummy stats

function createDummyStat(setRank){
    const leaderboardStat = document.createElement("tr");
    leaderboardStat.setAttribute("class", "leaderboard-stat");

    const rank = document.createElement("td");
    rank.setAttribute("class", "rank-td");
    const player = document.createElement("td");
    const emotesUsed = document.createElement("td");
    const loginAmount = document.createElement("td");

    player.innerHTML = "test name";
    emotesUsed.innerHTML = Math.floor(Math.random() * 200);
    loginAmount.innerHTML = Math.floor(Math.random() * 600);
    rank.innerHTML = setRank;
    if(setRank <= 3){
        rank.setAttribute("id", "top" + setRank);
    }

    leaderboardStat.appendChild(rank);
    leaderboardStat.appendChild(player);
    leaderboardStat.appendChild(emotesUsed);
    leaderboardStat.appendChild(loginAmount);

    leaderboard.appendChild(leaderboardStat);
}


/*
<td class="rank-td" id="top3">3</td>
<td>eggnoglord</td>
<td>1</td>
<td>3</td>
*/