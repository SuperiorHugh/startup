const express = require('express');
let router = express.Router();

let leaderboard = [ // get from db //TODO
    {username: 'medium baguete lord', emotesused: 32}, //placeholders for real players
    {username: 'big baguette lord', emotesused: 56}, 
    {username: 'aspiring baguette lord', emotesused: 3}
];
leaderboard.sort((a, b) => b.emotesused - a.emotesused);


router.get('/', (req, res) => {
    res.send(leaderboard);
})

// No need for post, as data will come from db? //TODO
router.post('/', (req, res) => {
    leaderboard = updateLeaderboard(req.body, leaderboard);
    res.send(leaderboard);
})

function updateLeaderboard(scoreData, leaderboard){
    leaderboard.push(scoreData);
    leaderboard.sort((a, b) => b.emotesused - a.emotesused);
    return leaderboard;
}


module.exports = router;