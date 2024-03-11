const express = require('express');
let router = express.Router();


let players = [ // get from db //TODO
    {username: 'medium baguete lord', emotesused: 32}, //placeholders for real players
    {username: 'big baguette lord', emotesused: 56}, 
    {username: 'aspiring baguette lord', emotesused: 3}
];


router.get('/', (req, res) => {
    res.send(players);
})

router.post('/', (req, res) => {
    // send player to db //TODO
    res.send(players);
})


module.exports = router;