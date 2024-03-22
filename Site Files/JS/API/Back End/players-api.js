const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const db = require('../../../../database.js');
const express = require('express');
let router = express.Router();



let players = [ // get from db //TODO
    {username: 'medium baguete lord', emotesused: 32}, //placeholders for real players
    {username: 'big baguette lord', emotesused: 56}, 
    {username: 'aspiring baguette lord', emotesused: 3}
];


router.post('/login', async (req, res) => {
    const player = await db.getPlayer(req.body.email);
    if(player && await bcrypt.compare(req.body.password, player.password)){
        console.log('allowed player login');
        res.send({allowed: true, player: player});
    } else {
        console.log('player login disallowed');
        res.send({allowed: false});
    } 
})

//args: email username password
router.post('/register', async (req, res) => {
    const player = await db.getPlayer(req.body.email);
    if(player){
        console.log('disallowed player sign up');
        res.send({allowed: false});
    } else {
        console.log('allowed player sign up');
        const player = db.createPlayer(req.body.email, req.body.username, req.body.password);
        res.send({allowed: true, player: player});
    }
})

//args:
router.get('/players', (req, res) => {
    // send player to db //TODO
    res.send(players);
})

//args: email
router.post('/player-exists', (req, res) => {
    if(players.find(player => player.email === req.body.email)){
        res.send({exists: true});
    } else {
        res.send({exists: false});
    }
})

//args: email password setting newval
router.post('/update-setting', (req, res) => {
    let player = players.find(player => player.email === req.body.email);
    if(!player || player.password != req.body.password){
        res.send({allowed: false});
        return;
    }
    player[req.body.setting] = req.body.newval;
})

//args: email password emoteamt
router.post('/add-emote', (req, res) => {
    let player = players.find(player => player.email === req.body.email);
    if(!player || player.password != req.body.password){
        res.send({allowed: false});
        return;
    }

    player.emotesused++;
})

function setAuthCookie(res, authToken) {
    res.cookie('token', authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
}

function deleteAuthCookie(res){
    res.clearCookie('token');
}

module.exports = router;