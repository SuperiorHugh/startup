const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const db = require('../../../../../database.js');
const express = require('express');
let router = express.Router();


//args: email password
router.post('/login', async (req, res) => {
    const player = await db.getPlayer(req.body.email);
    if(player && (await bcrypt.compare(req.body.password, player.password) || req.body.password === player.password)){
        res.send({allowed: true, player: player});
    } else {
        res.send({allowed: false});
    }
});

//args: email username password
router.post('/register', async (req, res) => {
    const player = await db.getPlayer(req.body.email);
    if(player){
        res.send({allowed: false});
    } else {
        const player = await db.createPlayer(req.body.email, req.body.username, req.body.password);
        res.send({allowed: true, player: player});
    }
});

//args:
router.get('/players', async (req, res) => {
    res.send(await db.getTopPlayers(50));
});

//args: email
router.post('/player-exists', async (req, res) => {
    if(await db.getPlayer(req.body.email)){
        res.send({exists: true});
    } else {
        res.send({exists: false});
    }
});

//args: email password setting newval
router.post('/update-setting', async (req, res) => {
    const player = await db.getPlayer(req.body.email);
    if(player && req.body.password === player.password){
        db.editSetting(req.body.email, req.body.setting, req.body.newval);
    }
});

//args: email password amt
router.post('/add-emote', async (req, res) => {
    const player = await db.getPlayer(req.body.email);
    if(player && req.body.password === player.password){
        db.addEmote(req.body.email, req.body.amt);
    }
});

//args: email password emote cost
router.post('/purchase-emote', async (req, res) => {
    const player = await db.getPlayer(req.body.email);
    if(player && req.body.password === player.password && player.emotesused >= req.body.cost && !player.purchased.includes(req.body.emote)){
        db.purchasedEmote(req.body.email, req.body.emote);
        db.addEmote(req.body.email, -req.body.cost);
        res.send({allowed: true});
    } else {
        res.send({allowed: false});
    }
});

//args: email password user
router.post('/update-account', async (req, res) => {
    const player = await db.getPlayer(req.body.email);
    if(player && req.body.password === player.password){
        let updated = db.updatePlayer(req.body.user);
        res.send({allowed: true, user: updated});
    }
});

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