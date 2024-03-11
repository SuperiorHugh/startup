const express = require('express');
let router = express.Router();


let players = [ // get from db //TODO
    {username: 'medium baguete lord', emotesused: 32}, //placeholders for real players
    {username: 'big baguette lord', emotesused: 56}, 
    {username: 'aspiring baguette lord', emotesused: 3}
];


router.get('/login', (req, res) => {
    if(players.find(player => {player.email === req.email && player.password === req.password})){
        res.send({allowed: true});
    } else {
        res.send({allowed: false});
    } 
})

router.get('/register', (req, res) => {
    if(players.find(player => {player.email === req.email})){
        res.send({allowed: false});
    } else {
        res.send({allowed: true});
    }
})

router.post('/', (req, res) => {
    // send player to db //TODO
    res.send(players);
})


module.exports = router;