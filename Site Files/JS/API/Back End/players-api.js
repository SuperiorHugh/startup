const express = require('express');
let router = express.Router();


let players = [ // get from db //TODO
    {username: 'medium baguete lord', emotesused: 32}, //placeholders for real players
    {username: 'big baguette lord', emotesused: 56}, 
    {username: 'aspiring baguette lord', emotesused: 3}
];


router.get('/login', (req, res) => {
    let player = players.find(player => {player.email === req.email && player.password === req.password});
    if(player){
        res.send({allowed: true, player: player});
    } else {
        res.send({allowed: false});
    } 
})

router.get('/register', (req, res) => {
    let player = players.find(player => {player.email === req.email});
    if(player){
        res.send({allowed: false});
    } else {
        res.send({allowed: true, player: player});
    }
})

router.post('/', (req, res) => {
    // send player to db //TODO
    res.send(players);
})


module.exports = router;