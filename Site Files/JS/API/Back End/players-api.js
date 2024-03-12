const express = require('express');
let router = express.Router();


let players = [ // get from db //TODO
    {username: 'medium baguete lord', emotesused: 32}, //placeholders for real players
    {username: 'big baguette lord', emotesused: 56}, 
    {username: 'aspiring baguette lord', emotesused: 3}
];


router.post('/login', (req, res) => {
    console.log(`password => ${req.body.password}, email => ${req.body.email}`);
    let player = players.find(player => {player.email === req.body.email && player.password === req.body.password});
    if(player){
        console.log('allowed player login');
        res.send({allowed: true, player: player});
    } else {
        console.log('player login disallowed');
        res.send({allowed: false});
    } 
})

router.post('/register', (req, res) => {
    let player = players.find(player => {player.email === req.email});
    if(player){
        console.log('disallowed player sign up');
        res.send({allowed: false});
    } else {
        console.log('allowed player sign up');
        res.send({allowed: true, player: player});
    }
})

router.post('/', (req, res) => {
    // send player to db //TODO
    res.send(players);
})


module.exports = router;